;
!function() {
  try {
    var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {}, n = new e.Error().stack;
    n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "64da70d0-d2ef-4e41-a42c-f04a1ee19f1e", e._sentryDebugIdIdentifier = "sentry-dbid-64da70d0-d2ef-4e41-a42c-f04a1ee19f1e");
  } catch (e2) {
  }
}();
import { b as adminDB, a as adminAuth } from "../../../../../chunks/admin.js";
import { FieldValue } from "firebase-admin/firestore";
import * as referralCodes from "referral-codes";
import { error, json } from "@sveltejs/kit";
import axios from "axios";
import "../../../../../chunks/_sentry-release-injection-file.js";
let existingTeamNames = /* @__PURE__ */ new Set();
let existingTeamCodes = /* @__PURE__ */ new Map();
const indexRef = adminDB.collection("index").doc("nameIndex");
const userIndexRef = adminDB.collection("index").doc("userIndex");
const POST = async ({ request, cookies, locals }) => {
  {
    const data = (await indexRef.get()).data();
    data.teamnames.forEach((e) => existingTeamNames.add(e));
    existingTeamCodes = data.teamcodes;
  }
  if (locals.userID === null || !locals.userExists || locals.userTeam !== null) {
    return error(401, "Unauthorized");
  }
  const body = await request.json();
  let { teamName } = body;
  if (teamName === void 0 || teamName === null || teamName.trim() === "") return error(400, "Bad Request");
  teamName = teamName.toLowerCase();
  if (existingTeamNames.has(teamName)) return error(429, "Team name is already taken");
  await adminDB.runTransaction(async (transaction) => {
    const newTeamRef = adminDB.collection("teams").doc();
    const userRef = adminDB.collection("users").doc(locals.userID);
    const teamID = newTeamRef.id;
    let teamCode = referralCodes.generate({
      length: 8,
      count: 1
    })[0].toLowerCase();
    while (existingTeamCodes[teamCode] !== void 0) {
      teamCode = referralCodes.generate({
        length: 8,
        count: 1
      })[0].toLowerCase();
    }
    const teamMembers = [locals.userID];
    const userRecord = await adminAuth.getUser(locals.userID);
    let data = {
      created: FieldValue.serverTimestamp(),
      last_change: FieldValue.serverTimestamp(),
      teamName,
      uid: teamID,
      code: teamCode,
      owner: locals.userID,
      members: teamMembers,
      level: 1,
      banned: false,
      gsv_verified: false
    };
    if ((userRecord.email || "").endsWith("gsv.ac.in")) {
      data["gsv_verified"] = true;
    }
    await transaction.set(newTeamRef, data);
    let data2 = {
      team: teamID
    };
    await transaction.update(userRef, data2);
    const teamCodeKey = "teamcodes." + teamCode;
    const teamCountKey = "teamcounts." + teamCode;
    let data3 = {
      teamnames: FieldValue.arrayUnion(teamName)
    };
    data3[teamCodeKey] = teamID;
    data3[teamCountKey] = [locals.userID];
    await transaction.update(indexRef, data3);
    let data4 = {};
    data4[locals.userID] = teamID;
    await transaction.update(userIndexRef, data4);
    existingTeamCodes[teamCode] = teamID;
    existingTeamNames.add(teamName);
    let teamcount = (await adminDB.collection("teams").count().get()).data().count;
    try {
      if (process.env.WEBHOOK) await axios.post(process.env.WEBHOOK, {
        "content": "**New Team**\nName: " + teamName + "\nTeam Count: " + teamcount
      });
    } catch (e) {
      console.error(e);
    }
  });
  return json({ success: true });
};
export {
  POST
};
//# sourceMappingURL=_server.ts.js.map
