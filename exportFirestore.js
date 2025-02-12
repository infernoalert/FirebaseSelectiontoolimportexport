const admin = require("firebase-admin");
const fs = require("fs");

// Initialize Firebase Admin SDK
const serviceAccount = require("./service-account-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Export data from Firestore based on condition
async function exportData() {
  try {
    const questionsCollection = db.collection("Questions");
    const snapshot = await questionsCollection.get();

    if (snapshot.empty) {
      console.log("No questions found.");
      return;
    }

    const filteredQuestions = {};

    // Iterate through all documents in the collection
    snapshot.forEach((doc) => {
      const data = doc.data();

      // Include only documents where isProduct is true
      //if (data.isProduct === true) {
        filteredQuestions[doc.id] = data;
      //}
    });

    // Write to JSON file
    fs.writeFileSync(
      "./exportquestions.json",
      JSON.stringify({ Questions: filteredQuestions }, null, 2)
    );

    console.log("Filtered questions exported successfully to exportquestions.json");
  } catch (error) {
    console.error("Error exporting data:", error);
  }
}

exportData();
