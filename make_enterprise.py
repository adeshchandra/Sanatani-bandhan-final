import os
import re

directories = [
    'src/components/devotee'
]

def enterprise_refine(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    new_content = content
    
    # Tone down bold text in small UI components for a more refined look
    new_content = new_content.replace('font-black', 'font-semibold')
    new_content = new_content.replace('font-extrabold', 'font-semibold')
    new_content = new_content.replace('<span className="text-xs font-bold text-temple-700">', '<span className="text-xs font-medium text-temple-700">')
    
    # Improve background of SanataniSocialFeed post cards 
    # (some were bg-gradient-to-br from-saffron-50/70 to-saffron-50/50 border border-saffron-200/80)
    new_content = new_content.replace('bg-gradient-to-br from-saffron-50/70 to-saffron-50/50 border border-saffron-200/80 rounded-xl relative overflow-hidden', 'bg-white border border-temple-200 rounded-xl relative overflow-hidden shadow-sm')
    
    # Replace overly colorful elements with more subtle enterprise tones
    new_content = new_content.replace('bg-rose-50 text-rose-900 border border-rose-200', 'bg-temple-50 text-temple-900 border border-temple-200')
    new_content = new_content.replace('bg-emerald-50 text-emerald-900 border border-emerald-200', 'bg-emerald-50 text-emerald-800 border border-emerald-200')
    
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
                    if enterprise_refine(os.path.join(root, file)):
                        changed_files += 1

print(f"Enterprise refined {changed_files} files.")
