const fs = require('fs');
let code = fs.readFileSync('src/components/domain5/PersonalSadhanaDesk.tsx', 'utf8');
const lines = code.split('\n');
lines[57] = `    }, (err) => console.warn("Firebase PersonalSadhanaDesk sync:", err.message));`;
fs.writeFileSync('src/components/domain5/PersonalSadhanaDesk.tsx', lines.join('\n'));
