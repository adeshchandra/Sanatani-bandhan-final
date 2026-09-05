const fs = require('fs');
let content = fs.readFileSync('src/components/account/DevoteeSelfService.tsx', 'utf8');

content = content.replace(
  "import { useAuthWorkspace } from '../../context/AuthWorkspaceContext';",
  "import { useAuthWorkspace } from '../../context/AuthWorkspaceContext';\nimport { useData } from '../../context/DataContext';"
);

content = content.replace(
  "const { currentDevotee, setCurrentDevotee } = useAuthWorkspace();",
  "const { currentDevotee, setCurrentDevotee } = useAuthWorkspace();\n  const { updateDevotee } = useData();"
);

content = content.replace(
  "if (setCurrentDevotee) {\n         setCurrentDevotee({ ...currentDevotee!, ...updatePayload });\n      }",
  "if (setCurrentDevotee) {\n         setCurrentDevotee({ ...currentDevotee!, ...updatePayload });\n      }\n      if (updateDevotee) {\n         updateDevotee(currentDevotee!.id, updatePayload);\n      }"
);

fs.writeFileSync('src/components/account/DevoteeSelfService.tsx', content);
