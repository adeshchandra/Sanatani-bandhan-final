const fs = require('fs');
let code = fs.readFileSync('src/hooks/useFirestoreCollection.ts', 'utf8');
code = code.replace(/console\.error\(\`Error fetching \$\{collectionName\}\:\`, error\);/g, `console.warn(\`Firebase sync warning for \$\{collectionName\}\:\`, error.message);`);
fs.writeFileSync('src/hooks/useFirestoreCollection.ts', code);
