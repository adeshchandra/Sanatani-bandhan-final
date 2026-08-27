const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  `// Domain 7
      case 'sadhana-karma':
        return <PersonalSadhanaDesk />;
      case 'sanatani-vivah':
        return <SanataniVivahDesk />;
        
      // Domain 6: Enterprise Control & Multi-Workspace`,
  `// Domain 6: Enterprise Control & Multi-Workspace`
);

fs.writeFileSync('src/App.tsx', code);
