const fs = require('fs');

// Fix LanguageContext.tsx
let langContent = fs.readFileSync('src/context/LanguageContext.tsx', 'utf8');
langContent = langContent.replace(/TAXONOMY_MAP\.en\.MANDIR/g, 'TAXONOMY_MAP.en.Mandir');
fs.writeFileSync('src/context/LanguageContext.tsx', langContent);

// Fix workspaceRegistry.ts
let regContent = fs.readFileSync('src/lib/workspaceRegistry.ts', 'utf8');
const toAdd = `
  'Purohit': [
    'dashboard', 'devotees', 'poojaBooking', 'purohitDesk', 'panchang',
    'masterSettings'
  ],
  'DharmadaTrust': [
    'dashboard', 'devotees', 'treasury', 'taxReceipts', 'campaigns',
    'masterSettings', 'legalVault'
  ]
};`;
regContent = regContent.replace(/\};(?=[^\}]*$)/, toAdd);
fs.writeFileSync('src/lib/workspaceRegistry.ts', regContent);
