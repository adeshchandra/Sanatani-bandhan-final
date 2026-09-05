const fs = require('fs');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/logoBase64/g, 'logoUrl');
  content = content.replace(/bannerBase64/g, 'bannerUrl');
  fs.writeFileSync(filePath, content);
}

replaceInFile('src/types.ts');
replaceInFile('src/context/AuthWorkspaceContext.tsx');
replaceInFile('src/components/common/Header.tsx');
replaceInFile('src/components/common/Sidebar.tsx');
replaceInFile('src/components/devotee/MemberAppShell.tsx');
replaceInFile('src/components/domain6/MasterSettingsDesk.tsx');
replaceInFile('src/utils/pdfGenerator.ts');

