;
!function() {
  try {
    var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {}, n = new e.Error().stack;
    n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "2c269519-f2e0-407c-8d3e-890f0ad8c836", e._sentryDebugIdIdentifier = "sentry-dbid-2c269519-f2e0-407c-8d3e-890f0ad8c836");
  } catch (e2) {
  }
}();
import { sequence } from "@sveltejs/kit/hooks";
import * as Sentry from "@sentry/sveltekit";
import { b as adminDB, a as adminAuth } from "./admin.js";
import "firebase-admin/firestore";
import "./_sentry-release-injection-file.js";
const PUBLIC_SENTRY_DSN = "https://80981b3ba595f85b75927ee3ccfe2237@o4508949423980545.ingest.us.sentry.io/4508949425094656";
Sentry.init({
  dsn: PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1
});
let createdUserDataIndex = /* @__PURE__ */ new Map();
let bannedTeams = /* @__PURE__ */ new Set();
let indexLoaded = false;
const indexRef = adminDB.collection("index").doc("userIndex");
const bannedTeamsQuery = adminDB.collection("teams").where("banned", "==", true);
const handle = sequence(Sentry.sentryHandle(), async ({ event, resolve }) => {
  const sessionCookie = event.cookies.get("__session");
  if (!indexLoaded) {
    const doc = await indexRef.get();
    const qSnap = await bannedTeamsQuery.get();
    qSnap.docs.forEach((e) => bannedTeams.add(e.id));
    if (doc.exists) {
      const data = doc.data();
      if (data !== void 0) {
        createdUserDataIndex = new Map(Object.entries(data));
      }
    }
    indexRef.onSnapshot((snap) => {
      const snapData = snap.data();
      if (snapData !== void 0) createdUserDataIndex = new Map(Object.entries(snapData));
    });
    bannedTeamsQuery.onSnapshot((snap) => {
      bannedTeams.clear();
      snap.docs.forEach((e) => bannedTeams.add(e.id));
    });
    indexLoaded = true;
  }
  try {
    if (sessionCookie === void 0) {
      event.locals.userID = null;
      event.locals.userExists = false;
      event.locals.userTeam = null;
      return resolve(event);
    }
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie);
    event.locals.userID = decodedClaims.uid;
    if (createdUserDataIndex.has(event.locals.userID)) {
      event.locals.userExists = true;
      event.locals.userTeam = createdUserDataIndex.get(event.locals.userID);
      event.locals.banned = bannedTeams.has(event.locals.userTeam);
      return resolve(event);
    } else {
      const docRef = adminDB.collection("users").doc(event.locals.userID);
      const doc = await docRef.get();
      if (doc.exists) {
        const data = doc.data();
        const team = data?.team;
        createdUserDataIndex.set(event.locals.userID, team);
        event.locals.userExists = true;
        event.locals.userTeam = team;
        event.locals.banned = bannedTeams.has(team);
      } else {
        event.locals.userExists = false;
        event.locals.userTeam = null;
        event.locals.banned = false;
      }
      return resolve(event);
    }
  } catch (e) {
    console.error(e);
    event.locals.userID = null;
    event.locals.userExists = false;
    event.locals.userTeam = null;
    event.locals.banned = false;
    return resolve(event);
  }
});
const handleError = Sentry.handleErrorWithSentry();
export {
  handle,
  handleError
};
//# sourceMappingURL=hooks.server.js.map
