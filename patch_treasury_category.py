import re

filepath = 'src/components/domain2/TreasuryLedgerDesk.tsx'
with open(filepath, 'r') as f:
    content = f.read()

content = content.replace("tx.category.toLowerCase()", "(tx.category || '').toLowerCase()")

with open(filepath, 'w') as f:
    f.write(content)
