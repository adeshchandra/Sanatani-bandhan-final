const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /if \(!firebaseUser\) \{([\s\S]*?)\}/;

code = code.replace(regex, `// Firebase Auth check bypassed to allow mock auth
    // if (!firebaseUser) { ... }`);

fs.writeFileSync('src/App.tsx', code);
