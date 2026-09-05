const fs = require('fs');
let app = fs.readFileSync('src/App.tsx', 'utf8');
if (!app.includes("import { QRScanner }")) {
  app = app.replace(
    "import { RestrictedAccess } from './components/common/RestrictedAccess';",
    "import { RestrictedAccess } from './components/common/RestrictedAccess';\nimport { QRScanner } from './components/admin/QRScanner';"
  );
  fs.writeFileSync('src/App.tsx', app);
}
