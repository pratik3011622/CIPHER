;
!function() {
  try {
    var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {}, n = new e.Error().stack;
    n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "c6e8f145-1c32-4db1-b4b6-6de15062f351", e._sentryDebugIdIdentifier = "sentry-dbid-c6e8f145-1c32-4db1-b4b6-6de15062f351");
  } catch (e2) {
  }
}();
import { c as create_ssr_component, f as compute_rest_props, h as spread, e as each, j as escape_object, i as escape_attribute_value, v as validate_component } from "./ssr.js";
import { i as is_void } from "./FlatToast.svelte_svelte_type_style_lang.js";
import { c as cn } from "./utils2.js";
import { a as motionValue, m as motion } from "./motion.js";
import sync from "framesync";
const useCombineMotionValues = (values, combineValues) => {
  let subscriptions = [];
  let vals = values;
  const unsubscribe = () => {
    subscriptions.forEach((unsubscribe2) => unsubscribe2());
  };
  const subscribe = () => {
    subscriptions = vals.map((val) => val.onChange(handler));
    updateValue();
  };
  const value = motionValue(combineValues(), () => {
    unsubscribe();
    subscribe();
    return unsubscribe;
  });
  let updateValue = () => {
    value.set(combineValues());
  };
  const handler = () => {
    sync.update(updateValue, false, true);
  };
  value.reset = (_values, _combineValues) => {
    vals = _values;
    unsubscribe();
    updateValue = () => {
      value.set(_combineValues());
    };
    subscribe();
  };
  return value;
};
const useMotionTemplate = (fragments, ...values) => {
  let numFragments = fragments.length;
  const buildValue = () => {
    let output = ``;
    for (let i = 0; i < numFragments; i++) {
      output += fragments[i];
      const value2 = values[i];
      if (value2) output += values[i].get();
    }
    return output;
  };
  const value = useCombineMotionValues(values, buildValue);
  value.resetInner = value.reset;
  value.reset = (f, ...vs) => {
    numFragments = f.length;
    value.resetInner(vs, buildValue);
  };
  return value;
};
const defaultAttributes = {
  outline: {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": 2,
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  },
  filled: {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    stroke: "none"
  }
};
const Icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["type", "name", "color", "size", "stroke", "iconNode"]);
  let { type } = $$props;
  let { name } = $$props;
  let { color = "currentColor" } = $$props;
  let { size = 24 } = $$props;
  let { stroke = 2 } = $$props;
  let { iconNode } = $$props;
  if ($$props.type === void 0 && $$bindings.type && type !== void 0) $$bindings.type(type);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0) $$bindings.name(name);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.stroke === void 0 && $$bindings.stroke && stroke !== void 0) $$bindings.stroke(stroke);
  if ($$props.iconNode === void 0 && $$bindings.iconNode && iconNode !== void 0) $$bindings.iconNode(iconNode);
  return `<svg${spread(
    [
      escape_object(defaultAttributes[type]),
      escape_object($$restProps),
      { width: escape_attribute_value(size) },
      { height: escape_attribute_value(size) },
      {
        class: escape_attribute_value(`tabler-icon tabler-icon-${name} ${$$props.class ?? ""}`)
      },
      escape_object(type === "filled" ? { fill: color } : { "stroke-width": stroke, stroke: color })
    ],
    {}
  )}>${each(iconNode, ([tag, attrs]) => {
    return `${((tag$1) => {
      return tag$1 ? `<${tag}${spread([escape_object(attrs)], {})}>${is_void(tag$1) ? "" : ``}${is_void(tag$1) ? "" : `</${tag$1}>`}` : "";
    })(tag)}`;
  })}${slots.default ? slots.default({}) : ``}</svg>`;
});
const Input = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["className", "type", "onInput"]);
  let { className = void 0 } = $$props;
  let { type = "text" } = $$props;
  let { onInput = () => {
  } } = $$props;
  let mouseX = motionValue(0);
  let mouseY = motionValue(0);
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0) $$bindings.type(type);
  if ($$props.onInput === void 0 && $$bindings.onInput && onInput !== void 0) $$bindings.onInput(onInput);
  return `${validate_component(motion, "Motion").$$render(
    $$result,
    {
      style: {
        background: useMotionTemplate`
  radial-gradient(
    '0px' circle at ${mouseX}px ${mouseY}px,
    var(--blue-500),
    transparent 80%
  )
`
      }
    },
    {},
    {
      default: ({ motion: motion2 }) => {
        return `<div class="group/input rounded-lg p-[2px] transition duration-300"><input${spread(
          [
            { type: escape_attribute_value(type) },
            {
              class: escape_attribute_value(cn(
                `dark:placeholder-text-neutral-600 duration-400 flex h-10 w-full rounded-md border-none bg-gray-50 px-3 py-2 text-sm text-black shadow-input  transition file:border-0
        file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400
        focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 disabled:cursor-not-allowed
         disabled:opacity-50 group-hover/input:shadow-none
         dark:bg-zinc-800
         dark:text-white dark:shadow-[0px_0px_1px_1px_var(--neutral-700)] dark:focus-visible:ring-neutral-600
         `,
                className
              ))
            },
            escape_object($$restProps)
          ],
          {}
        )}></div>`;
      }
    }
  )}`;
});
export {
  Icon as I,
  Input as a
};
//# sourceMappingURL=Input.js.map
