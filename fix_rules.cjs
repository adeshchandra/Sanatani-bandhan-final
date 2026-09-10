const fs = require('fs');
let rules = fs.readFileSync('firestore.rules', 'utf8');

rules = rules.replace(
  "getUserData().role == 'superadmin'",
  "(getUserData().role == 'superadmin' || getUserData().role == 'SUPER_ADMIN')"
);

rules = rules.replace(
  "getUserData().role == 'admin' || getUserData().role == 'superadmin'",
  "getUserData().role == 'admin' || getUserData().role == 'superadmin' || getUserData().role == 'SUPER_ADMIN' || getUserData().role == 'TRUSTEE'"
);

rules = rules.replace(
  "getUserData().role == 'manager' || isAdmin()",
  "getUserData().role == 'manager' || getUserData().role == 'MANAGER' || isAdmin()"
);

rules = rules.replace(
  "getUserData().role == 'purohit' || isAdmin()",
  "getUserData().role == 'purohit' || getUserData().role == 'PUROHIT' || isAdmin()"
);

rules = rules.replace(
  "getUserData().role == 'devotee'",
  "(getUserData().role == 'devotee' || getUserData().role == 'DEVOTEE')"
);

fs.writeFileSync('firestore.rules', rules);
