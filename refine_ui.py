import re

with open('src/components/public/PortalLogin.tsx', 'r') as f:
    content = f.read()

# Remove text-[10px] uppercase hero eyebrows and replace with clean labels
content = re.sub(r'text-\[10px\] font-black text-\w+-500 uppercase tracking-widest', 'text-sm font-medium text-stone-700', content)
content = re.sub(r'text-\[10px\] font-bold text-\w+-500 uppercase tracking-widest', 'text-sm font-medium text-stone-700', content)

# Clean up nested bg-stone-50/50 borders
content = re.sub(r'bg-stone-50/50 p-5 rounded-2xl border border-stone-200', 'space-y-4 pt-4 border-t border-stone-100', content)
content = re.sub(r'bg-white p-4 rounded-xl border border-stone-200 shadow-sm', 'space-y-4 pt-4 border-t border-stone-100', content)

# Clean up inputs
content = re.sub(r'bg-white border border-stone-200 rounded-xl text-sm font-bold text-stone-800 focus:border-amber-500 outline-none shadow-sm transition-colors', 'w-full px-3 py-2 border border-stone-300 rounded-lg text-sm text-stone-900 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 outline-none transition-all', content)
content = re.sub(r'bg-stone-50 border border-stone-200 rounded-xl text-sm font-bold text-stone-800 focus:bg-white focus:border-amber-500 outline-none transition-all', 'w-full px-3 py-2 border border-stone-300 rounded-lg text-sm text-stone-900 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 outline-none transition-all', content)
content = re.sub(r'p-3\.5 bg-white border border-stone-200 rounded-xl text-sm font-bold text-stone-800 focus:border-amber-500 outline-none transition-all cursor-pointer shadow-sm', 'w-full px-3 py-2 border border-stone-300 rounded-lg text-sm text-stone-900 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 outline-none transition-all cursor-pointer', content)

# Clean up input icons padding
content = re.sub(r'pl-10 pr-4 p-3\.5 bg-white border border-stone-200 rounded-xl text-sm font-bold text-stone-800 focus:border-amber-500 outline-none shadow-sm transition-colors', 'w-full pl-10 pr-3 py-2 border border-stone-300 rounded-lg text-sm text-stone-900 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 outline-none transition-all', content)
content = re.sub(r'pl-10 pr-4 py-3\.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-bold text-stone-800 focus:bg-white focus:border-amber-500 outline-none transition-all', 'w-full pl-10 pr-3 py-2 border border-stone-300 rounded-lg text-sm text-stone-900 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 outline-none transition-all', content)

# Remove input left absolute icons
# content = re.sub(r'<div className="relative group">\s*<[A-Za-z0-9]+ size=\{16\} className="absolute left-3 top-3\.5 text-stone-400 group-focus-within:text-amber-500" />', r'<div className="relative group">\n<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">Icon</div>', content)
# We can just change the icon classes slightly if needed, or leave them. Let's make icon classes simpler.
content = re.sub(r'absolute left-3 top-3\.5 text-stone-400 group-focus-within:text-amber-500', 'absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-stone-900', content)
content = re.sub(r'absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 group-focus-within:text-amber-500', 'absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-stone-900', content)

# Clean up Buttons
content = re.sub(r'bg-amber-500 hover:bg-amber-600 text-white font-black py-4 rounded-2xl shadow-md hover:shadow-lg transition-all hover:-translate-y-0\.5 text-xs uppercase tracking-widest', 'bg-stone-900 hover:bg-stone-800 text-white font-medium py-2\.5 rounded-lg shadow-sm transition-colors text-sm', content)
content = re.sub(r'bg-stone-100 hover:bg-stone-200 text-stone-700 font-black py-4 rounded-2xl transition-all text-xs uppercase tracking-widest', 'bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 font-medium py-2\.5 rounded-lg transition-colors text-sm', content)
content = re.sub(r'bg-stone-100 text-stone-400 font-black py-4 rounded-2xl text-xs uppercase tracking-widest cursor-not-allowed', 'bg-stone-100 text-stone-400 font-medium py-2\.5 rounded-lg text-sm cursor-not-allowed', content)
content = re.sub(r'border-2 border-stone-200 text-stone-500 hover:border-amber-500 hover:bg-amber-50 hover:text-amber-700 font-black py-4 rounded-2xl transition-all text-xs uppercase tracking-widest', 'bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 font-medium py-2\.5 rounded-lg transition-colors text-sm', content)

# Clean up tabs
content = re.sub(r'flex bg-stone-100/50 p-1\.5 rounded-2xl mb-8 border border-stone-200/50 shadow-inner', 'flex bg-stone-100/50 p-1 rounded-lg mb-8 border border-stone-200', content)
content = re.sub(r'flex-1 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-sm bg-white text-amber-600 border border-stone-200', 'flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2 bg-white text-stone-900 shadow-sm border border-stone-200', content)
content = re.sub(r'flex-1 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 text-stone-400 hover:text-stone-600 hover:bg-stone-100/50', 'flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2 text-stone-500 hover:text-stone-900 hover:bg-stone-200/50', content)

# Clean up the main card 
content = re.sub(r'bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden relative z-10 flex flex-col', 'bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden relative z-10 flex flex-col', content)

# Clean up header fonts
content = re.sub(r'text-4xl sm:text-5xl font-black text-stone-800 tracking-tight leading-none', 'text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight', content)
content = re.sub(r'text-sm font-bold text-stone-500 uppercase tracking-widest mt-2', 'text-sm text-stone-500 mt-2', content)
content = re.sub(r'text-\[10px\] font-black text-amber-600 uppercase tracking-widest', 'text-sm font-medium text-stone-900', content)
content = re.sub(r'text-xs font-black text-amber-600 uppercase tracking-widest', 'text-sm font-medium text-stone-900', content)

# Warning block
content = re.sub(r'bg-amber-50/50 border border-amber-200 p-4 rounded-2xl flex items-start gap-3 shadow-inner', 'bg-stone-50 border border-stone-200 p-4 rounded-lg flex items-start gap-3', content)
content = re.sub(r'text-amber-800 font-black text-xs uppercase tracking-widest mb-1', 'text-stone-900 font-semibold text-sm mb-1', content)
content = re.sub(r'text-\[10px\] text-amber-700 font-medium leading-relaxed', 'text-sm text-stone-600', content)
content = re.sub(r'font-black text-amber-900', 'font-bold text-stone-900', content)

with open('src/components/public/PortalLogin.tsx', 'w') as f:
    f.write(content)
