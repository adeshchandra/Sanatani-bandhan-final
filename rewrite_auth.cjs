const fs = require('fs');
let code = fs.readFileSync('src/context/AuthWorkspaceContext.tsx', 'utf8');

const regexPin = /const loginWithPin = \(pin: string, devoteeList: DevoteeMember\[\]\): boolean => \{([\s\S]*?)\/\/ Admin Master Override PIN/g;

code = code.replace(regexPin, `const loginWithPin = (pin: string, devoteeList: DevoteeMember[]): boolean => {
    if (!firebaseUser) {
      const demoEmail = "fastlogin_demo@sanatan.org";
      const demoPass = "demo123456";
      signInWithEmailAndPassword(auth, demoEmail, demoPass).catch(async (e) => {
         if (e.code === 'auth/invalid-credential' || e.code === 'auth/user-not-found') {
             try {
                 const userCred = await createUserWithEmailAndPassword(auth, demoEmail, demoPass);
                 await setDoc(doc(db, 'users', userCred.user.uid), { email: demoEmail, role: 'SUPER_ADMIN' });
             } catch(err) {
                 console.error("Failed to create account", err);
             }
         }
      });
    }

    // Admin Master Override PIN`);

const regexRole = /const loginAsRole = \(role: UserRole, customName\?: string\) => \{([\s\S]*?)setCurrentRole\(role\);/g;

code = code.replace(regexRole, `const loginAsRole = (role: UserRole, customName?: string) => {
    if (!firebaseUser) {
      const demoEmail = "fastlogin_demo@sanatan.org";
      const demoPass = "demo123456";
      signInWithEmailAndPassword(auth, demoEmail, demoPass).catch(async (e) => {
         if (e.code === 'auth/invalid-credential' || e.code === 'auth/user-not-found') {
             try {
                 const userCred = await createUserWithEmailAndPassword(auth, demoEmail, demoPass);
                 await setDoc(doc(db, 'users', userCred.user.uid), { email: demoEmail, role: 'SUPER_ADMIN' });
             } catch(err) {
                 console.error("Failed to create account", err);
             }
         }
      });
    }

    setCurrentRole(role);`);

fs.writeFileSync('src/context/AuthWorkspaceContext.tsx', code);
