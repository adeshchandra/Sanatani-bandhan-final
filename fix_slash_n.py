import re
filepath = 'src/components/domain4/SanataniVivahDesk.tsx'
with open(filepath, 'r') as f:
    text = f.read()

text = text.replace("\\n  const [profileForm, setProfileForm]", "\n  const [profileForm, setProfileForm]")

with open(filepath, 'w') as f:
    f.write(text)
