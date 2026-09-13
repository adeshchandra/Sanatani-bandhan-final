const fs = require('fs');

function replaceGetDoc(filename) {
    let code = fs.readFileSync(filename, 'utf8');
    code = code.replace(/await getDoc\((.*?)\)/g, '(await getDoc($1).catch(e => { console.warn("Firebase getDoc error", e.message); return { exists: () => false, data: () => null }; }))');
    fs.writeFileSync(filename, code);
}

replaceGetDoc('src/services/PersonalizedReminderService.ts');
replaceGetDoc('src/components/admin/QRScanner.tsx');
// Not changing AuthWorkspaceContext.tsx because that handles auth logic and might already have try-catch or needs to fail
