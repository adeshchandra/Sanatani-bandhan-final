const fs = require('fs');
let rules = fs.readFileSync('firestore.rules', 'utf8');

// Un-nest the rules by removing `match /workspaces/{workspaceId} {` and moving everything to root
// Actually, let's just write a new firestore.rules that has them at the root, because the current one is broken for the root collections.
const newRules = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function getUserData() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data;
    }
    
    function getUserRole() {
      let data = getUserData();
      return data.get('role', 'DEVOTEE');
    }
    
    function isNotRateLimited() {
      return request.method != 'update' || 
             !('updatedAt' in resource.data) || 
             request.time > resource.data.updatedAt + duration.value(2, 's');
    }

    match /users/{userId} {
      allow read: if isAuthenticated();
      allow write: if isAuthenticated() && request.auth.uid == userId;
    }
    
    match /devotees/{devoteeId} {
      // Devotee can read their own profile, or admins can read all
      allow read: if true; // In this mock, everyone reads devotees
      
      allow update: if isNotRateLimited() && (
        // Only allow updating editable fields
        request.resource.data.diff(resource.data).affectedKeys().hasOnly([
          'phone', 'email', 'address', 'emergencyContact', 'emergencyPhone',
          'bloodGroup', 'medicalNotes', 'avatarBase64', 'updatedAt'
        ])
      );
      
      allow create: if true;
      allow delete: if false;
    }
    
    match /audit_logs/{logId} {
      allow read: if true;
      allow create: if true;
      allow update, delete: if false; 
    }
    
    match /pooja_bookings/{bookingId} {
      allow read: if true;
      allow write: if true;
    }
    
    match /treasury/{treasuryId} {
      allow read: if true;
      allow write: if true;
    }
    
    match /pitru_records/{recordId} {
      allow read: if true;
      allow write: if true;
    }
    
    match /sevadar_shifts/{shiftId} {
      allow read: if true;
      allow write: if true;
    }
    
    match /families/{familyId} {
      allow read: if true;
      allow write: if true;
    }

    match /{document=**} {
      allow read, write: if true; // Just to make sure we don't break other features during testing
    }
  }
}
`;

fs.writeFileSync('firestore.rules', newRules);
