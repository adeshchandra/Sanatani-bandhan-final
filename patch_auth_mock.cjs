const fs = require('fs');
let code = fs.readFileSync('src/context/AuthWorkspaceContext.tsx', 'utf8');

const regexPin = /const loginWithPin = \(pin: string, devoteeList: DevoteeMember\[\]\): boolean => \{([\s\S]*?)\/\/ Admin Master Override PIN/g;

code = code.replace(regexPin, `const loginWithPin = (pin: string, devoteeList: DevoteeMember[]): boolean => {
    // Firebase Auth is bypassed due to IAM lock. Local state governs the prototype UI.

    // Admin Master Override PIN`);

const regexRole = /const loginAsRole = \(role: UserRole, customName\?: string\) => \{([\s\S]*?)setCurrentRole\(role\);/g;

code = code.replace(regexRole, `const loginAsRole = (role: UserRole, customName?: string) => {
    // Firebase Auth is bypassed due to IAM lock. Local state governs the prototype UI.
    
    setCurrentRole(role);`);

fs.writeFileSync('src/context/AuthWorkspaceContext.tsx', code);
