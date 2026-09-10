const fs = require('fs');
const file = 'src/components/account/DevoteeSelfService.tsx';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
  'const cred = await signInAnonymously(auth);',
  `// Avoid anonymous auth if it's disabled.
        // const cred = await signInAnonymously(auth);
        throw new Error("Please log in properly before updating email.");`
);

fs.writeFileSync(file, code);
