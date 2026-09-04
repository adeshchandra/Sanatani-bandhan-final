import re

filepath = 'src/components/domain6/PanchayatPollingDesk.tsx'
with open(filepath, 'r') as f:
    content = f.read()

content = content.replace('<div className="hidden">', '')

with open(filepath, 'w') as f:
    f.write(content)
