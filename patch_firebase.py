import re

filepath = 'src/lib/firebase.ts'
with open(filepath, 'r') as f:
    content = f.read()

if "getStorage" not in content:
    content = content.replace(
        'import { getFirestore, initializeFirestore } from "firebase/firestore";',
        'import { getFirestore, initializeFirestore } from "firebase/firestore";\nimport { getStorage } from "firebase/storage";'
    )
    content = content + "\nexport const storage = getStorage(app);\n"

with open(filepath, 'w') as f:
    f.write(content)

