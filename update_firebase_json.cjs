const fs = require('fs');

const config = JSON.parse(fs.readFileSync('firebase-applet-config.json', 'utf8'));
const dbId = config.firestoreDatabaseId || "(default)";

const firebaseJson = JSON.parse(fs.readFileSync('firebase.json', 'utf8'));

if (Array.isArray(firebaseJson.firestore)) {
  const target = firebaseJson.firestore.find(f => f.database === dbId);
  if (!target) {
    firebaseJson.firestore.push({
      database: dbId,
      rules: "firestore.rules"
    });
  }
} else {
  firebaseJson.firestore = {
    database: dbId,
    rules: "firestore.rules"
  };
}

fs.writeFileSync('firebase.json', JSON.stringify(firebaseJson, null, 2));
