import os
import re

def refine_ui(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    new_content = content
    
    # Target standard light theme backgrounds instead of dark mode
    new_content = new_content.replace('bg-temple-900/90 border border-temple-800 text-temple-100', 'bg-white border border-temple-200 text-temple-900 shadow-sm')
    new_content = new_content.replace('bg-temple-900/90 border border-temple-800', 'bg-white border border-temple-200 shadow-sm')
    new_content = new_content.replace('bg-temple-800 border border-temple-700', 'bg-white border border-temple-200 shadow-sm')
    
    new_content = new_content.replace('text-temple-200', 'text-temple-900')
    new_content = new_content.replace('text-temple-300', 'text-temple-700')
    new_content = new_content.replace('text-temple-400', 'text-temple-600')
    
    new_content = new_content.replace('font-black', 'font-semibold')
    new_content = new_content.replace('font-extrabold', 'font-semibold')
    
    # Fix the card backgrounds and borders in list view
    new_content = new_content.replace('bg-temple-900/50', 'bg-temple-50')
    new_content = new_content.replace('hover:bg-temple-800', 'hover:bg-temple-100')
    
    # Standardize roundings and shadows
    new_content = new_content.replace('rounded-3xl', 'rounded-xl')
    new_content = new_content.replace('rounded-2xl', 'rounded-xl')
    new_content = new_content.replace('shadow-lg', 'shadow-sm')
    
    # Adjust primary action colors
    new_content = new_content.replace('bg-saffron-600 hover:bg-saffron-500 text-temple-950', 'bg-saffron-500 hover:bg-saffron-600 text-white')
    
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        return True
    return False

if os.path.exists('src/components/domain1/DevoteeGrid.tsx'):
    refine_ui('src/components/domain1/DevoteeGrid.tsx')
    print("DevoteeGrid UI refined.")
else:
    print("File not found.")
