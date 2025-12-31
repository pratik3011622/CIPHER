;
!function() {
  try {
    var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {}, n = new e.Error().stack;
    n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "2c992680-80c3-4566-9805-7714d33acec1", e._sentryDebugIdIdentifier = "sentry-dbid-2c992680-80c3-4566-9805-7714d33acec1");
  } catch (e2) {
  }
}();
import { o as onMount } from "./ssr2.js";
import "@sveltejs/kit/internal/server";
const is_legacy = onMount.toString().includes("$$") || /function \w+\(\) \{\}/.test(onMount.toString());
if (is_legacy) {
  ({
    data: {},
    form: null,
    error: null,
    params: {},
    route: { id: null },
    state: {},
    status: -1,
    url: new URL("https://example.com")
  });
}
//# sourceMappingURL=state.svelte.js.map
