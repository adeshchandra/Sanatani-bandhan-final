const fs = require('fs');
let content = fs.readFileSync('src/components/common/Sidebar.tsx', 'utf8');

content = content.replace(
  "  // Domain 1: Core Command & CRM",
  "  { id: 'devotee-portal', name: 'My Devotee Portal', domain: 0, domainTitle: 'Personal', icon: UserCircle, badge: 'New' },\n  // Domain 1: Core Command & CRM"
);

content = content.replace(
  "      else if (['devotees', 'family', 'vanshavali', 'guests', 'karmaLedger'",
  "      else if (['devotee-portal', 'devotees', 'family', 'vanshavali', 'guests', 'karmaLedger'"
);

fs.writeFileSync('src/components/common/Sidebar.tsx', content);
