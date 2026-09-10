const fs = require('fs');
const file = 'src/components/common/GlobalSOSListener.tsx';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
  "const { currentUser, isAuthenticated } = useAuthWorkspace();",
  "const { currentUser, isAuthenticated, firebaseUser } = useAuthWorkspace();"
);

code = code.replace(
  "if (!isAuthenticated) return;",
  "if (!isAuthenticated || !firebaseUser) return;"
);

fs.writeFileSync(file, code);
