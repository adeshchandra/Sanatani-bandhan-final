const fs = require('fs');
let rules = fs.readFileSync('firestore.rules', 'utf8');

rules = rules.replace(
  "function getUserData() {\n      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data;\n    }",
  "function getUserData() {\n      let doc = get(/databases/$(database)/documents/users/$(request.auth.uid));\n      return doc == null ? {} : doc.data;\n    }"
);

fs.writeFileSync('firestore.rules', rules);
