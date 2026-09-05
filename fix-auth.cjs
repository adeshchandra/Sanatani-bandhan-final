const fs = require('fs');
let content = fs.readFileSync('src/context/AuthWorkspaceContext.tsx', 'utf8');
content = content.replace(/setViewMode\(data\.role === 'DEVOTEE' \? 'MEMBER' : 'MANAGER'\);/g, "setViewMode('MANAGER');");
content = content.replace(/setViewMode\(role === 'DEVOTEE' \? 'MEMBER' : 'MANAGER'\);/g, "setViewMode('MANAGER');");
fs.writeFileSync('src/context/AuthWorkspaceContext.tsx', content);
