// src/pages/Home.tsx
import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { signOut } from "firebase/auth";

const Home = () => {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // Load user data
    const user = auth.currentUser;
    if (user) {
      setUserData({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      });
    }

    // Firestore example
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "testCollection"));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} =>`, doc.data());
      });
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("🚪 Logged out");
      })
      .catch((error) => {
        console.error("❌ Logout error:", error);
      });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>🚀 My Firebase React App</h2>
      <p>📦 Firestore connected! Check the console.</p>

      {userData && (
        <div style={{ marginTop: "20px" }}>
          <img
            src={userData.photo}
            alt="Profile"
            width="100"
            style={{ borderRadius: "50%" }}
          />
          <h3>{userData.name}</h3>
          <p>{userData.email}</p>
        </div>
      )}

      <button
        onClick={handleLogout}
        style={{
          marginTop: "30px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
