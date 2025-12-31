;
!function() {
  try {
    var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {}, n = new e.Error().stack;
    n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "fffd742e-27e0-44bc-a387-e86c2f3b09c4", e._sentryDebugIdIdentifier = "sentry-dbid-fffd742e-27e0-44bc-a387-e86c2f3b09c4");
  } catch (e2) {
  }
}();
import { a as adminAuth } from "../../../../chunks/admin.js";
import { json, error } from "@sveltejs/kit";
import "../../../../chunks/_sentry-release-injection-file.js";
const POST = async ({ request, cookies }) => {
  const { idToken } = await request.json();
  const expiresIn = 60 * 60 * 24 * 7 * 1e3;
  const decodedIdToken = await adminAuth.verifyIdToken(idToken);
  if ((/* @__PURE__ */ new Date()).getTime() / 1e3 - decodedIdToken.auth_time < 5 * 60) {
    const cookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
    const options = { maxAge: expiresIn, httpOnly: true, secure: true, path: "/" };
    cookies.set("__session", cookie, options);
    return json({ status: "signedIn" });
  } else {
    throw error(401, "Recent sign in required!");
  }
};
const DELETE = async ({ cookies }) => {
  cookies.delete("__session", { path: "/" });
  return json({ status: "signedOut" });
};
export {
  DELETE,
  POST
};
//# sourceMappingURL=_server.ts.js.map
