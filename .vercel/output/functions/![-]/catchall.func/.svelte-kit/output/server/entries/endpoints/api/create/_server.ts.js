;
!function() {
  try {
    var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {}, n = new e.Error().stack;
    n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "d96f47d5-3ccb-4594-a8f4-086d3d099235", e._sentryDebugIdIdentifier = "sentry-dbid-d96f47d5-3ccb-4594-a8f4-086d3d099235");
  } catch (e2) {
  }
}();
import { b as adminDB } from "../../../../chunks/admin.js";
import { FieldValue } from "firebase-admin/firestore";
import { error, json } from "@sveltejs/kit";
import axios from "axios";
import "../../../../chunks/_sentry-release-injection-file.js";
let existingUsernames = /* @__PURE__ */ new Set();
const indexRef = adminDB.collection("index").doc("nameIndex");
let existingUsernamesLoaded = false;
const POST = async ({ request, cookies, locals }) => {
  if (existingUsernamesLoaded === false) {
    const data = (await indexRef.get()).data();
    if (data !== void 0) {
      data["usernames"].forEach((username) => existingUsernames.add(username));
    }
    existingUsernamesLoaded = true;
  }
  if (locals.userID === null) {
    return error(401, "Unauthorized");
  } else {
    const body = await request.json();
    let { first, last, username } = body;
    console.log(body);
    console.log(first, last, username);
    if (typeof first !== "string" || typeof last !== "string" || typeof username !== "string") {
      console.log("Invalid request");
      return error(400, "Invalid request");
    } else if (existingUsernames.has(username.toString().toLowerCase())) {
      return error(409, "Username already exists");
    } else {
      existingUsernames.add(username.toString().toLowerCase());
      await adminDB.runTransaction(async (transaction) => {
        const userRef = adminDB.collection("users").doc(locals.userID);
        await transaction.set(userRef, {
          first,
          last,
          username: username.toString().toLowerCase(),
          team: null,
          uid: locals.userID,
          created: FieldValue.serverTimestamp()
        });
        await transaction.update(indexRef, {
          usernames: FieldValue.arrayUnion(username.toString().toLowerCase())
        });
        await transaction.update(adminDB.collection("index").doc("userIndex"), {
          [locals.userID]: null
        });
        let usercount = (await adminDB.collection("users").count().get()).data().count;
        try {
          if (process.env.WEBHOOK) await axios.post(process.env.WEBHOOK, {
            "content": "**New User**\nName: " + first + " " + last + "\nUsername: " + username + "\nUser Count: " + usercount
          });
        } catch (e) {
          console.error(e);
        }
      });
      return json({ success: true });
    }
  }
};
export {
  POST
};
//# sourceMappingURL=_server.ts.js.map
