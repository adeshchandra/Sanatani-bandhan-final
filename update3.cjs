const fs = require('fs');
let content = fs.readFileSync('src/components/domain1/DevoteeGrid.tsx', 'utf8');

content = content.replace(
  "import { useData } from '../../context/DataContext';",
  "import { useData } from '../../context/DataContext';\nimport { useScopedData } from '../../hooks/useScopedData';"
);

content = content.replace(
  "  const { devotees, treasury, poojas, addDevotee, updateDevotee, deleteDevotee } = useData();",
  "  const { treasury, poojas, addDevotee, updateDevotee, deleteDevotee } = useData();\n  const devotees = useScopedData<DevoteeMember>('devotees', {}, { orderBy: { field: 'fullName', direction: 'asc' } });"
);

fs.writeFileSync('src/components/domain1/DevoteeGrid.tsx', content);
