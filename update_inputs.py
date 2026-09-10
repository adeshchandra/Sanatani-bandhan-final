import re

with open('src/components/public/PortalLogin.tsx', 'r') as f:
    content = f.read()

# 1. Center the mobile branding
content = content.replace(
    '<div className="flex lg:hidden items-center gap-3 mb-8 pb-6 border-b border-stone-100">',
    '<div className="flex lg:hidden flex-col items-center justify-center gap-3 mb-8 pb-6 border-b border-stone-100 text-center">'
)

# 2. Let's fix ALL the input classes to a unified premium style

# Define the new base classes for different input types
icon_left_class = 'w-full pl-11 pr-4 py-3.5 bg-stone-50 hover:bg-white border border-stone-200 hover:border-stone-300 rounded-xl text-sm font-medium text-stone-900 placeholder:text-stone-400 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all shadow-sm'

icon_both_class = 'w-full pl-11 pr-11 py-3.5 bg-stone-50 hover:bg-white border border-stone-200 hover:border-stone-300 rounded-xl text-sm font-medium text-stone-900 placeholder:text-stone-400 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all shadow-sm'

no_icon_class = 'w-full p-3.5 bg-stone-50 hover:bg-white border border-stone-200 hover:border-stone-300 rounded-xl text-sm font-medium text-stone-900 placeholder:text-stone-400 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all shadow-sm'


# Login Identity (Left icon)
content = re.sub(
    r'<input type="text" required value=\{loginIdentity\}(.*?)className=".*?" />',
    f'<input type="text" required value={{loginIdentity}}\\1className="{icon_left_class}" />',
    content
)

# Login Password (Both icons)
content = re.sub(
    r'<input type=\{showLoginPassword \? "text" : "password"\} required value=\{loginCredential\}(.*?)className=".*?" />',
    f'<input type={{showLoginPassword ? "text" : "password"}} required value={{loginCredential}}\\1className="{icon_both_class}" />',
    content
)

# Reg Password (Both icons)
content = re.sub(
    r'<input type=\{showRegPassword \? "text" : "password"\} required value=\{regData\.password\}(.*?)className=".*?" placeholder="Create a strong password" />',
    f'<input type={{showRegPassword ? "text" : "password"}} required value={{regData.password}}\\1className="{icon_both_class}" placeholder="Create a strong password" />',
    content
)

# Reg email (Left icon)
content = re.sub(
    r'<input type="email" required value=\{regData\.email\}(.*?)className=".*?" placeholder="admin@example\.com" />',
    f'<input type="email" required value={{regData.email}}\\1className="{icon_left_class}" placeholder="admin@example.com" />',
    content
)

# Replace other generic inputs (No icons)
# commName, state, city, adminName, phone
content = re.sub(
    r'<input type="text" required value=\{regData\.commName\}(.*?)className=".*?" placeholder="e\.g\. Sri Ram Mandir Trust" />',
    f'<input type="text" required value={{regData.commName}}\\1className="{no_icon_class}" placeholder="e.g. Sri Ram Mandir Trust" />',
    content
)
content = re.sub(
    r'<input type="text" required value=\{regData\.state\}(.*?)className=".*?" placeholder="e\.g\. West Bengal" />',
    f'<input type="text" required value={{regData.state}}\\1className="{no_icon_class}" placeholder="e.g. West Bengal" />',
    content
)
content = re.sub(
    r'<input type="text" required value=\{regData\.city\}(.*?)className=".*?" placeholder="e\.g\. Kolkata" />',
    f'<input type="text" required value={{regData.city}}\\1className="{no_icon_class}" placeholder="e.g. Kolkata" />',
    content
)
content = re.sub(
    r'<input type="text" required value=\{regData\.adminName\}(.*?)className=".*?" placeholder="Full Name" />',
    f'<input type="text" required value={{regData.adminName}}\\1className="{no_icon_class}" placeholder="Full Name" />',
    content
)
content = re.sub(
    r'<input type="tel" required value=\{regData\.phone\}(.*?)className=".*?" placeholder="Mobile Number" />',
    f'<input type="tel" required value={{regData.phone}}\\1className="{no_icon_class}" placeholder="Mobile Number" />',
    content
)


# Fix the Icons to match the new padding (left-4) and colors (group-focus-within:text-amber-500)
content = re.sub(
    r'<User size=\{18\} className="absolute left-[0-9]+ top-1/2 -translate-y-1/2 text-stone-[0-9]+ group-focus-within:text-[a-z]+-[0-9]+ transition-colors" />',
    r'<User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-amber-500 transition-colors" />',
    content
)
content = re.sub(
    r'<Key size=\{18\} className="absolute left-[0-9]+ top-1/2 -translate-y-1/2 text-stone-[0-9]+ group-focus-within:text-[a-z]+-[0-9]+ transition-colors" />',
    r'<Key size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-amber-500 transition-colors" />',
    content
)
content = re.sub(
    r'<Lock size=\{16\} className="absolute left-[0-9]+ top-1/2 -translate-y-1/2 text-stone-[0-9]+ group-focus-within:text-[a-z]+-[0-9]+" />',
    r'<Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-amber-500 transition-colors" />',
    content
)
content = re.sub(
    r'<Mail size=\{16\} className="absolute left-[0-9]+ top-1/2 -translate-y-1/2 text-stone-[0-9]+ group-focus-within:text-[a-z]+-[0-9]+" />',
    r'<Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-amber-500 transition-colors" />',
    content
)


# Fix right buttons for password toggles
content = re.sub(
    r'className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 focus:outline-none"',
    r'className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-amber-500 focus:outline-none transition-colors"',
    content
)
# Make sure eye size is consistent 18
content = re.sub(
    r'<EyeOff size=\{16\} /> : <Eye size=\{16\} />',
    r'<EyeOff size={18} /> : <Eye size={18} />',
    content
)

# And replace main buttons to match premium style
content = re.sub(
    r'className="w-full bg-stone-900 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-stone-800 transition-all shadow-md"',
    r'className="w-full bg-stone-900 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-stone-800 hover:shadow-lg hover:-translate-y-0.5 transition-all shadow-md"',
    content
)

with open('src/components/public/PortalLogin.tsx', 'w') as f:
    f.write(content)
