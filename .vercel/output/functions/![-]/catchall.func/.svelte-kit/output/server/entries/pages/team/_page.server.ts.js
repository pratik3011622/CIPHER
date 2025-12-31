;
!function() {
  try {
    var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {}, n = new e.Error().stack;
    n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "db4a3067-4928-43e0-a97d-9a04b7c17c78", e._sentryDebugIdIdentifier = "sentry-dbid-db4a3067-4928-43e0-a97d-9a04b7c17c78");
  } catch (e2) {
  }
}();
import { redirect } from "@sveltejs/kit";
import "../../../chunks/_sentry-release-injection-file.js";
const load = async ({ locals, params }) => {
  console.log("locals", locals);
  if (locals.userTeam === void 0 || locals.userTeam === null) return redirect(302, "/ready");
  return locals;
};
export {
  load
};
//# sourceMappingURL=_page.server.ts.js.map
