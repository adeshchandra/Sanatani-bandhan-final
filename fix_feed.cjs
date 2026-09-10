const fs = require('fs');
let feedContent = fs.readFileSync('src/components/devotee/SanataniSocialFeed.tsx', 'utf8');

feedContent = feedContent.replace(
  "  authorName: string;\n  authorRole: 'Head Priest' | 'Trustee' | 'Devotee' | 'Volunteer' | 'Purohit';",
  "  authorId?: string;\n  authorName: string;\n  authorRole: 'Head Priest' | 'Trustee' | 'Devotee' | 'Volunteer' | 'Purohit';"
);

fs.writeFileSync('src/components/devotee/SanataniSocialFeed.tsx', feedContent);
