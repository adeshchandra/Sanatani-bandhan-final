import re
with open('src/components/domain7/YatraNetDesk.tsx', 'r') as f:
    text = f.read()

# very basic check for unmatched tags
tags = re.findall(r'<([a-zA-Z0-9]+)[^>]*?(?<!/)>|</([a-zA-Z0-9]+)>', text)
stack = []
for start, end in tags:
    if start:
        stack.append(start)
    elif end:
        if stack and stack[-1] == end:
            stack.pop()
        else:
            print(f"Mismatch: expected {stack[-1] if stack else 'NONE'}, got {end}")

print(f"Remaining stack: {stack[-20:]}")
