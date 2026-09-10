import re

# Update LandingPage.tsx
with open('src/components/public/LandingPage.tsx', 'r') as f:
    landing = f.read()

# Import AppLogo if not present
if 'AppLogo' not in landing:
    landing = landing.replace("import { motion } from 'motion/react';", "import { motion } from 'motion/react';\nimport AppLogo from '../common/AppLogo';")

# Replace header logo
header_logo_pattern = r'<img\s+src="/logo\.svg"\s+alt="Sanatani Bandhan"\s+className="w-10 h-10 drop-shadow-sm"\s+/>\s*<span className="font-bold text-xl tracking-tight text-stone-900 block">Sanatani<span className="text-stone-900">Bandhan</span></span>'
landing = re.sub(header_logo_pattern, r'<AppLogo size="md" showText={true} />', landing)

# Replace footer logo
footer_logo_pattern = r'<img\s+src="/logo\.svg"\s+alt="Sanatani Bandhan"\s+className="w-9 h-9 drop-shadow-sm"\s+/>\s*<span className="font-bold text-lg text-white">Sanatani<span className="text-stone-400">Bandhan</span></span>'
landing = re.sub(footer_logo_pattern, r'<AppLogo size="md" showText={true} textVariant="light" />', landing)

with open('src/components/public/LandingPage.tsx', 'w') as f:
    f.write(landing)

# Update PortalLogin.tsx
with open('src/components/public/PortalLogin.tsx', 'r') as f:
    portal = f.read()

if 'AppLogo' not in portal:
    portal = portal.replace("import jsQR from 'jsqr';", "import jsQR from 'jsqr';\nimport AppLogo from '../common/AppLogo';")

# Replace desktop logo
desktop_logo_pattern = r'<img src="/logo\.svg" alt="Sanatani Bandhan Logo" className="w-12 h-12 drop-shadow-md" />\s*<div>\s*<h1 className="text-2xl font-bold text-white tracking-tight">\{t\(\'app_name\'\)\}</h1>\s*<p className="text-sm font-medium text-stone-400">\{t\(\'portal_subtitle\'\)\}</p>\s*</div>'
portal = re.sub(desktop_logo_pattern, r'<AppLogo size="lg" showText={true} textVariant="light" subtitle={t(\'portal_subtitle\')} />', portal)

# Replace mobile logo
mobile_logo_pattern = r'<img src="/logo\.svg" alt="Sanatani Bandhan Logo" className="w-10 h-10 drop-shadow-sm" />\s*<div>\s*<h1 className="text-xl font-bold text-stone-900 tracking-tight">\{t\(\'app_name\'\)\}</h1>\s*<p className="text-xs font-medium text-stone-500">\{t\(\'portal_subtitle\'\)\}</p>\s*</div>'
portal = re.sub(mobile_logo_pattern, r'<AppLogo size="md" showText={true} textVariant="dark" subtitle={t(\'portal_subtitle\')} />', portal)

with open('src/components/public/PortalLogin.tsx', 'w') as f:
    f.write(portal)

