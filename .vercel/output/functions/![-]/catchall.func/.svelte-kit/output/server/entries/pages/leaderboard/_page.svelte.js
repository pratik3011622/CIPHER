;
!function() {
  try {
    var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {}, n = new e.Error().stack;
    n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "770e9903-b5af-426a-9906-93c39652165f", e._sentryDebugIdIdentifier = "sentry-dbid-770e9903-b5af-426a-9906-93c39652165f");
  } catch (e2) {
  }
}();
import { c as create_ssr_component, s as setContext, g as getContext, a as subscribe, e as each, v as validate_component, d as add_attribute, b as escape } from "../../../chunks/ssr.js";
import "clsx";
import "../../../chunks/_sentry-release-injection-file.js";
import { c as cn } from "../../../chunks/utils2.js";
import { P as PresenceContext, s as setDomContext, t as tick, S as SharedLayoutContext, i as isSharedLayout, m as motion } from "../../../chunks/motion.js";
import { w as writable } from "../../../chunks/index.js";
let presenceId = 0;
function getPresenceId() {
  const id = presenceId;
  presenceId++;
  return id;
}
function newChildrenMap() {
  return /* @__PURE__ */ new Map();
}
const PresenceChild = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { isPresent, onExitComplete = void 0, initial, custom = void 0, presenceAffectsLayout, isCustom } = $$props;
  const presenceChildren = new newChildrenMap();
  const id = getPresenceId();
  const memoContext = () => {
    return {
      id,
      initial,
      isPresent,
      custom,
      onExitComplete: (childId) => {
        presenceChildren.set(childId, true);
        let allComplete = true;
        presenceChildren.forEach((isComplete) => {
          if (!isComplete) allComplete = false;
        });
        allComplete && onExitComplete?.();
      },
      register: (childId) => {
        presenceChildren.set(childId, false);
        return () => presenceChildren.delete(childId);
      }
    };
  };
  let context = PresenceContext();
  const keyset = () => {
    presenceChildren.forEach((_, key) => presenceChildren.set(key, false));
  };
  setContext(PresenceContext, context);
  setDomContext("Presence", isCustom, context);
  if ($$props.isPresent === void 0 && $$bindings.isPresent && isPresent !== void 0) $$bindings.isPresent(isPresent);
  if ($$props.onExitComplete === void 0 && $$bindings.onExitComplete && onExitComplete !== void 0) $$bindings.onExitComplete(onExitComplete);
  if ($$props.initial === void 0 && $$bindings.initial && initial !== void 0) $$bindings.initial(initial);
  if ($$props.custom === void 0 && $$bindings.custom && custom !== void 0) $$bindings.custom(custom);
  if ($$props.presenceAffectsLayout === void 0 && $$bindings.presenceAffectsLayout && presenceAffectsLayout !== void 0) $$bindings.presenceAffectsLayout(presenceAffectsLayout);
  if ($$props.isCustom === void 0 && $$bindings.isCustom && isCustom !== void 0) $$bindings.isCustom(isCustom);
  {
    context.set(memoContext());
  }
  {
    keyset();
  }
  {
    tick().then(() => {
      !isPresent && !presenceChildren.size && onExitComplete?.();
    });
  }
  return `${slots.default ? slots.default({}) : ``}`;
});
function getChildKey(child) {
  return child.key || "";
}
const AnimatePresence = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isl;
  let forceRender;
  let $layoutContext, $$unsubscribe_layoutContext;
  let { list = void 0, custom = void 0, initial = true, onExitComplete = void 0, exitBeforeEnter = void 0, presenceAffectsLayout = true, show = void 0, isCustom = false } = $$props;
  let _list = list !== void 0 ? list : show ? [{ key: 1 }] : [];
  const layoutContext = getContext(SharedLayoutContext) || SharedLayoutContext(isCustom);
  $$unsubscribe_layoutContext = subscribe(layoutContext, (value) => $layoutContext = value);
  let isInitialRender = true;
  let filteredChildren = _list;
  let presentChildren = filteredChildren;
  let allChildren = /* @__PURE__ */ new Map();
  let exiting = /* @__PURE__ */ new Set();
  const updateChildLookup = (children, allChild) => {
    children.forEach((child) => {
      const key = getChildKey(child);
      allChild.set(key, child);
    });
  };
  let childrenToRender = [...filteredChildren.map((v) => ({ present: true, item: v, key: v.key }))];
  if ($$props.list === void 0 && $$bindings.list && list !== void 0) $$bindings.list(list);
  if ($$props.custom === void 0 && $$bindings.custom && custom !== void 0) $$bindings.custom(custom);
  if ($$props.initial === void 0 && $$bindings.initial && initial !== void 0) $$bindings.initial(initial);
  if ($$props.onExitComplete === void 0 && $$bindings.onExitComplete && onExitComplete !== void 0) $$bindings.onExitComplete(onExitComplete);
  if ($$props.exitBeforeEnter === void 0 && $$bindings.exitBeforeEnter && exitBeforeEnter !== void 0) $$bindings.exitBeforeEnter(exitBeforeEnter);
  if ($$props.presenceAffectsLayout === void 0 && $$bindings.presenceAffectsLayout && presenceAffectsLayout !== void 0) $$bindings.presenceAffectsLayout(presenceAffectsLayout);
  if ($$props.show === void 0 && $$bindings.show && show !== void 0) $$bindings.show(show);
  if ($$props.isCustom === void 0 && $$bindings.isCustom && isCustom !== void 0) $$bindings.isCustom(isCustom);
  _list = list !== void 0 ? list : show ? [{ key: 1 }] : [];
  isl = isSharedLayout($layoutContext);
  forceRender = () => {
    if (isl) {
      $layoutContext.forceUpdate();
    }
    _list = [..._list];
  };
  filteredChildren = _list;
  {
    updateChildLookup(filteredChildren, allChildren);
  }
  {
    if (!isInitialRender) {
      childrenToRender = [...filteredChildren.map((v) => ({ present: true, item: v, key: v.key }))];
      const presentKeys = presentChildren.map(getChildKey);
      const targetKeys = filteredChildren.map(getChildKey);
      const numPresent = presentKeys.length;
      for (let i = 0; i < numPresent; i++) {
        const key = presentKeys[i];
        if (targetKeys.indexOf(key) === -1) {
          exiting.add(key);
        } else {
          exiting.delete(key);
        }
      }
      if (exitBeforeEnter && exiting.size) {
        childrenToRender = [];
      }
      exiting.forEach((key) => {
        if (targetKeys.indexOf(key) !== -1) return;
        const child = allChildren.get(key);
        if (!child) return;
        const insertionIndex = presentKeys.indexOf(key);
        const onExit = () => {
          allChildren.delete(key);
          exiting.delete(key);
          const removeIndex = presentChildren.findIndex((presentChild) => presentChild.key === key);
          if (removeIndex < 0) {
            return;
          }
          presentChildren.splice(removeIndex, 1);
          if (!exiting.size) {
            presentChildren = [...filteredChildren];
            forceRender();
            onExitComplete && onExitComplete();
          }
        };
        childrenToRender.splice(insertionIndex, 0, {
          present: false,
          item: child,
          key: getChildKey(child),
          onExit
        });
      });
      presentChildren = childrenToRender;
    } else {
      isInitialRender = false;
    }
  }
  $$unsubscribe_layoutContext();
  return `${each(childrenToRender, (child) => {
    return `${validate_component(PresenceChild, "PresenceChild").$$render(
      $$result,
      {
        isPresent: child.present,
        initial: initial ? void 0 : false,
        custom: child.onExit ? custom : void 0,
        presenceAffectsLayout,
        onExitComplete: child.onExit,
        isCustom
      },
      {},
      {
        default: () => {
          return `${slots.default ? slots.default({ item: child.item }) : ``}`;
        }
      }
    )}`;
  })}`;
});
const Glow = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { delay } = $$props;
  let { className } = $$props;
  if ($$props.delay === void 0 && $$bindings.delay && delay !== void 0) $$bindings.delay(delay);
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  return `${validate_component(motion, "Motion").$$render(
    $$result,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 2, ease: "easeInOut", delay },
      exit: { opacity: 0 }
    },
    {},
    {
      default: ({ motion: motion2 }) => {
        return `<div${add_attribute("class", cn("absolute left-1/2 z-10 h-[4px] w-[4px] -translate-x-1/2 rounded-full bg-red-300 shadow-2xl shadow-blue-400 blur-[1px]", className), 0)}></div>`;
      }
    }
  )}`;
});
const Star = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { isGlowing } = $$props;
  let { delay } = $$props;
  if ($$props.isGlowing === void 0 && $$bindings.isGlowing && isGlowing !== void 0) $$bindings.isGlowing(isGlowing);
  if ($$props.delay === void 0 && $$bindings.delay && delay !== void 0) $$bindings.delay(delay);
  return `${validate_component(motion, "Motion").$$render(
    $$result,
    {
      initial: { scale: 1 },
      animate: {
        scale: isGlowing ? [1, 1.2, 2.5, 2.2, 1.5] : 1,
        background: isGlowing ? "#fff" : "#666"
      },
      transition: { duration: 2, ease: "easeInOut", delay }
    },
    {},
    {
      default: ({ motion: motion2 }) => {
        return `<div${add_attribute("class", cn("relative z-20 h-[1px] w-[1px] rounded-full bg-[#666]"), 0)}></div>`;
      }
    }
  )}`;
});
const stars = 108;
const columns = 18;
const Illustration = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_highlightedStars;
  let { glowColorClass } = $$props;
  let { mouseEnter } = $$props;
  let glowingStars = [];
  const highlightedStars = writable([]);
  $$unsubscribe_highlightedStars = subscribe(highlightedStars, (value) => value);
  if ($$props.glowColorClass === void 0 && $$bindings.glowColorClass && glowColorClass !== void 0) $$bindings.glowColorClass(glowColorClass);
  if ($$props.mouseEnter === void 0 && $$bindings.mouseEnter && mouseEnter !== void 0) $$bindings.mouseEnter(mouseEnter);
  $$unsubscribe_highlightedStars();
  return `<div class="h-48 w-full p-1"${add_attribute("style", `display: grid; grid-template-columns: repeat(${columns}, 1fr); gap: 1px;`, 0)}>${each([...Array(stars)], (star, starIdx) => {
    let isGlowing = glowingStars.includes(starIdx), delay = starIdx % 10 * 0.1, staticDelay = starIdx * 0.01;
    return `   <div class="relative flex items-center justify-center">${validate_component(Star, "Star").$$render(
      $$result,
      {
        isGlowing: mouseEnter ? true : isGlowing,
        delay: mouseEnter ? staticDelay : delay
      },
      {},
      {}
    )} ${mouseEnter ? `${validate_component(Glow, "Glow").$$render(
      $$result,
      {
        delay: staticDelay,
        className: glowColorClass
      },
      {},
      {}
    )}` : ``} ${validate_component(AnimatePresence, "AnimatePresence").$$render($$result, { show: true }, {}, {
      default: () => {
        return `${isGlowing ? `${validate_component(Glow, "Glow").$$render($$result, { delay, className: glowColorClass }, {}, {})}` : ``} `;
      }
    })} </div>`;
  })}</div>`;
});
const GlowingStarsBackgroundCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = void 0 } = $$props;
  let { bgColorclass } = $$props;
  let mouseEnter = false;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  if ($$props.bgColorclass === void 0 && $$bindings.bgColorclass && bgColorclass !== void 0) $$bindings.bgColorclass(bgColorclass);
  return `<div${add_attribute("class", cn("h-full max-h-[25rem] m-4 w-full max-w-[25vw] rounded-xl border border-[#eaeaea] bg-[linear-gradient(110deg,#333_0.6%,#222)] p-4 dark:border-neutral-600", className), 0)}><div class="flex items-center justify-center">${validate_component(Illustration, "Illustration").$$render($$result, { mouseEnter, glowColorClass: bgColorclass }, {}, {})}</div> <div class="px-2 pb-6">${slots.default ? slots.default({}) : ``}</div></div>`;
});
const GlowingStarsDescription = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = void 0 } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  return `<p${add_attribute("class", cn("max-w-[16rem] text-base text-white", className), 0)}>${slots.default ? slots.default({}) : ``}</p>`;
});
const GlowingStarsTitle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = void 0 } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  return `<h2${add_attribute("class", cn("text-2xl font-bold text-[#eaeaea]", className), 0)}>${slots.default ? slots.default({}) : ``}</h2>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let leaders = [];
  let rest = [];
  if (data.leaderboard.length > 3) {
    leaders = data.leaderboard.slice(0, 3);
    rest = data.leaderboard.slice(3);
  } else {
    leaders = data.leaderboard;
    rest = [];
  }
  const getBgColorFromPosition = (pos) => {
    switch (pos) {
      case 0:
        return "bg-[#FEE101]";
      case 1:
        return "bg-[#D7D7D7]";
      case 2:
        return "bg-[#A77044]";
      case 3:
        return "bg-[#FFFFFF]";
    }
  };
  const getTextColorFromPosition = (pos) => {
    switch (pos) {
      case 0:
        return "text-[#FEE101]";
      case 1:
        return "text-[#D7D7D7]";
      case 2:
        return "text-[#A77044]";
      case 3:
        return "text-[#FFFFFF]";
    }
  };
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  return `<title data-svelte-h="svelte-2qrtnd">Cipher Saga 2.0 - Leaderboard</title> <h2 class="mt-8 bg-gradient-to-br from-slate-300 to-primary bg-clip-text py-4 text-center text-7xl font-medium tracking-tight text-transparent" data-svelte-h="svelte-15ooszo">Leaderboard</h2> <center><div class="flex flex-wrap justify-center">${each(leaders, (team, teamPosition) => {
    return `${validate_component(GlowingStarsBackgroundCard, "GlowingStarsBackgroundCard").$$render(
      $$result,
      {
        bgColorclass: getBgColorFromPosition(teamPosition)
      },
      {},
      {
        default: () => {
          return `${validate_component(GlowingStarsTitle, "GlowingStarsTitle").$$render(
            $$result,
            {
              className: getTextColorFromPosition(teamPosition)
            },
            {},
            {
              default: () => {
                return `${escape(team.teamName)}`;
              }
            }
          )}  ${validate_component(GlowingStarsDescription, "GlowingStarsDescription").$$render(
            $$result,
            {
              className: `font-bold ${getTextColorFromPosition(teamPosition)}`
            },
            {},
            {
              default: () => {
                return `${escape(team.members)} member${team.members !== 1 ? `s` : ``} • ${escape(team.score)} points
                    `;
              }
            }
          )} `;
        }
      }
    )}`;
  })}</div></center> <center><div class="w-full max-w-[90%] md:w-[75%] overflow-x-auto"><table class="table table-auto w-full"> <thead data-svelte-h="svelte-1d9xpja"><tr><th>Position</th> <th>Name</th> <th>Members</th> <th>Score</th></tr></thead> <tbody>${each(rest, (team, teamIndex) => {
    return `<tr class="text-sm md:text-xl"><th class="font-mono">#${escape(teamIndex + 4)}</th> <td class="font-bold break-words max-w-[150px] whitespace-normal">${escape(team.teamName)} ${!team.gsv ? `<div class="badge badge-error badge-outline" data-svelte-h="svelte-34kbp8">Non-GSV</div>` : ``} ${team.teamName == "Organizers" ? `<div class="badge badge-success badge-outline" data-svelte-h="svelte-5luv3m">Event Heads</div>` : ``}</td> <td>${escape(team.members)}</td> <td>${escape(team.score)}</td> </tr>`;
  })}</tbody></table></div></center>`;
});
export {
  Page as default
};
//# sourceMappingURL=_page.svelte.js.map
