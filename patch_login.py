import re

filepath = 'src/components/public/PortalLogin.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# Add useData to PortalLogin
if "useData" not in content:
    content = content.replace("import { useAuthWorkspace } from '../../context/AuthWorkspaceContext';", "import { useAuthWorkspace } from '../../context/AuthWorkspaceContext';\nimport { useData } from '../../context/DataContext';")
    
    content = content.replace("const { loginWithPin, loginAsRole } = useAuthWorkspace();", "const { loginWithPin, loginAsRole } = useAuthWorkspace();\n  const { devotees } = useData();")
    
    content = content.replace("const ok = loginWithPin(credTrim, []);", "const ok = loginWithPin(credTrim, devotees);")

with open(filepath, 'w') as f:
    f.write(content)
