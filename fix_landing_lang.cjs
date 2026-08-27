const fs = require('fs');
let code = fs.readFileSync('src/components/public/LandingPage.tsx', 'utf8');

code = code.replace(
  `{(['en', 'hi', 'bn'] as const).map(lang => (`,
  `{(['en', 'hi', 'bn', 'sa'] as const).map(lang => (`
);

code = code.replace(
  `<div className="flex bg-slate-100 rounded-lg p-1">`,
  `<div className="flex bg-slate-100 rounded-lg p-1">` // Just a check
);

fs.writeFileSync('src/components/public/LandingPage.tsx', code);
