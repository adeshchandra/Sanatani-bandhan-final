const fs = require('fs');

// Update Sidebar.tsx
let sidebar = fs.readFileSync('src/components/common/Sidebar.tsx', 'utf8');
if (!sidebar.includes("qrScanner")) {
  sidebar = sidebar.replace(
    "{ id: 'appStore', name: 'App Store & Add-ons'",
    "{ id: 'qrScanner', name: 'QR Gate Scanner', domain: 6, domainTitle: 'Governance & Security', icon: ShieldCheck, badge: 'Check-in' },\n  { id: 'appStore', name: 'App Store & Add-ons'"
  );
  if(!sidebar.includes("ShieldCheck")) {
      sidebar = sidebar.replace("Scale,", "Scale, ShieldCheck,");
  }
  fs.writeFileSync('src/components/common/Sidebar.tsx', sidebar);
}

// Update App.tsx
let app = fs.readFileSync('src/App.tsx', 'utf8');
if (!app.includes("case 'qrScanner':")) {
  app = app.replace(
    "import { WhatsAppBroadcasterDesk } from './components/domain5/WhatsAppBroadcasterDesk';",
    "import { WhatsAppBroadcasterDesk } from './components/domain5/WhatsAppBroadcasterDesk';\nimport { QRScanner } from './components/admin/QRScanner';"
  );
  app = app.replace(
    "case 'appStore':",
    "case 'qrScanner':\n        return checkPermission(['TRUSTEE', 'MANAGER', 'VOLUNTEER']) ? <QRScanner /> : <RestrictedAccess />;\n      case 'appStore':"
  );
  fs.writeFileSync('src/App.tsx', app);
}
