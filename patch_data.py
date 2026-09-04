import re

filepath = 'src/context/DataContext.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# Add to destructuring
content = content.replace("const { activeWorkspace, currentRole, isAuthenticated } = useAuthWorkspace();", "const { activeWorkspace, currentRole, isAuthenticated, firebaseUser } = useAuthWorkspace();")

# Update useEffect condition
content = content.replace("if (!activeWorkspace?.id || !isAuthenticated) return;", "if (!activeWorkspace?.id || !isAuthenticated || !firebaseUser) return;")

# Update useEffect dependencies
content = content.replace("}, [activeWorkspace?.id, isAuthenticated]);", "}, [activeWorkspace?.id, isAuthenticated, firebaseUser]);")

with open(filepath, 'w') as f:
    f.write(content)

