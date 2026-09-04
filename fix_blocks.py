with open('src/components/common/Sidebar.tsx', 'r') as f:
    content = f.read()

import re

# Clean up any duplicated "Blocks" imports we might have caused
content = re.sub(r'^\s*Blocks,\s*\n\s*Blocks,', '  Blocks,', content, flags=re.MULTILINE)

# Ensure 'lucide-react' actually has Blocks exported by Vite
# Let's change the icon completely in the Sidebar catalog just to break the infinite import loop.

content = content.replace("icon: Blocks", "icon: Layers")

with open('src/components/common/Sidebar.tsx', 'w') as f:
    f.write(content)
