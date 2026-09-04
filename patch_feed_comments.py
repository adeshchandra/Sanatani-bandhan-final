import re
filepath = 'src/components/devotee/SanataniSocialFeed.tsx'
with open(filepath, 'r') as f:
    text = f.read()

replacement = """  // Add Comment
  const handleAddComment = (postId: string) => {
    const text = commentInput[postId]?.trim();
    if (!text) return;

    const newComment: FeedComment = {
      id: 'c_' + Date.now(),
      authorName: currentUser?.name || 'Devotee',
      authorRole: (currentUser?.role === 'trustee' ? 'Trustee' : currentUser?.role === 'manager' ? 'Staff' : 'Devotee'),
      avatarLetter: (currentUser?.name || 'D').charAt(0).toUpperCase(),
      text,
      timestamp: 'Just now'
    };

    OfflineSyncManager.addToQueue('COMMENT_SOCIAL', { workspaceId: activeWorkspace?.id, postId, comment: newComment });

    setPosts(prev => prev.map((p, idx) => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [...p.comments, newComment]
        };
      }
      return p;
    }));

    setCommentInput(prev => ({ ...prev, [postId]: '' }));
    showToast('Comment posted 🙏', 'success');
  };"""

text = re.sub(r'  // Add Comment\n  const handleAddComment = \(postId: string\) => \{.*?\n  };\n', replacement + "\n", text, flags=re.DOTALL)

with open(filepath, 'w') as f:
    f.write(text)
