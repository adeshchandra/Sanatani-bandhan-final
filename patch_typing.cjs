const fs = require('fs');
let content = fs.readFileSync('src/components/common/DirectMessageChat.tsx', 'utf8');

// Add typing states
content = content.replace(
  "  const messagesEndRef = useRef<HTMLDivElement>(null);\n  const [isRecipientOnline, setIsRecipientOnline] = useState(false);",
  "  const messagesEndRef = useRef<HTMLDivElement>(null);\n  const [isRecipientOnline, setIsRecipientOnline] = useState(false);\n  const [isRecipientTyping, setIsRecipientTyping] = useState(false);\n  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);\n  const lastTypingTime = useRef<number>(0);"
);

// Add typing listener to the useEffect
const oldEffect = `    const q = query(
      collection(db, 'chats', chatId, 'messages'),
      orderBy('timestamp', 'asc')
    );

    const unsub = onSnapshot(q, (snapshot) => {`;

const newEffect = `    const chatDocRef = doc(db, 'chats', chatId);
    const unsubChatDoc = onSnapshot(chatDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.typing && data.typing[recipientId]) {
          setIsRecipientTyping(true);
        } else {
          setIsRecipientTyping(false);
        }
      }
    });

    const q = query(
      collection(db, 'chats', chatId, 'messages'),
      orderBy('timestamp', 'asc')
    );

    const unsub = onSnapshot(q, (snapshot) => {`;
content = content.replace(oldEffect, newEffect);

const oldReturn = `return () => unsub();`;
const newReturn = `return () => { unsub(); unsubChatDoc(); };`;
content = content.replace(oldReturn, newReturn);


// Add handleInputChange
const handleInputChange = `  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
    
    if (!session?.uid) return;

    const now = Date.now();
    if (now - lastTypingTime.current > 2000) {
      lastTypingTime.current = now;
      setDoc(doc(db, 'chats', chatId), {
        [\`typing.\${session.uid}\`]: true
      }, { merge: true });
    }

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      setDoc(doc(db, 'chats', chatId), {
        [\`typing.\${session.uid}\`]: false
      }, { merge: true });
    }, 2500);
  };`;

content = content.replace("const handleSend = async (e: React.FormEvent) => {", handleInputChange + "\n\n  const handleSend = async (e: React.FormEvent) => {");


// Replace onChange handler in input
const oldInput = `<input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-stone-50 border border-stone-200 rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all shadow-inner"
          />`;
const newInput = `<input
            type="text"
            value={newMessage}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="flex-1 bg-stone-50 border border-stone-200 rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all shadow-inner"
          />`;
content = content.replace(oldInput, newInput);


// Add typing indicator UI before messagesEndRef
const oldEndRef = `<div ref={messagesEndRef} />`;
const newEndRef = `        {isRecipientTyping && (
          <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="bg-white text-stone-500 border border-stone-200 rounded-2xl rounded-tl-sm shadow-sm p-4 py-3 flex items-center gap-1.5 w-fit">
              <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></span>
              <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />`;
content = content.replace(oldEndRef, newEndRef);

// clear typing status on send
const sendReset = `    setDoc(doc(db, 'chats', chatId), {
      updatedAt: serverTimestamp(),
      lastMessage: msg
    }, { merge: true });`;
const newSendReset = `    setDoc(doc(db, 'chats', chatId), {
      updatedAt: serverTimestamp(),
      lastMessage: msg,
      [\`typing.\${session.uid}\`]: false
    }, { merge: true });
    
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    lastTypingTime.current = 0;`;
content = content.replace(sendReset, newSendReset);

fs.writeFileSync('src/components/common/DirectMessageChat.tsx', content);
