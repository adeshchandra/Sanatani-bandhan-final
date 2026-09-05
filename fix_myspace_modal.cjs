const fs = require('fs');
let content = fs.readFileSync('src/components/common/MySpaceModal.tsx', 'utf8');

// Fix 1: photoUrl empty string issue
content = content.replace(
  '{activeMember.photoUrl ? (',
  '{activeMember.photoUrl && activeMember.photoUrl !== "" ? ('
);

// Fix 2: First qrDataUrl usage
content = content.replace(
  'src={qrDataUrl}',
  'src={qrDataUrl || undefined}'
);

// Fix 3: Second qrDataUrl usage
content = content.replace(
  'src={qrDataUrl}',
  'src={qrDataUrl || undefined}'
);

fs.writeFileSync('src/components/common/MySpaceModal.tsx', content);
