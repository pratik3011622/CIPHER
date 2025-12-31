;
!function() {
  try {
    var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {}, n = new e.Error().stack;
    n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "05ad274c-34c8-4374-b156-c4d79766aa9d", e._sentryDebugIdIdentifier = "sentry-dbid-05ad274c-34c8-4374-b156-c4d79766aa9d");
  } catch (e2) {
  }
}();
var _global = typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : {};
_global.SENTRY_RELEASE = { id: "ff93efcdb1359983c58ad901fdbd387d2c18a346" };
//# sourceMappingURL=_sentry-release-injection-file.js.map
