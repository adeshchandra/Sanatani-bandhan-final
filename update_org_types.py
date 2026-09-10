import re

with open('src/components/public/PortalLogin.tsx', 'r') as f:
    content = f.read()

no_icon_select = 'w-full p-3.5 bg-stone-50 hover:bg-white border border-stone-200 hover:border-stone-300 rounded-xl text-sm font-medium text-stone-900 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all shadow-sm cursor-pointer'

icon_left_select = 'w-full pl-11 pr-4 py-3.5 bg-stone-50 hover:bg-white border border-stone-200 hover:border-stone-300 rounded-xl text-sm font-medium text-stone-900 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all shadow-sm cursor-pointer appearance-none'

# Update the org type select
old_org_select = r'<select value=\{regData\.type\} onChange=\{e=>setRegData\(\{\.\.\.regData, type: e\.target\.value as WorkspaceType\}\)\} className="w-full w-full px-3 py-2 border border-stone-300 rounded-lg text-sm text-stone-900 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 outline-none transition-all cursor-pointer">\s*<option value="Mandir">Mandir / Temple</option>\s*<option value="Ashram">Ashram</option>\s*<option value="Trust">Trust / NGO</option>\s*<option value="PurohitSabha">Purohit Sabha</option>\s*</select>'

new_org_select = f'''<select value={{regData.type}} onChange={{e=>setRegData({{...regData, type: e.target.value as WorkspaceType}})}} className="{no_icon_select}">
                        <option value="Mandir">Mandir / Temple (मंदिर)</option>
                        <option value="Ashram">Ashram (आश्रम)</option>
                        <option value="Goshala">Goshala (गौशाला)</option>
                        <option value="Gurukul">Gurukul / Vidyalaya (गुरुकुल)</option>
                        <option value="Sangha">Sangha / Matha (संघ / मठ)</option>
                        <option value="Satsang">Satsang / Katha (सत्संग)</option>
                        <option value="Yoga">Yoga Center (योग केंद्र)</option>
                        <option value="Tirth">Tirth / Kshetra (तीर्थ)</option>
                        <option value="PurohitSabha">Purohit Sabha (पुरोहित सभा)</option>
                        <option value="MahotsavSamiti">Mahotsav Samiti (महोत्सव समिति)</option>
                        <option value="DharmadaTrust">Dharmada Trust (धर्मादा ट्रस्ट)</option>
                        <option value="AkshayaPatra">Annakshetra / Bhandara (अन्नक्षेत्र)</option>
                        <option value="Samaj">Samaj / Parishad (समाज)</option>
                        <option value="Trust">General Trust / NGO (ट्रस्ट)</option>
                      </select>'''

content = re.sub(old_org_select, new_org_select, content)

# Also update the country select styling to match the inputs
old_country_select = r'<select required value=\{regData\.country\} onChange=\{handleCountryChange\} className="w-full pl-10 pr-4 py-3\.5 w-full px-3 py-2 border border-stone-300 rounded-lg text-sm text-stone-900 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 outline-none transition-all cursor-pointer appearance-none">'

new_country_select = f'<select required value={{regData.country}} onChange={{handleCountryChange}} className="{icon_left_select}">'

content = re.sub(old_country_select, new_country_select, content)

# Fix globe icon color logic to match amber focus
content = re.sub(
    r'<Globe2 size=\{16\} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-stone-900" />',
    r'<Globe2 size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-amber-500 transition-colors pointer-events-none" />',
    content
)

with open('src/components/public/PortalLogin.tsx', 'w') as f:
    f.write(content)

