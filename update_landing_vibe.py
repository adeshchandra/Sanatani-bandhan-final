import re

with open('src/components/public/LandingPage.tsx', 'r') as f:
    content = f.read()

# Add mandala pattern to the background of the landing page hero
hero_bg = r'<section className="pt-32 pb-16 lg:pt-48 lg:pb-32 px-4 sm:px-6 relative overflow-hidden bg-stone-50">'
hero_bg_new = r'''<section className="pt-32 pb-16 lg:pt-48 lg:pb-32 px-4 sm:px-6 relative overflow-hidden bg-stone-50">
        {/* Sanatani Mandala Subtle Background */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M20 20c-5-5-10-5-10 0s5 10 10 10 10-5 10-10-5-10-10-10zm0 0c5-5 5-10 0-10s-10 5-10 10 5 10 10 10 10-5 10-10z\' fill=\'%23d97706\' fill-opacity=\'1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")' }}></div>
'''
content = content.replace(hero_bg, hero_bg_new)

# Add Om symbol faintly in the background of the dark footer
footer_bg = r'<footer className="bg-stone-950 pt-24 pb-12 px-4 sm:px-6 text-stone-400">'
footer_bg_new = r'''<footer className="bg-stone-950 pt-24 pb-12 px-4 sm:px-6 text-stone-400 relative overflow-hidden">
        {/* Om Watermark */}
        <div className="absolute -bottom-24 -right-24 text-[30rem] font-black text-stone-900/40 select-none pointer-events-none leading-none">ॐ</div>
'''
content = content.replace(footer_bg, footer_bg_new)

with open('src/components/public/LandingPage.tsx', 'w') as f:
    f.write(content)
