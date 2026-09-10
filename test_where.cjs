const fs = require('fs');
let content = fs.readFileSync('src/context/DataContext.tsx', 'utf8');
content = content.replace(
  "return onSnapshot(collection(db, c.name), (snapshot) => {",
  "const q = query(collection(db, c.name), where('workspaceId', '==', activeWorkspace.id));\n      return onSnapshot(q, (snapshot) => {"
);
fs.writeFileSync('src/context/DataContext.tsx', content);
