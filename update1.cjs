const fs = require('fs');
let content = fs.readFileSync('src/components/domain2/TreasuryLedgerDesk.tsx', 'utf8');

content = content.replace(
  "import { useData } from '../../context/DataContext';",
  "import { useData } from '../../context/DataContext';\nimport { useScopedData } from '../../hooks/useScopedData';"
);

content = content.replace(
  "  const { treasury, addTreasuryTransaction } = useData();",
  "  const { addTreasuryTransaction } = useData();\n  const treasury = useScopedData<TreasuryTransaction>('treasury', {}, { orderBy: { field: 'date', direction: 'desc' } });"
);

fs.writeFileSync('src/components/domain2/TreasuryLedgerDesk.tsx', content);
