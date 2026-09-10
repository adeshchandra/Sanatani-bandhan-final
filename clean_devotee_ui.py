import os
import re

def clean_file(filepath):
    if not os.path.exists(filepath): return
    with open(filepath, 'r') as f:
        content = f.read()

    new_content = content
    
    # 1. MemberAppShell.tsx cleanups
    new_content = new_content.replace(
        'bg-gradient-to-r from-temple-900 via-temple-800 to-saffron-950 text-white px-3 sm:px-5 py-2 flex items-center justify-between text-xs shrink-0 shadow-md border-b border-saffron-500/30',
        'bg-temple-950 text-white px-4 sm:px-6 py-2.5 flex items-center justify-between text-xs shrink-0 border-b border-temple-800'
    )
    new_content = new_content.replace(
        'bg-gradient-to-r from-saffron-500 to-saffron-600 hover:from-saffron-600 hover:to-saffron-700 active:scale-95 text-temple-950 font-black text-xs rounded-lg shadow-md transition-all border border-saffron-300',
        'bg-white/10 hover:bg-white/20 text-white font-medium text-[11px] rounded-lg shadow-sm transition-all border border-white/10 backdrop-blur-sm'
    )
    new_content = new_content.replace(
        'bg-gradient-to-b from-saffron-50/60 to-white',
        'bg-temple-50/50'
    )
    new_content = new_content.replace(
        'bg-gradient-to-br from-saffron-500 via-saffron-500 to-saffron-600',
        'bg-saffron-500'
    )
    
    # Navigation items active states
    new_content = new_content.replace(
        "? 'bg-saffron-500 text-temple-950 shadow-sm border border-saffron-400 font-extrabold'",
        "? 'bg-saffron-50 text-saffron-700 shadow-sm border border-saffron-200 font-semibold'"
    )
    new_content = new_content.replace(
        "? 'bg-saffron-500 text-temple-950 font-extrabold shadow-xs'",
        "? 'bg-saffron-50 text-saffron-700 font-semibold shadow-sm border-b-2 border-saffron-500 rounded-b-none'"
    )
    new_content = new_content.replace(
        "isActive ? 'bg-temple-950/20 text-temple-950' : 'bg-temple-100 text-temple-600 border border-temple-200'",
        "isActive ? 'bg-temple-100 text-temple-900 border border-temple-300' : 'bg-white text-temple-600 border border-temple-200'"
    )
    
    # 2. DevoteePortal.tsx cleanups
    # Remove abstract shapes
    new_content = re.sub(r'<div className="absolute -right-4 -top-4 w-24 h-24 bg-[a-z]+-50 rounded-full group-hover:scale-110 transition-transform"></div>', '', new_content)
    
    # Fix buttons
    new_content = new_content.replace(
        'bg-saffron-500 hover:bg-saffron-600 px-4 py-2 rounded-xl text-sm font-bold text-temple-950 shadow-md transition-colors',
        'bg-saffron-500 hover:bg-saffron-600 px-4 py-2 rounded-xl text-sm font-medium text-white shadow-sm transition-colors'
    )
    new_content = new_content.replace(
        'bg-saffron-500 hover:bg-saffron-600 text-white text-xs font-bold rounded-lg shadow-sm transition-colors',
        'bg-saffron-500 hover:bg-saffron-600 text-white text-xs font-medium rounded-lg shadow-sm transition-colors'
    )
    new_content = new_content.replace(
        "className=\"flex items-center gap-2 bg-white border border-temple-200 px-4 py-2 rounded-xl text-sm font-bold text-temple-700 shadow-sm hover:bg-temple-50 transition-colors\"",
        "className=\"flex items-center gap-2 bg-white border border-temple-200 px-4 py-2 rounded-xl text-sm font-medium text-temple-700 shadow-sm hover:bg-temple-50 transition-colors\""
    )
    
    # Quick action buttons
    new_content = re.sub(
        r'bg-temple-50 hover:bg-([a-z]+)-50 rounded-xl border border-temple-100 hover:border-\1-200 transition-colors',
        r'bg-white hover:bg-temple-50 rounded-xl border border-temple-200 shadow-sm hover:shadow transition-all',
        new_content
    )
    
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)

clean_file('src/components/devotee/MemberAppShell.tsx')
clean_file('src/components/devotee/DevoteePortal.tsx')
