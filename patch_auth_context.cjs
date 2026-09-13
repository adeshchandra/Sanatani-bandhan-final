const fs = require('fs');
let content = fs.readFileSync('src/context/AuthWorkspaceContext.tsx', 'utf8');

// The user states: "Document the remaining authentication migration requirement."
const warningMsg = `\n      // TODO: PHASE 1B - Production authentication migration required. \n      // Anonymous auth is ONLY acceptable for isolated demo/sandbox functionality.\n      signInAnonymously(auth).catch(console.error);\n`;

// Inject into loginWithPin (Admin)
content = content.replace(
  `setCurrentRole('SUPER_ADMIN');\n      setIsAuthenticated(true);`,
  `setCurrentRole('SUPER_ADMIN');\n      setIsAuthenticated(true);${warningMsg}`
);

// Inject into loginWithPin (Devotee match)
content = content.replace(
  `setCurrentRole(match.role || 'DEVOTEE');\n      setIsAuthenticated(true);`,
  `setCurrentRole(match.role || 'DEVOTEE');\n      setIsAuthenticated(true);${warningMsg}`
);

// Inject into loginAsRole
content = content.replace(
  `setCurrentRole(role);\n    setIsAuthenticated(true);`,
  `setCurrentRole(role);\n    setIsAuthenticated(true);${warningMsg}`
);

fs.writeFileSync('src/context/AuthWorkspaceContext.tsx', content);
