with open('src/components/common/Sidebar.tsx', 'r') as f:
    content = f.read()

import re

# Remove any duplicated import React blocks from the top
content = re.sub(r'^import React.*?;\n+', '', content, flags=re.MULTILINE)

# Remove any explicit import { Blocks } ... 
content = re.sub(r'^import { Blocks } from "lucide-react";\n+', '', content, flags=re.MULTILINE)

# Prepend the single, correct React import
content = 'import React, { useState, useEffect } from "react";\n' + content

# Make sure Blocks is inside the massive lucide-react import
if 'Blocks' not in content.split('from "lucide-react"')[0] and 'Blocks' not in content.split("from 'lucide-react'")[0]:
    # It must be added
    content = content.replace("import {\n  LayoutDashboard,", "import {\n  Blocks,\n  LayoutDashboard,")


with open('src/components/common/Sidebar.tsx', 'w') as f:
    f.write(content)
