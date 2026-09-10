import os

directories = [
    'src/components'
]

def fix_typo(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    new_content = content
    new_content = new_content.replace('trantemple', 'translate')
    new_content = new_content.replace('transtemple', 'translate')

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
                    if fix_typo(os.path.join(root, file)):
                        changed_files += 1

print(f"Fixed {changed_files} files.")
