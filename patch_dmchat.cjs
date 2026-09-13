const fs = require('fs');
let code = fs.readFileSync('src/components/common/DirectMessageChat.tsx', 'utf8');
const lines = code.split('\n');
lines[44] = `    }, (err) => console.warn("Firebase DM Chat sync (presence):", err.message));`;
lines[72] = `    }, (err) => console.warn("Firebase DM Chat sync (chatDoc):", err.message));`;
lines[86] = `    }, (err) => console.warn("Firebase DM Chat sync (messages):", err.message));`;
fs.writeFileSync('src/components/common/DirectMessageChat.tsx', lines.join('\n'));
