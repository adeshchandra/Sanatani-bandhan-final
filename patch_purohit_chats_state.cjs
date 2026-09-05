const fs = require('fs');
let content = fs.readFileSync('src/components/domain3/PurohitMarketDesk.tsx', 'utf8');

// Add recentChats state
content = content.replace(
  "  const [isVerifiedPurohit, setIsVerifiedPurohit] = useState(false);",
  "  const [isVerifiedPurohit, setIsVerifiedPurohit] = useState(false);\n  const [recentChats, setRecentChats] = useState<any[]>([]);"
);

// Add fetch chats logic in the existing useEffect
const oldUseEffect = `    const unsubMyPurohit = onSnapshot(myPurohitRef, (docSnap) => {
      if (docSnap.exists()) setIsVerifiedPurohit(true);
      else setIsVerifiedPurohit(false);
    });

    return () => { unsubGigs(); unsubCon(); unsubMyPurohit(); clearTimeout(failsafe); };`;

const newUseEffect = `    const unsubMyPurohit = onSnapshot(myPurohitRef, (docSnap) => {
      if (docSnap.exists()) setIsVerifiedPurohit(true);
      else setIsVerifiedPurohit(false);
    });

    const chatsQ = query(
      collection(db, 'chats'),
      where('participants', 'array-contains', session.uid),
      orderBy('updatedAt', 'desc'),
      limit(5)
    );
    const unsubChats = onSnapshot(chatsQ, (snap) => {
      setRecentChats(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    return () => { unsubGigs(); unsubCon(); unsubMyPurohit(); unsubChats(); clearTimeout(failsafe); };`;

content = content.replace(oldUseEffect, newUseEffect);

fs.writeFileSync('src/components/domain3/PurohitMarketDesk.tsx', content);
