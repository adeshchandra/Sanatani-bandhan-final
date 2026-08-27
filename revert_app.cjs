const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Strip out the bad routes block we added
code = code.replace(
  `// Domain 7
      { path: 'sadhana', element: <Suspense fallback={<Loading />}><PersonalSadhanaDesk /></Suspense> },
      { path: 'vivah', element: <Suspense fallback={<Loading />}><SanataniVivahDesk /></Suspense> },
      
      // Domain 6: Enterprise Control & Multi-Workspace`,
  `// Domain 6: Enterprise Control & Multi-Workspace`
);

// Add the Switch cases correctly
code = code.replace(
  "// Domain 6",
  `// Domain 7
      case 'sadhana-karma':
        return <PersonalSadhanaDesk />;
      case 'sanatani-vivah':
        return <SanataniVivahDesk />;
        
      // Domain 6`
);

// We still need the default exports on the lazys. Let's fix that too.
code = code.replace(
  `const PersonalSadhanaDesk = lazy(() => import('./components/domain5/PersonalSadhanaDesk'));
const SanataniVivahDesk = lazy(() => import('./components/domain4/SanataniVivahDesk'));`,
  `const PersonalSadhanaDesk = lazy(() => import('./components/domain5/PersonalSadhanaDesk').then(m => ({ default: m.default })));
const SanataniVivahDesk = lazy(() => import('./components/domain4/SanataniVivahDesk').then(m => ({ default: m.default })));`
);


fs.writeFileSync('src/App.tsx', code);
