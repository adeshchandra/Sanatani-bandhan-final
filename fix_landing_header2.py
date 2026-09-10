import re

with open('src/components/public/LandingPage.tsx', 'r') as f:
    landing = f.read()

start_index = landing.find('<div className="flex items-center gap-3">')
if start_index != -1:
    end_index = landing.find('</div>', start_index + 41)
    if end_index != -1:
        part1 = landing[:start_index + 41]
        part2 = landing[end_index:]
        landing = part1 + '\n            <AppLogo size="lg" showText={true} />\n          ' + part2

with open('src/components/public/LandingPage.tsx', 'w') as f:
    f.write(landing)

