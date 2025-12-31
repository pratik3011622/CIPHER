;
!function() {
  try {
    var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {}, n = new e.Error().stack;
    n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "e727dbe8-60a7-43b7-b1d9-0984d1be747c", e._sentryDebugIdIdentifier = "sentry-dbid-e727dbe8-60a7-43b7-b1d9-0984d1be747c");
  } catch (e2) {
  }
}();
import "@sveltejs/kit";
import "../../../chunks/_sentry-release-injection-file.js";
const load = async ({ locals, params }) => {
  console.log("locals", locals);
  return locals;
};
export {
  load
};
//# sourceMappingURL=_page.server.ts.js.map
