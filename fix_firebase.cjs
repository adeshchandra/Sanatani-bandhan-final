const fs = require('fs');

let code = fs.readFileSync('src/firebase.ts', 'utf8');

// Replace getFirestore import
code = code.replace(
  `getFirestore,`,
  `getFirestore,\n  initializeFirestore,`
);

// Replace db init
code = code.replace(
  `export const db = getFirestore(app);`,
  `export const db = initializeFirestore(app, { experimentalForceLongPolling: true });`
);

fs.writeFileSync('src/firebase.ts', code);
