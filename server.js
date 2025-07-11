const express = require("express");
const app = express();
const { db } = require("./src/firebase");

app.get("/firebase-sample", async (req, res) => {
  try {
    const docRef = db.collection("testCollection").doc("sampleDoc");
    await docRef.set({ message: "Hello from Firebase!" });

    const doc = await docRef.get();
    res.json({ id: doc.id, data: doc.data() });
  } catch (err) {
    res.status(500).send("Error accessing Firebase: " + err.message);
  }
});

app.listen(3000, () => {
  console.log("✅ Server running at http://localhost:3000");
});
