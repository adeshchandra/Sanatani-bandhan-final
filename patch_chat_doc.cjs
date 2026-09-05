const fs = require('fs');
let content = fs.readFileSync('src/components/common/DirectMessageChat.tsx', 'utf8');

const oldSetDoc = `    setDoc(doc(db, 'chats', chatId), {
      participants: [session.uid, recipientId],
      updatedAt: serverTimestamp()
    }, { merge: true });`;

const newSetDoc = `    setDoc(doc(db, 'chats', chatId), {
      participants: [session.uid, recipientId],
      participantNames: {
        [session.uid]: session.user?.name || 'User',
        [recipientId]: recipientName
      },
      updatedAt: serverTimestamp()
    }, { merge: true });`;

content = content.replace(oldSetDoc, newSetDoc);

fs.writeFileSync('src/components/common/DirectMessageChat.tsx', content);
