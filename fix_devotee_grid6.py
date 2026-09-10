import os

def refine_ui(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    new_content = content
    
    # Fix the remaining table headers
    new_content = new_content.replace('bg-temple-950/20 text-temple-600', 'bg-temple-50 text-temple-700')
    new_content = new_content.replace('bg-white shadow-sm text-temple-600 border-b border-temple-200', 'bg-temple-50 text-temple-700 border-b border-temple-200 uppercase tracking-wider text-[10px]')
    
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        return True
    return False

if os.path.exists('src/components/domain1/DevoteeGrid.tsx'):
    refine_ui('src/components/domain1/DevoteeGrid.tsx')
    print("DevoteeGrid UI table headers refined.")
else:
    print("File not found.")
