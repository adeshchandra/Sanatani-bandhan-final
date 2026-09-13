const fs = require('fs');

function patchFile(filename, replacements) {
    let code = fs.readFileSync(filename, 'utf8');
    const lines = code.split('\n');
    for (let r of replacements) {
        lines[r.line - 1] = r.text;
    }
    fs.writeFileSync(filename, lines.join('\n'));
}

patchFile('src/components/domain6/CommunityPollsTab.tsx', [
    { line: 69, text: `    }, (err) => console.warn("Firebase CommunityPollsTab sync:", err.message));` }
]);

patchFile('src/components/domain4/SanataniVivahDesk.tsx', [
    { line: 109, text: `    }, (err) => console.warn("Firebase SanataniVivahDesk sync:", err.message));` },
    { line: 123, text: `    }, (err) => console.warn("Firebase SanataniVivahDesk sync:", err.message));` }
]);

patchFile('src/components/domain7/YatraNetDesk.tsx', [
    { line: 55, text: `    }, (err) => console.warn("Firebase YatraNetDesk sync:", err.message));` },
    { line: 145, text: `    }, (err) => console.warn("Firebase YatraNetDesk sync:", err.message));` }
]);
