const fs = require('fs');

let content = fs.readFileSync('src/components/common/MySpaceModal.tsx', 'utf8');

content = content.replace(
  /<button onClick=\{\(\) => setEditModal\(\{ field: 'phone', displayName: 'Phone Number', value: activeMember\.phone \|\| '' \}\)\} className="text-indigo-600 bg-indigo-50 p-2\.5 rounded-xl shrink-0 ml-2 hover:bg-indigo-100 transition-colors border border-transparent hover:border-indigo-200"><Edit size=\{14\}\/><\/button>/g,
  `<div className="text-stone-400 bg-stone-100 p-2.5 rounded-xl shrink-0 ml-2" title="Locked for login integrity"><Lock size={14}/></div>`
);

content = content.replace(
  /<button onClick=\{\(\) => setEditModal\(\{ field: 'email', displayName: 'Email', value: activeMember\.email \|\| '' \}\)\} className="text-indigo-600 bg-indigo-50 p-2\.5 rounded-xl shrink-0 ml-2 hover:bg-indigo-100 transition-colors border border-transparent hover:border-indigo-200"><Edit size=\{14\}\/><\/button>/g,
  `<div className="text-stone-400 bg-stone-100 p-2.5 rounded-xl shrink-0 ml-2" title="Locked for login integrity"><Lock size={14}/></div>`
);

fs.writeFileSync('src/components/common/MySpaceModal.tsx', content);
