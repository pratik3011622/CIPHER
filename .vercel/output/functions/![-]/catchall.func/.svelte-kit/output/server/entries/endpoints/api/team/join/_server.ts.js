;
!function() {
  try {
    var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {}, n = new e.Error().stack;
    n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "99783a7d-e9b3-4cbc-846c-65d97425524d", e._sentryDebugIdIdentifier = "sentry-dbid-99783a7d-e9b3-4cbc-846c-65d97425524d");
  } catch (e2) {
  }
}();
import { b as adminDB, a as adminAuth } from "../../../../../chunks/admin.js";
import { FieldValue } from "firebase-admin/firestore";
import { error, json } from "@sveltejs/kit";
import "../../../../../chunks/_sentry-release-injection-file.js";
let existingTeamCodes = /* @__PURE__ */ new Map();
let existingTeamMembers = /* @__PURE__ */ new Map();
const indexRef = adminDB.collection("index").doc("nameIndex");
const userIndexRef = adminDB.collection("index").doc("userIndex");
let indexDataLoaded = false;
const POST = async ({ request, cookies, locals }) => {
  if (!indexDataLoaded) {
    const data = (await indexRef.get()).data();
    existingTeamCodes = new Map(Object.entries(data.teamcodes));
    existingTeamMembers = new Map(Object.entries(data.teamcounts));
    indexRef.onSnapshot((snap) => {
      const snapData = snap.data();
      existingTeamCodes = new Map(Object.entries(snapData.teamcodes));
      existingTeamMembers = new Map(Object.entries(snapData.teamcounts));
    });
    indexDataLoaded = true;
  }
  if (locals.userID === null || !locals.userExists) {
    return error(401, "Unauthorized");
  }
  const body = await request.json();
  let { inviteCode } = body;
  console.log("bad request check");
  if (inviteCode === void 0 || inviteCode === null || inviteCode.trim() === "") return error(400, "Bad Request");
  console.log("not a bad request");
  inviteCode = inviteCode.toLowerCase();
  let shouldCheck = true;
  if ((existingTeamMembers[inviteCode] === void 0 || existingTeamMembers[inviteCode] === null) && (existingTeamCodes[inviteCode] === void 0 || existingTeamCodes[inviteCode] === null)) {
    console.log("no check needed");
    shouldCheck = false;
  }
  await adminDB.runTransaction(async (transaction) => {
    let teamID;
    if (shouldCheck) {
      const currData = (await transaction.get(indexRef)).data();
      existingTeamMembers = currData.teamcounts;
      existingTeamCodes = currData.teamcodes;
    }
    console.log("not found check");
    console.log(inviteCode);
    console.log(existingTeamCodes);
    console.log(existingTeamMembers);
    if (!existingTeamCodes.has(inviteCode)) return error(404, "Not Found");
    console.log("team is full check");
    if (existingTeamMembers.get(inviteCode).length >= 3) return error(419, "Team is full");
    console.log("already in this team check");
    console.log(existingTeamMembers.get(inviteCode));
    if (existingTeamMembers.get(inviteCode).includes(locals.userID)) return error(418, "Already in this team");
    console.log("already in a team check");
    if (locals.userTeam !== null) return error(403, "Already in a team");
    teamID = existingTeamCodes.get(inviteCode);
    const teamRef = adminDB.collection("teams").doc(teamID);
    const userRef = adminDB.collection("users").doc(locals.userID);
    const userRecord = await adminAuth.getUser(locals.userID);
    let teamData = {
      members: FieldValue.arrayUnion(locals.userID)
    };
    if (!(userRecord.email || "").endsWith("gsv.ac.in")) {
      teamData["gsv_verified"] = false;
    }
    await transaction.update(teamRef, teamData);
    await transaction.update(userRef, {
      team: teamID
    });
    let userIndexData = {};
    userIndexData[locals.userID] = teamID;
    await transaction.update(userIndexRef, userIndexData);
    let indexData = {};
    indexData[`teamcounts.${inviteCode}`] = FieldValue.arrayUnion(locals.userID);
    await transaction.update(indexRef, indexData);
    locals.userTeam = teamID;
    return json({ success: true, teamID });
  });
  return json({});
};
export {
  POST
};
//# sourceMappingURL=_server.ts.js.map
