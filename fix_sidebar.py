with open('src/components/common/Sidebar.tsx', 'r') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if "id: 'crisis-command'" in line and "domainTitle:" in line:
        lines[i] = "  { id: 'crisis-command', name: 'Crisis Command Center', domain: 6, domainTitle: 'Governance & Security', icon: ShieldAlert, badge: 'SOS' },\n"

with open('src/components/common/Sidebar.tsx', 'w') as f:
    f.writelines(lines)
