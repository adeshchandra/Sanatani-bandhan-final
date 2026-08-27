const fs = require('fs');
let code = fs.readFileSync('src/components/common/Sidebar.tsx', 'utf8');

// Replace the bad domain 7 block
code = code.replace(
  `  // Domain 7: Individual Life & Connect
  {
    domain: 7,
    title: safeTranslate('domain7_title', 'Sanatani Life & Connect'),
    items: [
      { id: 'sadhana-karma', label: safeTranslate('sadhana_karma', 'Sadhana & Karma'), icon: Flame, route: '/sadhana' },
      { id: 'sanatani-vivah', label: safeTranslate('sanatani_vivah', 'Sanatani Vivah'), icon: Heart, route: '/vivah' }
    ]
  },`,
  `  // Domain 7: Individual Life & Connect
  { id: 'sadhana-karma', name: 'Sadhana & Karma', domain: 7, domainTitle: 'Sanatani Life & Connect', icon: Flame },
  { id: 'sanatani-vivah', name: 'Sanatani Vivah', domain: 7, domainTitle: 'Sanatani Life & Connect', icon: Heart },`
);

fs.writeFileSync('src/components/common/Sidebar.tsx', code);
