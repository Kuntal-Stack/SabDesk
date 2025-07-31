// src/firebase.ts

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// ✅ SABDESK PROJECT (for Auth + Firestore)
const sabdeskConfig = {
  apiKey: "AIzaSyAjBEW-fG8NRdBR2M8RtpTIS1hNHw5j43I",
  authDomain: "sabdesk-f11f4.firebaseapp.com",
  projectId: "sabdesk-f11f4",
  storageBucket: "sabdesk-f11f4.appspot.com",
  messagingSenderId: "956158259119",
  appId: "1:956158259119:web:78ee7803881af74c6a895a",
};

const app = !getApps().length ? initializeApp(sabdeskConfig) : getApp();
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

// ✅ PIPE-ANALYSIS PROJECT (for Storage only)
const pipeStorageConfig = {
  apiKey: "AIzaSyCShD6xT2cZERq7M1nr6y1wNHtODPbt74s",
  authDomain: "pipe-analysis.firebaseapp.com",
  projectId: "pipe-analysis",
  storageBucket: "pipe-analysis.firebasestorage.app", // ⚠️ must be .appspot.com not .firebasestorage.app
  messagingSenderId: "47498409940",
  appId: "1:47498409940:web:9a30eeda6da0daeba48841",
};

const pipeApp =
  getApps().find((a) => a.name === "PIPE_APP") ??
  initializeApp(pipeStorageConfig, "PIPE_APP");

const pipeBucket = getStorage(pipeApp); // ✅ Now you can access pipe-analysis storage

export { auth, provider, db, pipeBucket }; // ✅ Must include pipeBucket