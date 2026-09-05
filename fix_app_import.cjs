const fs = require('fs');
let app = fs.readFileSync('src/App.tsx', 'utf8');

if (!app.includes("const QRScanner = lazy(() => import('./components/admin/QRScanner')")) {
  app = app.replace(
    "import { NotificationProvider } from './context/NotificationContext';",
    "import { NotificationProvider } from './context/NotificationContext';\nconst QRScanner = lazy(() => import('./components/admin/QRScanner').then(m => ({ default: m.QRScanner })));"
  );
  fs.writeFileSync('src/App.tsx', app);
}
