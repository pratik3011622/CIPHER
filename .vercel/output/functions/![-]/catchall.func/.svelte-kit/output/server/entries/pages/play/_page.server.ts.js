;
!function() {
  try {
    var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {}, n = new e.Error().stack;
    n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "3f7bb522-63e2-4b6c-aeb8-1ed070df22f9", e._sentryDebugIdIdentifier = "sentry-dbid-3f7bb522-63e2-4b6c-aeb8-1ed070df22f9");
  } catch (e2) {
  }
}();
import { redirect } from "@sveltejs/kit";
import { b as adminDB } from "../../../chunks/admin.js";
import "../../../chunks/_sentry-release-injection-file.js";
const collectionRef = adminDB.collection("/levels").orderBy("level");
let loaded = false;
let questions = [];
const load = async ({ locals }) => {
  const userDoc = await adminDB.collection("/users").doc(locals.userID).get();
  const teamId = userDoc.data().team;
  const team = await adminDB.collection("/teams").doc(teamId).get();
  const level = team.data().level;
  const now = /* @__PURE__ */ new Date();
  const startTime = /* @__PURE__ */ new Date("2025-03-18T18:39:00Z");
  const endTime = /* @__PURE__ */ new Date("2025-03-22T18:39:00Z");
  const questionsVisible = now >= startTime && now <= endTime;
  if (questionsVisible) {
    if (locals.banned) {
      return redirect(302, "/team");
    }
    if (!loaded) {
      const querySnapshot = await collectionRef.get();
      querySnapshot.docs.forEach((d) => {
        let data = d.data();
        data["answer"] = null;
        data["creator"] = null;
        questions.push(data);
      });
      collectionRef.onSnapshot((newSnapshot) => {
        const newQuestions = [];
        newSnapshot.docs.forEach((d) => {
          let newData = d.data();
          newData["answer"] = null;
          newData["creator"] = null;
          newQuestions.push(newData);
        });
        questions = newQuestions;
        console.log("new update");
      });
      loaded = true;
    }
    if (!locals.userID || !locals.userExists || !locals.userTeam) {
      return redirect(302, "/ready");
    }
  }
  return {
    locals,
    questions: questions.slice(0, level)
  };
};
export {
  load
};
//# sourceMappingURL=_page.server.ts.js.map
