const fs = require('fs');
let chat = fs.readFileSync('src/components/common/DirectMessageChat.tsx', 'utf8');
chat = chat.replace("const { session } = useAuthWorkspace();", "const { currentUser: session } = useAuthWorkspace();");
fs.writeFileSync('src/components/common/DirectMessageChat.tsx', chat);

let feed = fs.readFileSync('src/components/devotee/SanataniSocialFeed.tsx', 'utf8');
feed = feed.replace(/authorId\?/g, 'authorId'); // wait, let's just make sure it's there
if (!feed.includes('authorId?: string;')) {
  feed = feed.replace("authorName: string;", "authorName: string;\n  authorId?: string;");
}
fs.writeFileSync('src/components/devotee/SanataniSocialFeed.tsx', feed);
