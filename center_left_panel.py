import re

with open('src/components/public/PortalLogin.tsx', 'r') as f:
    content = f.read()

# Desktop Logo Center
content = content.replace(
    '<div className="relative z-10 flex items-center gap-3">',
    '<div className="relative z-10 flex flex-col items-center justify-center gap-3 text-center">'
)

# Text left to text center
content = content.replace(
    '<div className="relative z-10 my-16">',
    '<div className="relative z-10 my-16 flex flex-col items-center text-center">'
)
content = content.replace(
    '<div className="relative z-10 flex items-center justify-between border-t border-stone-800 pt-6">',
    '<div className="relative z-10 flex items-center justify-between border-t border-stone-800/50 pt-6">'
)

with open('src/components/public/PortalLogin.tsx', 'w') as f:
    f.write(content)
