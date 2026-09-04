import re
filepath = 'src/components/devotee/SanataniSocialFeed.tsx'
with open(filepath, 'r') as f:
    text = f.read()

# 1. Add OfflineSyncManager queues

# In handleCreatePost
text = text.replace("setPosts([newPost, ...posts]);", """setPosts([newPost, ...posts]);
    OfflineSyncManager.addToQueue('POST_SOCIAL', newPost);""")

# In handlePranam
text = text.replace("""  const handlePranam = (postId: string) => {
    setPosts(prev => prev.map((p, idx) => {
      if (p.id === postId) {
        const newStatus = !p.hasPranamed;
        return {
          ...p,
          hasPranamed: newStatus,
          pranams: newStatus ? p.pranams + 1 : Math.max(0, p.pranams - 1)
        };
      }
      return p;
    }));
  };""", """  const handlePranam = (postId: string) => {
    setPosts(prev => prev.map((p, idx) => {
      if (p.id === postId) {
        const newStatus = !p.hasPranamed;
        const inc = newStatus ? 1 : -1;
        OfflineSyncManager.addToQueue('PRANAM_POST', { workspaceId: activeWorkspace?.id, postId, pranams: inc });
        return {
          ...p,
          hasPranamed: newStatus,
          pranams: newStatus ? p.pranams + 1 : Math.max(0, p.pranams - 1)
        };
      }
      return p;
    }));
  };""")

# In handleOfferFlower
text = text.replace("""  const handleOfferFlower = (postId: string) => {
    setOfferingAnimation('flower');
    setTimeout(() => setOfferingAnimation(null), 1200);

    setPosts(prev => prev.map((p, idx) => {
      if (p.id === postId) {
        return { ...p, flowersOffered: p.flowersOffered + 1 };
      }
      return p;
    }));
    showToast('Offered Pushpam with devotion 🌺', 'success');
  };""", """  const handleOfferFlower = (postId: string) => {
    setOfferingAnimation('flower');
    setTimeout(() => setOfferingAnimation(null), 1200);
    OfflineSyncManager.addToQueue('PRANAM_POST', { workspaceId: activeWorkspace?.id, postId, flowersOffered: 1 });
    setPosts(prev => prev.map((p, idx) => {
      if (p.id === postId) {
        return { ...p, flowersOffered: p.flowersOffered + 1 };
      }
      return p;
    }));
    showToast('Offered Pushpam with devotion 🌺', 'success');
  };""")

# In handleOfferDiya
text = text.replace("""  const handleOfferDiya = (postId: string) => {
    setOfferingAnimation('diya');
    setTimeout(() => setOfferingAnimation(null), 1200);

    setPosts(prev => prev.map((p, idx) => {
      if (p.id === postId) {
        return { ...p, flowersOffered: p.flowersOffered + 1, diyasLit: p.diyasLit + 1 };
      }
      return p;
    }));
    showToast('Lit a sacred Deepam 🪔', 'success');
  };""", """  const handleOfferDiya = (postId: string) => {
    setOfferingAnimation('diya');
    setTimeout(() => setOfferingAnimation(null), 1200);
    OfflineSyncManager.addToQueue('PRANAM_POST', { workspaceId: activeWorkspace?.id, postId, diyasLit: 1 });
    setPosts(prev => prev.map((p, idx) => {
      if (p.id === postId) {
        return { ...p, diyasLit: p.diyasLit + 1 };
      }
      return p;
    }));
    showToast('Lit a sacred Deepam 🪔', 'success');
  };""")


# 2. Add Firestore synchronization
sync_effect = """
  // Sync remote posts from Firestore
  useEffect(() => {
    if (!activeWorkspace?.id) return;
    const feedRef = collection(db, `communities/${activeWorkspace.id}/social_feed`);
    const unsubscribe = onSnapshot(feedRef, (snapshot) => {
      const remotePosts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as FeedPost[];
      
      setPosts(prev => {
        const remoteMap = new Map(remotePosts.map(p => [p.id, p]));
        const localOnly = prev.filter(p => !remoteMap.has(p.id) && String(p.id).startsWith('post-'));
        
        const combined = [...localOnly, ...remotePosts].sort((a, b) => {
          return String(b.id).localeCompare(String(a.id));
        });
        
        return combined;
      });
    });
    return () => unsubscribe();
  }, [activeWorkspace?.id]);
"""

text = text.replace("""  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(posts));
    } catch (e) {
      console.error(e);
    }
  }, [posts, storageKey]);""", """  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(posts));
    } catch (e) {
      console.error(e);
    }
  }, [posts, storageKey]);
""" + sync_effect)

with open(filepath, 'w') as f:
    f.write(text)

