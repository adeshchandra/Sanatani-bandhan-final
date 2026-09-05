import React, { useState } from 'react';
import { useAuthWorkspace } from '../../context/AuthWorkspaceContext';
import { useScopedData } from '../../hooks/useScopedData';
import { 
  Heart, Calendar, Star, Clock, 
  ArrowRight, Download, User, QrCode, 
  Bell, FileText, CheckCircle, MapPin, 
  Shield, Activity, Share2, Award, Zap, X, Printer
} from 'lucide-react';
import { TreasuryTransaction, PoojaBookingRecord, PitruRecord, SevadarDutyShift, FamilyHousehold, DevoteeMember } from '../../types';
import { MySpaceModal } from '../common/MySpaceModal';
import { DevoteeQRPass } from './DevoteeQRPass';
import { DonationHistoryModal } from './DonationHistoryModal';
import { TaxReceiptsWidget } from './TaxReceiptsWidget';
import { generateAnnualDonationSummaryPDF, generateDevoteeCardPDF } from '../../utils/pdfGenerator';
import { useToast } from '../../context/ToastContext';

export const DevoteePortal: React.FC = () => {
  const { currentDevotee, currentUser, activeWorkspace } = useAuthWorkspace();
  const { showToast } = useToast();
  
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [isDonationHistoryOpen, setIsDonationHistoryOpen] = useState(false);
  const [isTaxWidgetOpen, setIsTaxWidgetOpen] = useState(false);
  
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

  const handlePrintProfile = async () => {
    if (!currentDevotee) {
      showToast('Profile data not found', 'error');
      return;
    }
    if (!activeWorkspace) {
      showToast('Workspace data not found', 'error');
      return;
    }
    
    try {
      showToast('Generating ID Card...', 'info');
      await generateDevoteeCardPDF(currentDevotee, activeWorkspace);
    } catch(e) {
      console.error(e);
      showToast('Error generating ID card', 'error');
    }
  };

  const handleDownloadTaxReceipt = () => {
    if (donations.length === 0) {
      showToast('No donations available to generate receipt', 'error');
      return;
    }
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            <button onClick={() => handleNavigate('poojaBooking')} className="flex flex-col items-center justify-center p-4 bg-stone-50 hover:bg-amber-50 rounded-xl border border-stone-100 hover:border-amber-200 transition-colors gap-3">
              <div className="p-3 bg-amber-100 text-amber-600 rounded-full"><Zap className="w-5 h-5" /></div>
              <span className="text-xs font-bold text-stone-700">Book Pooja</span>
            </button>
            <button onClick={() => handleNavigate('vanshavali')} className="flex flex-col items-center justify-center p-4 bg-stone-50 hover:bg-indigo-50 rounded-xl border border-stone-100 hover:border-indigo-200 transition-colors gap-3">
              <div className="p-3 bg-indigo-100 text-indigo-600 rounded-full"><Share2 className="w-5 h-5" /></div>
              <span className="text-xs font-bold text-stone-700">Family Tree</span>
            </button>
            <button onClick={() => setIsTaxWidgetOpen(true)} className="flex flex-col items-center justify-center p-4 bg-stone-50 hover:bg-emerald-50 rounded-xl border border-stone-100 hover:border-emerald-200 transition-colors gap-3">
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
            <button onClick={handlePrintProfile} className="flex flex-col items-center justify-center p-4 bg-stone-50 hover:bg-rose-50 rounded-xl border border-stone-100 hover:border-rose-200 transition-colors gap-3">
              <div className="p-3 bg-rose-100 text-rose-600 rounded-full"><Printer className="w-5 h-5" /></div>
              <span className="text-xs font-bold text-stone-700">Print Profile</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Left Column (Sections C and D) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* SECTION C: Upcoming Reminders */}
            <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-black text-stone-900 uppercase tracking-widest">Upcoming Reminders</h2>
                <button className="text-xs font-bold text-stone-500 hover:text-stone-700 flex items-center gap-1">
                  View Calendar <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-4 p-3 bg-stone-50 rounded-xl border border-stone-100">
                  <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex flex-col items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold uppercase leading-none">Nov</span>
                    <span className="text-sm font-black leading-none mt-0.5">14</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-stone-900">Kartik Purnima Mahotsav</p>
                    <p className="text-xs text-stone-500 mt-0.5">Your family deity's annual festival is approaching in 14 days.</p>
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
              
              {donations.length > 0 && (
                <div className="mt-6 pt-4 border-t border-stone-100 flex justify-center">
                  <button 
                    onClick={() => setIsDonationHistoryOpen(true)}
                    className="flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-xl"
                  >
                    <Heart className="w-4 h-4" /> View Full Donation History
                  </button>
                </div>
              )}
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

      {/* QR Code Pass */}
      <DevoteeQRPass 
        isOpen={isQrOpen} 
        onClose={() => setIsQrOpen(false)} 
        devotee={currentDevotee}
        workspaceName={activeWorkspace?.name}
      />

      
      {/* Tax Receipts Modal */}
      {isTaxWidgetOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-stone-900/60 backdrop-blur-sm">
          <div className="bg-transparent rounded-3xl w-full max-w-4xl max-h-[90vh] relative animate-in zoom-in-95 duration-200 flex flex-col">
            <div className="flex justify-end mb-2">
               <button onClick={() => setIsTaxWidgetOpen(false)} className="p-2 bg-white hover:bg-stone-100 text-stone-600 rounded-full transition-colors shadow-sm">
                 <X className="w-5 h-5" />
               </button>
            </div>
            <div className="overflow-y-auto custom-scrollbar rounded-2xl shadow-2xl">
               <TaxReceiptsWidget />
            </div>
          </div>
        </div>
      )}
      
      {/* Donation History Modal */}
      <DonationHistoryModal
        isOpen={isDonationHistoryOpen}
        onClose={() => setIsDonationHistoryOpen(false)}
        donations={donations}
        workspace={activeWorkspace}
        devoteeName={currentDevotee?.spiritualName || currentDevotee?.fullName || currentUser?.name || 'Devotee'}
      />
    </div>
  );
};
