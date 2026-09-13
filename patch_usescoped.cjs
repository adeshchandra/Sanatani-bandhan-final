const fs = require('fs');
let code = fs.readFileSync('src/hooks/useScopedData.ts', 'utf8');
code = code.replace(/console\.error\(\`Error fetching useCollection for \$\{collectionName\}\:\`, error\);/g, `console.warn(\`Firebase sync warning for \$\{collectionName\}\:\`, error.message);`);
fs.writeFileSync('src/hooks/useScopedData.ts', code);
