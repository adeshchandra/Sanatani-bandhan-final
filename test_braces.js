const fs = require('fs');

const code = fs.readFileSync('src/components/domain6/PanchayatPollingDesk.tsx', 'utf8');
const lines = code.split('\n');

let openBraces = 0;
let inResolutions = false;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes("deskMode === 'Resolutions' ? (")) {
        console.log(`Found start at line ${i + 1}`);
        inResolutions = true;
    }
}
