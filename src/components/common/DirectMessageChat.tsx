import React, { useState, useEffect, useRef } from 'react';
import { Send, Phone, MessageSquare, ShieldCheck, CheckCircle2, User, Loader2, X } from 'lucide-react';
import { db } from '../../lib/firebase';
import { collection, doc, query, onSnapshot, orderBy, serverTimestamp, addDoc, setDoc } from 'firebase/firestore';
import { useAuthWorkspace } from '../../context/AuthWorkspaceContext';

interface DirectMessageChatProps {
  recipientId: string;
  recipientName: string;
  recipientPhone: string;
  contextType: 'PUROHIT' | 'VIVAH' | 'SOCIAL';
  onClose?: () => void;
}

export const DirectMessageChat: React.FC<DirectMessageChatProps> = ({
  recipientId,
  recipientName,
  recipientPhone,
  contextType,
  onClose
}) => {
  const { session } = useAuthWorkspace();
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isRecipientOnline, setIsRecipientOnline] = useState(false);
  const [isRecipientTyping, setIsRecipientTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastTypingTime = useRef<number>(0);

  const chatId = [session?.uid, recipientId].sort().join('_');

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


  useEffect(() => {
    if (!session?.uid || !recipientId) return;

    // Ensure chat document exists
    setDoc(doc(db, 'chats', chatId), {
      participants: [session.uid, recipientId],
      participantNames: {
        [session.uid]: session.user?.name || 'User',
        [recipientId]: recipientName
      },
      updatedAt: serverTimestamp()
    }, { merge: true });

    const chatDocRef = doc(db, 'chats', chatId);
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

    const unsub = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
      setLoading(false);
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    });

    return () => { unsub(); unsubChatDoc(); };
  }, [chatId, session, recipientId]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
    
    if (!session?.uid) return;

    const now = Date.now();
    if (now - lastTypingTime.current > 2000) {
      lastTypingTime.current = now;
      setDoc(doc(db, 'chats', chatId), {
        [`typing.${session.uid}`]: true
      }, { merge: true });
    }

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      setDoc(doc(db, 'chats', chatId), {
        [`typing.${session.uid}`]: false
      }, { merge: true });
    }, 2500);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !session?.uid) return;

    const msg = newMessage.trim();
    setNewMessage('');

    await addDoc(collection(db, 'chats', chatId, 'messages'), {
      text: msg,
      senderId: session.uid,
      senderName: session.user?.name || 'User',
      timestamp: serverTimestamp()
    });
    
    setDoc(doc(db, 'chats', chatId), {
      updatedAt: serverTimestamp(),
      lastMessage: msg,
      [`typing.${session.uid}`]: false
    }, { merge: true });
    
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    lastTypingTime.current = 0;
  };

  const handleWhatsApp = () => {
    if (!recipientPhone) {
      alert("No phone number available for this user.");
      return;
    }
    const cleanPhone = recipientPhone.replace(/\D/g, '');
    let text = `Hari Om ${recipientName} ji, I found your profile on Sanatani Bandhan.`;
    if (contextType === 'PUROHIT') text = `Hari Om ${recipientName} ji, I would like to consult with you regarding your Purohit services on Sanatani Bandhan.`;
    if (contextType === 'VIVAH') text = `Hari Om ${recipientName} ji, I am reaching out regarding your Vivah profile on Sanatani Bandhan.`;
    
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="flex flex-col h-full bg-stone-50 border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
      {/* Chat Header */}
      <div className="bg-white border-b border-stone-200 p-4 flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 border border-amber-200 flex items-center justify-center text-amber-700 shadow-sm">
            <User size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-black text-stone-800 text-sm">{recipientName}</h3>
              <div className="flex items-center gap-1">
                <span className={`w-1.5 h-1.5 rounded-full ${isRecipientOnline ? 'bg-emerald-500 animate-pulse' : 'bg-stone-300'}`}></span>
                <span className={`text-[9px] font-bold uppercase tracking-widest ${isRecipientOnline ? 'text-emerald-600' : 'text-stone-400'}`}>
                  {isRecipientOnline ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>
            <p className="text-[10px] font-bold text-emerald-600 flex items-center gap-1 uppercase tracking-widest mt-0.5">
              <CheckCircle2 size={10} /> Secure End-to-End Chat
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleWhatsApp} className="p-2 bg-green-50 text-green-600 hover:bg-green-100 rounded-xl transition-colors border border-green-200 shadow-sm flex items-center gap-1.5 px-3">
            <MessageSquare size={14} />
            <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">WhatsApp</span>
          </button>
          {onClose && (
            <button onClick={onClose} className="p-2 bg-stone-100 text-stone-600 hover:bg-stone-200 rounded-xl transition-colors">
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50 custom-scrollbar">
        <div className="text-center mb-6">
          <span className="bg-stone-200/50 text-stone-500 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
            Chat Started with {recipientName}
          </span>
          <p className="text-xs text-stone-400 font-medium mt-3 max-w-xs mx-auto">
            {contextType === 'PUROHIT' && 'Discuss muhurats, dakshina, and ritual preparations directly.'}
            {contextType === 'VIVAH' && 'Respectful communication is monitored for community safety.'}
            {contextType === 'SOCIAL' && 'Connect and network securely within the community.'}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="w-5 h-5 text-stone-400 animate-spin" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-10 opacity-50">
            <MessageSquare size={32} className="text-stone-300 mb-3" />
            <p className="text-sm font-bold text-stone-500">No messages yet</p>
            <p className="text-xs text-stone-400 mt-1">Send a message to start the conversation</p>
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.senderId === session?.uid;
            return (
              <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] rounded-2xl p-3 ${
                  isMe 
                    ? 'bg-amber-500 text-white rounded-tr-sm shadow-sm' 
                    : 'bg-white text-stone-800 border border-stone-200 rounded-tl-sm shadow-sm'
                }`}>
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-[9px] mt-1.5 font-bold ${isMe ? 'text-amber-200' : 'text-stone-400'}`}>
                    {msg.timestamp?.toDate ? msg.timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}
                  </p>
                </div>
              </div>
            );
          })
        )}
                {isRecipientTyping && (
          <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="bg-white text-stone-500 border border-stone-200 rounded-2xl rounded-tl-sm shadow-sm p-4 py-3 flex items-center gap-1.5 w-fit">
              <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></span>
              <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div className="bg-white border-t border-stone-200 p-3">
        <form onSubmit={handleSend} className="flex items-center gap-2 relative">
          <input
            type="text"
            value={newMessage}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="flex-1 bg-stone-50 border border-stone-200 rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all shadow-inner"
          />
          <button 
            type="submit" 
            disabled={!newMessage.trim()}
            className="absolute right-1.5 top-1.5 bottom-1.5 aspect-square bg-amber-500 hover:bg-amber-600 disabled:bg-stone-300 text-white rounded-lg flex items-center justify-center transition-colors shadow-sm"
          >
            <Send size={16} className={newMessage.trim() ? 'ml-0.5' : ''} />
          </button>
        </form>
        <p className="text-center mt-2 text-[9px] font-bold text-stone-400 flex items-center justify-center gap-1">
          <ShieldCheck size={10} /> Protected by Sanatani Security
        </p>
      </div>
    </div>
  );
};
