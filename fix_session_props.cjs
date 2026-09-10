const fs = require('fs');
let chat = fs.readFileSync('src/components/common/DirectMessageChat.tsx', 'utf8');

chat = chat.replace(/session\?\.uid/g, "session?.id");
chat = chat.replace(/session\.uid/g, "session.id");
chat = chat.replace(/session\.user\?\.name/g, "session.name");

fs.writeFileSync('src/components/common/DirectMessageChat.tsx', chat);
