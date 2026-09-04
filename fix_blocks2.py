with open('src/components/common/Sidebar.tsx', 'r') as f:
    content = f.read()

import re

# Remove any erroneous "Blocks," injected into other imports by the sed command
content = re.sub(r'import \{\s*Blocks,\s*', 'import { ', content, flags=re.MULTILINE)

# specifically for lucide-react, add it back clean
content = content.replace("import {  LayoutDashboard,", "import {  Blocks, LayoutDashboard,")

with open('src/components/common/Sidebar.tsx', 'w') as f:
    f.write(content)
