const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

if (!code.includes("const MemberAppShell = lazy")) {
  code = code.replace(
    "const DevoteePortal = lazy(() => import('./components/devotee/DevoteePortal').then(m => ({ default: m.DevoteePortal })));",
    "const DevoteePortal = lazy(() => import('./components/devotee/DevoteePortal').then(m => ({ default: m.DevoteePortal })));\nconst MemberAppShell = lazy(() => import('./components/devotee/MemberAppShell').then(m => ({ default: m.default })));"
  );
}

code = code.replace(
  "const { checkPermission, activeWorkspace, currentRole } = useAuthWorkspace();",
  "const { checkPermission, activeWorkspace, currentRole, viewMode } = useAuthWorkspace();"
);

code = code.replace(
  "if (currentRole === 'devotee') {",
  "if (viewMode === 'MEMBER') {"
);

code = code.replace(
  "<DevoteePortal />",
  "<MemberAppShell />"
);

fs.writeFileSync('src/App.tsx', code);
