const fs = require('fs');

const files = [
    'src/components/common/GlobalSOSListener.tsx',
    'src/components/common/DirectMessageChat.tsx',
    'src/components/common/SahayataForum.tsx',
    'src/components/devotee/SanataniSocialFeed.tsx',
    'src/components/domain3/PurohitDesk.tsx',
    'src/components/domain3/PurohitMarketDesk.tsx',
    'src/components/domain6/CommunityPollsTab.tsx',
    'src/components/domain6/CrisisCommandCenter.tsx',
    'src/components/domain4/SanataniVivahDesk.tsx',
    'src/components/domain5/PersonalSadhanaDesk.tsx',
    'src/components/domain7/YatraNetDesk.tsx',
    'src/context/DataContext.tsx',
    'src/hooks/useFirestoreCollection.ts',
    'src/hooks/useScopedData.ts'
];

for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const onSnapshotCount = (content.match(/onSnapshot\(/g) || []).length;
    const errCount = (content.match(/\((err|error)\) =>/g) || []).length;
    
    // Some files might have multiple onSnapshots. Just print both counts.
    console.log(`${file}: onSnapshot=${onSnapshotCount}, errHandlers=${errCount}`);
}
