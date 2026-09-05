const fs = require('fs');

let fileContent = fs.readFileSync('src/components/common/MySpaceModal.tsx', 'utf8');

// 1. Add missing imports
if (!fileContent.includes('LayoutDashboard')) {
  fileContent = fileContent.replace(
    "} from 'lucide-react';",
    "  LayoutDashboard, Bell\n} from 'lucide-react';"
  );
}

// 2. Change initial profileTab state
fileContent = fileContent.replace(
  "const [profileTab, setProfileTab] = useState<'PASS' | 'IDENTITY' | 'ACTIVITY' | 'GLOBAL' | 'SECURITY'>('PASS');",
  "const [profileTab, setProfileTab] = useState<'DASHBOARD' | 'PASS' | 'IDENTITY' | 'ACTIVITY' | 'GLOBAL' | 'SECURITY'>('DASHBOARD');"
);

// 3. Add Dashboard tab to the tab list (before Gate Pass)
const tabListStr = `<button onClick={()=>setProfileTab('PASS')} className={\`pb-3 text-[11px] sm:text-xs font-black uppercase tracking-widest transition-colors whitespace-nowrap flex items-center gap-1.5 \${profileTab === 'PASS' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-stone-400 hover:text-stone-700'}\`}><Ticket size={14} className="mb-0.5 mr-1"/> Gate Pass</button>`;

const newTabListStr = `<button onClick={()=>setProfileTab('DASHBOARD')} className={\`pb-3 text-[11px] sm:text-xs font-black uppercase tracking-widest transition-colors whitespace-nowrap flex items-center gap-1.5 \${profileTab === 'DASHBOARD' ? 'text-amber-600 border-b-2 border-amber-600' : 'text-stone-400 hover:text-stone-700'}\`}><LayoutDashboard size={14} className="mb-0.5 mr-1"/> Overview</button>\n                ` + tabListStr;

fileContent = fileContent.replace(tabListStr, newTabListStr);

// 4. Add Dashboard content area
const dashboardContent = `
            {profileTab === 'DASHBOARD' && (
              <div className="space-y-6 animate-in fade-in">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                   <div className="bg-white p-5 rounded-3xl shadow-sm border border-stone-100 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
                     <Award className="w-8 h-8 text-amber-500 mb-2" />
                     <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Seva Score</p>
                     <p className="text-2xl font-black text-stone-900">{score}</p>
                   </div>
                   <div className="bg-white p-5 rounded-3xl shadow-sm border border-stone-100 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
                     <Banknote className="w-8 h-8 text-emerald-500 mb-2" />
                     <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Total Donated</p>
                     <p className="text-2xl font-black text-stone-900">₹{(activeMember.totalDonated || 0).toLocaleString()}</p>
                   </div>
                   <div className="bg-white p-5 rounded-3xl shadow-sm border border-stone-100 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
                     <Clock className="w-8 h-8 text-blue-500 mb-2" />
                     <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Seva Hours</p>
                     <p className="text-2xl font-black text-stone-900">{activeMember.volunteerHours || 0} hrs</p>
                   </div>
                   <div className="bg-white p-5 rounded-3xl shadow-sm border border-stone-100 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
                     <CheckCircle2 className="w-8 h-8 text-indigo-500 mb-2" />
                     <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Profile Status</p>
                     <p className="text-2xl font-black text-stone-900">{completionScore}%</p>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   {/* Left Column: Role & Permissions + Recent Activity */}
                   <div className="md:col-span-2 space-y-6">
                      <div className="bg-white rounded-3xl shadow-sm border border-stone-100 p-6 sm:p-8 relative overflow-hidden">
                         <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
                            <ShieldCheck className="w-40 h-40" />
                         </div>
                         <h3 className="text-sm font-black text-stone-900 uppercase tracking-widest mb-6 flex items-center gap-2"><Lock className="w-4 h-4 text-stone-400"/> Role & Access Summary</h3>
                         <div className="flex flex-col sm:flex-row gap-6 relative z-10">
                            <div className="flex-1 bg-stone-50 rounded-2xl p-5 border border-stone-100 flex flex-col justify-center">
                               <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1">Assigned Role</p>
                               <p className="text-xl font-black text-stone-900">{currentRole}</p>
                            </div>
                            <div className="flex-1 bg-stone-50 rounded-2xl p-5 border border-stone-100 flex flex-col justify-center">
                               <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1">Seva Tier</p>
                               <p className="text-xl font-black text-amber-600">{activeMember.sevaTier || 'Sadharan'}</p>
                            </div>
                         </div>
                      </div>

                      <div className="bg-white rounded-3xl shadow-sm border border-stone-100 p-6 sm:p-8">
                         <h3 className="text-sm font-black text-stone-900 uppercase tracking-widest mb-6 flex items-center gap-2"><History className="w-4 h-4 text-stone-400"/> Recent Activity</h3>
                         {filteredPersonalTransactions.length > 0 ? (
                            <div className="space-y-3">
                               {filteredPersonalTransactions.slice(0, 3).map((tr, i) => (
                                 <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-stone-50 transition-colors border border-transparent hover:border-stone-100 group cursor-default">
                                    <div className="flex items-center gap-4">
                                       <div className={\`w-10 h-10 rounded-full flex items-center justify-center shadow-sm \${tr.type === 'Income' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}\`}>
                                          <Banknote size={16} />
                                       </div>
                                       <div>
                                          <p className="text-sm font-bold text-stone-900 group-hover:text-stone-700 transition-colors">{tr.category}</p>
                                          <p className="text-[10px] font-bold text-stone-500 mt-0.5">{new Date(tr.date).toLocaleDateString()}</p>
                                       </div>
                                    </div>
                                    <p className={\`text-sm font-black \${tr.type === 'Income' ? 'text-emerald-600' : 'text-rose-600'}\`}>
                                       {tr.type === 'Income' ? '+' : '-'}₹{tr.amount.toLocaleString()}
                                    </p>
                                 </div>
                               ))}
                            </div>
                         ) : (
                            <div className="text-center py-10 text-stone-400 bg-stone-50 rounded-2xl border border-stone-100 border-dashed flex flex-col items-center justify-center">
                               <History className="w-8 h-8 mb-3 opacity-20" />
                               <p className="text-xs font-bold uppercase tracking-widest">No recent activity</p>
                            </div>
                         )}
                      </div>
                   </div>

                   {/* Right Column: Notifications Center */}
                   <div className="md:col-span-1">
                      <div className="bg-white rounded-3xl shadow-sm border border-stone-100 p-6 sm:p-8 h-full flex flex-col">
                         <div className="flex items-center justify-between mb-6">
                           <h3 className="text-sm font-black text-stone-900 uppercase tracking-widest flex items-center gap-2"><Bell className="w-4 h-4 text-stone-400"/> Notifications</h3>
                           <span className="bg-amber-100 text-amber-700 text-[9px] font-black uppercase px-2 py-0.5 rounded-full">3 New</span>
                         </div>
                         
                         <div className="space-y-4 flex-1">
                            {[
                               { id: 1, title: 'Profile Incomplete', desc: 'Please add your emergency contact.', icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-50' },
                               { id: 2, title: 'Upcoming Duty', desc: 'You have a volunteer shift tomorrow at 8 AM.', icon: Clock, color: 'text-blue-500', bg: 'bg-blue-50' },
                               { id: 3, title: 'Donation Received', desc: 'Thank you for your recent contribution.', icon: Heart, color: 'text-rose-500', bg: 'bg-rose-50' },
                            ].map(notif => (
                               <div key={notif.id} className="flex gap-3 items-start p-4 rounded-2xl bg-stone-50/50 hover:bg-stone-50 border border-stone-100 transition-colors cursor-pointer group">
                                  <div className={\`mt-0.5 w-8 h-8 shrink-0 rounded-full flex items-center justify-center shadow-sm \${notif.bg} \${notif.color}\`}>
                                     <notif.icon size={14} />
                                  </div>
                                  <div>
                                     <p className="text-xs font-bold text-stone-900 group-hover:text-stone-700 transition-colors">{notif.title}</p>
                                     <p className="text-[10px] text-stone-500 font-medium leading-snug mt-1">{notif.desc}</p>
                                  </div>
                               </div>
                            ))}
                         </div>
                         
                         <button className="w-full mt-4 py-3 bg-stone-100 hover:bg-stone-200 text-stone-600 text-[10px] font-black uppercase tracking-widest rounded-xl transition-colors">
                           View All
                         </button>
                      </div>
                   </div>
                </div>
              </div>
            )}
`;

const insertMarker = `{profileTab === 'PASS' && (`;
fileContent = fileContent.replace(insertMarker, dashboardContent + insertMarker);

fs.writeFileSync('src/components/common/MySpaceModal.tsx', fileContent);

