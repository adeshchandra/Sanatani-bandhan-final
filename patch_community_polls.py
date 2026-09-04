import re

with open('src/components/domain6/CommunityPollsTab.tsx', 'r') as f:
    content = f.read()

timer_function_pattern = r"const getCountdown = \(expiresAt: number\) => \{.*?^\s*\};"
new_timer_function = """const renderTimerProgress = (poll: any) => {
    if (!poll.expiresAt) return null;
    const now = Date.now();
    const createdTime = poll.createdAt || (poll.expiresAt - 7 * 24 * 60 * 60 * 1000);
    const totalTime = poll.expiresAt - createdTime;
    const timeLeft = poll.expiresAt - now;
    
    if (timeLeft <= 0) return (
      <div className="mt-4 w-full">
         <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-200">Voting Closed</span>
      </div>
    );

    const percentLeft = Math.max(0, Math.min(100, (timeLeft / totalTime) * 100));
    const isUrgent = timeLeft < 24 * 60 * 60 * 1000;
    
    const hoursLeft = Math.floor(timeLeft / (60 * 60 * 1000));
    const minsLeft = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000));
    const daysLeft = Math.ceil(timeLeft / (24 * 60 * 60 * 1000));
    
    const timeText = isUrgent ? `${hoursLeft}h ${minsLeft}m left` : `${daysLeft} days left`;

    return (
      <div className="mt-4 mb-2 w-full flex flex-col gap-1.5">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
            <Timer size={12} className={isUrgent ? 'text-orange-500 animate-pulse' : 'text-blue-500'} />
            Poll Deadline
          </span>
          <span className={`text-[10px] font-black tracking-wide ${isUrgent ? 'text-orange-500' : 'text-gray-700'}`}>
            {timeText}
          </span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden shadow-inner border border-gray-200/50">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ${isUrgent ? 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]' : 'bg-blue-500'}`}
            style={{ width: `${percentLeft}%` }}
          ></div>
        </div>
      </div>
    );
  };"""

content = re.sub(timer_function_pattern, new_timer_function, content, flags=re.DOTALL | re.MULTILINE)

# Now we need to replace the rendering of getCountdown with the new renderTimerProgress.
# The rendering is:
"""
                       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                         {poll.targetAudience === 'MANAGERS' ? (
                           <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1.5">
                             <ShieldAlert size={12}/> Committee Only
                           </span>
                         ) : (
                           <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border bg-green-50 text-green-700 border-green-200 flex items-center gap-1.5">
                             <Users size={12}/> Public Poll
                           </span>
                         )}
                         <div className="shrink-0">
                         {poll.status === 'ACTIVE' && poll.expiresAt ? (
                           <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border flex items-center gap-1.5 shadow-sm ${
                             poll.expiresAt - Date.now() < 24 * 60 * 60 * 1000 ? 'bg-orange-50 text-orange-600 border-orange-200 animate-pulse' : 'bg-white text-gray-600 border-gray-200'
                           }`}>
                             <Timer size={12}/> {getCountdown(poll.expiresAt)}
                           </span>
                         ) : (
"""

rendering_pattern = r"<div className=\"shrink-0\">\s*\{poll\.status === 'ACTIVE' && poll\.expiresAt \? \(\s*<span.*?\{getCountdown\(poll\.expiresAt\)\}\s*<\/span>\s*\) : \(\s*<span className=\"text-\[9px\] font-black uppercase tracking-widest px-3 py-1\.5 rounded-lg border bg-gray-800 text-white border-gray-900 flex items-center gap-1\.5 shadow-sm\">\s*<Lock size=\{12\}\/> Concluded\s*<\/span>\s*\)\}\s*<\/div>"
new_rendering = """<div className="shrink-0">
                         {poll.status === 'CONCLUDED' && (
                           <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border bg-gray-100 text-gray-500 border-gray-200 flex items-center gap-1.5 shadow-sm">
                             <Lock size={12}/> Concluded
                           </span>
                         )}
                       </div>"""

content = re.sub(rendering_pattern, new_rendering, content, flags=re.DOTALL)

# And now we insert the `{renderTimerProgress(poll)}` right before `<h3 className="text-xl...`
insertion_pattern = r"(<h3 className=\"text-xl sm:text-2xl font-black text-gray-900 mb-3 leading-tight tracking-tight\">)"
new_insertion = r"{poll.status === 'ACTIVE' && renderTimerProgress(poll)}\n                     \1"
content = re.sub(insertion_pattern, new_insertion, content)

with open('src/components/domain6/CommunityPollsTab.tsx', 'w') as f:
    f.write(content)

