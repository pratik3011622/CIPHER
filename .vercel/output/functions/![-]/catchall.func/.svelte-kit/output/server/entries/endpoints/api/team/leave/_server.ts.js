;
!function() {
  try {
    var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {}, n = new e.Error().stack;
    n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "7fdb0024-e3ca-489b-a0c7-6530715739f2", e._sentryDebugIdIdentifier = "sentry-dbid-7fdb0024-e3ca-489b-a0c7-6530715739f2");
  } catch (e2) {
  }
}();
import { b as adminDB, a as adminAuth } from "../../../../../chunks/admin.js";
import { FieldValue } from "firebase-admin/firestore";
import { error, json } from "@sveltejs/kit";
import "../../../../../chunks/_sentry-release-injection-file.js";
const POST = async ({ request, cookies, locals }) => {
  if (locals.userID === null || !locals.userExists || locals.userTeam === null) {
    return error(401, "Unauthorized");
  } else {
    const userDoc = await adminDB.collection("/users").doc(locals.userID).get();
    const teamId = userDoc.data().team;
    const team = await adminDB.collection("/teams").doc(teamId).get();
    team.data().level;
    let isAdmin = false;
    try {
      if (userDoc.exists) {
        const userData = userDoc.data();
        isAdmin = userData?.role === "admin" || userData?.role === "exception";
      } else {
        console.error("User not found in database");
      }
    } catch (error2) {
      console.error("Error fetching user data:", error2);
    }
    const now = /* @__PURE__ */ new Date();
    const startTime = /* @__PURE__ */ new Date("2025-03-18T18:39:00Z");
    await adminDB.runTransaction(async (transaction) => {
      const userRef = adminDB.collection("users").doc(locals.userID);
      const teamRef = adminDB.collection("teams").doc(locals.userTeam);
      const nameIndexRef = adminDB.collection("index").doc("nameIndex");
      const userIndexRef = adminDB.collection("index").doc("userIndex");
      const teamData = (await transaction.get(teamRef)).data();
      if (!(now <= startTime) && !isAdmin) return error(405, "Method Not Allowed");
      if (teamData === void 0) return error(404, "Not Found");
      let newMembers = teamData.members.filter((e) => e !== locals.userID);
      if (newMembers.length === 0) {
        await transaction.delete(teamRef);
        let nameIndexData = {
          teamnames: FieldValue.arrayRemove(teamData.teamName)
        };
        nameIndexData[`teamcodes.${teamData.code}`] = FieldValue.delete();
        nameIndexData[`teamcounts.${teamData.code}`] = FieldValue.delete();
        await transaction.update(nameIndexRef, nameIndexData);
      } else {
        let data = {
          owner: newMembers[0],
          members: newMembers,
          gsv_verified: true
        };
        for (const id of newMembers) {
          const userRecord = await adminAuth.getUser(id);
          if (!userRecord.email?.toString().endsWith("gsv.ac.in")) {
            data.gsv_verified = false;
            break;
          }
        }
        await transaction.update(teamRef, data);
        let nameIndexData = {};
        nameIndexData[`teamcounts.${teamData.code}`] = newMembers;
        await transaction.update(nameIndexRef, nameIndexData);
      }
      await transaction.update(userRef, {
        team: null
      });
      let userIndexData = {};
      userIndexData[locals.userID] = null;
      await transaction.update(userIndexRef, userIndexData);
    });
    return json({ success: true, message: "Successfully left the team" }, { status: 200 });
  }
};
export {
  POST
};
//# sourceMappingURL=_server.ts.js.map
