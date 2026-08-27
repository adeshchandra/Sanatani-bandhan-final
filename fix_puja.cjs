const fs = require('fs');
let content = fs.readFileSync('src/components/domain3/MandirPujaDesk.tsx', 'utf8');

// replace all escaped backticks and $
content = content.replace(/\\`/g, '`');
content = content.replace(/\\\$/g, '$');

fs.writeFileSync('src/components/domain3/MandirPujaDesk.tsx', content);
