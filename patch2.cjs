const fs = require('fs');
let content = fs.readFileSync('firestore.rules', 'utf8');
content = content.replace(
`    match /workspaces/{workspaceId} {
      allow read: if isGlobalAdmin() || belongsToWorkspace(workspaceId);
      allow write: if isGlobalAdmin() || hasWorkspaceRole(workspaceId, ['SUPER_ADMIN', 'TRUSTEE', 'MANAGER']);
    }`,
`    match /workspaces/{workspaceId} {
      allow read: if isGlobalAdmin() || belongsToWorkspace(workspaceId) || isDemoWorkspace(workspaceId);
      allow write: if isGlobalAdmin() || hasWorkspaceRole(workspaceId, ['SUPER_ADMIN', 'TRUSTEE', 'MANAGER']) || isDemoWorkspace(workspaceId);
    }`
);
fs.writeFileSync('firestore.rules', content);
