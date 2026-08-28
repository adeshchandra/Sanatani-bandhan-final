with open('src/App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

import re

# Remove top level imports
content = re.sub(r"import \{ YatraNetDesk \} from '\./components/domain7/YatraNetDesk';\n?", "", content)
content = re.sub(r"import \{ DharamshalaDesk \} from '\./components/domain4/DharamshalaDesk';\n?", "", content)
content = re.sub(r"import \{ SevadarRosterDesk \} from '\./components/domain6/SevadarRosterDesk';\n?", "", content)

# Add to lazy section
lazy_imports = """
const YatraNetDesk = lazy(() => import('./components/domain7/YatraNetDesk').then(m => ({ default: m.YatraNetDesk })));
const DharamshalaDesk = lazy(() => import('./components/domain4/DharamshalaDesk').then(m => ({ default: m.DharamshalaDesk })));
const SevadarRosterDesk = lazy(() => import('./components/domain6/SevadarRosterDesk').then(m => ({ default: m.SevadarRosterDesk })));
"""

content = content.replace("const MemberAppShell = lazy(() => import('./components/devotee/MemberAppShell').then(m => ({ default: m.default })));", "const MemberAppShell = lazy(() => import('./components/devotee/MemberAppShell').then(m => ({ default: m.default })));\n" + lazy_imports)

with open('src/App.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
