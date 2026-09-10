const fs = require('fs');
const file = 'src/hooks/useFirestoreCollection.ts';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
  "const { activeWorkspace } = useAuthWorkspace();",
  "const { activeWorkspace, isAuthenticated, firebaseUser } = useAuthWorkspace();"
);

code = code.replace(
  "if (!activeWorkspace?.id) return;",
  "if (!activeWorkspace?.id || !isAuthenticated || !firebaseUser) return;"
);

fs.writeFileSync(file, code);
