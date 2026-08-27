const fs = require('fs');
let code = fs.readFileSync('src/components/common/Sidebar.tsx', 'utf8');

// Ensure we have Heart and Flame icons imported
code = code.replace(
  "LayoutDashboard, Users, UserPlus, Heart, Share2, Search",
  "LayoutDashboard, Users, UserPlus, Heart, Share2, Search, Flame, Sun"
);
if (!code.includes("Flame,")) {
  code = code.replace(
    "import {",
    "import { Flame, Sun,"
  );
}

const newDomain = `
  // Domain 7: Individual Life & Connect
  {
    domain: 7,
    title: safeTranslate('domain7_title', 'Sanatani Life & Connect'),
    items: [
      { id: 'sadhana-karma', label: safeTranslate('sadhana_karma', 'Sadhana & Karma'), icon: Flame, route: '/sadhana' },
      { id: 'sanatani-vivah', label: safeTranslate('sanatani_vivah', 'Sanatani Vivah'), icon: Heart, route: '/vivah' }
    ]
  },`;

code = code.replace(
  "// Domain 6",
  newDomain + "\n  // Domain 6"
);

fs.writeFileSync('src/components/common/Sidebar.tsx', code);
