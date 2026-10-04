import { NextResponse, type NextRequest } from "next/server";

// GitHub redirects here after the user approves. We exchange the code for an
// access token, then hand it back to the Decap admin window using the
// postMessage handshake Decap expects.
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const savedState = req.cookies.get("decap_oauth_state")?.value;

  if (!code) return new NextResponse("Falta el parámetro 'code'", { status: 400 });
  if (!state || state !== savedState) {
    return new NextResponse("Estado inválido (posible CSRF)", { status: 400 });
  }

  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return new NextResponse("Faltan variables de entorno de GitHub OAuth", { status: 500 });
  }

  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
  });
  const data = await tokenRes.json();
  const token: string | undefined = data.access_token;

  const message = token
    ? `authorization:github:success:${JSON.stringify({ token, provider: "github" })}`
    : `authorization:github:error:${JSON.stringify({ message: data.error_description || "No se pudo obtener el token" })}`;

  // The admin (/admin) and this popup share the site's origin, so the token is
  // only ever sent to that origin: never broadcast with "*", and never to
  // whichever window happens to answer first.
  const proto = req.headers.get("x-forwarded-proto") ?? "https";
  const origin = `${proto}://${req.headers.get("host")}`;

  // JSON.stringify embeds each value as a JS string literal; escaping "<" keeps
  // a value from closing the <script> tag.
  const js = (value: string) => JSON.stringify(value).replace(/</g, "\\u003c");
  const html = `<!doctype html>
<html><body><script>
  (function () {
    var ORIGIN = ${js(origin)};
    function receive(e) {
      if (e.origin !== ORIGIN || e.source !== window.opener) return;
      window.opener.postMessage(${js(message)}, ORIGIN);
      window.removeEventListener("message", receive, false);
    }
    window.addEventListener("message", receive, false);
    window.opener.postMessage("authorizing:github", ORIGIN);
  })();
</script></body></html>`;

  const res = new NextResponse(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
  res.cookies.delete("decap_oauth_state");
  return res;
}
