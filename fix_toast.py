with open('src/components/domain6/SevadarRosterDesk.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("const { addToast } = useToast();", "const { showToast } = useToast();")
content = content.replace("addToast(", "showToast(")

with open('src/components/domain6/SevadarRosterDesk.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
