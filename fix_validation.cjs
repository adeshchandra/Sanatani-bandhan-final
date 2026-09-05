const fs = require('fs');
let content = fs.readFileSync('src/components/account/DevoteeSelfService.tsx', 'utf8');

// phone validation
content = content.replace(
  "if (formData.phone.length < 10) {",
  "const phoneRegex = /^\\d{10}$/;\n    if (!phoneRegex.test(formData.phone.replace(/\\D/g, ''))) {"
);

// We should deploy firestore rules.
fs.writeFileSync('src/components/account/DevoteeSelfService.tsx', content);
