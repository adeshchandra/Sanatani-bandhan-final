import re

filepath = 'src/components/domain6/PanchayatPollingDesk.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# Destructure voteOnResolution
content = content.replace("const { resolutions, addResolution } = useData();", "const { resolutions, addResolution, voteOnResolution } = useData();")

# Call voteOnResolution
old_vote = """  const handleVote = (id: string, type: 'favor' | 'against') => {
    // In a real app, this would update the specific resolution and track who voted
    showToast(`Vote recorded ${type === 'favor' ? 'in favor' : 'against'}`, 'success');
  };"""

new_vote = """  const handleVote = (id: string, type: 'favor' | 'against') => {
    voteOnResolution(id, type);
    showToast(`Vote recorded ${type === 'favor' ? 'in favor' : 'against'}`, 'success');
  };"""

content = content.replace(old_vote, new_vote)

with open(filepath, 'w') as f:
    f.write(content)
