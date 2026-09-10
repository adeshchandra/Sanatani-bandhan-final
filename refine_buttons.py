import re

with open('src/components/public/PortalLogin.tsx', 'r') as f:
    content = f.read()

# Fix buttons with shadow-[0_8px_...]
content = re.sub(r'bg-stone-900 hover:bg-black text-white font-black py-4 rounded-2xl shadow-\[0_8px_30px_rgb\(0,0,0,0\.12\)\] hover:shadow-\[0_8px_30px_rgb\(0,0,0,0\.2\)\] hover:-translate-y-0\.5 text-xs uppercase tracking-widest transition-all', 'bg-stone-900 hover:bg-stone-800 text-white font-medium py-3 rounded-lg shadow-sm transition-colors text-sm', content)

# Fix biometric/QR buttons
content = re.sub(r'group bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 font-bold py-4 rounded-2xl text-\[10px\] sm:text-xs uppercase tracking-widest transition-all', 'group bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 font-medium py-3 rounded-lg text-sm transition-all', content)

# Fix forgot password button
content = re.sub(r'text-\[10px\] font-bold text-amber-600 hover:text-amber-700 transition-colors', 'text-xs font-medium text-stone-500 hover:text-stone-900 transition-colors', content)

# Remove the backslashes from my previous script output (py-2\.5 -> py-2.5)
content = content.replace('py-2\\.5', 'py-2.5')

# Remove "py-4 rounded-2xl" in general if they are still there
content = re.sub(r'py-4 rounded-2xl', 'py-3 rounded-lg', content)

# Remove extra rounded-2xl
content = re.sub(r'rounded-\[2rem\]', 'rounded-2xl', content)

with open('src/components/public/PortalLogin.tsx', 'w') as f:
    f.write(content)
