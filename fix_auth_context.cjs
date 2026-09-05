const fs = require('fs');
let content = fs.readFileSync('src/context/AuthWorkspaceContext.tsx', 'utf8');

if (!content.includes("setCurrentDevotee: (devotee: DevoteeMember | null) => void;")) {
  content = content.replace(
    "  currentDevotee: DevoteeMember | null;",
    "  currentDevotee: DevoteeMember | null;\n  setCurrentDevotee: (devotee: DevoteeMember | null) => void;"
  );
  
  content = content.replace(
    "        currentDevotee,",
    "        currentDevotee,\n        setCurrentDevotee,"
  );
  
  fs.writeFileSync('src/context/AuthWorkspaceContext.tsx', content);
}
