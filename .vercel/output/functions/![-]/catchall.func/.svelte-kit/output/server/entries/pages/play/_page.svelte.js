;
!function() {
  try {
    var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {}, n = new e.Error().stack;
    n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "04c4f973-2eef-4418-9961-1fd099907b69", e._sentryDebugIdIdentifier = "sentry-dbid-04c4f973-2eef-4418-9961-1fd099907b69");
  } catch (e2) {
  }
}();
import { c as create_ssr_component, v as validate_component, a as subscribe, b as escape, e as each, d as add_attribute } from "../../../chunks/ssr.js";
import "firebase/auth";
import "firebase/firestore";
import { D as Doc } from "../../../chunks/Doc.js";
import "firebase/storage";
import "firebase/analytics";
import "firebase/database";
import { I as Icon$1, a as Input } from "../../../chunks/Input.js";
import "clsx";
import "../../../chunks/_sentry-release-injection-file.js";
import "../../../chunks/FlatToast.svelte_svelte_type_style_lang.js";
import { p as page } from "../../../chunks/stores.js";
import { A as Arrow_up_right } from "../../../chunks/arrow-up-right.js";
import { I as Icon } from "../../../chunks/Icon.js";
const Arrow_left = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "m12 19-7-7 7-7" }], ["path", { "d": "M19 12H5" }]];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "arrow-left" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Arrow_right = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "M5 12h14" }], ["path", { "d": "m12 5 7 7-7 7" }]];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "arrow-right" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Circle_check_big = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M22 11.08V12a10 10 0 1 1-5.93-9.14"
      }
    ],
    ["path", { "d": "m9 11 3 3L22 4" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "circle-check-big" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Circle_x = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["circle", { "cx": "12", "cy": "12", "r": "10" }],
    ["path", { "d": "m15 9-6 6" }],
    ["path", { "d": "m9 9 6 6" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "circle-x" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const List = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "line",
      {
        "x1": "8",
        "x2": "21",
        "y1": "6",
        "y2": "6"
      }
    ],
    [
      "line",
      {
        "x1": "8",
        "x2": "21",
        "y1": "12",
        "y2": "12"
      }
    ],
    [
      "line",
      {
        "x1": "8",
        "x2": "21",
        "y1": "18",
        "y2": "18"
      }
    ],
    [
      "line",
      {
        "x1": "3",
        "x2": "3.01",
        "y1": "6",
        "y2": "6"
      }
    ],
    [
      "line",
      {
        "x1": "3",
        "x2": "3.01",
        "y1": "12",
        "y2": "12"
      }
    ],
    [
      "line",
      {
        "x1": "3",
        "x2": "3.01",
        "y1": "18",
        "y2": "18"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "list" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Lock = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "rect",
      {
        "width": "18",
        "height": "11",
        "x": "3",
        "y": "11",
        "rx": "2",
        "ry": "2"
      }
    ],
    ["path", { "d": "M7 11V7a5 5 0 0 1 10 0v4" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "lock" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Coins = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M9 14c0 1.657 2.686 3 6 3s6 -1.343 6 -3s-2.686 -3 -6 -3s-6 1.343 -6 3z"
      }
    ],
    [
      "path",
      {
        "d": "M9 14v4c0 1.656 2.686 3 6 3s6 -1.344 6 -3v-4"
      }
    ],
    [
      "path",
      {
        "d": "M3 6c0 1.072 1.144 2.062 3 2.598s4.144 .536 6 0c1.856 -.536 3 -1.526 3 -2.598c0 -1.072 -1.144 -2.062 -3 -2.598s-4.144 -.536 -6 0c-1.856 .536 -3 1.526 -3 2.598z"
      }
    ],
    ["path", { "d": "M3 6v10c0 .888 .772 1.45 2 2" }],
    ["path", { "d": "M3 11c0 .888 .772 1.45 2 2" }]
  ];
  return `${validate_component(Icon$1, "Icon").$$render($$result, Object.assign({}, { type: "outline" }, { name: "coins" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Users = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"
      }
    ],
    [
      "path",
      {
        "d": "M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"
      }
    ],
    ["path", { "d": "M16 3.13a4 4 0 0 1 0 7.75" }],
    ["path", { "d": "M21 21v-2a4 4 0 0 0 -3 -3.85" }]
  ];
  return `${validate_component(Icon$1, "Icon").$$render($$result, Object.assign({}, { type: "outline" }, { name: "users" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let currQuestionData;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let answer = "";
  let { data } = $$props;
  let questions = data.questions;
  let currQuestion = 0;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  currQuestionData = questions[currQuestion];
  $$unsubscribe_page();
  return `<title data-svelte-h="svelte-1i6xwns">Cipher Saga 2.0 - Play</title> ${questions.length > 0 ? `${validate_component(Doc, "Doc").$$render($$result, { ref: `/teams/${data.locals.userTeam}` }, {}, {
    loading: () => {
      return `<p slot="loading" class="loading"></p>`;
    },
    default: ({ data: teamData }) => {
      return `<div class="navbar"><a class="${[
        "btn btn-ghost text-md",
        $page.url.pathname === "/" ? "text-primary" : ""
      ].join(" ").trim()}" href="/">${validate_component(Arrow_up_right, "ArrowUpRight").$$render($$result, {}, {}, {})} Home</a> <button class="btn btn-square" ${"disabled"}>${validate_component(Arrow_left, "ArrowLeft").$$render($$result, {}, {}, {})}</button> <a class="${[
        "btn btn-ghost text-xl",
        (teamData.completed_levels || []).includes(currQuestionData.uid) ? "text-primary" : ""
      ].join(" ").trim()}">Level ${escape(questions[currQuestion].level)}/${escape(questions.length)}</a> <button class="btn btn-square mr-4" ${currQuestion === questions.length - 1 || !(teamData.completed_levels || []).includes(currQuestionData.uid) ? "disabled" : ""}>${!(teamData.completed_levels || []).includes(currQuestionData.uid) ? `${validate_component(Lock, "Lock").$$render($$result, {}, {}, {})}` : `${validate_component(Arrow_right, "ArrowRight").$$render($$result, {}, {}, {})}`}</button> <button class="btn btn-ghost mr-4">${validate_component(Users, "IconUsers").$$render($$result, {}, {}, {})} ${escape(teamData.teamName)}</button> <button class="btn btn-ghost mr-4">${validate_component(Coins, "IconCoins").$$render($$result, {}, {}, {})} ${escape((teamData.level || 1) * 100 - 100)}</button> <button class="btn btn-ghost">${validate_component(List, "List").$$render($$result, {}, {}, {})}
                Prev Answers</button></div> <center><p class="text-4xl mb-4">${escape(currQuestionData.prompt)}</p> ${currQuestionData.files.length !== 0 ? `<div><p class="text-lg font-medium" data-svelte-h="svelte-1bguj6">Files</p> ${each(currQuestionData.files, (f) => {
        return `<span class="link link-primary">${escape(f.name)}</span>`;
      })}</div>` : ``} ${currQuestionData.images.length !== 0 ? `<p class="text-lg font-medium mt-4 mb-2" data-svelte-h="svelte-14rj7u7">Images</p> <center class="mb-4"><div class="flex justify-center flex-row h-60">${each(currQuestionData.images, (i) => {
        return `<img class="mr-2 ml-2 rounded-lg"${add_attribute("src", i, 0)}>`;
      })}</div></center>` : ``} ${!(teamData.completed_levels || []).includes(currQuestionData.uid) ? `<div class="w-[50%] mb-4">${validate_component(Input, "Input").$$render(
        $$result,
        {
          id: "answer",
          placeholder: "...",
          type: "text",
          onInput: (e) => {
            answer = e.target.value.replace(/[^a-z]/g, "");
            e.target.value = answer;
          }
        },
        {},
        {}
      )}</div> <button class="btn btn-wide btn-primary" ${""}>${`Submit`}</button>` : `<button class="btn btn-wide btn-success">${validate_component(Circle_check_big, "CheckCircleIcon").$$render($$result, { color: "#000000" }, {}, {})}</button>`}</center>`;
    }
  })}` : `You cannot view this right now.`} <dialog id="logsModal" class="modal"><div class="modal-box"><form method="dialog" data-svelte-h="svelte-vimr3z"><button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button></form> ${validate_component(Doc, "Doc").$$render($$result, { ref: `/logs/${data.locals.userTeam}` }, {}, {
    loading: () => {
      return `<p slot="loading" class="loading"></p>`;
    },
    default: ({ data: logData }) => {
      return `${each(logData.logs, (log) => {
        return `${log.type === "correct_answer" ? `<button class="btn btn-ghost">${validate_component(Circle_check_big, "CheckCircleIcon").$$render($$result, { class: "text-success" }, {}, {})} ${escape(log.entered)} </button><br>` : `<button class="btn btn-ghost">${validate_component(Circle_x, "CircleXIcon").$$render($$result, { class: "text-secondary" }, {}, {})} ${escape(log.entered)} </button><br>`}`;
      })}`;
    }
  })}</div></dialog>`;
});
export {
  Page as default
};
//# sourceMappingURL=_page.svelte.js.map
