const fs = require('fs');

// Fix DirectMessageChat.tsx
let chatContent = fs.readFileSync('src/components/common/DirectMessageChat.tsx', 'utf8');
chatContent = chatContent.replace(/const { session } = useAuthWorkspace\(\);/g, 'const { currentUser: session } = useAuthWorkspace();');
fs.writeFileSync('src/components/common/DirectMessageChat.tsx', chatContent);

// Fix SanataniSocialFeed.tsx
let feedContent = fs.readFileSync('src/components/devotee/SanataniSocialFeed.tsx', 'utf8');
feedContent = feedContent.replace(/authorName: string;/g, 'authorName: string;\n  authorId?: string;');
fs.writeFileSync('src/components/devotee/SanataniSocialFeed.tsx', feedContent);

// Map old WorkspaceType to new
const workspaceMap = {
  "'MANDIR'": "'Mandir'",
  "'GOSHALA'": "'Goshala'",
  "'SANGHA'": "'Sangha'",
  "'ASHRAM'": "'Ashram'",
  "'GURUKUL'": "'Gurukul'",
  "'SATSANG'": "'Satsang'",
  "'YOGA_CENTER'": "'Yoga'",
  "'TRUST'": "'Trust'",
  "'VIDYALAYA'": "'Vidyalaya'",
  "'PUROHIT_SABHA'": "'PurohitSabha'",
  "'TIRTH'": "'Tirth'",
  "'SAMAJ'": "'Samaj'",
  "'ANNADAN_TRUST'": "'AkshayaPatra'",
  "'KASHI_KSHETRA'": "'KashiKshetra'",
  "'MAHOTSAV_SAMITI'": "'MahotsavSamiti'"
};

function replaceWorkspaceTypes(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  for (const [oldVal, newVal] of Object.entries(workspaceMap)) {
    content = content.split(oldVal).join(newVal);
  }
  fs.writeFileSync(filePath, content);
}

replaceWorkspaceTypes('src/components/domain6/WorkspaceSelectorDesk.tsx');
replaceWorkspaceTypes('src/components/public/DemoSelectionModal.tsx');
replaceWorkspaceTypes('src/components/public/PortalLogin.tsx');
replaceWorkspaceTypes('src/context/AuthWorkspaceContext.tsx');
replaceWorkspaceTypes('src/context/LanguageContext.tsx');
replaceWorkspaceTypes('src/lib/workspaceRegistry.ts');

