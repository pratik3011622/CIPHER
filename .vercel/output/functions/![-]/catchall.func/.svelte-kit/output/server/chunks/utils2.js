;
!function() {
  try {
    var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {}, n = new e.Error().stack;
    n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "59903010-4412-4f33-a178-bf03b3003eac", e._sentryDebugIdIdentifier = "sentry-dbid-59903010-4412-4f33-a178-bf03b3003eac");
  } catch (e2) {
  }
}();
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import "./_sentry-release-injection-file.js";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
export {
  cn as c
};
//# sourceMappingURL=utils2.js.map
