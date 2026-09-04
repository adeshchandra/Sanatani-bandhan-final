import re

filepath = 'src/components/domain6/PanchayatPollingDesk.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# Fix activeMember -> currentUser
content = content.replace("const { activeWorkspace, activeMember } = useAuthWorkspace();", 
                          "const { activeWorkspace, currentUser } = useAuthWorkspace();")
content = content.replace("useState(activeMember?.name || 'Admin');", 
                          "useState(currentUser?.name || 'Admin');")

# Fix checkGate('governance') -> checkGate('events')
content = content.replace("if (!checkGate('governance', resolutions.length)) {", 
                          "if (!checkGate('events', resolutions.length)) {")

# Fix Omit type for TrusteeResolution
content = content.replace("status: 'Pending Review',", 
                          "status: 'Pending Review',\n      details: '',\n      quorumMet: false,")

with open(filepath, 'w') as f:
    f.write(content)
