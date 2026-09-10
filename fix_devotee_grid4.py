import os

def refine_ui(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    new_content = content
    
    # Fix the remaining dark mode bg classes
    new_content = new_content.replace('bg-temple-800 hover:bg-temple-700', 'bg-temple-50 hover:bg-temple-100')
    new_content = new_content.replace('file:bg-temple-800 file:text-temple-700 hover:file:bg-temple-700', 'file:bg-temple-50 file:text-temple-700 hover:file:bg-temple-100')
    
    # Check for text-temple-300 or text-temple-200
    new_content = new_content.replace('text-temple-300', 'text-temple-700')
    new_content = new_content.replace('text-temple-200', 'text-temple-900')
    
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        return True
    return False

if os.path.exists('src/components/domain1/DevoteeGrid.tsx'):
    refine_ui('src/components/domain1/DevoteeGrid.tsx')
    print("DevoteeGrid UI refined completely.")
else:
    print("File not found.")
