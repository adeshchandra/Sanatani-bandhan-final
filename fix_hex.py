import os
import re

directories = [
    'src/components'
]

def replace_hex(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    new_content = content
    # Replace arbitrary tailwind brackets with hardcoded hex
    new_content = new_content.replace('text-[#FF9933]', 'text-saffron-500')
    new_content = new_content.replace('bg-[#FF9933]', 'bg-saffron-500')
    new_content = new_content.replace('border-[#FF9933]', 'border-saffron-500')
    new_content = new_content.replace('ring-[#FF9933]', 'ring-saffron-500')
    new_content = new_content.replace('shadow-[0_0_10px_rgba(255,153,51,0.2)]', 'shadow-saffron-500/20')
    new_content = new_content.replace('from-[#FF9933]', 'from-saffron-500')
    new_content = new_content.replace('to-[#FF9933]', 'to-saffron-500')
    new_content = new_content.replace('via-[#FF9933]', 'via-saffron-500')

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
                    if replace_hex(os.path.join(root, file)):
                        changed_files += 1

print(f"Changed {changed_files} files.")
