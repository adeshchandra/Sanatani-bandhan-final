import re

filepath = 'src/context/DataContext.tsx'
with open(filepath, 'r') as f:
    content = f.read()

if 'voteOnResolution' not in content:
    # 1. Update interface
    content = content.replace("addResolution: (res: Omit<TrusteeResolution, 'id'>) => boolean;", 
                              "addResolution: (res: Omit<TrusteeResolution, 'id'>) => boolean;\n  voteOnResolution: (id: string, type: 'favor' | 'against') => void;")
    
    # 2. Add implementation
    impl = """
  const voteOnResolution = (id: string, type: 'favor' | 'against') => {
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
    # Insert after addResolution impl
    add_res_str = """  const addResolution = (res: Omit<TrusteeResolution, 'id'>): boolean => {
    if (!checkAndIncrementModuleQuota('governance')) return false;
    const id = `res-${Date.now()}`;
    setAllResolutions((prev) => [{ ...res, id }, ...prev]);
    return true;
  };"""
    content = content.replace(add_res_str, add_res_str + impl)
    
    # 3. Add to export
    content = content.replace("addResolution,\n        addShift", "addResolution,\n        voteOnResolution,\n        addShift")
    
    with open(filepath, 'w') as f:
        f.write(content)
        print("Updated DataContext.tsx")
else:
    print("Already updated")
