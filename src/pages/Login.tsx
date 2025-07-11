// src/pages/Login.tsx
import React from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const handleLogin = async () => {
    console.log("🔘 Login button clicked"); // <== Should show in browser console
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("✅ Signed in:", result.user);
    } catch (error) {
      console.error("❌ Login error:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>🔐 Welcome to SabDesk</h2>
      <button
        onClick={handleLogin}
        style={{ padding: "10px 20px", fontSize: "18px", cursor: "pointer" }}
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
