const fs = require('fs');
let content = fs.readFileSync('src/components/domain4/SanataniVivahDesk.tsx', 'utf8');

// Add import
content = content.replace(
  "import { useAuthWorkspace } from '../../context/AuthWorkspaceContext';",
  "import { useAuthWorkspace } from '../../context/AuthWorkspaceContext';\nimport { DirectMessageChat } from '../common/DirectMessageChat';"
);

// Add activeChatProfile state
content = content.replace(
  "const [selectedProfile, setSelectedProfile] = useState<any>(null);",
  "const [selectedProfile, setSelectedProfile] = useState<any>(null);\n  const [activeChatProfile, setActiveChatProfile] = useState<any>(null);"
);

// Replace message button in Connections tab (line 528)
const oldMsgButton1 = `<button className="w-full sm:w-auto py-3 px-6 bg-stone-900 hover:bg-black text-white text-xs font-black uppercase tracking-widest rounded-xl transition-colors flex items-center justify-center gap-2">
                           <MessageCircle size={16}/> Message
                         </button>`;
const newMsgButton1 = `<button onClick={() => setActiveChatProfile(targetProfile)} className="w-full sm:w-auto py-3 px-6 bg-stone-900 hover:bg-black text-white text-xs font-black uppercase tracking-widest rounded-xl transition-colors flex items-center justify-center gap-2">
                           <MessageCircle size={16}/> Message
                         </button>`;
content = content.replace(oldMsgButton1, newMsgButton1);

// Replace message button in Selected Profile Modal
const oldMsgButton2 = `                      {status === 'PENDING' ? 'Request Pending' : status === 'ACCEPTED' ? 'Chat Available' : 'Connect'}
                    </button>`;
const newMsgButton2 = `                      {status === 'PENDING' ? 'Request Pending' : status === 'ACCEPTED' ? 'Send Message' : 'Connect'}
                    </button>`;
content = content.replace(oldMsgButton2, newMsgButton2);

// Add onClick action for Chat Available
const oldMsgButtonAction = `onClick={() => {
                        if (!status) handleConnect(selectedProfile.uid);
                      }}`;
const newMsgButtonAction = `onClick={() => {
                        if (!status) handleConnect(selectedProfile.uid);
                        else if (status === 'ACCEPTED') setActiveChatProfile(selectedProfile);
                      }}`;
content = content.replace(oldMsgButtonAction, newMsgButtonAction);

// Remove disabled when ACCEPTED
const oldDisabled = `disabled={!!status}`;
const newDisabled = `disabled={status === 'PENDING' || status === 'REJECTED'}`;
content = content.replace(oldDisabled, newDisabled);


// Inject Chat Overlay
const endTag = `    </div>
  );
}`;
const newEndTag = `
      {/* CHAT OVERLAY */}
      {activeChatProfile && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-2 sm:p-4 bg-stone-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-2xl h-full max-h-[85vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col">
            <DirectMessageChat 
              recipientId={activeChatProfile.uid}
              recipientName={activeChatProfile.name}
              recipientPhone={activeChatProfile.phone || '919876543210'}
              contextType="VIVAH"
              onClose={() => setActiveChatProfile(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}`;

content = content.replace(endTag, newEndTag);

fs.writeFileSync('src/components/domain4/SanataniVivahDesk.tsx', content);
