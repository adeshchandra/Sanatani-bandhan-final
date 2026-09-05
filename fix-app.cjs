const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Add redirect
content = content.replace(
  "  const [activeModule, setActiveModule] = useState<string>('dashboard');",
  "  const [activeModule, setActiveModule] = useState<string>('dashboard');\n  React.useEffect(() => {\n    if (currentRole === 'DEVOTEE' && activeModule === 'dashboard') {\n      setActiveModule('devotee-portal');\n    }\n  }, [currentRole, activeModule]);"
);

// Add route
content = content.replace(
  "      case 'dashboard':",
  "      case 'devotee-portal':\n        return <DevoteePortal />;\n      case 'dashboard':"
);

fs.writeFileSync('src/App.tsx', content);
