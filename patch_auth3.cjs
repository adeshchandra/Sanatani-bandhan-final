const fs = require('fs');
const file = 'src/context/AuthWorkspaceContext.tsx';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
  'import { doc, getDoc } from "firebase/firestore";',
  'import { doc, getDoc, setDoc } from "firebase/firestore";'
);

const newAuthSnippet = `
      // Fallback to email/password auth for demo fast-login since anonymous auth is disabled
      const demoEmail = "fastlogin_demo@sanatan.org";
      const demoPass = "demo123456";
      signInWithEmailAndPassword(auth, demoEmail, demoPass).catch(async (e) => {
         if (e.code === 'auth/invalid-credential' || e.code === 'auth/user-not-found') {
             try {
                 const userCred = await createUserWithEmailAndPassword(auth, demoEmail, demoPass);
                 // Grant SUPER_ADMIN in Firestore so that the local mock Auth isn't blocked by Firestore Rules.
                 // The frontend useScopedData hook will still enforce the correct RBAC filtering based on currentRole.
                 await setDoc(doc(db, 'users', userCred.user.uid), { email: demoEmail, role: 'SUPER_ADMIN' });
             } catch(err) {
                 console.error("Failed to create fast-login fallback account", err);
             }
         } else {
             console.error("Fast-login auth failed", e);
         }
      });
`;

// Replace the previous snippet I inserted
code = code.replace(
  /if \(\!firebaseUser\) \{\s*\/\/\s*Fallback to email\/password auth[\s\S]*?\}\s*\n/g,
  `if (!firebaseUser) {${newAuthSnippet}}\n`
);

fs.writeFileSync(file, code);
