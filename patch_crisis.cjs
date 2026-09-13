const fs = require('fs');
let code = fs.readFileSync('src/components/domain6/CrisisCommandCenter.tsx', 'utf8');
const lines = code.split('\n');
lines[61] = `    }, (err) => console.warn("Firebase CrisisCommandCenter sync:", err.message));`;
fs.writeFileSync('src/components/domain6/CrisisCommandCenter.tsx', lines.join('\n'));
