const fs = require('fs');
let rules = fs.readFileSync('firestore.rules', 'utf8');

rules = rules.replace(/function belongsToWorkspace\\(workspaceId\\) \\{\\n\\s+return isAuthenticated\\(\\) && workspaceId != null && \\(\\n\\s+isDemoWorkspace\\(workspaceId\\) \\|\\|/g, 
\`function belongsToWorkspace(workspaceId) {
      return isAuthenticated() && workspaceId != null && (
        (getUserData() != null && getUserData().get('workspaceId', null) == workspaceId) ||\`);

fs.writeFileSync('firestore.rules', rules);
