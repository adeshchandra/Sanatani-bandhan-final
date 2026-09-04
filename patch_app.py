import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Add import
if "import { AppStoreDesk }" not in content:
    content = content.replace(
        "import { MasterSettingsDesk } from './components/domain6/MasterSettingsDesk';",
        "import { MasterSettingsDesk } from './components/domain6/MasterSettingsDesk';\nimport { AppStoreDesk } from './components/domain6/AppStoreDesk';"
    )

# Add route
if "case 'appStore':" not in content:
    route = """      case 'appStore':
        return checkPermission(['trustee']) ? <AppStoreDesk /> : <RestrictedAccess />;
"""
    content = content.replace("      case 'masterSettings':", route + "      case 'masterSettings':")

with open('src/App.tsx', 'w') as f:
    f.write(content)

