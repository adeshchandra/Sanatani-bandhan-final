import re

with open('src/context/DataContext.tsx', 'r') as f:
    content = f.read()

replacement = """      return onSnapshot(q, (snapshot) => {
        if (!snapshot.empty) {
          const items = snapshot.docs.map(doc => doc.data() as any);
          c.setter(items);
        }
      }, (err) => {
        if (err.code === 'permission-denied') {
          console.warn(`[Firebase] Expected permission issue for ${c.name} - role restricted.`);
        } else {
          console.warn(`[Firebase] Sync info for ${c.name}:`, err.message);
        }
      });"""

content = re.sub(r'      return onSnapshot\(q, \(snapshot\) => {\s*if \(\!snapshot\.empty\) {\s*const items = snapshot\.docs\.map\(doc => doc\.data\(\) as any\);\s*c\.setter\(items\);\s*}\s*}, \(err\) => console\.error\("Firebase sync error for " \+ c\.name, err\)\);', replacement, content)

with open('src/context/DataContext.tsx', 'w') as f:
    f.write(content)
