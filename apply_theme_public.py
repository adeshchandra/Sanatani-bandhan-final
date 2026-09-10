import os
import re

directories = [
    'src/components/public'
]

def replace_theme(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    new_content = content
    new_content = re.sub(r'amber-', r'saffron-', new_content)
    new_content = re.sub(r'orange-', r'saffron-', new_content)
    new_content = re.sub(r'stone-', r'temple-', new_content)

    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        return True
    return False

changed_files = 0
for d in directories:
    if os.path.exists(d):
        for root, dirs, files in os.walk(d):
            for file in files:
                if file.endswith('.tsx') or file.endswith('.ts'):
                    if replace_theme(os.path.join(root, file)):
                        changed_files += 1

print(f"Changed {changed_files} files.")
