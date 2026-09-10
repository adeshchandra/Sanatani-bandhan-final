const fs = require('fs');
const file = 'src/context/AuthWorkspaceContext.tsx';
let code = fs.readFileSync(file, 'utf8');

if (!code.includes('signInAnonymously')) {
  code = code.replace(
    'import { onAuthStateChanged, signOut } from "firebase/auth";',
    'import { onAuthStateChanged, signOut, signInAnonymously } from "firebase/auth";'
  );

  code = code.replace(
    /const loginWithPin = \(pin: string, devoteeList: DevoteeMember\[\]\): boolean => \{/g,
    `const loginWithPin = (pin: string, devoteeList: DevoteeMember[]): boolean => {
    if (!firebaseUser) {
       signInAnonymously(auth).catch(e => console.error("Anonymous auth failed", e));
    }`
  );

  code = code.replace(
    /const loginAsRole = \(role: UserRole, customName\?: string\) => \{/g,
    `const loginAsRole = (role: UserRole, customName?: string) => {
    if (!firebaseUser) {
       signInAnonymously(auth).catch(e => console.error("Anonymous auth failed", e));
    }`
  );
}
fs.writeFileSync(file, code);
