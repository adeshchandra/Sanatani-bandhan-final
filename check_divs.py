import re
with open('src/components/domain7/YatraNetDesk.tsx', 'r') as f:
    lines = f.readlines()

div_count = 0
for i, line in enumerate(lines):
    div_count += len(re.findall(r'<div\b[^>]*>', line))
    div_count -= len(re.findall(r'</div\s*>', line))
    if div_count < 0:
        print(f"Negative div count at line {i+1}: {line.strip()}")
        break
print(f"Final div count: {div_count}")
