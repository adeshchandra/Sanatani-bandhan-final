import re

with open('src/context/DataContext.tsx', 'r') as f:
    content = f.read()

# Find all id: "..." or id: '...' values
ids = re.findall(r'id:\s*[\'"]([^\'"]+)[\'"]', content)
from collections import Counter
counts = Counter(ids)
for i, c in counts.items():
    if c > 1:
        print(f"Duplicate ID found: {i} ({c} times)")

