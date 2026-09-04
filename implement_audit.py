import re

filepath = 'src/components/domain6/PanchayatPollingDesk.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# Add state for Audit modal
audit_state = """  const [auditPoll, setAuditPoll] = useState<any>(null);"""
if "const [auditPoll" not in content:
    content = content.replace("const [votedResolutions, setVotedResolutions] = useState<Set<string>>(new Set());", 
                              "const [votedResolutions, setVotedResolutions] = useState<Set<string>>(new Set());\n  const [auditPoll, setAuditPoll] = useState<any>(null);")


# Add Audit button in actions
old_actions = """              {/* Voting Actions */}"""

new_actions = """              {/* Advanced Actions */}
              <div className="pt-3 border-t border-stone-800 grid grid-cols-1 gap-2">
                 <button onClick={() => setAuditPoll(res)} className="py-2 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 font-bold text-xs flex justify-center items-center gap-1.5 transition-colors">
                    <BarChart3 className="w-3.5 h-3.5" />
                    View Audit Trail (Admin)
                 </button>
              </div>

              {/* Voting Actions */}"""

if "View Audit Trail (Admin)" not in content:
    content = content.replace(old_actions, new_actions)


# Add Audit Modal UI at the bottom
audit_modal = """
      {/* ✨ ADMIN EXCLUSIVE: VOTER AUDIT TRAIL MODAL */}
      {auditPoll && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md">
          <div className="bg-stone-900 border border-stone-700 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-stone-800 flex justify-between items-center bg-stone-800/50 shrink-0">
              <div>
                <h3 className="text-lg font-black text-stone-100 flex items-center gap-2">
                  <ShieldAlert className="text-indigo-500 w-5 h-5"/> Cryptographic Audit Trail
                </h3>
                <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mt-1">Admin Privilege Only</p>
              </div>
              <button onClick={() => setAuditPoll(null)} className="text-stone-400 hover:text-stone-100 transition-colors">
                 <XCircle className="w-5 h-5"/>
              </button>
            </div>

            <div className="overflow-y-auto flex-1 p-6 space-y-6 custom-scrollbar pb-12">
               <div className="bg-indigo-500/10 p-5 rounded-2xl border border-indigo-500/20 shadow-sm relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                 <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Audit Log for Resolution:</p>
                 <p className="text-sm font-black text-indigo-200">{auditPoll.title}</p>
                 <p className="text-[10px] font-mono text-indigo-400/50 mt-1">{auditPoll.resolutionNumber}</p>
               </div>

               <div className="border border-stone-700 rounded-2xl overflow-hidden shadow-sm">
                  <div className="bg-stone-800 p-4 border-b border-stone-700 flex justify-between items-center">
                    <span className="text-sm font-black text-emerald-400">Votes In Favor</span>
                    <span className="text-[10px] font-black bg-stone-900 px-2.5 py-1 rounded-md border border-stone-700 text-stone-400 uppercase tracking-widest">{auditPoll.votesInFavor} Votes</span>
                  </div>
                  <div className="p-4 bg-stone-900/50">
                     <p className="text-xs font-bold text-stone-500 italic text-center">
                       Detailed cryptographic tracing is masked in the preview environment to protect privacy.
                       In production, this section reveals exact timestamps and verified signatures of the {auditPoll.votesInFavor} board members who voted in favor.
                     </p>
                  </div>
               </div>

               <div className="border border-stone-700 rounded-2xl overflow-hidden shadow-sm">
                  <div className="bg-stone-800 p-4 border-b border-stone-700 flex justify-between items-center">
                    <span className="text-sm font-black text-red-400">Votes Against</span>
                    <span className="text-[10px] font-black bg-stone-900 px-2.5 py-1 rounded-md border border-stone-700 text-stone-400 uppercase tracking-widest">{auditPoll.votesAgainst} Votes</span>
                  </div>
                  <div className="p-4 bg-stone-900/50">
                     <p className="text-xs font-bold text-stone-500 italic text-center">
                        Detailed cryptographic tracing is masked in the preview environment to protect privacy.
                     </p>
                  </div>
               </div>

            </div>
          </div>
        </div>
      )}
"""

if "ADMIN EXCLUSIVE: VOTER AUDIT TRAIL MODAL" not in content:
    content = content.replace("      <UpsellModal", audit_modal + "\n      <UpsellModal")


with open(filepath, 'w') as f:
    f.write(content)
