with open('src/context/LanguageContext.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

import re
# We need to find the duplicate 'sa:' block and merge or remove it.
# Let's first check what's inside LanguageContext.tsx
