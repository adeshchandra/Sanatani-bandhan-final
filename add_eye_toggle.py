import re

with open('src/components/public/PortalLogin.tsx', 'r') as f:
    content = f.read()

# Add Eye, EyeOff to lucide-react imports
if 'Eye,' not in content and 'EyeOff' not in content:
    content = re.sub(
        r'Lock, ArrowLeft',
        r'Lock, ArrowLeft, Eye, EyeOff',
        content
    )

# Add state for visibility
if 'const [showLoginPassword, setShowLoginPassword]' not in content:
    content = re.sub(
        r'const \[loginCredential, setLoginCredential\] = useState\(\'\'\);',
        r"const [loginCredential, setLoginCredential] = useState('');\n  const [showLoginPassword, setShowLoginPassword] = useState(false);\n  const [showRegPassword, setShowRegPassword] = useState(false);",
        content
    )

# Fix login Identity input
content = re.sub(
    r'<input type="text" required value=\{loginIdentity\}(.*?)className="w-full pl-12 pr-4 py-4 bg-white border border-stone-200 rounded-2xl text-sm font-bold text-stone-800 focus:border-amber-500 outline-none transition-all shadow-sm focus:ring-4 focus:ring-amber-50" />',
    r'<input type="text" required value={loginIdentity}\1className="w-full pl-10 pr-4 py-3 bg-white border border-stone-300 rounded-lg text-sm text-stone-900 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 outline-none transition-all shadow-sm" />',
    content
)

# Fix login Password input and add toggle
content = re.sub(
    r'<input type="password" required value=\{loginCredential\}(.*?)className="w-full pl-12 pr-4 py-4 bg-white border border-stone-200 rounded-2xl text-sm font-bold text-stone-800 focus:border-amber-500 outline-none transition-all shadow-sm focus:ring-4 focus:ring-amber-50" />',
    r'<input type={showLoginPassword ? "text" : "password"} required value={loginCredential}\1className="w-full pl-10 pr-10 py-3 bg-white border border-stone-300 rounded-lg text-sm text-stone-900 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 outline-none transition-all shadow-sm" />\n                        <button type="button" onClick={() => setShowLoginPassword(!showLoginPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 focus:outline-none">\n                          {showLoginPassword ? <EyeOff size={18} /> : <Eye size={18} />}\n                        </button>',
    content
)

# Fix reg password input and add toggle
content = re.sub(
    r'<input type="password" required value=\{regData\.password\}(.*?)className="w-full pl-10 pr-4 p-3\.5 w-full px-3 py-2 border border-stone-300 rounded-lg text-sm text-stone-900 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 outline-none transition-all" placeholder="Create a strong password" />',
    r'<input type={showRegPassword ? "text" : "password"} required value={regData.password}\1className="w-full pl-10 pr-10 py-2 border border-stone-300 rounded-lg text-sm text-stone-900 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 outline-none transition-all" placeholder="Create a strong password" />\n                        <button type="button" onClick={() => setShowRegPassword(!showRegPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 focus:outline-none">\n                          {showRegPassword ? <EyeOff size={16} /> : <Eye size={16} />}\n                        </button>',
    content
)

# Fix login input icons size and placement
content = re.sub(
    r'<User size=\{18\} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-stone-400 group-focus-within:text-amber-500 transition-colors" />',
    r'<User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-stone-900 transition-colors" />',
    content
)
content = re.sub(
    r'<Key size=\{18\} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-stone-400 group-focus-within:text-amber-500 transition-colors" />',
    r'<Key size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-stone-900 transition-colors" />',
    content
)

# Clean up other reg inputs that had double classnames
content = re.sub(
    r'className="w-full pl-10 pr-3 py-2 border border-stone-300 rounded-lg text-sm text-stone-900 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 outline-none transition-all"',
    r'className="w-full pl-10 pr-3 py-2 border border-stone-300 rounded-lg text-sm text-stone-900 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 outline-none transition-all shadow-sm"',
    content
)

with open('src/components/public/PortalLogin.tsx', 'w') as f:
    f.write(content)
