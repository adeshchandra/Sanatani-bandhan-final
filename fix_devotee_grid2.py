import os
import re

def refine_ui(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    new_content = content
    
    # Text colors
    new_content = new_content.replace('text-temple-100', 'text-temple-900')
    new_content = new_content.replace('text-temple-200', 'text-temple-900')
    new_content = new_content.replace('text-temple-300', 'text-temple-700')
    new_content = new_content.replace('text-temple-400', 'text-temple-600')
    
    # Action buttons standardizing
    new_content = new_content.replace('bg-temple-800 hover:bg-temple-750', 'bg-white hover:bg-temple-50')
    new_content = new_content.replace('border-temple-700', 'border-temple-200')
    
    # Table headers and rows
    new_content = new_content.replace('bg-temple-800/50', 'bg-temple-50')
    new_content = new_content.replace('border-temple-800', 'border-temple-200')
    new_content = new_content.replace('hover:bg-temple-800/30', 'hover:bg-temple-50/50')
    
    # Modal background
    new_content = new_content.replace('bg-temple-950/80', 'bg-temple-950/40')
    new_content = new_content.replace('bg-temple-900', 'bg-white')
    
    # Badges
    new_content = new_content.replace('bg-saffron-500/10 border border-saffron-500/30 text-saffron-400', 'bg-saffron-50 text-saffron-700 border border-saffron-200')
    new_content = new_content.replace('bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-400', 'bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700')
    new_content = new_content.replace('bg-green-500/10 border border-green-500/30 text-green-400', 'bg-green-50 text-green-700 border border-green-200')
    
    new_content = new_content.replace('bg-saffron-500/20 text-saffron-400', 'bg-saffron-100 text-saffron-800')
    new_content = new_content.replace('bg-purple-500/20 text-purple-300 border-purple-500/40', 'bg-purple-50 text-purple-700 border-purple-200')
    new_content = new_content.replace('bg-blue-500/20 text-blue-300 border-blue-500/40', 'bg-blue-50 text-blue-700 border-blue-200')
    
    # Remove excessive bolding
    new_content = new_content.replace('font-bold', 'font-semibold')
    
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
