const fs = require('fs');
let sidebar = fs.readFileSync('src/components/common/Sidebar.tsx', 'utf8');

if (!sidebar.includes("ShieldCheck,")) {
  sidebar = sidebar.replace(
    "} from 'lucide-react';",
    "  ShieldCheck,\n} from 'lucide-react';"
  );
  fs.writeFileSync('src/components/common/Sidebar.tsx', sidebar);
}
