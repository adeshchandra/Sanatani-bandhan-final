const fs = require('fs');
const file = 'src/hooks/useScopedData.ts';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
  "const { currentUser, activeWorkspace } = useAuthWorkspace();",
  "const { currentUser, activeWorkspace, firebaseUser } = useAuthWorkspace();"
);

code = code.replace(
  "if (!currentUser || !activeWorkspace || currentUser.id === 'temp-devotee-id') {",
  "if (!currentUser || !activeWorkspace || !firebaseUser || currentUser.id === 'temp-devotee-id') {"
);

fs.writeFileSync(file, code);
