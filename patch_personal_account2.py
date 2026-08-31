import re

filepath = 'src/components/account/PersonalAccountDesk.tsx'
with open(filepath, 'r') as f:
    content = f.read()

content = content.replace("t.devoteeName === currentUser?.fullName", "t.devoteeName === currentUser?.name")

with open(filepath, 'w') as f:
    f.write(content)
