import re
filepath = 'src/services/OfflineSyncManager.ts'
with open(filepath, 'r') as f:
    text = f.read()

# Add COMMENT_SOCIAL to type
text = text.replace("'HIDE_SOCIAL_POST';", "'HIDE_SOCIAL_POST' | 'COMMENT_SOCIAL';")

# Add handler
handler = """        } else if (item.type === 'COMMENT_SOCIAL') {
          const { workspaceId, postId, comment } = item.payload;
          if (workspaceId && postId && comment) {
            await updateDoc(doc(db, `communities/${workspaceId}/social_feed`, postId), {
              comments: arrayUnion(comment)
            });
          }
        }"""
text = text.replace("""        } else if (item.type === 'HIDE_SOCIAL_POST') {
          const { workspaceId, postId } = item.payload;
          if (workspaceId && postId) {
            await updateDoc(doc(db, `communities/${workspaceId}/social_feed`, postId), {
              isHidden: true
            });
          }
        }""", """        } else if (item.type === 'HIDE_SOCIAL_POST') {
          const { workspaceId, postId } = item.payload;
          if (workspaceId && postId) {
            await updateDoc(doc(db, `communities/${workspaceId}/social_feed`, postId), {
              isHidden: true
            });
          }
        } else if (item.type === 'COMMENT_SOCIAL') {
          const { workspaceId, postId, comment } = item.payload;
          if (workspaceId && postId && comment) {
            await updateDoc(doc(db, `communities/${workspaceId}/social_feed`, postId), {
              comments: arrayUnion(comment)
            });
          }
        }""")

with open(filepath, 'w') as f:
    f.write(text)
