const admin = require("firebase-admin");
const fs = require("fs");

// Initialize Firebase Admin SDK
const serviceAccount = require("./service-account-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Load data from JSON file
const data = JSON.parse(fs.readFileSync("./questions.json", "utf8"));

// Import data into Firestore
async function importData() {
  const batch = db.batch(); // Create a batch for multiple writes

  Object.keys(data.Questions).forEach((docId) => {
    const docRef = db.collection("Questions").doc(docId); // Set collection and document ID
    batch.set(docRef, data.Questions[docId]); // Set data for each document
  });

  await batch.commit(); // Commit all writes in the batch
  console.log("Data imported successfully!");
}

importData().catch((error) => {
  console.error("Error importing data:", error);
});
