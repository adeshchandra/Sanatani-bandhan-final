const fs = require('fs');
let regContent = fs.readFileSync('src/lib/workspaceRegistry.ts', 'utf8');

regContent = regContent.trim();
if (regContent.endsWith("return false;")) {
  regContent += "\n};";
}
fs.writeFileSync('src/lib/workspaceRegistry.ts', regContent);
