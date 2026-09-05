import React, { useState } from 'react';
import { useAuthWorkspace } from '../../context/AuthWorkspaceContext';
import { useScopedData } from '../../hooks/useScopedData';
import { 
  Heart, Calendar, Star, Clock, 
  ArrowRight, Download, User, QrCode, 
  Bell, FileText, CheckCircle, MapPin, 
  Shield, Activity, Share2, Award, Zap, X
} from 'lucide-react';
import { TreasuryTransaction, PoojaBookingRecord, PitruRecord, SevadarDutyShift, FamilyHousehold, DevoteeMember } from '../../types';
import { MySpaceModal } from '../common/MySpaceModal';
import QRCode from 'qrcode';
import { generateAnnualDonationSummaryPDF } from '../../utils/pdfGenerator';
import { useToast } from '../../context/ToastContext';

export const DevoteePortal: React.FC = () => {
  const { currentDevotee, currentUser, activeWorkspace } = useAuthWorkspace();
  const { showToast } = useToast();
  
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = React.useState('');

  const uid = currentUser?.id || currentDevotee?.id || '';

  React.useEffect(() => {
    if (isQrOpen && uid) {
      QRCode.toDataURL(`devotee:${uid}`, { width: 200, margin: 1, color: { dark: '#1c1917', light: '#ffffff' } }).then(setQrCodeDataUrl).catch(console.error);
    }
  }, [isQrOpen, uid]);

  // Data Fetching
  const donations = useScopedData<TreasuryTransaction>('treasury', { type: 'Income' }, { orderBy: { field: 'date', direction: 'desc' }});
  const poojas = useScopedData<PoojaBookingRecord>('pooja_bookings', {}, { orderBy: { field: 'bookingDate', direction: 'desc' }});
  const pitruRecords = useScopedData<PitruRecord>('pitru_records', {});
  const shifts = useScopedData<SevadarDutyShift>('sevadar_shifts', {});
  const families = useScopedData<FamilyHousehold>('families', {});

  // Compute Stats
  const currentYear = new Date().getFullYear();
  const ytdDonations = donations
    .filter(tx => new Date(tx.date).getFullYear() === currentYear)
    .reduce((sum, tx) => sum + tx.amount, 0);
    
  const volunteerHours = shifts.length * 6; // Approx 6 hrs per shift
  const sevaTier = currentDevotee?.sevaTier || 'Sadharan';
  
  const handleNavigate = (module: string) => {
    window.dispatchEvent(new CustomEvent('NAVIGATE', { detail: module }));
  };

  const handleDownloadTaxReceipt = () => {
    if (donations.length === 0) {
      showToast('No donations available to generate receipt', 'error');
      return;
    }
    // Simple summary generation (assumes a utility function exists, using try-catch)
    try {
      showToast('Generating Annual Receipt...', 'success');
      generateAnnualDonationSummaryPDF(currentDevotee as any || { fullName: currentUser?.name }, donations, activeWorkspace!);
    } catch(e) {
      console.error(e);
      showToast('Error generating receipt', 'error');
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-stone-50 p-4 md:p-8 custom-scrollbar">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-stone-900 tracking-tight">
              Hari Om, {currentDevotee?.spiritualName || currentDevotee?.fullName || currentUser?.name} 🙏
            </h1>
            <p className="text-sm text-stone-500 font-medium mt-1">Welcome to your personal dashboard at {activeWorkspace?.name}</p>
          </div>
          <div className="flex items-center gap-3">
             <button onClick={() => setIsProfileOpen(true)} className="flex items-center gap-2 bg-white border border-stone-200 px-4 py-2 rounded-xl text-sm font-bold text-stone-700 shadow-sm hover:bg-stone-50 transition-colors">
               <User className="w-4 h-4 text-stone-400" /> My Profile
             </button>
             <button onClick={() => setIsQrOpen(true)} className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 px-4 py-2 rounded-xl text-sm font-bold text-stone-950 shadow-md transition-colors">
               <QrCode className="w-4 h-4" /> Entry Pass
             </button>
          </div>
        </div>

        {/* SECTION A: Personal Stats Card */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-stone-100 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-50 rounded-full group-hover:scale-110 transition-transform"></div>
            <Heart className="w-8 h-8 text-emerald-500 relative z-10 mb-3" />
            <p className="text-xs text-stone-500 font-bold uppercase tracking-wider relative z-10">YTD Donations</p>
            <h3 className="text-2xl font-black text-stone-900 relative z-10">₹{ytdDonations.toLocaleString()}</h3>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-stone-100 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-50 rounded-full group-hover:scale-110 transition-transform"></div>
            <Calendar className="w-8 h-8 text-blue-500 relative z-10 mb-3" />
            <p className="text-xs text-stone-500 font-bold uppercase tracking-wider relative z-10">Poojas Booked</p>
            <h3 className="text-2xl font-black text-stone-900 relative z-10">{poojas.length}</h3>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-stone-100 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-amber-50 rounded-full group-hover:scale-110 transition-transform"></div>
            <Star className="w-8 h-8 text-amber-500 relative z-10 mb-3" />
            <p className="text-xs text-stone-500 font-bold uppercase tracking-wider relative z-10">Seva Tier</p>
            <h3 className="text-2xl font-black text-amber-600 relative z-10">{sevaTier}</h3>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-stone-100 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-50 rounded-full group-hover:scale-110 transition-transform"></div>
            <Clock className="w-8 h-8 text-purple-500 relative z-10 mb-3" />
            <p className="text-xs text-stone-500 font-bold uppercase tracking-wider relative z-10">Volunteer Hours</p>
            <h3 className="text-2xl font-black text-stone-900 relative z-10">{volunteerHours} <span className="text-sm font-semibold text-stone-400">hrs</span></h3>
          </div>
        </div>

        {/* SECTION B: Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6">
          <h2 className="text-sm font-black text-stone-900 uppercase tracking-widest mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <button onClick={() => handleNavigate('poojaBooking')} className="flex flex-col items-center justify-center p-4 bg-stone-50 hover:bg-amber-50 rounded-xl border border-stone-100 hover:border-amber-200 transition-colors gap-3">
              <div className="p-3 bg-amber-100 text-amber-600 rounded-full"><Zap className="w-5 h-5" /></div>
              <span className="text-xs font-bold text-stone-700">Book Pooja</span>
            </button>
            <button onClick={() => handleNavigate('vanshavali')} className="flex flex-col items-center justify-center p-4 bg-stone-50 hover:bg-indigo-50 rounded-xl border border-stone-100 hover:border-indigo-200 transition-colors gap-3">
              <div className="p-3 bg-indigo-100 text-indigo-600 rounded-full"><Share2 className="w-5 h-5" /></div>
              <span className="text-xs font-bold text-stone-700">Family Tree</span>
            </button>
            <button onClick={handleDownloadTaxReceipt} className="flex flex-col items-center justify-center p-4 bg-stone-50 hover:bg-emerald-50 rounded-xl border border-stone-100 hover:border-emerald-200 transition-colors gap-3">
              <div className="p-3 bg-emerald-100 text-emerald-600 rounded-full"><Download className="w-5 h-5" /></div>
              <span className="text-xs font-bold text-stone-700">Tax Receipts</span>
            </button>
            <button onClick={() => setIsProfileOpen(true)} className="flex flex-col items-center justify-center p-4 bg-stone-50 hover:bg-blue-50 rounded-xl border border-stone-100 hover:border-blue-200 transition-colors gap-3">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-full"><User className="w-5 h-5" /></div>
              <span className="text-xs font-bold text-stone-700">Edit Profile</span>
            </button>
            <button onClick={() => setIsQrOpen(true)} className="flex flex-col items-center justify-center p-4 bg-stone-50 hover:bg-purple-50 rounded-xl border border-stone-100 hover:border-purple-200 transition-colors gap-3">
              <div className="p-3 bg-purple-100 text-purple-600 rounded-full"><QrCode className="w-5 h-5" /></div>
              <span className="text-xs font-bold text-stone-700">QR Pass</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Left Column (Sections C and D) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* SECTION C: Upcoming Reminders */}
            <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-black text-stone-900 uppercase tracking-widest flex items-center gap-2">
                  <Bell className="w-4 h-4 text-amber-500" /> Upcoming Reminders
                </h2>
              </div>
              <div className="space-y-3">
                {pitruRecords.slice(0, 2).map((record) => (
                  <div key={record.id} className="p-4 rounded-xl border border-rose-100 bg-rose-50/50 flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
                         <Star className="w-5 h-5 text-rose-500" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-stone-900">Annual Shradh: {record.ancestorName}</h4>
                        <p className="text-xs text-stone-500 mt-0.5">{record.tithiOfDemise || 'Upcoming'} • {record.relationship || 'Ancestor'}</p>
                      </div>
                    </div>
                    <button onClick={() => handleNavigate('poojaBooking')} className="shrink-0 px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold rounded-lg shadow-sm transition-colors">
                      Book Sankalp
                    </button>
                  </div>
                ))}

                {/* Dummy Kuladevata Festival Reminder */}
                <div className="p-4 rounded-xl border border-amber-100 bg-amber-50/50 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                       <Award className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-stone-900">Kuladevata Utsav</h4>
                      <p className="text-xs text-stone-500 mt-0.5">Your family deity's annual festival is approaching in 14 days.</p>
                    </div>
                  </div>
                  <button onClick={() => handleNavigate('poojaBooking')} className="shrink-0 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-lg shadow-sm transition-colors">
                    Offer Seva
                  </button>
                </div>
              </div>
            </div>

            {/* SECTION D: Recent Activity Timeline */}
            <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6">
              <h2 className="text-sm font-black text-stone-900 uppercase tracking-widest mb-6">Recent Activity</h2>
              <div className="relative border-l-2 border-stone-100 ml-3 space-y-6">
                
                {poojas.slice(0, 3).map((pooja) => (
                  <div key={pooja.id} className="relative pl-6">
                    <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-1.5 ring-4 ring-white"></div>
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">{pooja.bookingDate || 'Recent'}</p>
                    <div className="bg-stone-50 rounded-xl p-3 border border-stone-100">
                       <p className="text-sm font-bold text-stone-900">{pooja.poojaName}</p>
                       <p className="text-xs text-stone-500 mt-1">Status: <span className="font-semibold text-stone-700">{pooja.status}</span></p>
                    </div>
                  </div>
                ))}

                {donations.slice(0, 5).map((tx) => (
                  <div key={tx.id} className="relative pl-6">
                    <div className="absolute w-3 h-3 bg-emerald-500 rounded-full -left-[7px] top-1.5 ring-4 ring-white"></div>
                    <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1">{tx.date}</p>
                    <div className="bg-stone-50 rounded-xl p-3 border border-stone-100 flex justify-between items-center">
                       <div>
                         <p className="text-sm font-bold text-stone-900">{tx.category}</p>
                         <p className="text-xs text-stone-500 mt-1">{tx.purpose || tx.subcategory || 'Donation'}</p>
                       </div>
                       <span className="font-black text-emerald-600">₹{tx.amount}</span>
                    </div>
                  </div>
                ))}

                {poojas.length === 0 && donations.length === 0 && (
                   <p className="text-sm text-stone-500 italic pl-6">No recent activity found.</p>
                )}
              </div>
            </div>

          </div>

          {/* Right Column (Section E) */}
          <div className="space-y-6">
            
            {/* SECTION E: Family Snapshot */}
            <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 sticky top-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-black text-stone-900 uppercase tracking-widest">My Family</h2>
              </div>
              
              {families.length > 0 ? (
                <div className="space-y-4">
                  {families.map(fam => (
                    <div key={fam.id} className="bg-stone-50 rounded-xl p-4 border border-stone-100">
                      <div className="flex items-center gap-3 mb-3">
                         <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center shrink-0">
                           <Shield className="w-5 h-5 text-indigo-600" />
                         </div>
                         <div>
                           <p className="text-sm font-black text-stone-900">{fam.familyName} Parivar</p>
                           <p className="text-[10px] text-stone-500 font-bold uppercase tracking-wider">{fam.gotra} Gotra</p>
                         </div>
                      </div>
                      <div className="border-t border-stone-200 pt-3">
                        <p className="text-xs text-stone-600 flex items-center gap-2 mb-1">
                          <User className="w-3.5 h-3.5 text-stone-400" /> {fam.memberIds?.length || 1} Registered Members
                        </p>
                        <p className="text-xs text-stone-600 flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-stone-400" /> {fam.residenceAddress || 'Address not updated'}
                        </p>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => handleNavigate('vanshavali')} className="w-full py-2.5 bg-stone-900 hover:bg-black text-white text-xs font-bold rounded-xl shadow-sm transition-colors">
                    Manage Family Tree
                  </button>
                </div>
              ) : (
                <div className="text-center py-6">
                  <Share2 className="w-10 h-10 text-stone-300 mx-auto mb-3" />
                  <p className="text-sm font-bold text-stone-700 mb-1">No Family Registered</p>
                  <p className="text-xs text-stone-500 mb-4">Connect with your roots by setting up your Vanshavali.</p>
                  <button onClick={() => handleNavigate('vanshavali')} className="w-full py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-xl transition-colors">
                    Setup Family Tree
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Profile Modal */}
      {isProfileOpen && (
        <MySpaceModal 
          isOpen={isProfileOpen} 
          onClose={() => setIsProfileOpen(false)} 
          onNavigate={handleNavigate}
        />
      )}

      {/* QR Code Modal */}
      {isQrOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-200">
            <button onClick={() => setIsQrOpen(false)} className="absolute top-4 right-4 p-2 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-full transition-colors z-10">
               <X className="w-4 h-4" />
            </button>
            <div className="p-8 text-center bg-gradient-to-b from-amber-50 to-white relative">
               <h3 className="text-lg font-black text-stone-900 mb-1">Digital Entry Pass</h3>
               <p className="text-xs text-stone-500 font-medium mb-6">Scan at the mandir gates or seva desk</p>
               
               <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100 inline-block">
                 {qrCodeDataUrl ? <img src={qrCodeDataUrl} alt="QR Pass" className="w-48 h-48 mx-auto" /> : <div className="w-48 h-48 bg-stone-100 animate-pulse rounded-xl mx-auto"></div>}
               </div>
               
               <div className="mt-6 flex items-center justify-center gap-2 text-emerald-600 font-bold text-sm bg-emerald-50 py-2 px-4 rounded-xl inline-flex">
                 <CheckCircle className="w-4 h-4" /> Active & Verified
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
