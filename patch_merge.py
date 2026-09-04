import re
filepath = 'src/components/devotee/SanataniSocialFeed.tsx'
with open(filepath, 'r') as f:
    text = f.read()

replacement = """      setPosts(prev => {
        const prevMap = new Map(prev.map(p => [p.id, p]));
        
        // Enhance remote posts with local transient UI states (like hasPranamed)
        const enhancedRemote = remotePosts.map(rp => {
          const localMatch = prevMap.get(rp.id);
          if (localMatch) {
            return { ...rp, hasPranamed: localMatch.hasPranamed };
          }
          return rp;
        });

        const remoteMap = new Map(enhancedRemote.map(p => [p.id, p]));
        const localOnly = prev.filter(p => !remoteMap.has(p.id) && String(p.id).startsWith('post-'));
        
        const combined = [...localOnly, ...enhancedRemote].sort((a, b) => {
          return String(b.id).localeCompare(String(a.id));
        });
        
        return combined;
      });"""

text = re.sub(r'      setPosts\(prev => \{\n        const remoteMap = new Map\(remotePosts\.map.*?return combined;\n      \}\);', replacement, text, flags=re.DOTALL)

with open(filepath, 'w') as f:
    f.write(text)
