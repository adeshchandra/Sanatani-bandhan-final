const fs = require('fs');
let rules = fs.readFileSync('firestore.rules', 'utf8');

rules = rules.replace(
  "match /treasury/{docId} {\n      allow read: if isManager();\n      allow write: if isAdmin();\n    }",
  "match /treasury/{docId} {\n      allow create: if isAuthenticated();\n      allow read: if isManager() || (isAuthenticated() && resource.data.devoteeId == request.auth.uid);\n      allow write: if isAdmin();\n    }"
);

rules = rules.replace(
  "match /poojaBookings/{bookingId} {\n      allow create: if isAuthenticated();\n      allow read: if isAuthenticated() && (resource.data.userId == request.auth.uid || isManager() || isPurohit());",
  "match /poojaBookings/{bookingId} {\n      allow create: if isAuthenticated();\n      allow read: if isAuthenticated() && (resource.data.userId == request.auth.uid || resource.data.devoteeId == request.auth.uid || isManager() || isPurohit());"
);

fs.writeFileSync('firestore.rules', rules);
