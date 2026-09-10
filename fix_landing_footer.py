import re

with open('src/components/public/LandingPage.tsx', 'r') as f:
    content = f.read()

# Fix the dark footer logo text visibility
content = re.sub(
    r'<span className="text-stone-900">Bandhan</span>',
    r'<span className="text-stone-400">Bandhan</span>',
    content
)

# Also check for remaining slop
content = re.sub(
    r'shadow-\[0_8px_20px_.*?\]',
    r'shadow-sm',
    content
)

with open('src/components/public/LandingPage.tsx', 'w') as f:
    f.write(content)
