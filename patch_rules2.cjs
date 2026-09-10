const fs = require('fs');
let rules = fs.readFileSync('firestore.rules', 'utf8');

const additionalRules = `
    // Additional Collections for prototype
    match /global_support_threads/{docId} { allow read, write: if isAuthenticated(); }
    match /global_support_replies/{docId} { allow read, write: if isAuthenticated(); }
    match /chats/{docId} { allow read, write: if isAuthenticated(); }
    match /chats/{chatId}/messages/{msgId} { allow read, write: if isAuthenticated(); }
    match /yatra_broadcasts/{docId} { allow read, write: if isAuthenticated(); }
    match /check_ins/{docId} { allow read, write: if isAuthenticated(); }
    match /polls/{docId} { allow read, write: if isAuthenticated(); }
    match /upgrade_requests/{docId} { allow read, write: if isAuthenticated(); }
    match /audit_logs/{docId} { allow read, write: if isAuthenticated(); }
    match /communities/{communityId}/{document=**} { allow read, write: if isAuthenticated(); }
    
    // Default Rule (Deny all unless explicitly allowed)
`;

rules = rules.replace("// Default Rule (Deny all unless explicitly allowed)", additionalRules);
fs.writeFileSync('firestore.rules', rules);
