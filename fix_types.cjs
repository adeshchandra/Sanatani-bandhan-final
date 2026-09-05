const fs = require('fs');
let content = fs.readFileSync('src/types.ts', 'utf8');

// The file got completely messed up, let's clean ALL panNumber occurrences
content = content.replace(/panNumber\?: string;.*?\n/g, "");
content = content.replace(/panNumber\?: string;\n/g, "");

// Now add it ONCE to DevoteeMember
content = content.replace(
  "medicalNotes?: string;\n  idCardValidThru?: string;",
  "medicalNotes?: string;\n  idCardValidThru?: string;\n  panNumber?: string;"
);

fs.writeFileSync('src/types.ts', content);
