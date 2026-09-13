const fs = require('fs');
let content = fs.readFileSync('firestore.rules', 'utf8');

const collectionsToPatch = [
  'treasury', 'devotees', 'chats', 'audit_logs', 'pooja_bookings', 'pitru_records', 'festivals', 'check_ins'
];

// Re-write firestore.rules to inject isDemoWorkspace into all these collections
// Let's just generate the new rules file since doing regex replace might be messy.
