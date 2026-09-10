import re

with open('src/components/common/AppLogo.tsx', 'r') as f:
    content = f.read()

# Make AppLogo use amber-500 instead of #FF9933 for consistency with PortalLogin stone theme
content = content.replace('text-[#FF9933]', 'text-amber-500')
# No slate to replace here based on the cat output

with open('src/components/common/AppLogo.tsx', 'w') as f:
    f.write(content)
