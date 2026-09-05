const fs = require('fs');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/avatarBase64/g, 'avatarUrl');
  content = content.replace(/photoBase64/g, 'photoUrl');
  fs.writeFileSync(filePath, content);
}

replaceInFile('src/components/domain1/DevoteeGrid.tsx');
replaceInFile('src/components/account/DevoteeSelfService.tsx');
replaceInFile('src/utils/pdfGenerator.ts');
replaceInFile('src/types.ts');
