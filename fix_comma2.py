with open('src/context/LanguageContext.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("}\n  sa: {", "},\n  sa: {")

with open('src/context/LanguageContext.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
