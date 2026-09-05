const fs = require('fs');
let content = fs.readFileSync('src/components/devotee/DevoteePortal.tsx', 'utf8');

content = content.replace(
  "Share2, Award, Zap",
  "Share2, Award, Zap, X"
);

fs.writeFileSync('src/components/devotee/DevoteePortal.tsx', content);
