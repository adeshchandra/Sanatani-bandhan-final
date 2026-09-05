import React, { useState } from 'react';
import { Flame, Plus, Search, Calendar, User, Video, CheckCircle2, Clock, X, Scan, List, ChevronLeft, ChevronRight, Printer, XCircle, Building2 } from 'lucide-react';
import { useAuthWorkspace } from '../../context/AuthWorkspaceContext';
import { useData } from '../../context/DataContext';
import { useScopedData } from '../../hooks/useScopedData';
import { PoojaBookingRecord } from '../../types';
import { useToast } from '../../context/ToastContext';
import { MemberSearchSelect } from '../common/MemberSearchSelect';
import { useNotifications } from '../../context/NotificationContext';
import { useEffect } from 'react';
import { usePlanGate } from '../../hooks/usePlanGate';
import { UpsellModal } from '../common/UpsellModal';
import { CameraScanner } from '../common/CameraScanner';


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

  const { activeWorkspace } = useAuthWorkspace();
  const { checkGate, showUpsell, upsellModule, closeUpsell } = usePlanGate();
  
  const { devotees, addPoojaBooking, updatePoojaStatus } = useData();
  const poojas = useScopedData<PoojaBookingRecord>('pooja_bookings', {}, { orderBy: { field: 'bookingDate', direction: 'desc' } });
  const { showToast } = useToast();

  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [poojaName, setPoojaName] = useState('Maha Rudrabhishek');
  const [devoteeId, setDevoteeId] = useState('');
  const [devoteeName, setDevoteeName] = useState('');
  const [gotra, setGotra] = useState('Kashyapa');
  const [nakshatra, setNakshatra] = useState('Rohini');
  const [sankalpText, setSankalpText] = useState('Family prosperity, peace, and spiritual growth');
  const [bookingDate, setBookingDate] = useState('2026-08-28');
  const [timeSlot, setTimeSlot] = useState('08:00 AM - 10:00 AM');
  const [priestAssigned, setPriestAssigned] = useState('Acharya Vidyadhar Shastri');
  const [dakshinaAmount, setDakshinaAmount] = useState<number>(3100);
  const [liveStreamUrl, setLiveStreamUrl] = useState('');

  const [isScannerOpen, setIsScannerOpen] = useState(false);
  
  const [bookingType, setBookingType] = useState<'Individual' | 'Organization'>('Individual');
  const [organizationName, setOrganizationName] = useState('');
  
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [cancellingId, setCancellingId] = useState('');
  const [cancellationReason, setCancellationReason] = useState('');

  const handleScan = async (data: string): Promise<boolean> => {
    try {
      const parsed = JSON.parse(data);
      const bookingId = parsed.bookingId;
      if (bookingId) {
        const booking = poojas.find((p) => p.id === bookingId);
        if (booking) {
          showToast(`Devotee ${booking.devoteeName} checked in for ${booking.poojaName}`, "success");
          updatePoojaStatus(booking.id, "In-Progress");
          return true;
        } else {
          showToast("Invalid Digital Puja Pass. Booking not found.", "error");
          return false;
        }
      } else {
        showToast("Invalid QR Code format.", "error");
        return false;
      }
    } catch (e) {
      showToast("Error reading Digital Puja Pass.", "error");
      return false;
    }
  };

  const handleDevoteeSelect = (id: string) => {
    setDevoteeId(id);
    const d = devotees.find((item) => item.id === id);
    if (d) {
      setDevoteeName(d.fullName);
      setGotra(d.gotra);
    }
  };

  const handleAddBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!devoteeName.trim() || !poojaName) {
      showToast('Please fill in devotee name and ritual details', 'warning');
      return;
    }

    if (!checkGate('events', poojas.length)) {
      setIsAddModalOpen(false);
      return;
    }

    addPoojaBooking({
      workspaceId: activeWorkspace.id,
      poojaName,
      devoteeId: devoteeId || undefined,
      devoteeName: devoteeName.trim(),
      gotra: gotra.trim(),
      nakshatra: nakshatra.trim() || undefined,
      sankalpText: sankalpText.trim(),
      bookingDate,
      timeSlot,
      priestAssigned: priestAssigned.trim(),
      dakshinaAmount: Number(dakshinaAmount),
      liveStreamUrl: liveStreamUrl.trim() || undefined,
    });

    setIsAddModalOpen(false);
  };



  const { addNotification } = useNotifications();

  useEffect(() => {
    const checkUpcomingPoojas = () => {
      const notifiedKey = 'sb_notified_poojas';
      let notifiedIds: string[] = [];
      try {
        notifiedIds = JSON.parse(localStorage.getItem(notifiedKey) || '[]');
      } catch (e) {}

      const now = new Date();
      let newlyNotified = false;

      poojas.forEach(pooja => {
        const dStr = pooja.bookingDate || pooja.tithiDate;
        if (!dStr) return;
        
        // Parse time if possible, otherwise use 00:00
        let poojaDate = new Date(dStr);
        if (pooja.timeSlot) {
            const timeMatch = pooja.timeSlot.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
            if (timeMatch) {
                let hours = parseInt(timeMatch[1]);
                const mins = parseInt(timeMatch[2]);
                const isPM = timeMatch[3].toUpperCase() === 'PM';
                if (isPM && hours < 12) hours += 12;
                if (!isPM && hours === 12) hours = 0;
                poojaDate.setHours(hours, mins, 0, 0);
            }
        }

        const diffHours = (poojaDate.getTime() - now.getTime()) / (1000 * 60 * 60);

        if (diffHours > 0 && diffHours <= 24 && !notifiedIds.includes(pooja.id)) {
          addNotification({
            title: 'Upcoming Pooja Reminder',
            message: `${pooja.poojaName} for ${pooja.devoteeName} is scheduled in less than 24 hours.`,
            type: 'info'
          });
          notifiedIds.push(pooja.id);
          newlyNotified = true;
        }
      });

      if (newlyNotified) {
        localStorage.setItem(notifiedKey, JSON.stringify(notifiedIds));
      }
    };

    checkUpcomingPoojas();
    const interval = setInterval(checkUpcomingPoojas, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [poojas, addNotification]);


  const openCancelModal = (id: string) => {
    setCancellingId(id);
    setCancellationReason('');
    setCancelModalOpen(true);
  };

  const confirmCancel = () => {
    if (!cancellationReason.trim()) {
      showToast('Please provide a reason for cancellation', 'warning');
      return;
    }
    updatePoojaStatus(cancellingId, 'Cancelled', { cancellationReason });
    setCancelModalOpen(false);
  };

  const printReceipt = (pooja: PoojaBookingRecord) => {
    const receiptContent = `
      <html>
        <head>
          <title>Receipt - ${pooja.id}</title>
          <style>
            body { font-family: system-ui, sans-serif; padding: 40px; color: #1c1917; }
            .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #e7e5e4; padding-bottom: 20px; }
            .header h1 { margin: 0; color: #d97706; }
            .details { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 40px; }
            .detail-group { margin-bottom: 15px; }
            .label { font-size: 12px; color: #78716c; text-transform: uppercase; font-weight: bold; }
            .value { font-size: 16px; font-weight: 500; }
            .footer { text-align: center; margin-top: 50px; font-size: 12px; color: #a8a29e; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { padding: 12px; text-align: left; border-bottom: 1px solid #e7e5e4; }
            th { background-color: #f5f5f4; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Sanatani Bandhan</h1>
            <h2>Sacred Ritual Receipt</h2>
            <p>Receipt No: ${pooja.receiptRef || pooja.id}</p>
          </div>
          <div class="details">
            <div class="detail-group">
              <div class="label">Devotee / Organization Name</div>
              <div class="value">${pooja.bookingType === 'Organization' ? pooja.organizationName : pooja.devoteeName}</div>
            </div>
            <div class="detail-group">
              <div class="label">Date & Time</div>
              <div class="value">${pooja.bookingDate || pooja.tithiDate} | ${pooja.timeSlot || 'Any time'}</div>
            </div>
            <div class="detail-group">
              <div class="label">Ritual Name</div>
              <div class="value">${pooja.poojaName}</div>
            </div>
            <div class="detail-group">
              <div class="label">Gotra / Nakshatra</div>
              <div class="value">${pooja.gotra} ${pooja.nakshatra ? `(${pooja.nakshatra})` : ''}</div>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Dakshina for ${pooja.poojaName}</td>
                <td>${pooja.dakshinaAmount}</td>
              </tr>
              <tr>
                <td><strong>Total Paid</strong></td>
                <td><strong>₹${pooja.dakshinaAmount}</strong></td>
              </tr>
            </tbody>
          </table>
          <div class="footer">
            <p>May the divine blessings be with you always.</p>
            <p>Generated on ${new Date().toLocaleDateString()}</p>
          </div>
        </body>
      </html>
    `;
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    if (printWindow) {
      printWindow.document.write(receiptContent);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    }
  };

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
    (p) =>
      p.poojaName?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      p.devoteeName?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      p.gotra?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      p.priestAssigned?.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-stone-900/90 border border-stone-800 p-6 rounded-3xl shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold uppercase tracking-wider">
              Vedic Sankalp Registry
            </span>
            <span className="text-xs text-stone-400 font-mono">
              {poojas.length} Scheduled Rituals
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-stone-100">
            Pooja & Ritual Booking Desk
          </h2>
          <p className="text-xs text-stone-400 mt-0.5">
            Sankalp recording with Gotra, Nakshatra, Acharya allocation, and Live streaming link
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            type="button"
            onClick={() => setIsScannerOpen(true)}
            className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 font-bold text-xs flex items-center gap-1.5 shadow-lg transition-all cursor-pointer w-full sm:w-auto"
          >
            <Scan className="w-4 h-4 text-amber-500" />
            <span>Scan Pass</span>
          </button>
          <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-amber-600/20 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Book Pooja / Sankalp</span>
        </button>
        </div>
      </div>

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

      {/* Controls: Search & View Toggle */}
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
      </div>

      {/* Content Area */}
      {viewMode === 'calendar' ? (
        <PoojaCalendarView poojas={filteredPoojas} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPoojas.map((pooja, idx) => (
          <div
            key={`${pooja.id}-${idx}`}
            className="bg-stone-900/90 border border-stone-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start justify-between gap-2 pb-3 border-b border-stone-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                    {pooja.bookingType === 'Organization' ? <Building2 className="w-4 h-4" /> : <Flame className="w-4 h-4" />}
                  </div>
                  <div className="truncate">
                    <h3 className="font-extrabold text-sm text-stone-100 truncate">{pooja.poojaName}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold">
                      {pooja.bookingType === 'Organization' && <span className="px-1.5 py-0.5 rounded bg-stone-800 text-[9px] text-stone-400 uppercase tracking-widest border border-stone-700">Org</span>}
                      <p className="truncate">{pooja.bookingType === 'Organization' ? pooja.organizationName : pooja.devoteeName}</p>
                    </div>
                  </div>
                </div>

                <span
                  className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-sm ${
                    pooja.status === 'Completed'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/50'
                      : pooja.status === 'Confirmed'
                      ? 'bg-blue-950 text-blue-400 border border-blue-800/50'
                      : pooja.status === 'In-Progress'
                      ? 'bg-amber-950 text-amber-400 border border-amber-800/50 animate-pulse'
                      : 'bg-stone-800 text-stone-400 border border-stone-700'
                  }`}
                >
                  {pooja.status || 'Pending'}
                </span>
              </div>

              <div className="py-2 space-y-1.5 text-xs text-stone-300">
                <div className="flex items-center justify-between">
                  <span className="text-stone-400">Gotra & Nakshatra:</span>
                  <span className="font-semibold text-stone-100">
                    {pooja.gotra} {pooja.nakshatra ? `(${pooja.nakshatra})` : ''}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-400">Scheduled Date:</span>
                  <span className="font-mono text-amber-300">{pooja.bookingDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-400">Time Slot:</span>
                  <span className="text-stone-200">{pooja.timeSlot}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-400">Acharya:</span>
                  <span className="text-stone-200 font-medium">{pooja.priestAssigned}</span>
                </div>

                {pooja.sankalpText && (
                  <div className="pt-2 border-t border-stone-800/80">
                    <p className="text-[10px] text-stone-400 font-semibold uppercase">Sacred Sankalp:</p>
                    <p className="text-[11px] text-amber-200/90 italic">"{pooja.sankalpText}"</p>
                  </div>
                )}
              </div>

              <div className="p-2.5 rounded-xl bg-stone-950/60 border border-stone-800 flex items-center justify-between text-xs">
                <div>
                  <p className="text-[10px] text-stone-400 font-semibold uppercase">Dakshina</p>
                  <p className="font-black text-amber-400">₹{(pooja.dakshinaAmount || 0).toLocaleString()}</p>
                </div>
                {pooja.liveStreamUrl && (
                  <a
                    href={pooja.liveStreamUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-bold flex items-center gap-1 hover:bg-rose-500/30"
                  >
                    <Video className="w-3 h-3" />
                    <span>Watch Live</span>
                  </a>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-stone-800 flex flex-wrap items-center justify-between gap-2">
              <span className="text-[10px] text-stone-400 font-mono">ID: {pooja.id}</span>
              
              <div className="flex items-center gap-2">
                {(pooja.status === 'Confirmed' || pooja.status === 'Completed') && (
                  <button
                    type="button"
                    onClick={() => printReceipt(pooja)}
                    className="px-2.5 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-stone-100 text-[10px] font-semibold flex items-center gap-1 transition-all cursor-pointer border border-stone-700"
                  >
                    <Printer className="w-3 h-3" />
                    <span>Receipt</span>
                  </button>
                )}
                
                {pooja.status !== 'Completed' && pooja.status !== 'Cancelled' && (
                  <>
                    <button
                      type="button"
                      onClick={() => openCancelModal(pooja.id)}
                      className="px-2.5 py-1.5 rounded-xl bg-stone-800 hover:bg-red-500/20 text-stone-300 hover:text-red-400 text-[10px] font-semibold flex items-center gap-1 transition-all cursor-pointer border border-stone-700 hover:border-red-500/30"
                    >
                      <XCircle className="w-3 h-3" />
                      <span>Cancel</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => updatePoojaStatus(pooja.id, 'Completed')}
                      className="px-2.5 py-1.5 rounded-xl bg-stone-800 hover:bg-emerald-600 hover:text-stone-950 text-stone-300 hover:border-emerald-500 text-[10px] font-semibold flex items-center gap-1 transition-all cursor-pointer border border-stone-700"
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Complete</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
        </div>
      )}

      {/* Add Booking Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md">
          <div className="bg-stone-900 border border-stone-700 rounded-2xl max-w-lg w-full p-6 text-stone-100 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800 mb-4">
              <h3 className="font-bold text-sm">Schedule Sacred Pooja / Sankalp</h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-stone-400 hover:text-stone-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddBooking} className="space-y-3 text-xs">
              <div>
                <label className="block text-stone-300 font-semibold mb-1">Ritual / Pooja Name *</label>
                <select
                  value={poojaName}
                  onChange={(e) => setPoojaName(e.target.value)}
                  className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-200"
                >
                  <option>Maha Rudrabhishek</option>
                  <option>Satyanarayan Vrat Katha</option>
                  <option>Maha Ganapati Homa</option>
                  <option>Navagraha Shanti Homa</option>
                  <option>Durga Saptashati Chandi Path</option>
                  <option>Sundarkand Path</option>
                  <option>Gau Seva Maha Yajna</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Booking Type</label>
                  <div className="flex bg-stone-800 p-1 rounded-xl border border-stone-700">
                    <button
                      type="button"
                      onClick={() => setBookingType('Individual')}
                      className={`flex-1 py-1.5 text-[10px] font-bold rounded-lg transition-all ${bookingType === 'Individual' ? 'bg-amber-600 text-stone-950' : 'text-stone-400 hover:text-stone-200'}`}
                    >
                      Individual
                    </button>
                    <button
                      type="button"
                      onClick={() => setBookingType('Organization')}
                      className={`flex-1 py-1.5 text-[10px] font-bold rounded-lg transition-all ${bookingType === 'Organization' ? 'bg-amber-600 text-stone-950' : 'text-stone-400 hover:text-stone-200'}`}
                    >
                      Organization
                    </button>
                  </div>
                </div>
                {bookingType === 'Organization' ? (
                  <div>
                    <label className="block text-stone-300 font-semibold mb-1">Organization Name *</label>
                    <input
                      type="text"
                      required
                      value={organizationName}
                      onChange={(e) => setOrganizationName(e.target.value)}
                      placeholder="e.g. Vidyalaya, Trust..."
                      className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-200"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-stone-300 font-semibold mb-1">Select Registered Devotee</label>
                    <select
                      value={devoteeId}
                      onChange={(e) => handleDevoteeSelect(e.target.value)}
                      className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-200"
                    >
                    <option value="">-- Or enter name manually --</option>
                    {devotees.map((d, idx) => (
                      <option key={`${d.id}-${idx}`} value={d.id}>
                        {d.fullName} ({d.gotra})
                      </option>
                    ))}
                  </select>
                </div>
                )}

                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Devotee Name *</label>
                  <input
                    type="text"
                    required
                    value={devoteeName}
                    onChange={(e) => setDevoteeName(e.target.value)}
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Gotra *</label>
                  <input
                    type="text"
                    required
                    value={gotra}
                    onChange={(e) => setGotra(e.target.value)}
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-200"
                  />
                </div>

                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Janma Nakshatra</label>
                  <input
                    type="text"
                    value={nakshatra}
                    onChange={(e) => setNakshatra(e.target.value)}
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-200"
                  />
                </div>

                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Time Slot</label>
                  <input
                    type="text"
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Assigned Priest / Acharya</label>
                  <input
                    type="text"
                    value={priestAssigned}
                    onChange={(e) => setPriestAssigned(e.target.value)}
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-200"
                  />
                </div>

                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Dakshina Amount (₹) *</label>
                  <input
                    type="number"
                    required
                    value={dakshinaAmount}
                    onChange={(e) => setDakshinaAmount(Number(e.target.value))}
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-200 font-bold text-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-300 font-semibold mb-1">Sankalp Intent & Purpose</label>
                <textarea
                  value={sankalpText}
                  onChange={(e) => setSankalpText(e.target.value)}
                  rows={2}
                  className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-200"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-stone-800 text-stone-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isScannerOpen && <CameraScanner onScan={handleScan} onClose={() => setIsScannerOpen(false)} />}
      <UpsellModal 
        isOpen={showUpsell} 
        onClose={closeUpsell} 
        onUpgrade={() => { window.location.href = '/?action=signup'; }} 
        module={upsellModule} 
      />
    </div>
  );
};
