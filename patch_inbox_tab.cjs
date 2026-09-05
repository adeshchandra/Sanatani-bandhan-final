const fs = require('fs');
let content = fs.readFileSync('src/components/domain3/PurohitMarketDesk.tsx', 'utf8');

// Add INBOX tab button
const oldTabs = `          <button onClick={() => setActiveTab('MY_ORDERS')} className={\`flex-1 md:w-40 py-3 rounded-lg text-[10px] font-black tracking-widest uppercase transition-all flex items-center justify-center gap-2 whitespace-nowrap px-4 \${activeTab === 'MY_ORDERS' ? 'bg-white text-stone-900 shadow-md border border-stone-100' : 'text-stone-500 hover:text-stone-800'}\`}>
            <ScrollText size={14}/> My Bookings
          </button>`;

const newTabs = `          <button onClick={() => setActiveTab('MY_ORDERS')} className={\`flex-1 md:w-40 py-3 rounded-lg text-[10px] font-black tracking-widest uppercase transition-all flex items-center justify-center gap-2 whitespace-nowrap px-4 \${activeTab === 'MY_ORDERS' ? 'bg-white text-stone-900 shadow-md border border-stone-100' : 'text-stone-500 hover:text-stone-800'}\`}>
            <ScrollText size={14}/> My Bookings
          </button>
          <button onClick={() => setActiveTab('INBOX')} className={\`flex-1 md:w-32 py-3 rounded-lg text-[10px] font-black tracking-widest uppercase transition-all flex items-center justify-center gap-2 whitespace-nowrap px-4 \${activeTab === 'INBOX' ? 'bg-white text-stone-900 shadow-md border border-stone-100' : 'text-stone-500 hover:text-stone-800'}\`}>
            <MessageSquare size={14}/> Inbox
          </button>`;

content = content.replace(oldTabs, newTabs);

// Add INBOX view
const myOrdersViewEnd = `        </div>
      )}

      {activeTab === 'MY_OFFERED_GIGS' && (`;

const inboxView = `        </div>
      )}

      {activeTab === 'INBOX' && (
        <div className="space-y-6 animate-in fade-in max-w-5xl mx-auto w-full">
          <div className="flex items-center justify-between border-b border-stone-200 pb-4 px-2">
            <div>
              <h3 className="text-xl font-black text-stone-900 flex items-center gap-2"><MessageSquare className="text-stone-700"/> Messages</h3>
              <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mt-1">Recent communications</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {recentChats.length > 0 ? (
              recentChats.map(chat => {
                const recipientId = chat.participants?.find((p) => p !== session?.uid) || 'Unknown';
                const recipientName = chat.participantNames?.[recipientId] || 'Chat Participant';
                return (
                  <div key={chat.id} className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm hover:shadow-md transition-all flex justify-between items-center cursor-pointer group hover:-translate-y-0.5" onClick={() => {
                     setSelectedGig({ purohitId: recipientId, purohitName: recipientName, title: 'Chat Inquiry' });
                     setCheckoutStep('CHAT');
                  }}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 shadow-sm"><User size={20}/></div>
                      <div>
                        <h4 className="text-sm font-black text-stone-900 group-hover:text-amber-700 transition-colors">{recipientName}</h4>
                        <p className="text-xs text-stone-500 mt-0.5 line-clamp-1 font-medium">{chat.lastMessage || 'No messages yet'}</p>
                      </div>
                    </div>
                    <ChevronRight className="text-stone-300 group-hover:text-amber-500 transition-colors"/>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-stone-200">
                 <MessageSquare size={48} className="mx-auto mb-4 opacity-20 text-stone-500"/>
                 <p className="text-lg font-black text-stone-800">No recent messages</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'MY_OFFERED_GIGS' && (`;

content = content.replace(myOrdersViewEnd, inboxView);

fs.writeFileSync('src/components/domain3/PurohitMarketDesk.tsx', content);
