import re

filepath = 'src/components/domain3/PoojaBookingDesk.tsx'
with open(filepath, 'r') as f:
    content = f.read()

summary_logic = """
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const totalBookingsThisMonth = poojas.filter((p) => {
    const dStr = p.bookingDate || p.tithiDate;
    if (!dStr) return false;
    const d = new Date(dStr);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  }).length;

  const pendingConfirmations = poojas.filter((p) => !p.status || p.status.toLowerCase() === 'pending').length;

  const filteredPoojas = poojas.filter(
"""
content = content.replace("  const filteredPoojas = poojas.filter(", summary_logic)

summary_ui = """      </div>

      {/* Summary Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-5 shadow-xl flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-stone-500 mb-1">Total Bookings This Month</p>
            <p className="text-3xl font-extrabold text-stone-100">{totalBookingsThisMonth}</p>
          </div>
          <div className="p-3 bg-amber-500/10 rounded-2xl border border-amber-500/20">
            <Calendar className="w-6 h-6 text-amber-500" />
          </div>
        </div>
        <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-5 shadow-xl flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-stone-500 mb-1">Pending Confirmations</p>
            <p className="text-3xl font-extrabold text-stone-100">{pendingConfirmations}</p>
          </div>
          <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20">
            <Clock className="w-6 h-6 text-blue-400" />
          </div>
        </div>
      </div>

      {/* Search */}"""

content = content.replace('      </div>\n      {/* Search */}', summary_ui)

with open(filepath, 'w') as f:
    f.write(content)
