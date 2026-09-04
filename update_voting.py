import re

filepath = 'src/components/domain6/PanchayatPollingDesk.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# Add a check to prevent duplicate voting (basic UI simulation)
# Currently it just calls voteOnResolution and shows a toast.

# Let's add local state to track what the user voted for during this session, 
# so the UI updates immediately to "voted" state if desired, or we just rely on DataContext.

new_handle_vote = """  const [votedResolutions, setVotedResolutions] = useState<Set<string>>(new Set());

  const handleVote = (id: string, type: 'favor' | 'against') => {
    if (votedResolutions.has(id)) {
      showToast('You have already voted on this resolution.', 'warning');
      return;
    }
    voteOnResolution(id, type);
    setVotedResolutions(prev => new Set(prev).add(id));
    showToast(`Vote recorded ${type === 'favor' ? 'in favor' : 'against'}`, 'success');
  };"""

if "const [votedResolutions" not in content:
    content = re.sub(r"  const handleVote = \(id: string, type: 'favor' \| 'against'\) => \{.*?^\s*\}\;", new_handle_vote, content, flags=re.MULTILINE | re.DOTALL)


# Let's update the visual rendering so the buttons disappear/change if voted
old_actions = """              {/* Voting Actions */}
              {res.status === 'Pending Review' && (
                <div className="pt-3 border-t border-stone-800 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleVote(res.id, 'favor')}
                    className="py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 font-bold text-xs flex justify-center items-center gap-1.5 transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Vote Favor
                  </button>
                  <button
                    onClick={() => handleVote(res.id, 'against')}
                    className="py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 font-bold text-xs flex justify-center items-center gap-1.5 transition-colors"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    Vote Against
                  </button>
                </div>
              )}"""


new_actions = """              {/* Voting Actions */}
              {res.status === 'Pending Review' && !votedResolutions.has(res.id) && (
                <div className="pt-3 border-t border-stone-800 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleVote(res.id, 'favor')}
                    className="py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 font-bold text-xs flex justify-center items-center gap-1.5 transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Vote Favor
                  </button>
                  <button
                    onClick={() => handleVote(res.id, 'against')}
                    className="py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 font-bold text-xs flex justify-center items-center gap-1.5 transition-colors"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    Vote Against
                  </button>
                </div>
              )}
              {res.status === 'Pending Review' && votedResolutions.has(res.id) && (
                 <div className="pt-3 border-t border-stone-800 text-center">
                    <span className="text-xs font-bold text-stone-500 uppercase tracking-widest flex items-center justify-center gap-1.5">
                       <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                       Vote Cast
                    </span>
                 </div>
              )}"""

content = content.replace(old_actions, new_actions)

with open(filepath, 'w') as f:
    f.write(content)
