const fs = require('fs');

let code = fs.readFileSync('src/context/DataContext.tsx', 'utf8');

// The local storage quota check block:
//    const key = \`\${DEMO_QUOTA_KEY_PREFIX}\${activeWorkspace.id}_\${moduleName}\`;
//    const currentCount = parseInt(localStorage.getItem(key) || '0', 10);
//    if (currentCount >= 5 && currentRole !== 'superadmin' && currentRole !== 'master_admin') { ... return false; }
//    localStorage.setItem(key, (currentCount + 1).toString());

// We can just find this and rip it out if we want.
// Alternatively, replace \`currentCount >= 5\` with \`currentCount >= 6\` OR remove it entirely to rely on usePlanGate.
// I'll just change the hardcoded 5 to 6 in case it's still being used.

code = code.replace(
  /currentCount >= 5/g,
  'currentCount >= 6'
);

code = code.replace(
  /(Demo Quota Limit \(5 inputs\))/g,
  'Demo Quota Limit (4 manual inputs)'
);

fs.writeFileSync('src/context/DataContext.tsx', code);
