const fs = require('fs');
let code = fs.readFileSync('src/context/AuthWorkspaceContext.tsx', 'utf8');

if (!code.includes("viewMode: 'ADMIN' | 'MEMBER'")) {
  code = code.replace(
    "interface AuthWorkspaceContextType {",
    "interface AuthWorkspaceContextType {\n  viewMode: 'ADMIN' | 'MEMBER';\n  setViewMode: (mode: 'ADMIN' | 'MEMBER') => void;"
  );
}

if (!code.includes("const [viewMode, setViewMode]")) {
  code = code.replace(
    "const [activeWorkspaceId, setActiveWorkspaceId] = useState<string>",
    "const [viewMode, setViewMode] = useState<'ADMIN' | 'MEMBER'>('MEMBER');\n  const [activeWorkspaceId, setActiveWorkspaceId] = useState<string>"
  );
}

if (!code.includes("viewMode,")) {
  code = code.replace(
    "return (\n    <AuthWorkspaceContext.Provider value={{",
    "return (\n    <AuthWorkspaceContext.Provider value={{\n      viewMode,\n      setViewMode,"
  );
}

// Ensure default view mode is based on role, but we can just default to 'MEMBER' for safety,
// or we can set it during login. For now, let's just expose the state.
fs.writeFileSync('src/context/AuthWorkspaceContext.tsx', code);
