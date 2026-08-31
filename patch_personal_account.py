import re

filepath = 'src/components/account/PersonalAccountDesk.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# Make sure useData is imported and we get treasury
content = content.replace("const { currentUser, currentRole, activeWorkspace, setViewMode, switchRole, logout } = useAuthWorkspace();", "const { currentUser, currentRole, activeWorkspace, setViewMode, switchRole, logout } = useAuthWorkspace();\n  const { treasury } = require('../../context/DataContext').useData();")

# Replace tab label
content = content.replace("{ key: 'bookings', label: t('myBookings') || 'Bookings & Tax' },", "{ key: 'bookings', label: t('myBookings') || 'Transactions & Tax' },")
content = content.replace("Pooja Bookings & 80G Tax Certificates", "My Bookings, Expenses & Tax")
content = content.replace("View all registered Sankalpas, donations, and download instant Section 80G tax exemption certificates.", "View your registered Sankalpas, donations, and expense reimbursements.")

# Inject dynamic treasury mapping for bookings tab
bookings_orig = """                <div className="divide-y divide-stone-200">
                  {[
                    {
                      id: 'REC-2083-0091',
                      title: 'Maha Rudrabhishek & Bilva Archana',
                      date: '15 Aug 2026',
                      amount: '₹2,500',
                      status: 'Completed 🙏',
                      purohit: 'Pandit Radheshyam Shastri',
                      is80G: true
                    },
                    {
                      id: 'REC-2083-0045',
                      title: 'Desi Gir Cow Green Grass Fodder Sponsorship',
                      date: '02 Aug 2026',
                      amount: '₹5,100',
                      status: 'Completed 🐄',
                      purohit: 'Goshala Seva Dal',
                      is80G: true
                    },
                    {
                      id: 'REC-2083-0012',
                      title: 'Maha Annadanam 100 Devotee Meal Seva',
                      date: '18 Jul 2026',
                      amount: '₹11,000',
                      status: 'Completed 🍲',
                      purohit: 'Annapurna Kitchen',
                      is80G: true
                    }
                  ].map((rec, idx) => (
                    <div key={`${rec.id}-${idx}`} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-stone-900">{rec.title}</h4>
                          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-black rounded-md border border-emerald-200">
                            {rec.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-stone-500 mt-1">
                          <span className="font-mono text-stone-700 font-bold">{rec.id}</span>
                          <span>•</span>
                          <span>Date: {rec.date}</span>
                          <span>•</span>
                          <span>Conducted by: {rec.purohit}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-base font-black text-amber-900">{rec.amount}</span>
                        <button
                          onClick={() => {
                            showToast(`Downloaded 80G Certificate for ${rec.id}!`, 'success');
                          }}
                          className="flex items-center gap-1 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold transition-colors"
                        >
                          <Download className="w-3.5 h-3.5" /> 80G PDF
                        </button>
                      </div>
                    </div>
                  ))}
                </div>"""

bookings_new = """                <div className="divide-y divide-stone-200">
                  {treasury.filter(t => t.devoteeId === currentUser?.id || t.devoteeName === currentUser?.fullName).length > 0 ? (
                    treasury.filter(t => t.devoteeId === currentUser?.id || t.devoteeName === currentUser?.fullName).map((tx: any, idx: number) => (
                      <div key={`${tx.id}-${idx}`} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-stone-900">{tx.category}</h4>
                            <span className={`px-2 py-0.5 text-[10px] font-black rounded-md border ${tx.type === 'Income' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'}`}>
                              {tx.type === 'Income' ? 'Contribution 🙏' : 'Expense / Reimbursement 💸'}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-stone-500 mt-1">
                            <span className="font-mono text-stone-700 font-bold">{tx.id}</span>
                            <span>•</span>
                            <span>Date: {tx.date.split('T')[0]}</span>
                            <span>•</span>
                            <span>Mode: {tx.paymentMode}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-base font-black ${tx.type === 'Income' ? 'text-emerald-700' : 'text-rose-700'}`}>
                            {tx.type === 'Income' ? '+' : '-'} ₹{tx.amount.toLocaleString()}
                          </span>
                          {tx.is80GEligible && tx.type === 'Income' && (
                            <button
                              onClick={() => {
                                showToast(`Downloaded 80G Certificate for ${tx.id}!`, 'success');
                              }}
                              className="flex items-center gap-1 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold transition-colors"
                            >
                              <Download className="w-3.5 h-3.5" /> 80G PDF
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-8 text-center text-stone-500 text-sm">No transactions or expenses found for your profile.</div>
                  )}
                </div>"""

content = content.replace(bookings_orig, bookings_new)

with open(filepath, 'w') as f:
    f.write(content)
