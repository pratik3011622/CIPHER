;
!function() {
  try {
    var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {}, n = new e.Error().stack;
    n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "3302e170-bab7-4937-a1ab-48d61824ae8e", e._sentryDebugIdIdentifier = "sentry-dbid-3302e170-bab7-4937-a1ab-48d61824ae8e");
  } catch (e2) {
  }
}();
import { c as create_ssr_component, a as subscribe, o as onDestroy, d as add_attribute, p as add_styles, q as merge_ssr_styles, h as spread, v as validate_component, i as escape_attribute_value, j as escape_object } from "./ssr.js";
import { c as cn } from "./utils2.js";
import { w as writable } from "./index.js";
const MovingBorder = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let transform;
  let $$unsubscribe_progress;
  let { duration = 2e3 } = $$props;
  let { rx = "0" } = $$props;
  let { ry = "0" } = $$props;
  let pathElement;
  let progress = writable(0);
  $$unsubscribe_progress = subscribe(progress, (value) => value);
  let animationFrameId;
  onDestroy(() => {
    if (typeof cancelAnimationFrame === "function") {
      cancelAnimationFrame(animationFrameId);
    }
  });
  let x = 0;
  let y = 0;
  if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0) $$bindings.duration(duration);
  if ($$props.rx === void 0 && $$bindings.rx && rx !== void 0) $$bindings.rx(rx);
  if ($$props.ry === void 0 && $$bindings.ry && ry !== void 0) $$bindings.ry(ry);
  transform = `translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;
  $$unsubscribe_progress();
  return `<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" class="absolute h-full w-full" width="100%" height="100%"><rect fill="none" width="100%" height="100%"${add_attribute("rx", rx, 0)}${add_attribute("ry", ry, 0)}${add_attribute("this", pathElement, 0)}></rect></svg> <div${add_styles(merge_ssr_styles("position: absolute; top: 0; left: 0; display: inline-block;", { transform }))}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { borderRadius = "1.75rem" } = $$props;
  let { containerClassName = void 0 } = $$props;
  let { borderClassName = void 0 } = $$props;
  let { duration = 2e3 } = $$props;
  let { className = void 0 } = $$props;
  let { onClick = void 0 } = $$props;
  if ($$props.borderRadius === void 0 && $$bindings.borderRadius && borderRadius !== void 0) $$bindings.borderRadius(borderRadius);
  if ($$props.containerClassName === void 0 && $$bindings.containerClassName && containerClassName !== void 0) $$bindings.containerClassName(containerClassName);
  if ($$props.borderClassName === void 0 && $$bindings.borderClassName && borderClassName !== void 0) $$bindings.borderClassName(borderClassName);
  if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0) $$bindings.duration(duration);
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  if ($$props.onClick === void 0 && $$bindings.onClick && onClick !== void 0) $$bindings.onClick(onClick);
  return `<button${spread(
    [
      {
        class: escape_attribute_value(cn("relative h-16 w-40  overflow-hidden bg-transparent p-[1px] text-xl ", containerClassName))
      },
      {
        style: escape_attribute_value(`border-radius: ${borderRadius};`)
      },
      escape_object($$props)
    ],
    {}
  )}><div class="absolute inset-0"${add_attribute("style", `border-radius: calc(${borderRadius} * 0.96);`, 0)}>${validate_component(MovingBorder, "MovingBorder").$$render($$result, { duration, rx: "30%", ry: "30%" }, {}, {
    default: () => {
      return `<div${add_attribute("class", cn("h-20 w-20 bg-[radial-gradient(#b840e0ff_40%,transparent_60%)] opacity-[0.8]", borderClassName), 0)}></div>`;
    }
  })}</div> <div${add_attribute("class", cn("relative flex h-full w-full items-center justify-center border border-slate-800 bg-slate-900/[0.8] text-sm text-white antialiased backdrop-blur-xl", className), 0)}${add_attribute("style", `border-radius: calc(${borderRadius} * 0.96);`, 0)}>${slots.default ? slots.default({}) : ``}</div></button>`;
});
export {
  Button as B
};
//# sourceMappingURL=Button.js.map
