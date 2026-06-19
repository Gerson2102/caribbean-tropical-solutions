import { NextResponse, type NextRequest } from "next/server";

// Hides the /admin dashboard from the public. Anyone without a valid access
// token gets a plain 404 — to them, /admin simply doesn't exist. The client
// unlocks it once via a secret link (/admin?key=THE_SECRET); that issues a
// SIGNED, EXPIRING token cookie (the secret itself is never stored in the
// browser, the token can't be forged, and it auto-expires). Rotating
// CMS_ADMIN_KEY instantly invalidates every existing token.
//
// Activates only when CMS_ADMIN_KEY is set (e.g. in Vercel) — locally it stays
// open so dev/`decap-server` need no key. GitHub collaborator permissions remain
// the real edit lock, so even a leaked token can't change the site.
export const config = {
  matcher: ["/admin", "/admin/:path*"],
};

const COOKIE = "cms_access";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 14; // 14 days
const encoder = new TextEncoder();

function toB64url(bytes: Uint8Array): string {
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function sign(data: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(data));
  return toB64url(new Uint8Array(sig));
}

// Constant-time comparison to avoid leaking timing information.
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

async function createToken(secret: string): Promise<string> {
  const exp = String(Date.now() + MAX_AGE_SECONDS * 1000);
  return `${exp}.${await sign(exp, secret)}`;
}

async function isValidToken(token: string, secret: string): Promise<boolean> {
  const dot = token.indexOf(".");
  if (dot < 0) return false;
  const exp = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  if (!Number.isFinite(Number(exp)) || Number(exp) < Date.now()) return false;
  return safeEqual(sig, await sign(exp, secret));
}

const notFound = () =>
  new NextResponse("Not Found", {
    status: 404,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });

export async function proxy(req: NextRequest) {
  const secret = process.env.CMS_ADMIN_KEY;
  if (!secret) return NextResponse.next();

  // Unlock via the secret link: issue a signed, expiring token cookie.
  const providedKey = req.nextUrl.searchParams.get("key");
  if (providedKey && safeEqual(providedKey, secret)) {
    const url = req.nextUrl.clone();
    url.searchParams.delete("key");
    const res = NextResponse.redirect(url);
    res.cookies.set(COOKIE, await createToken(secret), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/admin",
      maxAge: MAX_AGE_SECONDS,
    });
    return res;
  }

  const token = req.cookies.get(COOKIE)?.value;
  if (token && (await isValidToken(token, secret))) {
    return NextResponse.next();
  }

  return notFound();
}
