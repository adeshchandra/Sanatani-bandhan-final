const fs = require('fs');
const file = 'src/context/AuthWorkspaceContext.tsx';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
  'import { onAuthStateChanged, signOut, signInAnonymously } from "firebase/auth";',
  'import { onAuthStateChanged, signOut, signInAnonymously, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";'
);

const authSnippet = `
      // Fallback to email/password auth for demo fast-login since anonymous auth might be disabled
      const demoEmail = "fastlogin_demo@sanatan.org";
      const demoPass = "demo123456";
      signInWithEmailAndPassword(auth, demoEmail, demoPass).catch(async (e) => {
         if (e.code === 'auth/invalid-credential' || e.code === 'auth/user-not-found') {
             try {
                 await createUserWithEmailAndPassword(auth, demoEmail, demoPass);
             } catch(err) {
                 console.error("Failed to create fast-login fallback account", err);
             }
         } else {
             console.error("Fast-login auth failed", e);
         }
      });
`;

code = code.replace(
  /if \(\!firebaseUser\) \{\s+signInAnonymously\(auth\)\.catch\(e => console\.error\("Anonymous auth failed", e\)\);\s+\}/g,
  `if (!firebaseUser) {${authSnippet}}`
);

fs.writeFileSync(file, code);
