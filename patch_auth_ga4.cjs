const fs = require('fs');
let code = fs.readFileSync('src/context/AuthWorkspaceContext.tsx', 'utf8');

code = code.replace(
  "setIsAuthenticated(true);\\n    setViewMode(role === 'devotee' ? 'MEMBER' : 'ADMIN');",
  "setIsAuthenticated(true);\n    setViewMode(role === 'devotee' ? 'MEMBER' : 'ADMIN');\n    if (typeof window !== 'undefined' && (window as any).dataLayer) {\n      (window as any).dataLayer.push({ event: 'login', login_method: 'role_demo', user_role: role, workspace_id: activeWorkspaceId });\n    }"
);

code = code.replace(
  "setIsAuthenticated(true);\\n        setViewMode(member.role === 'devotee' ? 'MEMBER' : 'ADMIN');",
  "setIsAuthenticated(true);\n        setViewMode(member.role === 'devotee' ? 'MEMBER' : 'ADMIN');\n        if (typeof window !== 'undefined' && (window as any).dataLayer) {\n          (window as any).dataLayer.push({ event: 'login', login_method: 'pin', user_role: member.role, workspace_id: activeWorkspaceId });\n        }"
);

fs.writeFileSync('src/context/AuthWorkspaceContext.tsx', code);
