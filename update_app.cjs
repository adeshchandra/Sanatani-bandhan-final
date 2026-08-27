const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');

// Add import
if (!code.includes('import { SahayataForum }')) {
  code = code.replace(
    `import { DharmicAssistant } from './components/common/DharmicAssistant';`,
    `import { DharmicAssistant } from './components/common/DharmicAssistant';\nimport { SahayataForum } from './components/common/SahayataForum';`
  );
}

// Add state
if (!code.includes('const [isSahayataOpen, setIsSahayataOpen]')) {
  code = code.replace(
    `const [isAssistantOpen, setIsAssistantOpen] = useState(false);`,
    `const [isAssistantOpen, setIsAssistantOpen] = useState(false);\n  const [isSahayataOpen, setIsSahayataOpen] = useState(false);`
  );
}

// Add prop
if (!code.includes('onOpenSahayata=')) {
  code = code.replace(
    `onOpenAssistant={() => setIsAssistantOpen(true)}`,
    `onOpenAssistant={() => setIsAssistantOpen(true)}\n        onOpenSahayata={() => setIsSahayataOpen(true)}`
  );
}

// Add component
if (!code.includes('<SahayataForum')) {
  code = code.replace(
    `{isAssistantOpen && <DharmicAssistant onClose={() => setIsAssistantOpen(false)} />}`,
    `{isAssistantOpen && <DharmicAssistant onClose={() => setIsAssistantOpen(false)} />}\n      {isSahayataOpen && <SahayataForum onClose={() => setIsSahayataOpen(false)} />}`
  );
}

fs.writeFileSync('src/App.tsx', code);
