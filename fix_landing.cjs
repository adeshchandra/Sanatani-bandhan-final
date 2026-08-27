const fs = require('fs');
let code = fs.readFileSync('src/components/public/LandingPage.tsx', 'utf8');

code = code.replace(
  `<span className="font-extrabold text-xl tracking-tight text-slate-900 hidden sm:block">`,
  `<span className="font-extrabold text-xl tracking-tight text-slate-900 block">`
);

fs.writeFileSync('src/components/public/LandingPage.tsx', code);
