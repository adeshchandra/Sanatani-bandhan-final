const fs = require('fs');
let code = fs.readFileSync('src/components/devotee/SanataniSocialFeed.tsx', 'utf8');
code = code.replace(
  /setActiveEmergencies\(emergencies\.filter\(e => e\.sosStatus \!== 'RESOLVED'\)\.sort\(\(a, b\) => b\.originalTimestamp - a\.originalTimestamp\)\);\n    }\);/g,
  `setActiveEmergencies(emergencies.filter(e => e.sosStatus !== 'RESOLVED').sort((a, b) => b.originalTimestamp - a.originalTimestamp));\n    }, (err) => console.warn("Firebase social feed sync:", err.message));`
);
code = code.replace(
  /          }\n          return rp;\n        }\);\n        return enhancedRemote;\n      }\);\n    }\);/g,
  `          }\n          return rp;\n        });\n        return enhancedRemote;\n      });\n    }, (err) => console.warn("Firebase social feed sync:", err.message));`
);
fs.writeFileSync('src/components/devotee/SanataniSocialFeed.tsx', code);
