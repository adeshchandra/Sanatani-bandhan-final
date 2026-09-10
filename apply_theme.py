import os
import re

directories = [
    'src/components/devotee',
    'src/components/dashboard',
    'src/components/domain1',
    'src/components/domain2',
    'src/components/domain3',
    'src/components/domain4',
    'src/components/domain5',
    'src/components/domain6',
    'src/components/domain7',
    'src/components/common',
    'src/components/admin',
    'src/components/account'
]

# Specifically replace stone- with temple-, amber- with saffron-, and orange- with saffron-
# Wait, some orange- colors might be used in gradients (e.g. from-amber-500 to-orange-600).
# Changing both to saffron- (from-saffron-500 to-saffron-600) works beautifully!

def replace_theme(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    new_content = content
    # Replace amber and orange first
    new_content = re.sub(r'amber-', r'saffron-', new_content)
    new_content = re.sub(r'orange-', r'saffron-', new_content)
    
    # Replace stone
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
