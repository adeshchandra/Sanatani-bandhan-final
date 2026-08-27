import React, { useState } from 'react';
import { useAuthWorkspace } from '../../context/AuthWorkspaceContext';
import { useData } from '../../context/DataContext';
import { Receipt, Calendar, User, Heart, Download, QrCode } from 'lucide-react';
import { generateTaxReceiptPDF } from '../../utils/pdfGenerator';
import { useToast } from '../../context/ToastContext';

export const DevoteePortal: React.FC = () => {
  const { currentUser, activeWorkspace, logout } = useAuthWorkspace();
  const { treasury, poojas } = useData();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'donations' | 'poojas' | 'profile'>('donations');

  // Filter transactions where devoteeName matches currentUser name (in a real app, match by devoteeId)
  const myDonations = treasury.filter(tx => tx.devoteeName === currentUser?.name && tx.type === 'Income');
  const myPoojas = poojas.filter(p => p.devoteeName === currentUser?.name);

  return (
    <div className="h-screen w-full bg-slate-50 flex flex-col font-sans overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b border-stone-200 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <img 
            src={activeWorkspace?.logoBase64 || '/logo.svg'} 
            alt={activeWorkspace?.name || 'Sanatani Bandhan'} 
            className="w-8 h-8 rounded-lg object-contain shadow-xs"
            onError={(e) => { e.currentTarget.src = '/icon-192x192.png'; }}
          />
          <div>
            <h1 className="text-sm font-bold text-stone-900">{currentUser?.name}</h1>
            <p className="text-[10px] text-stone-500">{activeWorkspace?.name}</p>
          </div>
        </div>
        <button onClick={logout} className="text-xs text-stone-500 font-semibold hover:text-stone-700">
          Sign Out
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {activeTab === 'donations' && (
          <div className="space-y-4 max-w-lg mx-auto">
            <h2 className="text-xl font-black text-stone-900 tracking-tight">My Contributions</h2>
            {myDonations.length === 0 ? (
              <div className="bg-white p-6 rounded-2xl text-center shadow-sm border border-stone-100">
                <Heart className="w-10 h-10 text-stone-300 mx-auto mb-2" />
                <p className="text-sm text-stone-500 font-medium">No donations found yet.</p>
              </div>
            ) : (
              myDonations.map(tx => (
                <div key={tx.id} className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-stone-900">{tx.category}</p>
                    <p className="text-xs text-stone-500">{new Date(tx.date).toLocaleDateString()}</p>
                    {tx.is80GEligible && <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mt-1 inline-block">80G Eligible</span>}
                  </div>
                  <div className="text-right">
                    <p className="text-base font-black text-amber-600">₹{tx.amount}</p>
                    {tx.is80GEligible && (
                      <button 
                        onClick={() => {
                          try {
                            generateTaxReceiptPDF(tx, activeWorkspace!);
                          } catch(e) {
                            showToast('Error generating PDF', 'error');
                          }
                        }} 
                        className="text-[10px] text-indigo-600 font-bold flex items-center justify-end gap-1 mt-1 hover:underline"
                      >
                        <Download className="w-3 h-3" /> Receipt
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'poojas' && (
          <div className="space-y-4 max-w-lg mx-auto">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-stone-900 tracking-tight">My Poojas</h2>
              <button className="bg-amber-100 text-amber-700 px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm">
                Book Pooja
              </button>
            </div>
            {myPoojas.length === 0 ? (
              <div className="bg-white p-6 rounded-2xl text-center shadow-sm border border-stone-100">
                <Calendar className="w-10 h-10 text-stone-300 mx-auto mb-2" />
                <p className="text-sm text-stone-500 font-medium">No Poojas booked.</p>
              </div>
            ) : (
              myPoojas.map(p => (
                <div key={p.id} className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-bold text-stone-900">{p.poojaName}</p>
                      <p className="text-xs text-stone-500">{p.bookingDate ? new Date(p.bookingDate).toLocaleDateString() : 'N/A'} at {p.timeSlot}</p>
                    </div>
                    <span className="px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-600 border border-amber-200">
                      {p.status}
                    </span>
                  </div>
                  {(p.priestAssigned || p.purohitAssigned || p.assignedPurohit) && (
                    <p className="text-[11px] text-stone-500 mt-2 font-medium">Assigned to: {p.priestAssigned || p.purohitAssigned || p.assignedPurohit}</p>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-4 max-w-lg mx-auto">
            <h2 className="text-xl font-black text-stone-900 tracking-tight">My Profile</h2>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-amber-400 to-orange-500 opacity-20"></div>
              <div className="w-20 h-20 bg-white rounded-full mx-auto relative z-10 shadow-md flex items-center justify-center border-4 border-white mb-3">
                <User className="w-10 h-10 text-stone-400" />
              </div>
              <h3 className="text-lg font-black text-stone-900 relative z-10">{currentUser?.name}</h3>
              <p className="text-xs text-stone-500 font-medium relative z-10 mb-6">Connected to {activeWorkspace?.name}</p>
              
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-100 inline-block relative z-10 shadow-inner">
                <QrCode className="w-32 h-32 text-stone-800 mx-auto" />
                <p className="text-[10px] text-stone-400 mt-2 font-mono">Scan for Mandir Entry & Seva</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Nav */}
      <nav className="bg-white border-t border-stone-200 px-6 py-3 flex items-center justify-between">
        <button 
          onClick={() => setActiveTab('donations')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'donations' ? 'text-amber-600' : 'text-stone-400'}`}
        >
          <Receipt className="w-5 h-5" />
          <span className="text-[10px] font-bold">Donations</span>
        </button>
        <button 
          onClick={() => setActiveTab('poojas')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'poojas' ? 'text-amber-600' : 'text-stone-400'}`}
        >
          <Calendar className="w-5 h-5" />
          <span className="text-[10px] font-bold">Poojas</span>
        </button>
        <button 
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'profile' ? 'text-amber-600' : 'text-stone-400'}`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] font-bold">Profile</span>
        </button>
      </nav>
    </div>
  );
};
