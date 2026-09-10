import re

with open('src/components/public/PortalLogin.tsx', 'r') as f:
    content = f.read()

old_options = r'<option value="Trust">General Trust / NGO \(ट्रस्ट\)</option>'
new_options = r'''<option value="Vidyalaya">Vidyalaya / School (विद्यालय)</option>
                        <option value="Purohit">Purohit / Pandit (पुरोहित)</option>
                        <option value="KashiKshetra">Kashi Kshetra / Peeth (काशी क्षेत्र)</option>
                        <option value="Trust">General Trust / NGO (ट्रस्ट)</option>'''

content = content.replace(old_options, new_options)

with open('src/components/public/PortalLogin.tsx', 'w') as f:
    f.write(content)
