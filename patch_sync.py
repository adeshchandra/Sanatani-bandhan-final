import re

filepath = 'src/context/DataContext.tsx'
with open(filepath, 'r') as f:
    content = f.read()

content = content.replace(
    "const { activeWorkspace, currentRole } = useAuthWorkspace();",
    "const { activeWorkspace, currentRole, isAuthenticated } = useAuthWorkspace();"
)

content = content.replace(
    "if (!activeWorkspace?.id) return;",
    "if (!activeWorkspace?.id || !isAuthenticated) return;"
)

content = content.replace(
    "}, [activeWorkspace?.id]);",
    "}, [activeWorkspace?.id, isAuthenticated]);"
)

with open(filepath, 'w') as f:
    f.write(content)

