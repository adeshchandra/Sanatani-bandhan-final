const fs = require('fs');
let code = fs.readFileSync('src/components/common/GlobalSOSListener.tsx', 'utf8');
const lines = code.split('\n');
lines[86] = `    }, (err) => console.warn("Firebase SOS sync:", err.message));`;
fs.writeFileSync('src/components/common/GlobalSOSListener.tsx', lines.join('\n'));
