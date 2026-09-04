import re

filepath = 'src/components/domain3/PoojaBookingDesk.tsx'
with open(filepath, 'r') as f:
    content = f.read()

content = content.replace("  const pendingConfirmations = poojas.filter((p) => !p.status || p.status.toLowerCase() === 'pending').length;\n\n    (p) =>", "  const pendingConfirmations = poojas.filter((p) => !p.status || p.status.toLowerCase() === 'pending').length;\n\n  const filteredPoojas = poojas.filter(\n    (p) =>")

with open(filepath, 'w') as f:
    f.write(content)
