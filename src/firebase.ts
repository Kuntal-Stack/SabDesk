// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAjBEW-fG8NRdBR2M8RtpTIS1hNHw5j43I",
  authDomain: "sabdesk-f11f4.firebaseapp.com",
  projectId: "sabdesk-f11f4",
  storageBucket: "sabdesk-f11f4.appspot.com",
  messagingSenderId: "956158259119",
  appId: "1:956158259119:web:78ee7803881af74c6a895a",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
