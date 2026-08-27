const fs = require('fs');
let code = fs.readFileSync('src/components/devotee/MemberAppShell.tsx', 'utf8');

code = code.replace(
  "const [activeTab, setActiveTab] = useState('HOME');",
  `const [activeTab, setActiveTab] = useState('HOME');

  React.useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'view_member_tab',
        member_tab: activeTab,
        workspace_id: activeWorkspace?.id
      });
    }
  }, [activeTab, activeWorkspace]);`
);

fs.writeFileSync('src/components/devotee/MemberAppShell.tsx', code);
