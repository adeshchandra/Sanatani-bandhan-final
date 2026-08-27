const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Strip out the bad routes block we added at the top
code = code.replace(
  `// Domain 7
        case 'sadhana-karma':
          return <PersonalSadhanaDesk />;
        case 'sanatani-vivah':
          return <SanataniVivahDesk />;
          
        // Domain 6: Enterprise Control & Multi-Workspace`,
  `// Domain 6: Enterprise Control & Multi-Workspace`
);

// We still need the default exports on the lazys. Let's fix that too.
code = code.replace(
  `const PersonalSadhanaDesk = lazy(() => import('./components/domain5/PersonalSadhanaDesk').then(m => ({ default: m.default })));
const SanataniVivahDesk = lazy(() => import('./components/domain4/SanataniVivahDesk').then(m => ({ default: m.default })));`,
  `const PersonalSadhanaDesk = lazy(() => import('./components/domain5/PersonalSadhanaDesk').then(m => ({ default: m.PersonalSadhanaDesk })));
const SanataniVivahDesk = lazy(() => import('./components/domain4/SanataniVivahDesk').then(m => ({ default: m.SanataniVivahDesk })));`
);

// Now inject correctly into the switch statement
// Find `      case 'workspace-hub':` (which is part of Domain 6)
// and inject before it.

code = code.replace(
  `      // Domain 6
      case 'workspace-hub':`,
  `      // Domain 7
      case 'sadhana-karma':
        return <PersonalSadhanaDesk />;
      case 'sanatani-vivah':
        return <SanataniVivahDesk />;

      // Domain 6
      case 'workspace-hub':`
);

fs.writeFileSync('src/App.tsx', code);
