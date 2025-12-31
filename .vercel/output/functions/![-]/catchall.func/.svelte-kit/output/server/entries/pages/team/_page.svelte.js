;
!function() {
  try {
    var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {}, n = new e.Error().stack;
    n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "4f41f562-70e0-4ea3-a2a2-a4597ca0747b", e._sentryDebugIdIdentifier = "sentry-dbid-4f41f562-70e0-4ea3-a2a2-a4597ca0747b");
  } catch (e2) {
  }
}();
import { c as create_ssr_component, v as validate_component, b as escape, e as each } from "../../../chunks/ssr.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/state.svelte.js";
import "../../../chunks/FlatToast.svelte_svelte_type_style_lang.js";
import "../../../chunks/_sentry-release-injection-file.js";
import "firebase/auth";
import "firebase/firestore";
import { D as Doc } from "../../../chunks/Doc.js";
import "firebase/storage";
import "firebase/analytics";
import "firebase/database";
import { B as Button } from "../../../chunks/Button.js";
import { I as Icon } from "../../../chunks/Icon.js";
const Hammer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "m15 12-8.373 8.373a1 1 0 1 1-3-3L12 9"
      }
    ],
    ["path", { "d": "m18 15 4-4" }],
    [
      "path",
      {
        "d": "m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172V7l-2.26-2.26a6 6 0 0 0-4.202-1.756L9 2.96l.92.82A6.18 6.18 0 0 1 12 8.4V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "hammer" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let clicked = false;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  return `<title data-svelte-h="svelte-19pr87y">Cipher Saga 2.0 - Your Team</title> <h2 class="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text py-4 text-center text-3xl font-medium tracking-tight text-transparent" data-svelte-h="svelte-70pota">Your team</h2> ${validate_component(Doc, "Doc").$$render($$result, { ref: `teams/${data.userTeam}` }, {}, {
    "loading ": () => {
      return `<span class="loading loading-ring loading-xl" slot="loading "></span>`;
    },
    default: ({ data: data2 }) => {
      return `<center><p class="relative z-10 bg-gradient-to-b from-neutral-200 to-primary bg-clip-text text-center font-sans text-6xl font-bold text-transparent pb-[1vh]">${escape(data2.teamName)}</p> ${validate_component(Button, "Button").$$render(
        $$result,
        {
          borderRadius: "0.75rem",
          className: "bg-white-300 text-white border-slate-800 text-lg font-medium font-mono",
          onClick: () => {
            navigator.clipboard.writeText(data2.code);
            clicked = true;
            setTimeout(
              () => {
                clicked = false;
              },
              2e3
            );
          }
        },
        {},
        {
          default: () => {
            return `${clicked ? `Copied!` : `${escape(data2.code)}`}`;
          }
        }
      )}   </center> <center><p class="text-lg mt-4 font-medium text-primary font-sans">Level ${escape(data2.level)} • Members ${escape(data2.members.length)}/3</p></center> <center>        <div class="w-[50%]"><div class="overflow-x-auto">${each(data2.members, (member) => {
        return `${validate_component(Doc, "Doc").$$render($$result, { ref: `users/${member}` }, {}, {
          default: ({ data: data22 }) => {
            return `<p class="mt-2 font-medium text-xl">${escape(data22.username)} ${data2.owner === member ? `👑` : ``}</p> `;
          }
        })}`;
      })}</div></div> ${!data2.banned ? `<button class="btn btn-wide mt-10 btn-outline btn-primary" ${""}>Leave team</button>` : `<button class="text-xl mt-4 font-bold btn btn-ghost text-primary">${validate_component(Hammer, "Hammer").$$render($$result, {}, {}, {})} Your team was banned by an admin</button>`}</center>`;
    }
  })}`;
});
export {
  Page as default
};
//# sourceMappingURL=_page.svelte.js.map
