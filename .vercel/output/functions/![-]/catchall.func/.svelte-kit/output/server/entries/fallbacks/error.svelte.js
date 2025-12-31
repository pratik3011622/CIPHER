;
!function() {
  try {
    var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {}, n = new e.Error().stack;
    n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "d2566d70-c4db-4edf-9e4c-8ed85542047a", e._sentryDebugIdIdentifier = "sentry-dbid-d2566d70-c4db-4edf-9e4c-8ed85542047a");
  } catch (e2) {
  }
}();
import { c as create_ssr_component, a as subscribe, b as escape } from "../../chunks/ssr.js";
import { p as page } from "../../chunks/stores.js";
const Error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `<h1>${escape($page.status)}</h1> <p>${escape($page.error?.message)}</p>`;
});
export {
  Error as default
};
//# sourceMappingURL=error.svelte.js.map
