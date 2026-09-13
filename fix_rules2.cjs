const fs = require('fs');
let rules = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    function isAuthenticated() { return request.auth != null; }
    
    function isGlobalAdmin() { 
      return isAuthenticated() && 
      exists(/databases/$(database)/documents/platform_admins/$(request.auth.uid)) &&
      get(/databases/$(database)/documents/platform_admins/$(request.auth.uid)).data.active == true; 
    }
    
    function getUserData() { 
      return exists(/databases/$(database)/documents/users/$(request.auth.uid)) ? get(/databases/$(database)/documents/users/$(request.auth.uid)).data : null; 
    }
    
    function isDemoWorkspace(workspaceId) {
      return workspaceId != null && workspaceId.matches('^DEMO_.*');
    }
    
    function belongsToWorkspace(workspaceId) {
      return isAuthenticated() && workspaceId != null && (
        isDemoWorkspace(workspaceId) ||
        (getUserData() != null && getUserData().get('workspaceId', null) == workspaceId) ||
        (getUserData() != null && getUserData().get('defaultWorkspaceId', null) == workspaceId) ||
        workspaceId == 'PUROHIT_' + request.auth.uid
      );
    }
    
    function hasWorkspaceRole(workspaceId, allowedRoles) {
      return belongsToWorkspace(workspaceId) && (
        isDemoWorkspace(workspaceId) || 
        (getUserData() != null && getUserData().get('role', null) in allowedRoles)
      );
    }
    
    function isBlocked() {
      return isAuthenticated() && ( 
        exists(/databases/$(database)/documents/blocked_users/$(request.auth.uid)) ||
        (getUserData() != null && getUserData().get('status', null) == 'BLOCKED')
      );
    }

    match /platform_leads/{leadId} { allow create: if true; allow read, update, delete: if isGlobalAdmin(); }
    match /app_config/{configId} { allow read: if isAuthenticated(); allow write: if isGlobalAdmin(); }
    match /global_purohits/{purohitId} { allow read: if isAuthenticated(); allow write: if (isAuthenticated() && request.auth.uid == purohitId) || isGlobalAdmin(); }
    match /upgrade_requests/{reqId} { allow create: if isAuthenticated(); allow read, update, delete: if isGlobalAdmin(); }

    match /yatra_broadcasts/{bId} { allow read, create: if isAuthenticated(); allow update, delete: if isGlobalAdmin(); }
    match /global_support_threads/{tId} { allow read, create: if isAuthenticated(); allow update, delete: if isGlobalAdmin(); }
    match /global_support_replies/{rId} { allow read, create: if isAuthenticated(); allow update, delete: if isGlobalAdmin(); }
    match /polls/{pollId} { allow read: if isAuthenticated(); allow write: if (getUserData() != null && getUserData().get('role', null) in ['SUPER_ADMIN', 'MANAGER']) || isGlobalAdmin(); }

    match /users/{userId} {
      allow read: if (isAuthenticated() && request.auth.uid == userId) || isGlobalAdmin();
      allow create: if isAuthenticated() && request.auth.uid == userId 
        && !request.resource.data.keys().hasAny(['admin', 'isGlobalAdmin', 'status'])
        && (
           !request.resource.data.keys().hasAny(['workspaceId', 'defaultWorkspaceId', 'role']) 
           || isDemoWorkspace(request.resource.data.get('workspaceId', null))
        );
      allow update: if (
        isAuthenticated() && request.auth.uid == userId && !isBlocked()
        && !request.resource.data.diff(resource.data).affectedKeys().hasAny(['admin', 'isGlobalAdmin', 'status'])
        && (
             isDemoWorkspace(request.resource.data.get('workspaceId', null)) 
             || !request.resource.data.diff(resource.data).affectedKeys().hasAny(['role', 'workspaceId', 'defaultWorkspaceId', 'membership'])
        )
      ) || isGlobalAdmin();
      allow delete: if false; 
    }

    match /workspaces/{workspaceId} {
      allow read: if belongsToWorkspace(workspaceId) || isGlobalAdmin();
      allow write: if hasWorkspaceRole(workspaceId, ['SUPER_ADMIN', 'TRUSTEE', 'MANAGER']) || isGlobalAdmin();
    }

    match /{collection}/{docId} {
      allow read: if collection in [
        'treasury', 'devotees', 'families', 'guests', 'assets', 'inventory', 
        'poojaBookings', 'residentPujas', 'pitruRecords', 'cows', 'annadanam', 
        'rooms', 'gurukulStudents', 'campaigns', 'resolutions', 'shifts', 
        'checkIns', 'audit_logs', 'festivals'
      ] && (
        (isAuthenticated() && belongsToWorkspace(resource.data.get('workspaceId', null))) || isGlobalAdmin()
      );
      
      allow create: if collection in [
        'treasury', 'devotees', 'families', 'guests', 'assets', 'inventory', 
        'poojaBookings', 'residentPujas', 'pitruRecords', 'cows', 'annadanam', 
        'rooms', 'gurukulStudents', 'campaigns', 'resolutions', 'shifts', 
        'checkIns', 'audit_logs', 'festivals'
      ] && (
        (isAuthenticated() && belongsToWorkspace(request.resource.data.get('workspaceId', null))) || isGlobalAdmin()
      );

      allow update: if collection in [
        'treasury', 'devotees', 'families', 'guests', 'assets', 'inventory', 
        'poojaBookings', 'residentPujas', 'pitruRecords', 'cows', 'annadanam', 
        'rooms', 'gurukulStudents', 'campaigns', 'resolutions', 'shifts', 
        'checkIns', 'audit_logs', 'festivals'
      ] && (
        (isAuthenticated() && belongsToWorkspace(resource.data.get('workspaceId', null)) && belongsToWorkspace(request.resource.data.get('workspaceId', null))) || isGlobalAdmin()
      );

      allow delete: if collection in [
        'treasury', 'devotees', 'families', 'guests', 'assets', 'inventory', 
        'poojaBookings', 'residentPujas', 'pitruRecords', 'cows', 'annadanam', 
        'rooms', 'gurukulStudents', 'campaigns', 'resolutions', 'shifts', 
        'checkIns', 'audit_logs', 'festivals'
      ] && (
        (isAuthenticated() && belongsToWorkspace(resource.data.get('workspaceId', null))) || isGlobalAdmin()
      );
    }

    match /chats/{chatId} {
      allow read, write: if (
        isAuthenticated() && ( 
          chatId.matches('.*' + request.auth.uid + '.*') || 
          (getUserData() != null && getUserData().get('role', null) in ['SUPER_ADMIN', 'TRUSTEE', 'MANAGER'])
        )
      ) || isGlobalAdmin();

      match /{document=**} {
        allow read, write: if (
          isAuthenticated() && ( 
             chatId.matches('.*' + request.auth.uid + '.*') || 
             (getUserData() != null && getUserData().get('role', null) in ['SUPER_ADMIN', 'TRUSTEE', 'MANAGER'])
          )
        ) || isGlobalAdmin();
      }
    }

    match /communities/{communityId}/{collectionName}/{docId} {
      allow read: if belongsToWorkspace(communityId) || isGlobalAdmin();
      allow write: if (
        belongsToWorkspace(communityId) && (
          collectionName in ['vivah_profiles', 'vivah_connections', 'sadhana_logs', 'social_feed', 'yatra_social_feed', 'purohit_gigs', 'purohit_applications']
          || isDemoWorkspace(communityId)
          || (getUserData() != null && getUserData().get('role', null) in ['SUPER_ADMIN', 'TRUSTEE', 'MANAGER', 'PUROHIT'])
        )
      ) || isGlobalAdmin();
    }
  }
}
`;
fs.writeFileSync('firestore.rules', rules);
