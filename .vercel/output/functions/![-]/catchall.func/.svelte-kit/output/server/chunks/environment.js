;
!function() {
  try {
    var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {}, n = new e.Error().stack;
    n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "20c9cef3-83e4-444c-91b3-ffa5e0f9eacb", e._sentryDebugIdIdentifier = "sentry-dbid-20c9cef3-83e4-444c-91b3-ffa5e0f9eacb");
  } catch (e2) {
  }
}();
let base = "";
let assets = base;
const app_dir = "_app";
const relative = true;
const initial = { base, assets };
function override(paths) {
  base = paths.base;
  assets = paths.assets;
}
function reset() {
  base = initial.base;
  assets = initial.assets;
}
function set_assets(path) {
  assets = initial.assets = path;
}
let prerendering = false;
function set_building() {
}
function set_prerendering() {
  prerendering = true;
}
export {
  assets as a,
  base as b,
  app_dir as c,
  reset as d,
  set_building as e,
  set_prerendering as f,
  override as o,
  prerendering as p,
  relative as r,
  set_assets as s
};
//# sourceMappingURL=environment.js.map
