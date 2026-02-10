import { initializeApp, getApps, getApp, deleteApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDjVYxuV1-bhhdxx69MOeZaDm4MUaBYYV0",
  authDomain: "cipher-fabae.firebaseapp.com",
  projectId: "cipher-fabae",
  storageBucket: "cipher-fabae.firebasestorage.app",
  messagingSenderId: "344559334588",
  appId: "1:344559334588:web:d22e1fe1bac4670fb18cb9",
  measurementId: "G-SMWFYFEQQT"
};

// Robust initialization for HMR
let app;
if (getApps().length) {
  app = getApp();
  deleteApp(app); // Delete stale app
}
app = initializeApp(firebaseConfig);

export { app };
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
