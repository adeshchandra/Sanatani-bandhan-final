const fs = require('fs');
let content = fs.readFileSync('src/components/common/DirectMessageChat.tsx', 'utf8');

content = content.replace(/\\`/g, '`');
content = content.replace(/\\\$/g, '$');
content = content.replace(/\\\\D/g, '\\D');

fs.writeFileSync('src/components/common/DirectMessageChat.tsx', content);
