const fs = require('fs');
let code = fs.readFileSync('src/components/domain3/PurohitMarketDesk.tsx', 'utf8');

code = code.replace(
  "        list.sort((a: any,b: any) => b.createdAt - a.createdAt);\\n        setContracts(list);",
  "        list.sort((a: any,b: any) => b.createdAt - a.createdAt);\n        setContracts(session.role === 'ADMIN' ? list : list.filter(c => c.clientId === session.uid || c.purohitId === session.uid));"
);

fs.writeFileSync('src/components/domain3/PurohitMarketDesk.tsx', code);
