const fs = require('fs');

let code = fs.readFileSync('src/components/public/LandingPage.tsx', 'utf8');

code = code.replace(
  `<DemoSelectionModal 
          onClose={() => setDemoModalOpen(false)} 
          onSelect={onDemoStart}
        />`,
  `<DemoSelectionModal 
          isOpen={demoModalOpen}
          onClose={() => setDemoModalOpen(false)} 
          onSelect={onDemoStart}
        />`
);

fs.writeFileSync('src/components/public/LandingPage.tsx', code);
