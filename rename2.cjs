const fs = require('fs');
let content = fs.readFileSync('src/components/common/MySpaceModal.tsx', 'utf8');
content = content.replace(/photoBase64/g, 'photoUrl');
fs.writeFileSync('src/components/common/MySpaceModal.tsx', content);
