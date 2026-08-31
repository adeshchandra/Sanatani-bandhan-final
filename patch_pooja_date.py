import re

with open('src/components/domain1/DevoteeGrid.tsx', 'r') as f:
    content = f.read()

target = """          id: p.id,
          date: p._createdAt,
          type: 'pooja',"""

replacement = """          id: p.id,
          date: new Date(p.bookingDate || Date.now()).getTime(),
          type: 'pooja',"""

if target in content:
    content = content.replace(target, replacement)
    with open('src/components/domain1/DevoteeGrid.tsx', 'w') as f:
        f.write(content)
    print("Patched pooja date successfully")
else:
    print("Target pooja date not found")
