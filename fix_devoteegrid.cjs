const fs = require('fs');
let content = fs.readFileSync('src/components/domain1/DevoteeGrid.tsx', 'utf8');
content = content.replace(/photoBase64/g, 'photoUrl');
content = content.replace(/setPhotoBase64/g, 'setPhotoUrl');
fs.writeFileSync('src/components/domain1/DevoteeGrid.tsx', content);
