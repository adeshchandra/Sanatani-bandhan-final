import re

filepath = 'src/components/domain7/YatraNetDesk.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# Add states for Social Feed
states = """  const [activeTab, setActiveTab] = useState<'SOCIAL' | 'MESH'>('SOCIAL');
  const [socialFeed, setSocialFeed] = useState<any[]>([]);
  const [newPostText, setNewPostText] = useState('');
  
  useEffect(() => {
    // Social Feed Listener
    if (!activeWorkspace?.id) return;
    const feedRef = collection(db, `communities/${activeWorkspace.id}/yatra_social_feed`);
    const q = query(feedRef, orderBy('timestamp', 'desc'), limit(50));
    const unsub = onSnapshot(q, (snap) => {
      const posts: any[] = [];
      snap.forEach(doc => posts.push({ id: doc.id, ...doc.data() }));
      setSocialFeed(posts);
    });
    return () => unsub();
  }, [activeWorkspace?.id]);

  const handlePostSocial = () => {
    if (!newPostText.trim()) return;
    if (currentUser?.kycStatus !== 'VERIFIED') {
      return showToast('Only Verified Devotees can post to prevent spam.', 'error');
    }
    
    OfflineSyncManager.addToQueue('POST_SOCIAL', {
      communityId: activeWorkspace?.id,
      senderId: currentUser?.id,
      senderName: currentUser?.name || 'Devotee',
      text: newPostText,
      pranams: 0,
      timestamp: Date.now(),
      isHidden: false
    });
    setNewPostText('');
    showToast('Post shared to the community!', 'success');
  };

  const handlePranam = (postId: string, currentPranams: number) => {
    OfflineSyncManager.addToQueue('PRANAM_POST', {
      communityId: activeWorkspace?.id,
      postId,
      pranams: (currentPranams || 0) + 1
    });
  };

  const handleHidePost = (postId: string) => {
    OfflineSyncManager.addToQueue('HIDE_SOCIAL_POST', {
      communityId: activeWorkspace?.id,
      postId
    });
    showToast('Post hidden by admin.', 'success');
  };
"""

content = content.replace("  const [sosDetails, setSosDetails] = useState('');", "  const [sosDetails, setSosDetails] = useState('');\n" + states)


# Add Tabs to the UI
tabs_ui = """    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-300 pb-24">
      {/* Tabs */}
      <div className="flex bg-stone-200/50 p-1.5 rounded-2xl w-full sm:w-auto overflow-x-auto shadow-inner">
        <button 
          onClick={() => setActiveTab('SOCIAL')}
          className={`flex-1 py-3 px-6 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'SOCIAL' ? 'bg-white text-stone-900 shadow-md scale-100' : 'text-stone-500 scale-95 hover:text-stone-700'}`}
        >
          Community Feed
        </button>
        <button 
          onClick={() => setActiveTab('MESH')}
          className={`flex-1 py-3 px-6 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'MESH' ? 'bg-white text-rose-600 shadow-md scale-100' : 'text-stone-500 scale-95 hover:text-stone-700'}`}
        >
          Mesh Network & SOS
        </button>
      </div>

      {activeTab === 'SOCIAL' ? (
        <div className="space-y-6 animate-in slide-in-from-bottom-4">
          {/* Create Post */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center font-black">
                {currentUser?.name?.charAt(0) || 'ॐ'}
              </div>
              <textarea 
                value={newPostText}
                onChange={e => setNewPostText(e.target.value)}
                placeholder="Share a Kirtan update, Seva milestone, or Dharmic thought..."
                className="w-full bg-stone-50 border border-stone-200 rounded-2xl p-4 text-sm font-bold text-stone-800 outline-none focus:border-amber-400 focus:bg-white resize-none"
                rows={2}
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest flex items-center gap-1">
                <CheckCircle2 size={12} className="text-green-500"/> Verified accounts only
              </span>
              <button 
                onClick={handlePostSocial}
                className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-md transition-all"
              >
                Post Update
              </button>
            </div>
          </div>

          {/* Feed */}
          <div className="space-y-4">
            {socialFeed.filter(p => !p.isHidden).map(post => (
              <div key={post.id} className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm flex flex-col gap-3 group">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-stone-100 text-stone-600 rounded-full flex items-center justify-center font-black">
                      {post.senderName?.charAt(0) || 'ॐ'}
                    </div>
                    <div>
                      <h4 className="font-black text-stone-800 text-sm">{post.senderName}</h4>
                      <p className="text-[10px] font-bold text-stone-400">{new Date(post.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                  {/* Admin Moderation */}
                  {(currentUser as any)?.role === 'admin' && (
                    <button 
                      onClick={() => handleHidePost(post.id)}
                      className="text-stone-400 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Hide Post (Admin)"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
                
                <p className="text-sm font-medium text-stone-700 ml-12 whitespace-pre-wrap leading-relaxed">
                  {post.text}
                </p>

                <div className="ml-12 mt-2 pt-3 border-t border-stone-100 flex items-center gap-6">
                  <button 
                    onClick={() => handlePranam(post.id, post.pranams)}
                    className="flex items-center gap-1.5 text-stone-500 hover:text-amber-600 transition-colors"
                  >
                    <span className="text-lg">🙏</span>
                    <span className="text-xs font-black">{post.pranams || 0} Pranams</span>
                  </button>
                </div>
              </div>
            ))}
            {socialFeed.length === 0 && (
              <div className="text-center py-20 text-stone-400">
                <div className="text-4xl mb-4 opacity-50">📿</div>
                <p className="text-lg font-bold">No posts yet.</p>
                <p className="text-xs uppercase tracking-widest">Be the first to share an update.</p>
              </div>
            )}
          </div>
        </div>
      ) : ("""

content = content.replace('    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-300 pb-24">', tabs_ui)

content = content.replace("        </div>\n      )}\n    </div>", "        </div>\n      )}\n      )} {/* End MESH tab */}\n    </div>")

with open(filepath, 'w') as f:
    f.write(content)
