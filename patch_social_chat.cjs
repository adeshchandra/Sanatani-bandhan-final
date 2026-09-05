const fs = require('fs');
let content = fs.readFileSync('src/components/devotee/SanataniSocialFeed.tsx', 'utf8');

// Add import
content = content.replace(
  "import { useAuthWorkspace } from '../../context/AuthWorkspaceContext';",
  "import { useAuthWorkspace } from '../../context/AuthWorkspaceContext';\nimport { DirectMessageChat } from '../common/DirectMessageChat';"
);

// Add activeChatPost state
content = content.replace(
  "const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);",
  "const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);\n  const [activeChatUser, setActiveChatUser] = useState<{id: string, name: string} | null>(null);"
);

// Add MessageSquare to lucide-react imports if it isn't there
content = content.replace(
  "MessageCircle, Heart, Share2, Send, Image as ImageIcon, Sparkles, MapPin,",
  "MessageCircle, Heart, Share2, Send, Image as ImageIcon, Sparkles, MapPin, MessageSquare,"
);

// Replace the author line with one containing a chat button
const authorLine = `<div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-sm font-bold text-stone-900">{post.authorName}</span>`;

const newAuthorLine = `<div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-sm font-bold text-stone-900 flex items-center gap-2">
                           {post.authorName}
                           <button 
                             onClick={(e) => { e.stopPropagation(); setActiveChatUser({ id: post.authorId || post.id + "_author", name: post.authorName || 'Author' }); }}
                             className="text-amber-500 hover:text-amber-600 transition-colors p-1 bg-amber-50 hover:bg-amber-100 rounded-md"
                             title="Direct Message"
                           >
                             <MessageSquare size={14} />
                           </button>
                        </span>`;

content = content.replace(authorLine, newAuthorLine);

// Inject Chat Overlay
const endTag = `    </div>
  );
}`;
const newEndTag = `
      {/* CHAT OVERLAY */}
      {activeChatUser && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-2 sm:p-4 bg-stone-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-2xl h-full max-h-[85vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col">
            <DirectMessageChat 
              recipientId={activeChatUser.id}
              recipientName={activeChatUser.name}
              recipientPhone="919876543210"
              contextType="SOCIAL"
              onClose={() => setActiveChatUser(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}`;

content = content.replace(endTag, newEndTag);

fs.writeFileSync('src/components/devotee/SanataniSocialFeed.tsx', content);
