const fs = require('fs');
let content = fs.readFileSync('src/types.ts', 'utf8');

if (!content.includes('panNumber?')) {
  content = content.replace(
    "idCardValidThru?: string;",
    "idCardValidThru?: string;\n  panNumber?: string;"
  );
  fs.writeFileSync('src/types.ts', content);
}
