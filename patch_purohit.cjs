const fs = require('fs');
let code = fs.readFileSync('src/components/domain3/PurohitMarketDesk.tsx', 'utf8');
const lines = code.split('\n');
lines[152] = `    }, (err) => console.warn("Firebase PurohitMarketDesk sync:", err.message));`;
lines[164] = `    }, (err) => console.warn("Firebase PurohitMarketDesk sync:", err.message));`;
lines[170] = `    }, (err) => console.warn("Firebase PurohitMarketDesk sync:", err.message));`;
fs.writeFileSync('src/components/domain3/PurohitMarketDesk.tsx', lines.join('\n'));
