import os
import re

def refine_ui(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    new_content = content
    
    # Fix remaining text-saffron-400 which is hard to read on light backgrounds
    new_content = new_content.replace('text-saffron-400', 'text-saffron-600')
    new_content = new_content.replace('text-saffron-500/90', 'text-saffron-600')
    new_content = new_content.replace('text-saffron-500/70', 'text-saffron-600/70')
    new_content = new_content.replace('text-saffron-500/30', 'text-saffron-200')
    new_content = new_content.replace('border-saffron-500/30', 'border-saffron-200')
    new_content = new_content.replace('border-saffron-500/40', 'border-saffron-200')
    new_content = new_content.replace('bg-saffron-500/10', 'bg-saffron-50')
    new_content = new_content.replace('text-saffron-500', 'text-saffron-600')
    
    # Double check some classes
    new_content = new_content.replace('text-saffron-600/90', 'text-saffron-600')
    
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        return True
    return False

if os.path.exists('src/components/domain1/DevoteeGrid.tsx'):
    refine_ui('src/components/domain1/DevoteeGrid.tsx')
    print("DevoteeGrid UI text contrast refined.")
else:
    print("File not found.")
