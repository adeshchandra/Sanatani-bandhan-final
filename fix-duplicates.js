const fs = require('fs');

let content = fs.readFileSync('src/lib/workspaceRegistry.ts', 'utf8');

// PUROHIT_SABHA is defined twice.
// 'PUROHIT_SABHA': [ ... ],
// 'PUROHIT_SABHA': [ ... ],

// We'll keep the first one or merge them.
// Let's just remove the second one.

// Wait, I can just use a JS script to parse, or just use sed to delete lines.
