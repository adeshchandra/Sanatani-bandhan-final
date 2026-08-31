import re

filepath = 'src/utils/imageCompression.ts'
with open(filepath, 'r') as f:
    content = f.read()

# Add imports
imports = "import { storage } from '../lib/firebase';\nimport { ref, uploadString, getDownloadURL } from 'firebase/storage';\n"
if "getDownloadURL" not in content:
    content = imports + content

# Replace the resolve(compressedDataUrl) with upload logic
old_resolve = "const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);\n        resolve(compressedDataUrl);"
new_resolve = """const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        const fileName = file.name.replace(/[^a-zA-Z0-9]/g, '_') + '_' + Date.now();
        const fileRef = ref(storage, `uploads/${fileName}.jpg`);
        uploadString(fileRef, compressedDataUrl, 'data_url')
          .then(() => getDownloadURL(fileRef))
          .then(downloadUrl => resolve(downloadUrl))
          .catch(err => reject(new Error('Firebase Storage upload failed: ' + err.message)));"""

content = content.replace(old_resolve, new_resolve)

with open(filepath, 'w') as f:
    f.write(content)
