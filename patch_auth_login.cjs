const fs = require('fs');
let code = fs.readFileSync('src/context/AuthWorkspaceContext.tsx', 'utf8');

// Update loginAsRole
code = code.replace(
  "setCurrentRole(role);\n    setIsAuthenticated(true);",
  "setCurrentRole(role);\n    setIsAuthenticated(true);\n    setViewMode(role === 'devotee' ? 'MEMBER' : 'ADMIN');"
);

// Update loginWithPin (assuming it sets currentRole somewhere, let's find it)
code = code.replace(
  "setCurrentRole(member.role as UserRole);\n        setIsAuthenticated(true);",
  "setCurrentRole(member.role as UserRole);\n        setIsAuthenticated(true);\n        setViewMode(member.role === 'devotee' ? 'MEMBER' : 'ADMIN');"
);

fs.writeFileSync('src/context/AuthWorkspaceContext.tsx', code);
