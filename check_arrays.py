import re
import os
import ast

def find_duplicates(file_path):
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Try to find arrays defined with [...]
    array_matches = re.finditer(r'\[([^\[\]]+)\]', content)
    for m in array_matches:
        arr_str = m.group(1)
        ids = re.findall(r'id:\s*[\'"]([^\'"]+)[\'"]', arr_str)
        if ids:
            from collections import Counter
            counts = Counter(ids)
            dupes = [k for k, v in counts.items() if v > 1]
            if dupes:
                print(f"{file_path}: duplicate IDs in array: {dupes}")

for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            find_duplicates(os.path.join(root, file))
