with open('src/App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("import { YatraNetDesk } from './components/domain7/YatraNetDesk';", "import { YatraNetDesk } from './components/domain7/YatraNetDesk';\nimport { DharamshalaDesk } from './components/domain4/DharamshalaDesk';\nimport { SevadarRosterDesk } from './components/domain6/SevadarRosterDesk';")

# Replace route mappings
content = content.replace("      case 'dharamshala':", "")
content = content.replace("      case 'sevadarRoster':", "")

# Add them back correctly
content = content.replace("      case 'ashramKutir':", "      case 'dharamshala':\n        return <DharamshalaDesk />;\n      case 'sevadarRoster':\n        return checkPermission(['manager', 'head_admin', 'superadmin', 'master_admin']) ? <SevadarRosterDesk /> : <RestrictedAccess />;\n      case 'ashramKutir':")

with open('src/App.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
