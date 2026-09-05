const fs = require('fs');
let types = fs.readFileSync('src/types.ts', 'utf8');

types = types.replace(/panNumber\?: string;/g, ""); // strip all
types = types.replace(
  "idCardIssuedOn?: string;\n  birthDate?: string;",
  "idCardIssuedOn?: string;\n  panNumber?: string;\n  birthDate?: string;"
);
fs.writeFileSync('src/types.ts', types);
