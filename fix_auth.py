import re

filepath = 'src/context/AuthWorkspaceContext.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# Fix the useState tuple
content = content.replace("const [isAuthenticated,\n        firebaseUser, setIsAuthenticated]", "const [isAuthenticated, setIsAuthenticated]")

with open(filepath, 'w') as f:
    f.write(content)

