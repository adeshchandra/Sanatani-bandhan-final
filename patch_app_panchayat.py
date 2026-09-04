import re

filepath = 'src/App.tsx'
with open(filepath, 'r') as f:
    content = f.read()

if 'PanchayatPollingDesk' not in content:
    content = content.replace("import { SevadarRosterDesk } from './components/domain6/SevadarRosterDesk';",
                              "import { SevadarRosterDesk } from './components/domain6/SevadarRosterDesk';\nimport { PanchayatPollingDesk } from './components/domain6/PanchayatPollingDesk';")
    
    routing_old = """      case 'masterSettings':
      case 'panchayatPolls':
      case 'socialWall':
        return checkPermission(['trustee']) ? <MasterSettingsDesk /> : <RestrictedAccess />;"""
        
    routing_new = """      case 'masterSettings':
      case 'socialWall':
        return checkPermission(['trustee']) ? <MasterSettingsDesk /> : <RestrictedAccess />;
      case 'panchayatPolls':
        return checkPermission(['trustee', 'manager']) ? <PanchayatPollingDesk /> : <RestrictedAccess />;"""
        
    content = content.replace(routing_old, routing_new)
    
    with open(filepath, 'w') as f:
        f.write(content)
        print("Updated App.tsx")
else:
    print("Already updated")
