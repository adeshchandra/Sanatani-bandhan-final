import re

with open('src/components/public/LandingPage.tsx', 'r') as f:
    content = f.read()

# Replace Slate with Stone to match PortalLogin
content = content.replace('slate-', 'stone-')

# Remove hero eyebrows
content = re.sub(
    r'text-xs font-black uppercase tracking-widest',
    r'text-sm font-medium',
    content
)
content = re.sub(
    r'font-extrabold',
    r'font-bold',
    content
)
content = re.sub(
    r'font-black',
    r'font-bold',
    content
)

# Replace heavy colored shadows and buttons
content = re.sub(
    r'bg-gradient-to-r from-\[#FF9933\] to-orange-[0-9]+ hover:from-orange-[0-9]+ hover:to-orange-[0-9]+ text-white rounded-xl font-bold text-lg transition-all shadow-\[.*?\] hover:shadow-\[.*?\] hover:-translate-y-1',
    r'bg-stone-900 hover:bg-stone-800 text-white rounded-lg font-medium text-base transition-colors shadow-sm',
    content
)
content = re.sub(
    r'bg-gradient-to-r from-\[#FF9933\] to-orange-[0-9]+',
    r'bg-stone-900',
    content
)
content = re.sub(
    r'shadow-\[0_8px_20px_.*?\]',
    r'shadow-sm',
    content
)
content = re.sub(
    r'text-\[#FF9933\]',
    r'text-stone-900',
    content
)
content = re.sub(
    r'bg-\[#FF9933\]',
    r'bg-stone-900',
    content
)
content = re.sub(
    r'border-\[#FF9933\]',
    r'border-stone-900',
    content
)
content = re.sub(
    r'focus:ring-\[#FF9933\]/50',
    r'focus:ring-stone-900/20',
    content
)

# Button refines
content = re.sub(
    r'px-10 py-4 bg-white border-2 border-stone-200 hover:border-stone-300 text-stone-700 rounded-xl font-bold text-lg transition-all hover:bg-stone-50 flex items-center justify-center gap-2 shadow-sm',
    r'px-8 py-3 bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 rounded-lg font-medium text-base transition-colors flex items-center justify-center gap-2 shadow-sm',
    content
)

# Simplify Cards
content = re.sub(
    r'bg-white rounded-3xl p-8 shadow-sm border border-stone-100 hover:shadow-xl transition-all group flex flex-col h-full hover:border-stone-900/30',
    r'bg-white rounded-2xl p-8 border border-stone-200 hover:shadow-md transition-shadow flex flex-col h-full',
    content
)
content = re.sub(
    r'bg-white rounded-3xl p-8 shadow-sm border border-stone-100 hover:shadow-xl transition-all group flex flex-col h-full hover:border-\[#FF9933\]/30',
    r'bg-white rounded-2xl p-8 border border-stone-200 hover:shadow-md transition-shadow flex flex-col h-full',
    content
)

# Navbar
content = re.sub(
    r'bg-white/90 backdrop-blur-md z-50 border-b border-stone-200',
    r'bg-white/80 backdrop-blur-md z-50 border-b border-stone-200',
    content
)

# Logo adjustments in LandingPage
# Find existing logo images and make sure they look clean like PortalLogin
content = re.sub(
    r'className="w-10 h-10 rounded-xl object-contain shadow-md transition-transform hover:scale-105"',
    r'className="w-10 h-10 drop-shadow-sm"',
    content
)
content = re.sub(
    r'className="w-9 h-9 rounded-xl object-contain shadow-md"',
    r'className="w-9 h-9 drop-shadow-sm"',
    content
)
content = re.sub(
    r'onError=\{\(e\) => \{ e.currentTarget.src = \'/icon-192x192.png\'; \}\}',
    r'',
    content
)

# Simplify background blobs
content = re.sub(
    r'<div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-\[800px\] h-\[800px\] bg-gradient-to-br from-stone-900/10 to-orange-500/5 rounded-full blur-3xl pointer-events-none" />',
    r'',
    content
)
content = re.sub(
    r'<div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-\[600px\] h-\[600px\] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />',
    r'',
    content
)
content = re.sub(
    r'bg-gradient-to-b from-stone-50 to-white',
    r'bg-stone-50',
    content
)
content = re.sub(
    r'bg-gradient-to-br from-stone-50 to-white',
    r'bg-stone-50',
    content
)

# Secondary gradients
content = re.sub(r'bg-gradient-to-r from-stone-900 to-orange-600', 'text-stone-900', content)
content = re.sub(r'bg-gradient-to-r from-stone-900 to-orange-[0-9]+', 'text-stone-900', content)
content = re.sub(r'text-transparent bg-clip-text text-stone-900', 'text-stone-900', content)

# Specific gradient cleanup
content = re.sub(
    r'<span className="text-transparent bg-clip-text text-stone-900">([^<]+)</span>',
    r'<span className="text-stone-900">\1</span>',
    content
)

with open('src/components/public/LandingPage.tsx', 'w') as f:
    f.write(content)
