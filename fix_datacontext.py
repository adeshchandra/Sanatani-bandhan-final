import re

filepath = 'src/context/DataContext.tsx'
with open(filepath, 'r') as f:
    content = f.read()

impl = """  const voteOnResolution = (id: string, type: 'favor' | 'against') => {
    setAllResolutions(prev => prev.map(r => {
      if (r.id === id) {
        return {
          ...r,
          votesInFavor: type === 'favor' ? r.votesInFavor + 1 : r.votesInFavor,
          votesAgainst: type === 'against' ? r.votesAgainst + 1 : r.votesAgainst
        };
      }
      return r;
    }));
  };
"""

# Insert voteOnResolution before addResidentPuja
if "const voteOnResolution" not in content:
    content = content.replace("  const addResidentPuja = ", impl + "\n  const addResidentPuja = ")

with open(filepath, 'w') as f:
    f.write(content)
