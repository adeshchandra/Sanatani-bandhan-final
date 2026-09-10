import os
import re

def refine_ui(filepath):
    if not os.path.exists(filepath):
        print("File not found.")
        return False
        
    with open(filepath, 'r') as f:
        content = f.read()

    new_content = content
    
    # Fix the remaining text contrast
    new_content = new_content.replace('text-saffron-500', 'text-saffron-600')
    new_content = new_content.replace('text-temple-400', 'text-temple-600')
    
    # Make sure text-white is used instead of text-temple-950 on saffron-600 backgrounds
    new_content = new_content.replace('bg-saffron-600 text-temple-950', 'bg-saffron-600 text-white')
    new_content = new_content.replace('bg-saffron-500 text-temple-950', 'bg-saffron-500 text-white')
    
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print("DevoteeGrid UI contrast refined.")
        return True
    
    print("No changes needed.")
    return False

refine_ui('src/components/domain1/DevoteeGrid.tsx')
