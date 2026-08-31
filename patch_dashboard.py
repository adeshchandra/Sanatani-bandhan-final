import re

filepath = 'src/components/dashboard/DashboardHome.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# Add icons
content = content.replace(
    "  ArrowUpRight,",
    "  ArrowUpRight,\n  Cake,\n  CalendarDays,"
)

# Find where to calculate upcoming birthdays
# Inside DashboardHome:
# const { devotees, treasury, vanshavali, poojaBookings, cows } = useData();

upcoming_birthdays_logic = """
  // Upcoming Birthdays Logic
  const today = new Date();
  const upcomingBirthdays = devotees.filter(d => {
    if (!d.birthDate) return false;
    const bDate = new Date(d.birthDate);
    // Set to current year to compare
    bDate.setFullYear(today.getFullYear());
    // If it already passed this year, check next year
    if (bDate < today && (today.getTime() - bDate.getTime()) > 24 * 60 * 60 * 1000) {
      bDate.setFullYear(today.getFullYear() + 1);
    }
    const diffTime = Math.abs(bDate.getTime() - today.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 14; // within next 14 days
  }).sort((a, b) => {
    const dateA = new Date(a.birthDate!);
    dateA.setFullYear(today.getFullYear());
    if (dateA < today) dateA.setFullYear(today.getFullYear() + 1);
    
    const dateB = new Date(b.birthDate!);
    dateB.setFullYear(today.getFullYear());
    if (dateB < today) dateB.setFullYear(today.getFullYear() + 1);
    
    return dateA.getTime() - dateB.getTime();
  });
"""

content = content.replace(
    "const panchang = calculatePanchang();",
    "const panchang = calculatePanchang();\n" + upcoming_birthdays_logic
)

widget_jsx = """
          {/* Upcoming Birthdays Widget */}
          {checkPermission(['trustee', 'manager', 'head_admin', 'volunteer']) && upcomingBirthdays.length > 0 && (
            <div className="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-widest text-slate-600 flex items-center gap-2">
                    <Cake className="w-3.5 h-3.5 text-rose-500" />
                    Upcoming Birthdays
                  </h2>
                  <p className="text-[10px] text-slate-500 mt-0.5">Next 14 Days</p>
                </div>
                <span className="text-xs font-bold bg-rose-50 text-rose-600 px-2 py-1 rounded-lg border border-rose-100">
                  {upcomingBirthdays.length} {taxonomy.memberNoun}s
                </span>
              </div>
              <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto custom-scrollbar">
                {upcomingBirthdays.map((devotee) => {
                  const bDate = new Date(devotee.birthDate!);
                  const monthName = bDate.toLocaleString('default', { month: 'short' });
                  const dateNum = bDate.getDate();
                  const age = today.getFullYear() - bDate.getFullYear();
                  
                  return (
                    <div key={devotee.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex flex-col items-center justify-center shrink-0">
                          <span className="text-[10px] font-bold text-rose-400 uppercase leading-none mb-0.5">{monthName}</span>
                          <span className="text-sm font-black text-rose-600 leading-none">{dateNum}</span>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800">{devotee.fullName || devotee.name}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded uppercase">
                              {devotee.role}
                            </span>
                            {devotee.phone && (
                              <span className="text-[10px] text-slate-400 font-mono">{devotee.phone}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right mr-2 hidden sm:block">
                          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Turning</p>
                          <p className="text-sm font-black text-slate-700">{age}</p>
                        </div>
                        <button 
                          onClick={() => {
                            // Can copy a quick whatsapp message
                            const msg = `Namaskaram ${devotee.fullName || devotee.name} ji! Wishing you a very Happy Birthday from ${activeWorkspace.name}. May the divine bless you with health and happiness.`;
                            navigator.clipboard.writeText(msg);
                            showToast('Birthday wish copied to clipboard!', 'success');
                          }}
                          className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-600 transition-colors"
                          title="Copy Greeting"
                        >
                          <CalendarDays className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
"""

content = content.replace(
    "</section>\n        {/* Right 1 Col */}",
    widget_jsx + "        </section>\n        {/* Right 1 Col */}"
)

with open(filepath, 'w') as f:
    f.write(content)

