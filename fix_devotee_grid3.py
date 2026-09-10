import os

def refine_ui(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    new_content = content
    
    # Fix remaining dark mode remnants and bad color logic
    new_content = new_content.replace('bg-saffron-500/20 text-saffron-300 border-saffron-500/40', 'bg-saffron-50 text-saffron-700 border-saffron-200')
    new_content = new_content.replace('bg-temple-700/50 text-temple-700 border-temple-600', 'bg-temple-50 text-temple-700 border-temple-200')
    new_content = new_content.replace('bg-green-500/20 hover:bg-green-500/30 text-green-400', 'bg-green-50 hover:bg-green-100 text-green-700')
    new_content = new_content.replace('bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-400', 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700')
    new_content = new_content.replace('border-temple-200/50', 'border-temple-200')
    
    # Fix the initials circle
    new_content = new_content.replace('bg-saffron-500/10 border border-saffron-500/30 flex items-center justify-center font-semibold text-saffron-400', 'bg-saffron-100 border border-saffron-200 flex items-center justify-center font-semibold text-saffron-700')
    
    # Fix tags
    new_content = new_content.replace('bg-saffron-500/10 px-1.5 py-0.5 rounded border border-saffron-500/30', 'bg-saffron-50 px-1.5 py-0.5 rounded border border-saffron-200 text-saffron-700')
    new_content = new_content.replace('text-saffron-500 bg-saffron-50', 'text-saffron-700 bg-saffron-50')
    
    new_content = new_content.replace('bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-500/30', 'bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200 text-rose-700')
    new_content = new_content.replace('text-rose-400 bg-rose-50', 'text-rose-700 bg-rose-50')
    
    new_content = new_content.replace('bg-rose-500/10 p-1.5 rounded-lg border border-rose-500/20', 'bg-rose-50 p-1.5 rounded-lg border border-rose-200 text-rose-900')
    
    new_content = new_content.replace('text-saffron-500/80 bg-saffron-500/5 px-2 py-1 rounded border border-saffron-500/10', 'text-saffron-700 bg-saffron-50 px-2 py-1 rounded border border-saffron-200')
    
    # Table styles
    new_content = new_content.replace('bg-temple-900/50', 'bg-temple-50')
    new_content = new_content.replace('hover:bg-temple-800/50', 'hover:bg-temple-100')
    
    # Modal input fields
    new_content = new_content.replace('bg-temple-900 border border-temple-800 rounded-xl px-4 py-2.5 text-sm text-temple-100', 'bg-white border border-temple-200 rounded-xl px-4 py-2.5 text-sm text-temple-900 shadow-sm')
    new_content = new_content.replace('bg-temple-900 border border-temple-800 rounded-xl p-3 text-sm text-temple-100', 'bg-white border border-temple-200 rounded-xl p-3 text-sm text-temple-900 shadow-sm')
    
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        return True
    return False

if os.path.exists('src/components/domain1/DevoteeGrid.tsx'):
    refine_ui('src/components/domain1/DevoteeGrid.tsx')
    print("DevoteeGrid UI refined further.")
else:
    print("File not found.")
