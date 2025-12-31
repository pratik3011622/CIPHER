;
!function() {
  try {
    var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {}, n = new e.Error().stack;
    n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "bc1e55b5-021c-4b06-b054-bf817cbbd28e", e._sentryDebugIdIdentifier = "sentry-dbid-bc1e55b5-021c-4b06-b054-bf817cbbd28e");
  } catch (e2) {
  }
}();
import "../../chunks/_sentry-release-injection-file.js";
const load = async ({ locals, params }) => {
  console.log("locals", locals);
  return locals;
};
export {
  load
};
//# sourceMappingURL=_layout.server.ts.js.map
