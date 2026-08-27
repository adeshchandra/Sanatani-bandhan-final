const fs = require('fs');
let code = fs.readFileSync('src/components/common/Header.tsx', 'utf8');

code = code.replace(
  "    setViewMode,\n    setViewMode,",
  "    setViewMode,"
);

fs.writeFileSync('src/components/common/Header.tsx', code);
