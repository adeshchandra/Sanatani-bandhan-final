const fs = require('fs');

function replaceGetDocs(filename) {
    let code = fs.readFileSync(filename, 'utf8');
    // For services, we can just change getDocs to a wrapped try-catch function if we don't want to change every line.
    // Actually it's easier to just do it via AST or simple regex.
    code = code.replace(/await getDocs\((.*?)\)/g, '(await getDocs($1).catch(e => { console.warn("Firebase getDocs error", e.message); return { empty: true, forEach: () => {}, docs: [] }; }))');
    fs.writeFileSync(filename, code);
}

replaceGetDocs('src/services/PersonalizedReminderService.ts');
replaceGetDocs('src/components/admin/QRScanner.tsx');
replaceGetDocs('src/lib/dbUtils.ts');
replaceGetDocs('src/components/domain6/MasterSettingsDesk.tsx');

