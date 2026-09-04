import re

with open('src/components/common/Sidebar.tsx', 'r') as f:
    content = f.read()

# Replace activeWorkspace?.type || 'Mandir' with activeWorkspace
content = content.replace("isModuleAllowed(activeWorkspace?.type || 'Mandir', m.id)", "isModuleAllowed(activeWorkspace, m.id)")

# Add App Store to MODULE_CATALOG
app_store_module = """  { id: 'appStore', name: 'App Store & Add-ons', domain: 6, domainTitle: 'Governance & Security', icon: Blocks, badge: 'Integrations' },
"""

if "id: 'appStore'" not in content:
    content = content.replace("  { id: 'masterSettings', name: 'Organization Settings & Logos',", app_store_module + "  { id: 'masterSettings', name: 'Organization Settings & Logos',")

# Ensure Blocks is imported from lucide-react
if "Blocks," not in content and "Blocks " not in content:
    content = content.replace("import { ", "import { Blocks, ")
    
# Update checking logic for App Store permissions
if "else if (['workspace-hub', 'masterSettings', 'spiritualSettings', 'panchayatPolls'].includes(m.id)) {" in content:
    content = content.replace(
        "else if (['workspace-hub', 'masterSettings', 'spiritualSettings', 'panchayatPolls'].includes(m.id)) {",
        "else if (['workspace-hub', 'masterSettings', 'appStore', 'spiritualSettings', 'panchayatPolls'].includes(m.id)) {"
    )
elif "['workspace-hub', 'masterSettings'" in content:
    content = content.replace("['workspace-hub', 'masterSettings'", "['workspace-hub', 'masterSettings', 'appStore'")
else:
    print("Could not patch AppStore permissions cleanly")

with open('src/components/common/Sidebar.tsx', 'w') as f:
    f.write(content)

