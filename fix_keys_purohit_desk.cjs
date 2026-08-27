const fs = require('fs');
let code = fs.readFileSync('src/components/domain3/PurohitDesk.tsx', 'utf8');

code = code.replace(
  "setApplications(snap.docs.map(d => d.data()));",
  "setApplications(snap.docs.map(d => ({ id: d.id, ...d.data() })));"
);

fs.writeFileSync('src/components/domain3/PurohitDesk.tsx', code);
