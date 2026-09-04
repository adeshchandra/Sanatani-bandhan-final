import re

filepath = 'src/App.tsx'
with open(filepath, 'r') as f:
    content = f.read()

if "import { PanchayatPollingDesk }" not in content:
    content = content.replace("import { MasterSettingsDesk } from './components/domain6/MasterSettingsDesk';",
                              "import { MasterSettingsDesk } from './components/domain6/MasterSettingsDesk';\nimport { PanchayatPollingDesk } from './components/domain6/PanchayatPollingDesk';")

with open(filepath, 'w') as f:
    f.write(content)
