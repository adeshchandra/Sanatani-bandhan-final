const fs = require('fs');
let code = fs.readFileSync('src/components/domain3/PurohitDesk.tsx', 'utf8');

code = code.replace(
  "const payload = { ...purohitForm, purohitId: purKey, updatedAt: Date.now(), addedBy: session.userName };",
  "const payload = { ...purohitForm, purohitId: purKey, updatedAt: Date.now(), addedBy: session.userName, verifiedBadge: true };"
);

fs.writeFileSync('src/components/domain3/PurohitDesk.tsx', code);
