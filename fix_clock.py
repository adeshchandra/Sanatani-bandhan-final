import re
filepath = 'src/components/domain4/SanataniVivahDesk.tsx'
with open(filepath, 'r') as f:
    text = f.read()

text = text.replace("import { Lock } from 'lucide-react';", "import { Lock, Clock } from 'lucide-react';")

with open(filepath, 'w') as f:
    f.write(text)
