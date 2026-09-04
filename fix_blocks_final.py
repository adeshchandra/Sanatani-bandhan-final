with open('src/components/common/Sidebar.tsx', 'r') as f:
    content = f.read()

# Add Blocks inside lucide-react import
content = content.replace("import { LayoutDashboard", "import { Blocks, LayoutDashboard")

with open('src/components/common/Sidebar.tsx', 'w') as f:
    f.write(content)

with open('src/components/domain6/AppStoreDesk.tsx', 'r') as f:
    content = f.read()

content = content.replace("import { Blocks, CheckCircle2", "import { Layers as Blocks, CheckCircle2")

with open('src/components/domain6/AppStoreDesk.tsx', 'w') as f:
    f.write(content)
