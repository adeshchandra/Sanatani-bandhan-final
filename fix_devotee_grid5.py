import os

def refine_ui(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    new_content = content
    
    # Fix remaining dark theme modals bg-temple-950
    new_content = new_content.replace('bg-temple-950/60', 'bg-white shadow-sm')
    new_content = new_content.replace('bg-temple-950/40', 'bg-temple-950/20') # Keep the overlay dark but less intense
    new_content = new_content.replace('bg-temple-950/50', 'bg-white shadow-sm') 
    
    # Text in modal
    new_content = new_content.replace('text-temple-100', 'text-temple-900')
    
    # Ensure borders are correct
    new_content = new_content.replace('border-temple-200/60', 'border-temple-200')
    
    # Action buttons standardizing
    new_content = new_content.replace('text-temple-950 font-semibold', 'text-white font-semibold')
    
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        return True
    return False

if os.path.exists('src/components/domain1/DevoteeGrid.tsx'):
    refine_ui('src/components/domain1/DevoteeGrid.tsx')
    print("DevoteeGrid UI modals refined.")
else:
    print("File not found.")
