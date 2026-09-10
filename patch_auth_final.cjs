const fs = require('fs');
const file = 'src/context/AuthWorkspaceContext.tsx';
let code = fs.readFileSync(file, 'utf8');

const correctLoginWithPin = `const loginWithPin = (pin: string, devoteeList: DevoteeMember[]): boolean => {
    if (!firebaseUser) {
      const demoEmail = "fastlogin_demo@sanatan.org";
      const demoPass = "demo123456";
      signInWithEmailAndPassword(auth, demoEmail, demoPass).catch(async (e) => {
         if (e.code === 'auth/invalid-credential' || e.code === 'auth/user-not-found') {
             try {
                 const userCred = await createUserWithEmailAndPassword(auth, demoEmail, demoPass);
                 await setDoc(doc(db, 'users', userCred.user.uid), { email: demoEmail, role: 'SUPER_ADMIN' });
             } catch(err) {
                 console.error("Failed to create fast-login fallback account", err);
             }
         }
      });
    }

    // Admin Master Override PIN
    if (pin === '1008' || pin === activeWorkspace.adminPin) {`;

code = code.substring(0, code.indexOf('const loginWithPin')) + correctLoginWithPin + code.substring(code.indexOf('      setCurrentRole(\'SUPER_ADMIN\');'));

// Wait, that might cut out too much. Let's do it safely.
