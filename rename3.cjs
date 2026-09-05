const fs = require('fs');
let content = fs.readFileSync('src/components/common/MySpaceModal.tsx', 'utf8');
content = content.replace(/const compressedBase64 = await compressAvatarImage\(file\);/g, 'const downloadUrl = await compressAvatarImage(file);');
content = content.replace(/photoUrl: compressedBase64/g, 'photoUrl: downloadUrl');
fs.writeFileSync('src/components/common/MySpaceModal.tsx', content);
