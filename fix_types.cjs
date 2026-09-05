const fs = require('fs');
let content = fs.readFileSync('src/types.ts', 'utf8');

if (!content.includes("kuladevata?: string;")) {
  content = content.replace(
    "varnaKul?: string;",
    "varnaKul?: string;\n  kuladevata?: string;"
  );
  fs.writeFileSync('src/types.ts', content);
}
