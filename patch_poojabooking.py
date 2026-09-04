import re

filepath = 'src/components/domain3/PoojaBookingDesk.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# 1. Imports
if 'Printer' not in content:
    content = content.replace("import { Flame, Plus, Search, Calendar, User, Video, CheckCircle2, Clock, X, Scan, List, ChevronLeft, ChevronRight } from 'lucide-react';", 
    "import { Flame, Plus, Search, Calendar, User, Video, CheckCircle2, Clock, X, Scan, List, ChevronLeft, ChevronRight, Printer, XCircle, Building2 } from 'lucide-react';")

# 2. Add states
state_to_add = """  const [isScannerOpen, setIsScannerOpen] = useState(false);
  
  const [bookingType, setBookingType] = useState<'Individual' | 'Organization'>('Individual');
  const [organizationName, setOrganizationName] = useState('');
  
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [cancellingId, setCancellingId] = useState('');
  const [cancellationReason, setCancellationReason] = useState('');"""

content = content.replace("  const [isScannerOpen, setIsScannerOpen] = useState(false);", state_to_add)

# 3. Handle Add Booking
old_add = """      priestAssigned: priestAssigned.trim(),
      dakshinaAmount: Number(dakshinaAmount),
      liveStreamUrl: liveStreamUrl.trim() || undefined,
    });
    setIsAddModalOpen(false);
  };"""

new_add = """      priestAssigned: priestAssigned.trim(),
      dakshinaAmount: Number(dakshinaAmount),
      liveStreamUrl: liveStreamUrl.trim() || undefined,
      bookingType,
      organizationName: organizationName.trim() || undefined,
    });
    setIsAddModalOpen(false);
  };"""
content = content.replace(old_add, new_add)

# 4. Handle Cancel and Print
helpers = """
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
"""

content = content.replace("  const currentMonth = new Date().getMonth();", helpers + "\n  const currentMonth = new Date().getMonth();")

# 5. Update Add Modal Form (Booking Type & Org Name)
old_devotee_section = """              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Select Registered Devotee</label>
                  <select
                    value={devoteeId}
                    onChange={(e) => handleDevoteeSelect(e.target.value)}
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-200"
                  >"""

new_devotee_section = """              <div className="grid grid-cols-2 gap-3">
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
                    >"""

# Find where to close the `) : (` block from new_devotee_section
old_devotee_closing = """                    {devotees.map((d, idx) => (
                      <option key={`${d.id}-${idx}`} value={d.id}>
                        {d.fullName} ({d.gotra})
                      </option>
                    ))}
                  </select>
                </div>"""
new_devotee_closing = """                    {devotees.map((d, idx) => (
                      <option key={`${d.id}-${idx}`} value={d.id}>
                        {d.fullName} ({d.gotra})
                      </option>
                    ))}
                  </select>
                </div>
                )}"""

content = content.replace(old_devotee_section, new_devotee_section)
content = content.replace(old_devotee_closing, new_devotee_closing)

with open(filepath, 'w') as f:
    f.write(content)
