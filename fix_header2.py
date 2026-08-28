with open('src/components/common/Header.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("  onOpenSahayata,\n  activeModule,", "  onOpenSahayata,\n  onOpenGuide,\n  activeModule,")

with open('src/components/common/Header.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
