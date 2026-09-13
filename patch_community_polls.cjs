const fs = require('fs');
let code = fs.readFileSync('src/components/domain6/CommunityPollsTab.tsx', 'utf8');
code = code.replace(/    \}, \(error\) => \{\n      console\.error\("Firestore poll fetch error:", error\);\n      setLoading\(false\);\n    \}, \(err\) => console\.warn\("Firebase CommunityPollsTab sync:", err\.message\)\);/g, 
`    }, (error) => {\n      console.warn("Firebase CommunityPollsTab sync:", error.message);\n      setLoading(false);\n    });`);
fs.writeFileSync('src/components/domain6/CommunityPollsTab.tsx', code);
