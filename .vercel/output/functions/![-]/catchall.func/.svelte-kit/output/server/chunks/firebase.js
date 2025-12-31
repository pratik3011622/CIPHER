;
!function() {
  try {
    var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {}, n = new e.Error().stack;
    n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "24f64238-4cb7-4487-bfc9-13d20157278d", e._sentryDebugIdIdentifier = "sentry-dbid-24f64238-4cb7-4487-bfc9-13d20157278d");
  } catch (e2) {
  }
}();
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import "./_sentry-release-injection-file.js";
const firebaseConfig = {
  apiKey: "AIzaSyAhglte1ATWbzr8dmdkaCB0mMPWGLUMCxQ",
  authDomain: "ciphersaga-dev.firebaseapp.com",
  databaseURL: "https://ciphersaga-dev-default-rtdb.firebaseio.com",
  projectId: "ciphersaga-dev",
  storageBucket: "ciphersaga-dev.firebasestorage.app",
  messagingSenderId: "12391029088",
  appId: "1:12391029088:web:ff77946b0be11ff363a605",
  measurementId: "G-G5RJW9F4RF"
};
initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const storage = getStorage();
export {
  auth as a,
  db as d,
  storage as s
};
//# sourceMappingURL=firebase.js.map
