import { initializeApp } from "firebase/app";
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

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();
