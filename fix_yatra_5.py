import re
filepath = 'src/components/domain7/YatraNetDesk.tsx'
with open(filepath, 'r') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if i == 885 and line.strip() == '</div>':
        lines[i] = '      </>\n'

with open(filepath, 'w') as f:
    f.writelines(lines)
