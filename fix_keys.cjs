const fs = require('fs');
let code = fs.readFileSync('src/components/domain5/PersonalSadhanaDesk.tsx', 'utf8');

code = code.replace(
  "const myLogs = snap.docs.map(d => d.data())",
  "const myLogs = snap.docs.map(d => ({ id: d.id, ...d.data() }))"
);

fs.writeFileSync('src/components/domain5/PersonalSadhanaDesk.tsx', code);
