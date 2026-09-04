with open('src/components/common/Sidebar.tsx', 'r') as f:
    content = f.read()

import re
# Ensure Layers replaces Blocks in the import
content = re.sub(r'import\s*\{\s*Blocks,\s*LayoutDashboard', 'import { Layers, LayoutDashboard', content)

with open('src/components/common/Sidebar.tsx', 'w') as f:
    f.write(content)
