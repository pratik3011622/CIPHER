;
!function() {
  try {
    var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {}, n = new e.Error().stack;
    n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "34c710f1-02f0-444f-9252-36369ecc0002", e._sentryDebugIdIdentifier = "sentry-dbid-34c710f1-02f0-444f-9252-36369ecc0002");
  } catch (e2) {
  }
}();
import { c as create_ssr_component, d as add_attribute, e as each, v as validate_component, b as escape } from "../../chunks/ssr.js";
import { c as cn } from "../../chunks/utils2.js";
import { m as motion } from "../../chunks/motion.js";
import "../../chunks/_sentry-release-injection-file.js";
import { B as Button } from "../../chunks/Button.js";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration.js";
import utc from "dayjs/plugin/utc.js";
import tz from "dayjs/plugin/timezone.js";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
const BackgroundBeams = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = void 0 } = $$props;
  const paths = [
    "M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875",
    "M-373 -197C-373 -197 -305 208 159 335C623 462 691 867 691 867",
    "M-366 -205C-366 -205 -298 200 166 327C630 454 698 859 698 859",
    "M-359 -213C-359 -213 -291 192 173 319C637 446 705 851 705 851",
    "M-352 -221C-352 -221 -284 184 180 311C644 438 712 843 712 843",
    "M-345 -229C-345 -229 -277 176 187 303C651 430 719 835 719 835",
    "M-338 -237C-338 -237 -270 168 194 295C658 422 726 827 726 827",
    "M-331 -245C-331 -245 -263 160 201 287C665 414 733 819 733 819",
    "M-324 -253C-324 -253 -256 152 208 279C672 406 740 811 740 811",
    "M-317 -261C-317 -261 -249 144 215 271C679 398 747 803 747 803",
    "M-310 -269C-310 -269 -242 136 222 263C686 390 754 795 754 795",
    "M-303 -277C-303 -277 -235 128 229 255C693 382 761 787 761 787",
    "M-296 -285C-296 -285 -228 120 236 247C700 374 768 779 768 779",
    "M-289 -293C-289 -293 -221 112 243 239C707 366 775 771 775 771",
    "M-282 -301C-282 -301 -214 104 250 231C714 358 782 763 782 763",
    "M-275 -309C-275 -309 -207 96 257 223C721 350 789 755 789 755",
    "M-268 -317C-268 -317 -200 88 264 215C728 342 796 747 796 747",
    "M-261 -325C-261 -325 -193 80 271 207C735 334 803 739 803 739",
    "M-254 -333C-254 -333 -186 72 278 199C742 326 810 731 810 731",
    "M-247 -341C-247 -341 -179 64 285 191C749 318 817 723 817 723",
    "M-240 -349C-240 -349 -172 56 292 183C756 310 824 715 824 715",
    "M-233 -357C-233 -357 -165 48 299 175C763 302 831 707 831 707",
    "M-226 -365C-226 -365 -158 40 306 167C770 294 838 699 838 699",
    "M-219 -373C-219 -373 -151 32 313 159C777 286 845 691 845 691",
    "M-212 -381C-212 -381 -144 24 320 151C784 278 852 683 852 683",
    "M-205 -389C-205 -389 -137 16 327 143C791 270 859 675 859 675",
    "M-198 -397C-198 -397 -130 8 334 135C798 262 866 667 866 667",
    "M-191 -405C-191 -405 -123 0 341 127C805 254 873 659 873 659",
    "M-184 -413C-184 -413 -116 -8 348 119C812 246 880 651 880 651",
    "M-177 -421C-177 -421 -109 -16 355 111C819 238 887 643 887 643",
    "M-170 -429C-170 -429 -102 -24 362 103C826 230 894 635 894 635",
    "M-163 -437C-163 -437 -95 -32 369 95C833 222 901 627 901 627",
    "M-156 -445C-156 -445 -88 -40 376 87C840 214 908 619 908 619",
    "M-149 -453C-149 -453 -81 -48 383 79C847 206 915 611 915 611",
    "M-142 -461C-142 -461 -74 -56 390 71C854 198 922 603 922 603",
    "M-135 -469C-135 -469 -67 -64 397 63C861 190 929 595 929 595",
    "M-128 -477C-128 -477 -60 -72 404 55C868 182 936 587 936 587",
    "M-121 -485C-121 -485 -53 -80 411 47C875 174 943 579 943 579",
    "M-114 -493C-114 -493 -46 -88 418 39C882 166 950 571 950 571",
    "M-107 -501C-107 -501 -39 -96 425 31C889 158 957 563 957 563",
    "M-100 -509C-100 -509 -32 -104 432 23C896 150 964 555 964 555",
    "M-93 -517C-93 -517 -25 -112 439 15C903 142 971 547 971 547",
    "M-86 -525C-86 -525 -18 -120 446 7C910 134 978 539 978 539",
    "M-79 -533C-79 -533 -11 -128 453 -1C917 126 985 531 985 531",
    "M-72 -541C-72 -541 -4 -136 460 -9C924 118 992 523 992 523",
    "M-65 -549C-65 -549 3 -144 467 -17C931 110 999 515 999 515",
    "M-58 -557C-58 -557 10 -152 474 -25C938 102 1006 507 1006 507",
    "M-51 -565C-51 -565 17 -160 481 -33C945 94 1013 499 1013 499",
    "M-44 -573C-44 -573 24 -168 488 -41C952 86 1020 491 1020 491",
    "M-37 -581C-37 -581 31 -176 495 -49C959 78 1027 483 1027 483"
  ];
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  return `<div${add_attribute("class", cn("absolute  inset-0 flex h-full  w-full items-center justify-center [mask-repeat:no-repeat] [mask-size:40px]", className), 0)}><svg class="pointer-events-none absolute z-0 h-full w-full" width="100%" height="100%" viewBox="0 0 696 316" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875M-373 -197C-373 -197 -305 208 159 335C623 462 691 867 691 867M-366 -205C-366 -205 -298 200 166 327C630 454 698 859 698 859M-359 -213C-359 -213 -291 192 173 319C637 446 705 851 705 851M-352 -221C-352 -221 -284 184 180 311C644 438 712 843 712 843M-345 -229C-345 -229 -277 176 187 303C651 430 719 835 719 835M-338 -237C-338 -237 -270 168 194 295C658 422 726 827 726 827M-331 -245C-331 -245 -263 160 201 287C665 414 733 819 733 819M-324 -253C-324 -253 -256 152 208 279C672 406 740 811 740 811M-317 -261C-317 -261 -249 144 215 271C679 398 747 803 747 803M-310 -269C-310 -269 -242 136 222 263C686 390 754 795 754 795M-303 -277C-303 -277 -235 128 229 255C693 382 761 787 761 787M-296 -285C-296 -285 -228 120 236 247C700 374 768 779 768 779M-289 -293C-289 -293 -221 112 243 239C707 366 775 771 775 771M-282 -301C-282 -301 -214 104 250 231C714 358 782 763 782 763M-275 -309C-275 -309 -207 96 257 223C721 350 789 755 789 755M-268 -317C-268 -317 -200 88 264 215C728 342 796 747 796 747M-261 -325C-261 -325 -193 80 271 207C735 334 803 739 803 739M-254 -333C-254 -333 -186 72 278 199C742 326 810 731 810 731M-247 -341C-247 -341 -179 64 285 191C749 318 817 723 817 723M-240 -349C-240 -349 -172 56 292 183C756 310 824 715 824 715M-233 -357C-233 -357 -165 48 299 175C763 302 831 707 831 707M-226 -365C-226 -365 -158 40 306 167C770 294 838 699 838 699M-219 -373C-219 -373 -151 32 313 159C777 286 845 691 845 691M-212 -381C-212 -381 -144 24 320 151C784 278 852 683 852 683M-205 -389C-205 -389 -137 16 327 143C791 270 859 675 859 675M-198 -397C-198 -397 -130 8 334 135C798 262 866 667 866 667M-191 -405C-191 -405 -123 0 341 127C805 254 873 659 873 659M-184 -413C-184 -413 -116 -8 348 119C812 246 880 651 880 651M-177 -421C-177 -421 -109 -16 355 111C819 238 887 643 887 643M-170 -429C-170 -429 -102 -24 362 103C826 230 894 635 894 635M-163 -437C-163 -437 -95 -32 369 95C833 222 901 627 901 627M-156 -445C-156 -445 -88 -40 376 87C840 214 908 619 908 619M-149 -453C-149 -453 -81 -48 383 79C847 206 915 611 915 611M-142 -461C-142 -461 -74 -56 390 71C854 198 922 603 922 603M-135 -469C-135 -469 -67 -64 397 63C861 190 929 595 929 595M-128 -477C-128 -477 -60 -72 404 55C868 182 936 587 936 587M-121 -485C-121 -485 -53 -80 411 47C875 174 943 579 943 579M-114 -493C-114 -493 -46 -88 418 39C882 166 950 571 950 571M-107 -501C-107 -501 -39 -96 425 31C889 158 957 563 957 563M-100 -509C-100 -509 -32 -104 432 23C896 150 964 555 964 555M-93 -517C-93 -517 -25 -112 439 15C903 142 971 547 971 547M-86 -525C-86 -525 -18 -120 446 7C910 134 978 539 978 539M-79 -533C-79 -533 -11 -128 453 -1C917 126 985 531 985 531M-72 -541C-72 -541 -4 -136 460 -9C924 118 992 523 992 523M-65 -549C-65 -549 3 -144 467 -17C931 110 999 515 999 515M-58 -557C-58 -557 10 -152 474 -25C938 102 1006 507 1006 507M-51 -565C-51 -565 17 -160 481 -33C945 94 1013 499 1013 499M-44 -573C-44 -573 24 -168 488 -41C952 86 1020 491 1020 491M-37 -581C-37 -581 31 -176 495 -49C959 78 1027 483 1027 483M-30 -589C-30 -589 38 -184 502 -57C966 70 1034 475 1034 475M-23 -597C-23 -597 45 -192 509 -65C973 62 1041 467 1041 467M-16 -605C-16 -605 52 -200 516 -73C980 54 1048 459 1048 459M-9 -613C-9 -613 59 -208 523 -81C987 46 1055 451 1055 451M-2 -621C-2 -621 66 -216 530 -89C994 38 1062 443 1062 443M5 -629C5 -629 73 -224 537 -97C1001 30 1069 435 1069 435M12 -637C12 -637 80 -232 544 -105C1008 22 1076 427 1076 427M19 -645C19 -645 87 -240 551 -113C1015 14 1083 419 1083 419" stroke="url(#paint0_radial_242_278)" stroke-opacity="0.05" stroke-width="0.5"></path>${each(paths, (path, index) => {
    return `${validate_component(motion, "Motion").$$render($$result, { isSVG: true }, {}, {
      default: ({ motion: motion2 }) => {
        return `<path${add_attribute("d", path, 0)}${add_attribute("stroke", `url(#linearGradient-${index})`, 0)} stroke-opacity="0.4" stroke-width="0.5"></path> `;
      }
    })}`;
  })}<defs>${each(paths, (path, index) => {
    return `${validate_component(motion, "Motion").$$render(
      $$result,
      {
        isSVG: true,
        animate: {
          x1: ["0%", "100%"],
          x2: ["0%", "95%"],
          y1: ["0%", "100%"],
          y2: ["0%", `${93 + Math.random() * 8}%`]
        },
        transition: {
          duration: Math.random() * 10 + 10,
          ease: "easeInOut",
          repeat: Infinity,
          delay: Math.random() * 10
        }
      },
      {},
      {
        default: ({ motion: motion2 }) => {
          return `<linearGradient${add_attribute("id", `linearGradient-${index}`, 0)} x1="100%" x2="100%" y1="100%" y2="100%"><stop stop-color="#FFD700" stop-opacity="0"></stop><stop stop-color="##FFD700"></stop><stop offset="32.5%" stop-color="#FFD700"></stop><stop offset="100%" stop-color="#FFD700" stop-opacity="0"></stop></linearGradient> `;
        }
      }
    )}`;
  })}<radialGradient id="paint0_radial_242_278" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(352 34) rotate(90) scale(555 1560.62)"><stop offset="0.0666667" stop-color="var(--neutral-300)"></stop><stop offset="0.243243" stop-color="var(--neutral-300)"></stop><stop offset="0.43594" stop-color="white" stop-opacity="0"></stop></radialGradient></defs></svg></div>`;
});
const Countdown = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  dayjs.extend(duration);
  dayjs.extend(utc);
  dayjs.extend(tz);
  dayjs.extend(customParseFormat);
  let { from, dateFormat, zone } = $$props;
  let remaining = {
    years: 0,
    months: 0,
    weeks: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    done: true
  };
  if ($$props.from === void 0 && $$bindings.from && from !== void 0) $$bindings.from(from);
  if ($$props.dateFormat === void 0 && $$bindings.dateFormat && dateFormat !== void 0) $$bindings.dateFormat(dateFormat);
  if ($$props.zone === void 0 && $$bindings.zone && zone !== void 0) $$bindings.zone(zone);
  return `${slots.default ? slots.default({ remaining }) : ``}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let showRules = false;
  return `<title data-svelte-h="svelte-17ohhir">Cipher Saga 2.0 - Home</title> ${!showRules ? `<div class="relative flex h-screen w-full flex-col items-center justify-center rounded-md px-32 antialiased">${validate_component(BackgroundBeams, "BackgroundBeams").$$render($$result, {}, {}, {})} <div class="px-8 md:px-16 lg:px-32">${validate_component(Countdown, "Countdown").$$render(
    $$result,
    {
      from: "2025-03-18 23:59:00",
      dateFormat: "YYYY-MM-DD H:m:s",
      zone: "Asia/Kolkata"
    },
    {},
    {
      default: ({ remaining }) => {
        return `<p class="relative z-10 mx-auto my-2 max-w-lg text-center font-mono text-sm text-neutral-500">${escape(remaining.days)} days, ${escape(remaining.hours)} hours, ${escape(remaining.minutes)}
                    minutes, ${escape(remaining.seconds)} seconds</p>`;
      }
    }
  )} <h2 class="relative z-10 bg-gradient-to-b from-neutral-200 to-primary bg-clip-text text-center font-sans text-4xl md:text-6xl lg:text-7xl font-bold text-transparent" data-svelte-h="svelte-1lafiab">Cipher Saga 3.0</h2> <p></p> <p class="relative z-10 mx-auto my-2 max-w-lg text-center text-sm text-neutral-500" data-svelte-h="svelte-sr2alk">Where minds meet challenges<br>Think . Connect . Solve</p></div> <div style="align-items: center;justify-content: center;display: flex;" class="mt-6"><div>${validate_component(Button, "Button").$$render(
    $$result,
    {
      borderRadius: "0.75rem",
      className: "bg-white-300 text-white border-slate-800 text-sm font-bold",
      onClick: () => window.location.href = "/ready"
    },
    {},
    {
      default: () => {
        return `Let&#39;s Go`;
      }
    }
  )} ${validate_component(Button, "Button").$$render(
    $$result,
    {
      borderRadius: "0.75rem",
      className: "bg-white-300 text-white border-slate-800 text-sm font-bold",
      onClick: () => showRules = !showRules
    },
    {},
    {
      default: () => {
        return `Read Me`;
      }
    }
  )}</div></div></div>` : ``} ${showRules ? `<div class="relative flex h-screen w-full flex-col items-center justify-start rounded-md px-32 antialiased">${validate_component(BackgroundBeams, "BackgroundBeams").$$render($$result, {}, {}, {})} <div style="align-items: center;justify-content: center;display: flex;" class="mt-6"><div>${validate_component(Button, "Button").$$render(
    $$result,
    {
      borderRadius: "0.75rem",
      className: "bg-white-300 text-white border-slate-800 text-sm font-bold",
      onClick: () => showRules = !showRules
    },
    {},
    {
      default: () => {
        return `Take Me Back`;
      }
    }
  )}</div></div> <div style="align-items: center;justify-content: center;display: flex;" class="mt-6 pb-[3vh]" data-svelte-h="svelte-4nki9i"><div><div class="bg-white-300 text-white border-slate-800 border-2 text-sm w-[80vw] min-w-[80vw] max-w-[80vw] p-[5vh_10vw] rounded-[0.75rem]"><div class="pb-[3vh]"><h2 class="relative z-10 bg-gradient-to-b from-neutral-200 to-primary bg-clip-text text-center font-sans text-2xl font-bold text-transparent pb-[1vh]">What is Cipher Saga 2.0?</h2> <p class="relative z-10 text-justify text-sm text-neutral-400">Cipher Saga 2.0 is an online cryptic hunt event hosted
                            during EPITOME&#39;25, the annual techno-management fest of Gati Shakti Vishwavidyalaya.
                            Participants will team up to tackle a series of
                            challenging levels, deciphering clues and solving
                            riddles to progress. The event will test their wit,
                            collaboration, and problem-solving skills, which
                            will probably leave everyone thrilled and eager for
                            more.</p></div> <div class="pb-[3vh]"><h2 class="relative z-10 bg-gradient-to-b from-neutral-200 to-primary bg-clip-text text-center font-sans text-2xl font-bold text-transparent pb-[1vh]">What are cryptic hunts anyway?</h2> <p></p> <p class="relative z-10 text-justify text-sm text-neutral-400">A cryptic hunt is like a puzzle-solving game where
                            you solve riddles, clues, or challenges to move from
                            one hint to the next. Each clue usually leads to the
                            next clue, and the goal is to reach the final answer
                            of a level by decoding all the hints along the way.
                            It often involves thinking creatively, solving
                            wordplay, interpreting patterns, and sometimes even
                            searching online for hidden answers. It&#39;s a fun mix
                            of brain teasers, logic, and exploration. Cipher
                            coders, AI tools, QR codes, coding softwares, etc.
                            are all allowed and encouraged to be used.</p></div> <div class="pb-[3vh]"><h2 class="relative z-10 bg-gradient-to-b from-neutral-200 to-primary bg-clip-text text-center font-sans text-2xl font-bold text-transparent pb-[1vh]">How will winners be decided?</h2> <p class="relative z-10 text-justify text-sm text-neutral-400">Winners will be decided based on the leaderboard
                            standings at the end of the competition. The leaderboard ranks teams based on
                            how quickly they solve the puzzles, with teams that
                            solve earlier being placed higher. Accuracy is not a
                            criteria.</p></div> <div class="pb-[3vh]"><h2 class="relative z-10 bg-gradient-to-b from-neutral-200 to-primary bg-clip-text text-center font-sans text-2xl font-bold text-transparent pb-[1vh]">Rules</h2> <ul class="relative z-10 text-justify text-sm text-neutral-400 list-disc pl-5"><li>Make sure you have registered on the platform
                                using only your registered student email. If you
                                don&#39;t have one, you can still play but you won&#39;t
                                be considered for the prizes. Make sure you are
                                part of atleast one team.</li> <li>Make sure you have joined the <a href="https://discord.gg/Dm5zy3EaE4">Discord server</a> as well.</li> <li>Asking other players for hints or sharing
                                answers or hints among users via any medium is
                                strictly prohibited. If found, it will lead to
                                direct disqualification.</li> <li>Reverse engineering the platform means a direct
                                ban from the competition. Bugs, if found, should
                                be reported and not exploited. Exploiting a bug
                                also leads to disqualification.</li> <li>Obscene or offensive usernames and team names
                                are not allowed.</li> <li><b>Decisions by organizers are final and should
                                    not be questioned.</b></li> <li>By playing the game, you agree to adhere to all
                                the rules and guidelines.</li></ul></div> <div class="pb-[3vh]"><h2 class="relative z-10 bg-gradient-to-b from-neutral-200 to-primary bg-clip-text text-center font-sans text-2xl font-bold text-transparent pb-[1vh]">Guidelines</h2> <ul class="relative z-10 text-justify text-sm text-neutral-400 list-disc pl-5"><li>To report misconduct by any player, DM any
                                member of the team.</li> <li>All hints and lead confirmations will be done
                                via the <a href="https://discord.gg/Dm5zy3EaE4">official Discord server</a> only.</li> <li>You can always clear your doubts on the Discord
                                server. Be sure not to discuss answers or
                                question about answers in any way.</li> <li>Lead confirmations are short private yes/no
                                questions. You may ask leads about the level you
                                are on in the dedicated private channels on
                                Discord and organizers would respond with yes or
                                no. You get 3 leads per day per person by
                                default and this number is subject to change. Be
                                updated on Discord. Unused leads don&#39;t stack.
                                Unanswered leads can be changed. Confusing leads
                                will not be considered.</li> <li>And if it was not obvious, answer sharing, leads
                                sharing and cross teaming in general is not
                                allowed and any such evidence can lead to
                                disqualification.</li> <li>Unless otherwise stated, file passwords,
                                passkeys, etc. encountered in any level allow
                                all characters. So brute forcing won&#39;t help
                                much.</li></ul></div> <div class="pb-[4vh]"><h2 class="relative z-10 bg-gradient-to-b from-neutral-200 to-primary bg-clip-text text-center font-sans text-2xl font-bold text-transparent pb-[1vh]">Learning resources</h2> <p class="relative z-10 text-justify text-sm text-neutral-400 pb-[0.5vh]">Cryptic hunts generally revolve around tech, trivia,
                            and mostly anything you can find on the internet.
                            Googling is allowed and heavily encouraged, but it
                            won&#39;t directly get you the answer in most cases.
                            Think logically, make connections between different
                            parts of levels. Cryptic hunts are all about
                            connecting the dots and finding the solutions.</p> <p class="relative z-10 text-justify text-sm text-neutral-400 pb-[0.5vh]">Keep getting your leads confirmed from the
                            organizers. If you think you&#39;ve gotten stuck
                            somewhere, seek for hints on Discord. The levels
                            will basically consist of a set of clues, all which
                            link to ONE ANSWER. The difficulty is random. When
                            you get two or more clues, try to connect them and
                            find an interrelated clue from it. If you can&#39;t
                            figure out the hint, try breaking it down and
                            solving it in parts.</p> <p class="relative z-10 text-justify text-sm text-neutral-400 pb-[0.5vh]"><i>Note: Not all tools and approaches are listed
                                below. Read these to get you through some of the
                                levels. But tougher levels requires much more
                                brain power and tools not listed here may also
                                be used. Sky&#39;s truly the limit.</i></p> <ul class="relative z-10 text-justify text-sm text-neutral-400 list-disc pl-5 pb-[0.5vh]"><li><strong>Hunt&#39;s Site:</strong> Clues are sometimes
                                hidden in the hunt&#39;s rules and maybe even in the
                                event descriptions. The page title. The URL. Focus
                                on every word carefully as almost every hunt uses
                                a lot of wordplay.</li> <li><strong>Source Code:</strong> Look at the code comments.
                                There could be other links inside the code (This
                                especially helps in cases in which there aren&#39;t any
                                on-screen clues). You can even try using Inspect
                                Element (Ctrl+Shift+I) or Viewing Page Source (Ctrl+Shift+U).</li> <li><strong>Audio Files:</strong> Inspect the name, duration,
                                and content. Use spectrograms and tools like Audacity
                                or Sonic Visualizer for hidden text. Look for morse
                                code, binary, or locked files. Adjust the tempo or
                                format for clues.</li> <li><strong>Videos/GIFs:</strong> Focus on specific frames,
                                extract relevant audio, or slow down/speed up videos
                                to uncover clues. Visual or audio elements like morse/binary
                                code may be hidden.</li> <li><strong>Images:</strong> Check the image file name,
                                dimensions, and metadata for hidden strings or steganography.
                                Use tools like Aperisolve to detect and extract hidden
                                info by adjusting contrast or brightness.</li> <li><strong>Backlinks:</strong> If it looks like a completely
                                random string, try appending it to the end of common
                                URL patterns, like bit.ly/string, youtube.com/watch?v=string
                                etc. This is known as a backlink. Backlinks are key!
                                Use sites like imgur, pastebin, bit.ly, and tinyurl.
                                For encrypted pastebins, find the password clues.
                                Use a4x.me to identify backlinks when unsure.</li> <li><strong>Ciphers:</strong> Pay attention to ciphers,
                                such as Morse code, binary, or simple text substitutions
                                (like Caesar or Vigenère ciphers). The creators are
                                known to use a lot of ciphers, so expect clues to
                                be encoded in these forms, often hidden within clues
                                or images.</li> <li><strong>Geocodes:</strong> Sometimes, when there are random numbers on the screen, try using geocoding sites that can make you arrive at the next clue. Try puting those coordinates in Google maps or geocoding sites like geocode.xyz. Another site called geoapify.com can prove useful as well. Try lingering with the words and get to sites like what3words or any other popular and unique geocoding software.</li></ul> <p class="relative z-10 text-justify text-sm text-neutral-400">Keep experimenting, stay creative! All the best!</p></div> <div class="pb-[3vh]"><h2 class="relative z-10 bg-gradient-to-b from-neutral-200 to-primary bg-clip-text text-center font-sans text-3xl font-bold text-transparent pb-[1vh]">Our Team</h2></div> <div class="pb-[4vh]"><div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4"><div class="flex flex-col items-center"><a href=""><img src="https://i.ibb.co/whYZ0Ws3/Whats-App-Image-2025-03-13-at-9-40-35-PM.jpg" alt="Soham Wani" class="w-20 h-20 rounded-full mb-2 mx-auto object-cover"> <h2 class="relative z-10 bg-gradient-to-b from-neutral-200 to-primary bg-clip-text text-center font-sans text-xl font-bold text-transparent">Soham Wani</h2> <p class="relative z-10 text-center text-sm text-neutral-400 pb-[1vh]">(Event Head)</p></a></div> <div class="flex flex-col items-center"><a href="https://www.linkedin.com/in/shreya-mohanty-755529296/"><img src="https://i.ibb.co/d4v8xBmj/IMG-20250314-WA0093.jpg" alt="Shreya Mohanty" class="w-20 h-20 rounded-full mb-2 mx-auto object-cover"> <h2 class="relative z-10 bg-gradient-to-b from-neutral-200 to-primary bg-clip-text text-center font-sans text-xl font-bold text-transparent">Shreya Mohanty</h2> <p class="relative z-10 text-center text-sm text-neutral-400 pb-[1vh]">(Event Head)</p></a></div> <div class="flex flex-col items-center"><a href="https://www.linkedin.com/in/rishav-kumar-2399241ab/"><img src="https://i.ibb.co/tpyz2pZL/58198da2-d4f5-4e08-bbe8-085c751453ff.jpg" alt="Rishav Kumar" class="w-20 h-20 rounded-full mb-2 mx-auto object-cover"> <h2 class="relative z-10 bg-gradient-to-b from-neutral-200 to-primary bg-clip-text text-center font-sans text-xl font-bold text-transparent">Rishav Kumar</h2> <p class="relative z-10 text-center text-sm text-neutral-400 pb-[1vh]">(Volunteer)</p></a></div></div></div> <div class="pb-[3vh]"><h2 class="relative z-10 bg-gradient-to-b from-neutral-200 to-primary bg-clip-text text-center font-sans text-3xl font-bold text-transparent pb-[1vh]">Special Thanks</h2></div> <div class="pb-[4vh]"><div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4"><div class="flex flex-col items-center"><a href="https://www.linkedin.com/in/dr-anshika-srivastava-933bbb1b7/"><img src="https://i.ibb.co/NT1B7nJ/1703908262735.jpg" alt="Dr. Anshika Srivastava" class="w-20 h-20 rounded-full mb-2 mx-auto object-cover"> <h2 class="relative z-10 bg-gradient-to-b from-neutral-200 to-primary bg-clip-text text-center font-sans text-xl font-bold text-transparent">Dr. Anshika Srivastava</h2> <p class="relative z-10 text-center text-sm text-neutral-400 pb-[1vh]">(Faculty Advisor)</p></a></div> <div class="flex flex-col items-center"><a href="https://www.linkedin.com/in/dr-sonu-lamba-2a385694/"><img src="https://i.ibb.co/6cfXncPm/1736622240889.jpg" alt="Dr. Sonu Lamba" class="w-20 h-20 rounded-full mb-2 mx-auto object-cover"> <h2 class="relative z-10 bg-gradient-to-b from-neutral-200 to-primary bg-clip-text text-center font-sans text-xl font-bold text-transparent">Dr. Sonu Lamba</h2> <p class="relative z-10 text-center text-sm text-neutral-400 pb-[1vh]">(Faculty Advisor)</p></a></div> <div class="flex flex-col items-center"><a href=""><img src="https://i.ibb.co/qM2wVX1z/Logo.png" alt="TechnoCrats" class="w-20 h-20 rounded-full mb-2 mx-auto"> <h2 class="relative z-10 bg-gradient-to-b from-neutral-200 to-primary bg-clip-text text-center font-sans text-xl font-bold text-transparent">TechnoCrats</h2> <p class="relative z-10 text-center text-sm text-neutral-400 pb-[1vh]">(Conducted By)</p></a></div></div></div> <div class="pb-[4vh]"><h2 class="relative z-10 bg-gradient-to-b from-neutral-200 to-primary bg-clip-text text-center font-sans text-l font-bold text-transparent pb-[1vh]">Also a special thanks to Student Cell @ GSV and Epitome&#39;25 organising committee for supoorting us throughout</h2></div></div></div></div></div>` : ``}`;
});
export {
  Page as default
};
//# sourceMappingURL=_page.svelte.js.map
