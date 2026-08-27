const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Remove the mistakenly added code block inside imports
code = code.replace(
  `// Domain 7: Individual Life & Connect
import PersonalSadhanaDesk from './components/domain5/PersonalSadhanaDesk';
import SanataniVivahDesk from './components/domain4/SanataniVivahDesk';


      // Domain 7
      { path: 'sadhana', element: <PersonalSadhanaDesk /> },
      { path: 'vivah', element: <SanataniVivahDesk /> },

      // Domain 6: Enterprise Control & Multi-Workspace`,
  `// Domain 7: Individual Life & Connect
const PersonalSadhanaDesk = lazy(() => import('./components/domain5/PersonalSadhanaDesk'));
const SanataniVivahDesk = lazy(() => import('./components/domain4/SanataniVivahDesk'));

// Domain 6: Enterprise Control & Multi-Workspace`
);

// Add the routes correctly
code = code.replace(
  "// Domain 6",
  `// Domain 7
      { path: 'sadhana', element: <Suspense fallback={<Loading />}><PersonalSadhanaDesk /></Suspense> },
      { path: 'vivah', element: <Suspense fallback={<Loading />}><SanataniVivahDesk /></Suspense> },
      
      // Domain 6`
);

fs.writeFileSync('src/App.tsx', code);
