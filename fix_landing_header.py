import re

with open('src/components/public/LandingPage.tsx', 'r') as f:
    landing = f.read()

pattern = r'<img \n              src="/logo\.svg" \n              alt="Sanatani Bandhan" \n              className="w-10 h-10 drop-shadow-sm" \n              \n            />\n            <span className="font-bold text-xl tracking-tight text-stone-900 block">Sanatani<span className="text-stone-900">Bandhan</span></span>'

landing = re.sub(r'<img[^>]*src="/logo\.svg"[^>]*>\s*<span[^>]*>Sanatani<span[^>]*>Bandhan</span></span>', r'<AppLogo size="md" showText={true} />', landing, flags=re.DOTALL)

with open('src/components/public/LandingPage.tsx', 'w') as f:
    f.write(landing)

