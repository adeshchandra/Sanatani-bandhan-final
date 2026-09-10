import re

with open('src/components/public/PortalLogin.tsx', 'r') as f:
    content = f.read()

# Make the main layout elegant and remove heavy gradient blobs
content = re.sub(r'bg-white/80 backdrop-blur-xl rounded-\[2rem\] shadow-2xl border border-white/50 overflow-hidden flex flex-col lg:flex-row relative z-10', 'bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden flex flex-col lg:flex-row relative z-10', content)

# Background color adjustment
content = re.sub(r'bg-stone-50 flex items-center justify-center p-4 sm:p-8 font-sans selection:bg-amber-100 selection:text-amber-600 relative overflow-hidden', 'bg-stone-50 flex items-center justify-center p-4 sm:p-8 font-sans selection:bg-stone-200 selection:text-stone-900 relative', content)

# Remove background blur blobs entirely
content = re.sub(r'<div className="absolute inset-0 z-0">.*?</div>', '', content, flags=re.DOTALL)

# Refine left pane
content = re.sub(r'bg-stone-950 p-8 lg:p-12 relative overflow-hidden flex flex-col justify-between hidden md:flex', 'bg-stone-900 p-8 lg:p-12 relative flex flex-col justify-between hidden lg:flex', content)
content = re.sub(r'bg-\[radial-gradient\(circle_at_center,_var\(--tw-gradient-stops\)\)\] from-amber-500 via-stone-900 to-stone-950', 'bg-gradient-to-br from-stone-800 to-stone-900', content)
content = re.sub(r'bg-gradient-to-br from-amber-400 to-orange-600', 'bg-stone-100 text-stone-900', content)
content = re.sub(r'text-2xl font-black text-white tracking-tight', 'text-2xl font-bold text-white tracking-tight', content)
content = re.sub(r'text-4xl lg:text-5xl font-black text-white leading-\[1\.1\] tracking-tight mb-6', 'text-3xl lg:text-4xl font-bold text-white tracking-tight mb-6 leading-snug', content)
content = re.sub(r'text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500', 'text-stone-300', content)

# Simplify headings
content = re.sub(r'text-2xl font-black text-stone-900', 'text-2xl font-semibold text-stone-900', content)
content = re.sub(r'text-xs font-black uppercase tracking-widest', 'text-sm font-medium', content)

# Fix any remaining heavy uppercase labels
content = re.sub(r'text-\[10px\] font-black text-stone-500 uppercase tracking-widest', 'text-sm font-medium text-stone-700', content)
content = re.sub(r'text-\[10px\] font-bold text-stone-500 uppercase tracking-widest', 'text-sm font-medium text-stone-700', content)
content = re.sub(r'text-\[10px\] font-black uppercase tracking-widest', 'text-sm font-medium text-stone-700', content)
content = re.sub(r'text-\[10px\] font-black text-amber-600 uppercase tracking-widest', 'text-sm font-medium text-stone-900', content)
content = re.sub(r'text-xs font-bold uppercase tracking-widest', 'text-sm font-medium', content)

with open('src/components/public/PortalLogin.tsx', 'w') as f:
    f.write(content)
