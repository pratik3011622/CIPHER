;
!function() {
  try {
    var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {}, n = new e.Error().stack;
    n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "33d067ee-368f-4cbe-9b83-abf195cda88f", e._sentryDebugIdIdentifier = "sentry-dbid-33d067ee-368f-4cbe-9b83-abf195cda88f");
  } catch (e2) {
  }
}();
import { b as adminDB } from "../../../chunks/admin.js";
import "../../../chunks/_sentry-release-injection-file.js";
let loaded = false;
let leaderboard = [];
let queryDef = adminDB.collection("teams").orderBy("level", "desc").orderBy("last_change");
const load = async ({ locals, params }) => {
  if (!loaded) {
    const qSnap = await queryDef.get();
    qSnap.docs.forEach((e) => {
      const data = e.data();
      leaderboard.push({
        teamName: data.teamName,
        score: (data.level - 1) * 100,
        members: data.members.length,
        gsv: data.gsv_verified
      });
    });
    queryDef.onSnapshot((snap) => {
      const newData = [];
      snap.docs.forEach((e) => {
        const data = e.data();
        newData.push({
          teamName: data.teamName,
          score: (data.level - 1) * 100,
          members: data.members.length,
          gsv: data.gsv_verified
        });
      });
      leaderboard = newData;
    });
    loaded = true;
  }
  return {
    leaderboard
  };
};
export {
  load
};
//# sourceMappingURL=_page.server.ts.js.map
