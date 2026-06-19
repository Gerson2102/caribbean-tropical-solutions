import { NextResponse, type NextRequest } from "next/server";
import { randomBytes } from "node:crypto";

// Starts the GitHub OAuth flow for the Decap CMS admin.
// Decap opens this in a popup; we redirect to GitHub's consent screen.
export async function GET(req: NextRequest) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) {
    return new NextResponse("Falta la variable GITHUB_CLIENT_ID", { status: 500 });
  }

  const proto = req.headers.get("x-forwarded-proto") ?? "https";
  const host = req.headers.get("host");
  const redirectUri = `${proto}://${host}/api/callback`;

  // CSRF protection: random state echoed back and verified in the callback.
  const state = randomBytes(16).toString("hex");

  const authUrl = new URL("https://github.com/login/oauth/authorize");
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("scope", "public_repo"); // write access to public repos only
  authUrl.searchParams.set("state", state);

  const res = NextResponse.redirect(authUrl.toString());
  res.cookies.set("decap_oauth_state", state, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 600,
  });
  return res;
}
