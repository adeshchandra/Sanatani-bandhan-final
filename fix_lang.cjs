const fs = require('fs');
let content = fs.readFileSync('src/context/LanguageContext.tsx', 'utf8');

const oldCode = `  const getTaxonomy = (workspaceType: WorkspaceType): TaxonomyMatrix => {
    const matrix =
      TAXONOMY_MAP[language]?.[workspaceType] ||
      TAXONOMY_MAP.en[workspaceType] ||
      TAXONOMY_MAP.en.Mandir;
    return {
      ...matrix,
      memberNoun: matrix.memberTerm,
      kartaNoun: matrix.memberTerm,
      offeringNoun: matrix.fundsTerm,
    };
  };`;

const newCode = `  const getTaxonomy = (workspaceType: WorkspaceType): TaxonomyMatrix => {
    const key = (workspaceType || 'MANDIR').toUpperCase() as WorkspaceType;
    let matrix = TAXONOMY_MAP[language]?.[key] || TAXONOMY_MAP.en[key] || TAXONOMY_MAP.en.MANDIR as any;
    
    if (typeof matrix === 'string' || !matrix) {
      matrix = TAXONOMY_MAP.en.MANDIR as any;
    }

    return {
      ...matrix,
      memberNoun: matrix?.memberTerm || 'Bhaktas',
      kartaNoun: matrix?.memberTerm || 'Bhaktas',
      offeringNoun: matrix?.fundsTerm || 'Chanda',
    };
  };`;

content = content.replace(oldCode, newCode);
fs.writeFileSync('src/context/LanguageContext.tsx', content);
