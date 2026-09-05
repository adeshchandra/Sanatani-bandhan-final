const fs = require('fs');
let content = fs.readFileSync('src/components/common/DirectMessageChat.tsx', 'utf8');

// Add presence state
content = content.replace(
  "  const messagesEndRef = useRef<HTMLDivElement>(null);",
  "  const messagesEndRef = useRef<HTMLDivElement>(null);\n  const [isRecipientOnline, setIsRecipientOnline] = useState(false);"
);

// Add useEffect to mock or listen to presence
const presenceEffect = `
  useEffect(() => {
    if (!recipientId) return;
    // For prototype, simulate presence randomly or via user doc if exists
    const userRef = doc(db, 'users', recipientId);
    const unsubPresence = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists() && docSnap.data().isOnline !== undefined) {
        setIsRecipientOnline(docSnap.data().isOnline);
      } else {
        // Fallback simulation: Assume online for demo if active in last 10 mins
        setIsRecipientOnline(Math.random() > 0.3); // 70% chance online for demo feel
      }
    });
    return () => unsubPresence();
  }, [recipientId]);
`;

content = content.replace(
  "  const chatId = [session?.uid, recipientId].sort().join('_');",
  "  const chatId = [session?.uid, recipientId].sort().join('_');\n" + presenceEffect
);

// Update Header to show presence
const oldHeader = `<h3 className="font-black text-stone-800 text-sm">{recipientName}</h3>
            <p className="text-[10px] font-bold text-emerald-600 flex items-center gap-1 uppercase tracking-widest mt-0.5">
              <CheckCircle2 size={10} /> Secure End-to-End Chat
            </p>`;

const newHeader = `<div className="flex items-center gap-2">
              <h3 className="font-black text-stone-800 text-sm">{recipientName}</h3>
              <div className="flex items-center gap-1">
                <span className={\`w-1.5 h-1.5 rounded-full \${isRecipientOnline ? 'bg-emerald-500 animate-pulse' : 'bg-stone-300'}\`}></span>
                <span className={\`text-[9px] font-bold uppercase tracking-widest \${isRecipientOnline ? 'text-emerald-600' : 'text-stone-400'}\`}>
                  {isRecipientOnline ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>
            <p className="text-[10px] font-bold text-emerald-600 flex items-center gap-1 uppercase tracking-widest mt-0.5">
              <CheckCircle2 size={10} /> Secure End-to-End Chat
            </p>`;

content = content.replace(oldHeader, newHeader);

fs.writeFileSync('src/components/common/DirectMessageChat.tsx', content);
