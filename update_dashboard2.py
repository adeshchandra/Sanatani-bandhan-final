with open('src/components/dashboard/DashboardHome.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("{currentUser?.sevaIndex?.toLocaleString() || 1245} <span", "{currentDevotee?.sevaIndex?.toLocaleString() || 1245} <span")

# Check if currentDevotee is destructured
if "currentDevotee" not in content.split("} = useAuthWorkspace();")[0]:
    content = content.replace("  const { activeWorkspace, currentRole, checkPermission } = useAuthWorkspace();", "  const { activeWorkspace, currentRole, checkPermission, currentDevotee } = useAuthWorkspace();")

with open('src/components/dashboard/DashboardHome.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
