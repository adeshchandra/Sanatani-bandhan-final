const fs = require('fs');
const file = 'src/hooks/useScopedData.ts';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
  "if (!currentUser || !activeWorkspace) {\n      return { _unauthorized: true };\n    }",
  "if (!currentUser || !activeWorkspace || currentUser.id === 'temp-devotee-id') {\n      return { _unauthorized: true };\n    }"
);

fs.writeFileSync(file, code);
