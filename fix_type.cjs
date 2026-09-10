const fs = require('fs');
let content = fs.readFileSync('src/context/LanguageContext.tsx', 'utf8');

content = content.replace(
  "Record<WorkspaceType, TaxonomyMatrix>",
  "Record<string, TaxonomyMatrix>"
);

fs.writeFileSync('src/context/LanguageContext.tsx', content);
