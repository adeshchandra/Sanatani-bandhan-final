const fs = require('fs');
let code = fs.readFileSync('src/components/domain3/PurohitDesk.tsx', 'utf8');
const lines = code.split('\n');
lines[94] = `    }, (err) => console.warn("Firebase PurohitDesk sync:", err.message));`;
lines[102] = `    }, (err) => console.warn("Firebase PurohitDesk sync:", err.message));`;
lines[111] = `    }, (err) => console.warn("Firebase PurohitDesk sync:", err.message));`;
lines[120] = `    }, (err) => console.warn("Firebase PurohitDesk sync:", err.message));`;
lines[129] = `      setLoading(false);\n    }, (err) => console.warn("Firebase PurohitDesk sync:", err.message));`;
fs.writeFileSync('src/components/domain3/PurohitDesk.tsx', lines.join('\n'));
