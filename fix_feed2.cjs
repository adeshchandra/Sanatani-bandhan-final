const fs = require('fs');
let feed = fs.readFileSync('src/components/devotee/SanataniSocialFeed.tsx', 'utf8');

feed = feed.replace(
  "  workspaceId: string;\n  authorName: string;\n  authorRole: 'Head Priest' | 'Trustee' | 'Devotee' | 'Volunteer' | 'Purohit';",
  "  workspaceId: string;\n  authorId?: string;\n  authorName: string;\n  authorRole: 'Head Priest' | 'Trustee' | 'Devotee' | 'Volunteer' | 'Purohit';"
);

fs.writeFileSync('src/components/devotee/SanataniSocialFeed.tsx', feed);
