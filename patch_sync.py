import re
filepath = 'src/services/OfflineSyncManager.ts'
with open(filepath, 'r') as f:
    text = f.read()

text = text.replace("""        } else if (item.type === 'PRANAM_POST') {
          const { workspaceId, postId, incrementBy } = item.payload;
          if (workspaceId && postId) {
            await updateDoc(doc(db, `communities/${workspaceId}/social_feed`, postId), {
              pranams: increment(incrementBy)
            });
          }""", """        } else if (item.type === 'PRANAM_POST') {
          const { workspaceId, postId, pranams, flowersOffered, diyasLit } = item.payload;
          if (workspaceId && postId) {
            const updates: any = {};
            if (pranams) updates.pranams = increment(pranams);
            if (flowersOffered) updates.flowersOffered = increment(flowersOffered);
            if (diyasLit) updates.diyasLit = increment(diyasLit);
            await updateDoc(doc(db, `communities/${workspaceId}/social_feed`, postId), updates);
          }""")

with open(filepath, 'w') as f:
    f.write(text)
