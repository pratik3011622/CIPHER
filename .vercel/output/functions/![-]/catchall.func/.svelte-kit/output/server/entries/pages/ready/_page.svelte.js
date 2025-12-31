;
!function() {
  try {
    var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {}, n = new e.Error().stack;
    n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "dd08e417-2675-4cb5-a3a4-a37d122c2dcd", e._sentryDebugIdIdentifier = "sentry-dbid-dd08e417-2675-4cb5-a3a4-a37d122c2dcd");
  } catch (e2) {
  }
}();
import { c as create_ssr_component, v as validate_component, f as compute_rest_props, h as spread, i as escape_attribute_value, j as escape_object, d as add_attribute, b as escape } from "../../../chunks/ssr.js";
import "clsx";
import "../../../chunks/_sentry-release-injection-file.js";
import "../../../chunks/FlatToast.svelte_svelte_type_style_lang.js";
import { I as Icon, a as Input } from "../../../chunks/Input.js";
import { c as cn } from "../../../chunks/utils2.js";
import "firebase/auth";
import "../../../chunks/firebase.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/state.svelte.js";
const Brand_google = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M20.945 11a9 9 0 1 1 -3.284 -5.997l-2.655 2.392a5.5 5.5 0 1 0 2.119 6.605h-4.125v-3h7.945z"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { type: "outline" }, { name: "brand-google" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Label = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["className"]);
  let { className = void 0 } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  return `<label${spread(
    [
      {
        class: escape_attribute_value(cn("text-sm font-medium leading-none text-black peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-white", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</label>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let accState;
  let progVal;
  let { data } = $$props;
  let username = "";
  let firstname = "";
  let lastname = "";
  let teamname = "";
  let teamcode = "";
  var AccountState = /* @__PURE__ */ ((AccountState2) => {
    AccountState2[AccountState2["GOOGLE_SIGN_IN"] = 0] = "GOOGLE_SIGN_IN";
    AccountState2[AccountState2["USERNAME_NAME"] = 1] = "USERNAME_NAME";
    AccountState2[AccountState2["TEAM_SELECT"] = 2] = "TEAM_SELECT";
    AccountState2[AccountState2["DONE"] = 3] = "DONE";
    return AccountState2;
  })(AccountState || {});
  const getAccountStateFromStatCode = (loc) => {
    const code = (loc.userID === null ? 0 : 1) + (loc.userExists === false ? 0 : 1) + (loc.userTeam === null || loc.userTeam === void 0 ? 0 : 1);
    if (code === 3) return 3;
    if (code === 1) return 1;
    if (code === 2) return 2;
    else return 0;
  };
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  accState = getAccountStateFromStatCode(data);
  progVal = accState === 0 ? 0 : accState === 1 ? 33.3 : accState === 2 ? 66.6 : 100;
  return `<title data-svelte-h="svelte-cvmgnx">Cipher Saga 2.0 - Ready</title>                    <h2 class="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text py-4 text-center text-7xl font-medium tracking-tight text-transparent" data-svelte-h="svelte-vi5y4s">Gear up hunters!</h2> <center><div class="${[
    "radial-progress font-mono",
    (progVal !== 100 ? "text-sky-500" : "") + " " + (progVal === 100 ? "text-success" : "")
  ].join(" ").trim()}"${add_attribute("style", `--value:${progVal};`, 0)} role="progressbar">${escape(progVal)}%</div></center> ${accState === AccountState.GOOGLE_SIGN_IN ? `<center><h2 class="font-sans text-4xl mt-4 mb-2" data-svelte-h="svelte-1hisuss">Create your account</h2> <p class="font-medium mb-4" data-svelte-h="svelte-1bbzkf9">Use your <b>GSV Email ID</b>. <br>If you don&#39;t have one, you can still play but you won&#39;t be considered for the prizes.</p> <button class="group/btn relative flex h-10 items-center justify-start space-x-2 rounded-md px-4 font-medium text-black shadow-input bg-zinc-900 shadow-[0px_0px_1px_1px_var(--neutral-800)] w-[50%]" style="z-index: 1;" ${""}>${validate_component(Brand_google, "IconBrandGoogle").$$render(
    $$result,
    {
      class: "h-4 w-4 text-neutral-800 dark:text-neutral-300"
    },
    {},
    {}
  )} <span class="text-sm text-neutral-700 dark:text-neutral-300" data-svelte-h="svelte-an73dw">Sign in with google</span> <span class="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100"></span> <span class="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100"></span></button></center>` : ``} ${accState === AccountState.USERNAME_NAME ? `<center><div class="w-[50%]"><div class="mb-4 flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0"><div${add_attribute("class", "flex w-full flex-col space-y-2", 0)} style="z-index: 1;">${validate_component(Label, "Label").$$render(
    $$result,
    {
      htmlFor: "firstname",
      style: "color:white!important"
    },
    {},
    {
      default: () => {
        return `First name`;
      }
    }
  )} ${validate_component(Input, "Input").$$render(
    $$result,
    {
      id: "firstname",
      placeholder: "First name",
      type: "text",
      onInput: (e) => {
        firstname = e.target.value.replace(/[^a-zA-Z]/g, "");
        e.target.value = firstname;
      }
    },
    {},
    {}
  )}</div> <div${add_attribute("class", "flex w-full flex-col space-y-2", 0)} style="z-index: 1;">${validate_component(Label, "Label").$$render(
    $$result,
    {
      htmlFor: "lastname",
      style: "color:white!important"
    },
    {},
    {
      default: () => {
        return `Last name`;
      }
    }
  )} ${validate_component(Input, "Input").$$render(
    $$result,
    {
      id: "lastname",
      placeholder: "Last name",
      type: "text",
      onInput: (e) => {
        lastname = e.target.value.replace(/[^a-zA-Z]/g, "");
        e.target.value = lastname;
      }
    },
    {},
    {}
  )}</div></div> <div class="mb-4 flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0"><div${add_attribute("class", "mb-4 flex w-full flex-col space-y-2", 0)} style="z-index: 1;">${validate_component(Label, "Label").$$render(
    $$result,
    {
      htmlFor: "email",
      style: "color:white!important"
    },
    {},
    {
      default: () => {
        return `Username`;
      }
    }
  )} ${validate_component(Input, "Input").$$render(
    $$result,
    {
      id: "email",
      placeholder: "Pseudonymous123",
      type: "text",
      onInput: (e) => {
        username = e.target.value.replace(/[^a-zA-Z0-9]/g, "");
        e.target.value = username;
      }
    },
    {},
    {}
  )}</div></div> <button class="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]" style="z-index: 1" ${""}>Next →
                  <span class="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100"></span> <span class="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100"></span></button></div></center>` : ``} ${accState === AccountState.TEAM_SELECT ? `<center><h2 class="font-sans text-4xl mt-4 mb-2" data-svelte-h="svelte-1kcnr2p">Team selection</h2> <p class="font-medium mb-4" data-svelte-h="svelte-r66lek">If you would like to play solo, create a team and don&#39;t add anyone to it.</p> <button class="relative btn btn-accent btn-wide z-20" data-svelte-h="svelte-1xfwek1">Create team</button> <button class="relative btn btn-secondary btn-wide z-20" data-svelte-h="svelte-1qzesur">Join team</button></center>` : ``} ${accState === AccountState.DONE ? `<center><h2 class="font-sans text-4xl mt-4 mb-4" data-svelte-h="svelte-1xk001g">You&#39;re all set</h2> <button class="relative z-20 mt-4 btn btn-wide btn-primary" data-svelte-h="svelte-ih4tst">Add to calendar</button> <button class="relative z-20 mt-4 btn btn-wide btn-accent" data-svelte-h="svelte-77a7s7">Join Discord</button>  <button class="relative z-20 mt-4 btn btn-wide btn-secondary" data-svelte-h="svelte-1jikft1">View team</button><br> <button class="z-20 mt-4 btn btn-wide btn-gray" data-svelte-h="svelte-12zn79d">Log out</button></center>` : ``}   <dialog id="create_team_modal" class="modal"><div class="modal-box"><form method="dialog"><button ${""} class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button></form> <h3 class="font-bold text-3xl text-accent mb-4" data-svelte-h="svelte-lgg84o">New team</h3> <div${add_attribute("class", "flex w-full flex-col space-y-2", 0)} style="z-index: 1;">${validate_component(Label, "Label").$$render($$result, { htmlFor: "teamname" }, {}, {
    default: () => {
      return `Team name`;
    }
  })} ${validate_component(Input, "Input").$$render(
    $$result,
    {
      id: "teamname",
      placeholder: "Cipher Saga Monarchs",
      type: "text",
      onInput: (e) => {
        teamname = e.target.value.replace(/[^a-zA-Z0-9 ]/g, "");
        e.target.value = teamname;
      }
    },
    {},
    {}
  )}</div> <button class="btn btn-accent btn-wide mt-4" ${""}>${`Create`}</button></div></dialog> <dialog id="join_team_modal" class="modal"><div class="modal-box"><form method="dialog"><button ${""} class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button></form> <h3 class="font-bold text-3xl text-secondary mb-4" data-svelte-h="svelte-1y21x6a">Join team</h3> <div${add_attribute("class", "flex w-full flex-col space-y-2", 0)} style="z-index: 1;">${validate_component(Label, "Label").$$render($$result, { htmlFor: "teamcode" }, {}, {
    default: () => {
      return `Team code`;
    }
  })} ${validate_component(Input, "Input").$$render(
    $$result,
    {
      id: "teamcode",
      placeholder: "abc1234",
      type: "text",
      onInput: (e) => {
        teamcode = e.target.value.replace(/[^a-zA-Z0-9]/g, "").substring(0, 8);
        e.target.value = teamcode;
      }
    },
    {},
    {}
  )}</div> <button class="btn btn-secondary btn-wide mt-4" ${""}>${`join`}</button></div></dialog>`;
});
export {
  Page as default
};
//# sourceMappingURL=_page.svelte.js.map
