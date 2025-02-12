copy service-account-key.json to same folder
node importFirestore.js

Exportdata send to exportquestions.json
to send all 
// Include only documents where isProduct is true
      //if (data.isProduct === true) {
        filteredQuestions[doc.id] = data;
      //}
    });