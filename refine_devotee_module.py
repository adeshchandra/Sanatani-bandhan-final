import os
import re

directories = [
    'src/components/devotee'
]

def refine_ui(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    new_content = content
    
    # 1. Replace overly heavy fonts with more refined ones
    new_content = new_content.replace('font-black', 'font-semibold')
    new_content = new_content.replace('font-extrabold', 'font-semibold')
    
    # 2. Fix the flat gradients
    new_content = new_content.replace(
        'bg-gradient-to-r from-saffron-500 to-saffron-600',
        'bg-saffron-500'
    )
    new_content = new_content.replace(
        'hover:from-saffron-600 hover:to-saffron-700',
        'hover:bg-saffron-600'
    )
    new_content = new_content.replace(
        'bg-gradient-to-br from-saffron-500 to-saffron-500',
        'bg-saffron-500'
    )
    new_content = new_content.replace(
        'bg-gradient-to-br from-saffron-100 to-saffron-200',
        'bg-saffron-100'
    )
    new_content = new_content.replace(
        'bg-gradient-to-br from-saffron-500 via-saffron-500 to-saffron-600',
        'bg-saffron-500'
    )
    
    # 3. Clean up the generic rounded shapes
    new_content = new_content.replace('rounded-2xl', 'rounded-xl')
    new_content = new_content.replace('rounded-3xl', 'rounded-xl')
    
    # 4. Remove heavy shadows, use more subtle ones
    new_content = new_content.replace('shadow-lg shadow-saffron-500/20', 'shadow-sm')
    new_content = new_content.replace('shadow-md', 'shadow-sm')
    
    # 5. Background replacements
    # Avoid too much temple-100, use temple-50 or white
    new_content = new_content.replace('bg-temple-100', 'bg-temple-50')
    new_content = new_content.replace('bg-saffron-500 text-temple-950', 'bg-saffron-500 text-white')
    
    # Check if there are any specific weird structures in DevoteeQRPass, DonationHistory, etc.
    
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
                    if refine_ui(os.path.join(root, file)):
                        changed_files += 1

print(f"Refined {changed_files} files.")
