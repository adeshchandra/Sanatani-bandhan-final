import re

with open('src/components/public/PortalLogin.tsx', 'r') as f:
    content = f.read()

# 1. Update the Desktop Logo and Left Panel Typography
desktop_logo_pattern = r'<div className="w-12 h-12 bg-stone-100 text-stone-900 rounded-2xl shadow-lg flex items-center justify-center text-white">\s*<Flame size=\{24\} fill="currentColor" />\s*</div>'
new_desktop_logo = r'<img src="/logo.svg" alt="Sanatani Bandhan Logo" className="w-12 h-12 drop-shadow-md" />'

content = re.sub(desktop_logo_pattern, new_desktop_logo, content)

# 2. Make the Left panel background richer
old_bg_pattern = r'<div className="absolute inset-0 opacity-20 bg-gradient-to-br from-stone-800 to-stone-900"></div>'
# Creating a much more sophisticated dark background with a subtle saffron glow from the top-left
new_bg_pattern = r'''
          {/* Premium Background Layer */}
          <div className="absolute inset-0 bg-stone-950"></div>
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-amber-900/40 via-stone-900/80 to-stone-950"></div>
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
'''
content = content.replace(old_bg_pattern, new_bg_pattern.strip())

# 3. Add Mobile Logo Header to Right Panel
right_panel_start = r'<div className="w-full lg:w-7/12 p-6 sm:p-10 lg:p-12 relative flex flex-col">'

mobile_header = r'''<div className="w-full lg:w-7/12 p-6 sm:p-10 lg:p-12 relative flex flex-col">
          
          {/* Mobile Branding (Visible only on small screens) */}
          <div className="flex lg:hidden items-center gap-3 mb-8 pb-6 border-b border-stone-100">
             <img src="/logo.svg" alt="Sanatani Bandhan Logo" className="w-10 h-10 drop-shadow-sm" />
             <div>
                <h1 className="text-xl font-bold text-stone-900 tracking-tight">{t('app_name')}</h1>
                <p className="text-xs font-medium text-stone-500">{t('portal_subtitle')}</p>
             </div>
          </div>
'''
content = content.replace(right_panel_start, mobile_header)

# 4. Enhance desktop typography on left panel
content = content.replace(
    'text-3xl lg:text-4xl font-bold text-white tracking-tight mb-6 leading-snug',
    'text-3xl lg:text-[2.75rem] font-bold text-white tracking-tight mb-6 leading-[1.15]'
)
content = content.replace(
    'text-stone-300',
    'text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400'
)
content = content.replace(
    'text-sm font-medium text-stone-700',
    'text-sm font-medium text-stone-400' # Make subtitle legible against dark background
)

with open('src/components/public/PortalLogin.tsx', 'w') as f:
    f.write(content)

