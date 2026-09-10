const fs = require('fs');
let regContent = fs.readFileSync('src/lib/workspaceRegistry.ts', 'utf8');

// The faulty text:
const toRemove = `  'Purohit': [
    'dashboard', 'devotees', 'poojaBooking', 'purohitDesk', 'panchang',
    'masterSettings'
  ],
  'DharmadaTrust': [
    'dashboard', 'devotees', 'treasury', 'taxReceipts', 'campaigns',
    'masterSettings', 'legalVault'
  ]
};`;

regContent = regContent.replace(toRemove, "");

const toAdd = `,
  'Purohit': [
    'dashboard', 'devotees', 'poojaBooking', 'purohitDesk', 'panchang',
    'masterSettings'
  ],
  'DharmadaTrust': [
    'dashboard', 'devotees', 'treasury', 'taxReceipts', 'campaigns',
    'masterSettings', 'legalVault'
  ]
};`;

regContent = regContent.replace(/\]\n\};/g, "]" + toAdd);

fs.writeFileSync('src/lib/workspaceRegistry.ts', regContent);
