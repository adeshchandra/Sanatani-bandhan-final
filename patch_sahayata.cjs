const fs = require('fs');
let code = fs.readFileSync('src/components/common/SahayataForum.tsx', 'utf8');
code = code.replace(/console\.error\("Error fetching threads:", error\);/g, `console.warn("Firebase SahayataForum sync (threads):", error.message);`);
code = code.replace(/console\.error\("Error fetching replies:", error\);/g, `console.warn("Firebase SahayataForum sync (replies):", error.message);`);
fs.writeFileSync('src/components/common/SahayataForum.tsx', code);
