import re

filepath = 'src/components/domain3/PoojaBookingDesk.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# 1. Update imports
content = content.replace("import { Flame, Plus, Search, Calendar, User, Video, CheckCircle2, Clock, X, Scan } from 'lucide-react';", 
"import { Flame, Plus, Search, Calendar, User, Video, CheckCircle2, Clock, X, Scan, List, ChevronLeft, ChevronRight } from 'lucide-react';")

# 2. Add PoojaCalendarView component before PoojaBookingDesk
calendar_comp = """
const PoojaCalendarView: React.FC<{ poojas: PoojaBookingRecord[] }> = ({ poojas }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  
  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  return (
    <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-5 shadow-xl overflow-x-auto">
      <div className="flex items-center justify-between mb-4 min-w-[600px]">
        <h3 className="text-lg font-bold text-stone-100">{monthName} {year}</h3>
        <div className="flex items-center gap-2">
          <button onClick={prevMonth} className="p-2 hover:bg-stone-800 rounded-lg text-stone-400 hover:text-stone-100 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={nextMonth} className="p-2 hover:bg-stone-800 rounded-lg text-stone-400 hover:text-stone-100 transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-2 mb-2 min-w-[600px]">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-[10px] font-black uppercase tracking-widest text-stone-500 py-2">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-2 min-w-[600px]">
        {days.map((day, idx) => {
          if (day === null) {
            return <div key={`empty-${idx}`} className="h-24 sm:h-32 rounded-xl bg-stone-950/30 border border-stone-900/50"></div>;
          }
          
          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const dayPoojas = poojas.filter(p => (p.bookingDate === dateStr || p.tithiDate === dateStr));
          
          const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();
          
          return (
            <div key={`day-${day}`} className={`h-24 sm:h-32 rounded-xl p-1.5 flex flex-col border ${isToday ? 'bg-amber-950/20 border-amber-500/30' : 'bg-stone-950/50 border-stone-800/80 hover:border-stone-700 transition-colors'}`}>
              <div className="flex justify-between items-start mb-1">
                <span className={`text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full ${isToday ? 'bg-amber-500 text-stone-950' : 'text-stone-400'}`}>
                  {day}
                </span>
                {dayPoojas.length > 0 && (
                  <span className="text-[9px] font-black bg-stone-800 text-stone-300 px-1.5 py-0.5 rounded-md">
                    {dayPoojas.length}
                  </span>
                )}
              </div>
              <div className="flex-1 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                {dayPoojas.map((pooja, pIdx) => (
                  <div key={pIdx} className="text-[9px] bg-stone-800/80 border border-stone-700 rounded-md p-1 truncate cursor-pointer hover:bg-stone-700" title={`${pooja.poojaName} - ${pooja.devoteeName}`}>
                    <span className="text-amber-400 font-semibold">{pooja.devoteeName.split(' ')[0]}</span>
                    <span className="text-stone-300 ml-1 block truncate">{pooja.poojaName}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const PoojaBookingDesk: React.FC = () => {
"""
content = content.replace("export const PoojaBookingDesk: React.FC = () => {", calendar_comp)

# 3. Add viewMode state
content = content.replace("const [searchTerm, setSearchTerm] = useState('');", "const [searchTerm, setSearchTerm] = useState('');\n  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');")

# 4. Replace Search div with Search + Toggle
old_search = """      {/* Search */}
      <div className="bg-stone-900/90 border border-stone-800 p-4 rounded-2xl flex items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search bookings by devotee, gotra, ritual..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-stone-800 border border-stone-700 rounded-xl pl-9 pr-3 py-2 text-xs text-stone-200 placeholder-stone-400 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>"""

new_search = """      {/* Controls: Search & View Toggle */}
      <div className="bg-stone-900/90 border border-stone-800 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search bookings by devotee, gotra, ritual..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-stone-800 border border-stone-700 rounded-xl pl-9 pr-3 py-2 text-xs text-stone-200 placeholder-stone-400 focus:outline-none focus:border-amber-500"
          />
        </div>
        <div className="flex items-center gap-1 bg-stone-950 p-1 rounded-xl border border-stone-800 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setViewMode('list')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              viewMode === 'list'
                ? 'bg-stone-800 text-stone-100 shadow-sm'
                : 'text-stone-500 hover:text-stone-300'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>List View</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('calendar')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              viewMode === 'calendar'
                ? 'bg-stone-800 text-stone-100 shadow-sm'
                : 'text-stone-500 hover:text-stone-300'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Calendar</span>
          </button>
        </div>
      </div>"""

content = content.replace(old_search, new_search)

# 5. Wrap Pooja Grid in viewMode check
old_grid = """      {/* Pooja Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPoojas.map((pooja, idx) => ("""

new_grid = """      {/* Content Area */}
      {viewMode === 'calendar' ? (
        <PoojaCalendarView poojas={filteredPoojas} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPoojas.map((pooja, idx) => ("""

content = content.replace(old_grid, new_grid)

# We also need to close the div for the list view before {/* Add Booking Modal */}
# Let's find the closing tag for the grid. It's immediately before {/* Add Booking Modal */}
old_close = """        ))}
      </div>

      {/* Add Booking Modal */}"""

new_close = """        ))}
        </div>
      )}

      {/* Add Booking Modal */}"""

content = content.replace(old_close, new_close)

with open(filepath, 'w') as f:
    f.write(content)
