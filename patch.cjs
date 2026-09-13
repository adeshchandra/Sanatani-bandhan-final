const fs = require('fs');
let content = fs.readFileSync('firestore.rules', 'utf8');
content = content.replace(
`      allow create: if isAuthenticated() && request.auth.uid == userId 
        && (!request.resource.data.keys().hasAny(['role', 'admin', 'isGlobalAdmin', 'status']) || request.resource.data.role == 'DEVOTEE');
      allow update: if isGlobalAdmin() || (
        isAuthenticated() && request.auth.uid == userId && !isBlocked()
        && !request.resource.data.diff(resource.data).affectedKeys().hasAny(['role', 'workspaceId', 'defaultWorkspaceId', 'admin', 'isGlobalAdmin', 'membership', 'status'])
      );`,
`      allow create: if isAuthenticated() && request.auth.uid == userId 
        && (isDemoWorkspace(request.resource.data.workspaceId) || (!request.resource.data.keys().hasAny(['role', 'admin', 'isGlobalAdmin', 'status']) || request.resource.data.role == 'DEVOTEE'));
      allow update: if isGlobalAdmin() || (
        isAuthenticated() && request.auth.uid == userId && !isBlocked()
        && (isDemoWorkspace(request.resource.data.workspaceId) || !request.resource.data.diff(resource.data).affectedKeys().hasAny(['role', 'workspaceId', 'defaultWorkspaceId', 'admin', 'isGlobalAdmin', 'membership', 'status']))
      );`
);
fs.writeFileSync('firestore.rules', content);
