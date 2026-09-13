const fs = require('fs');
let code = fs.readFileSync('src/components/devotee/SanataniSocialFeed.tsx', 'utf8');
const lines = code.split('\n');
lines[398] = `    }, (err) => console.warn("Firebase social feed sync:", err.message));`;
fs.writeFileSync('src/components/devotee/SanataniSocialFeed.tsx', lines.join('\n'));
