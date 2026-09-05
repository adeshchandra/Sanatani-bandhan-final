const fs = require('fs');
let content = fs.readFileSync('src/components/devotee/DevoteePortal.tsx', 'utf8');

if (!content.includes('import { DevoteeQRPass } from')) {
  content = content.replace(
    "import { MySpaceModal } from '../common/MySpaceModal';",
    "import { MySpaceModal } from '../common/MySpaceModal';\nimport { DevoteeQRPass } from './DevoteeQRPass';"
  );
  fs.writeFileSync('src/components/devotee/DevoteePortal.tsx', content);
}
