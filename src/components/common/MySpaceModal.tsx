import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  QrCode, X, Download, Award, ShieldCheck, Sparkles, Heart, Clock, 
  Phone, MapPin, User, Mail, CreditCard, Droplet, Globe2, FileText, 
  Edit, Lock, Banknote, Filter, History, FileDigit, HeartHandshake, Plus, Flame, Send, ShieldAlert, LogOut, Camera, CheckCircle2, AlertTriangle, Ticket
} from 'lucide-react';
import QRCode from 'qrcode';
import { useAuthWorkspace } from '../../context/AuthWorkspaceContext';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { generateDevoteeCardPDF, generateTaxReceiptPDF } from '../../utils/pdfGenerator';
import { generateSecureQRToken } from '../../utils/qrUtils';
import { useToast } from '../../context/ToastContext';

interface MySpaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (moduleName: string) => void;
}

export const MySpaceModal: React.FC<MySpaceModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const { activeWorkspace, currentDevotee, currentRole, logout } = useAuthWorkspace();
  const { devotees, updateDevotee, treasury } = useData();
  const { showToast } = useToast();
  const { t } = useLanguage();

  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [profileTab, setProfileTab] = useState<'PASS' | 'IDENTITY' | 'ACTIVITY' | 'GLOBAL' | 'SECURITY'>('PASS');
  
  const [editModal, setEditModal] = useState<{field: string, displayName: string, value: string} | null>(null);
  const [activityFilterType, setActivityFilterType] = useState('ALL');
  const [activityDateRange, setActivityDateRange] = useState({ start: '', end: '' });
  const [showQR, setShowQR] = useState(false);
  
  const editPhotoRef = useRef<HTMLInputElement>(null);

  const activeMember = currentDevotee || devotees[0];

  useEffect(() => {
    if (!activeMember) return;
    const qrPayload = generateSecureQRToken(activeMember);
    QRCode.toDataURL(qrPayload, {
      margin: 1,
      width: 250,
      color: { dark: '#000000', light: '#ffffff' },
    }).then((url) => setQrDataUrl(url));
  }, [activeMember, activeWorkspace]);

  const handleDownloadPDF = async () => {
    if (!activeMember) return;
    try {
      setIsGeneratingPdf(true);
      await generateDevoteeCardPDF(activeMember, activeWorkspace);
      showToast('Smart Devotee Card PDF generated and downloaded!', 'success');
    } catch (e: any) {
      showToast(e.message || 'Failed to generate Smart Card', 'error');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const submitEditField = () => {
    if (!editModal || !editModal.value.trim() || !activeMember) return;
    const trimmedVal = editModal.value.trim();
    if (trimmedVal === (activeMember as any)[editModal.field]) {
      setEditModal(null);
      return;
    }
    
    updateDevotee(activeMember.id, { [editModal.field]: trimmedVal });
    showToast('Record updated successfully', 'success');
    setEditModal(null);
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeMember) return;
    try {
      const { compressAvatarImage } = await import('../../utils/imageCompression');
      const compressedBase64 = await compressAvatarImage(file);
      updateDevotee(activeMember.id, { photoBase64: compressedBase64 });
      showToast("Profile photo updated successfully.", "success");
    } catch (err) {
      console.error('Failed to compress avatar:', err);
    }
    e.target.value = ''; 
  };

  if (!isOpen || !activeMember) return null;

  const calculateSevaScore = (donated: number, volunteerHours: number) => {
    const base = 50; 
    const volumePoints = Math.floor((donated || 0) / 1000) * 5; 
    const habitPoints = (volunteerHours || 0) * 10;
    return base + volumePoints + habitPoints;
  };

  const score = activeMember.sevaIndex || calculateSevaScore(activeMember.totalDonated || 0, activeMember.volunteerHours || 0);
  
  const getHaloDesign = (s: number) => {
    if(s >= 1500) return { color: 'from-yellow-400 via-amber-500 to-purple-600', name: 'Ratna (Pillar)' };
    if(s >= 500) return { color: 'from-stone-300 to-blue-500', name: 'Vishesh (Core)' };
    if(s >= 100) return { color: 'from-orange-400 to-red-500', name: 'Kormi (Active)' };
    return { color: 'from-stone-200 to-stone-300', name: 'Sadharan (Member)' };
  };

  const halo = getHaloDesign(score);

  const myTransactions = treasury.filter(tr => tr.devoteeId === activeMember.id);
  const filteredPersonalTransactions = myTransactions.filter(tr => {
    if (activityFilterType === 'INCOME' && tr.type !== 'Income') return false;
    if (activityFilterType === 'EXPENSE' && tr.type !== 'Expense') return false;
    if (activityDateRange.start && new Date(tr.date).getTime() < new Date(activityDateRange.start).getTime()) return false;
    if (activityDateRange.end && new Date(tr.date).getTime() > new Date(activityDateRange.end).setHours(23, 59, 59, 999)) return false;
    return true;
  });

  const calculateProfileCompletion = () => {
    let pts = 0;
    if (activeMember.fullName || activeMember.name) pts += 20;
    if (activeMember.phone) pts += 15;
    if (activeMember.email) pts += 10;
    if (activeMember.address) pts += 15;
    if ((activeMember as any).nid) pts += 10;
    if (activeMember.bloodGroup) pts += 10;
    if (activeMember.emergencyContact && activeMember.emergencyPhone) pts += 20;
    return pts;
  };
  const completionScore = calculateProfileCompletion();

  const getInitial = (name: string) => name ? name.charAt(0).toUpperCase() : 'ॐ';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-stone-900/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-0 sm:p-4 pt-safe pb-safe">
        <motion.div 
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          className="bg-white w-[95%] sm:w-full max-w-4xl h-full sm:h-auto max-h-[95dvh] mx-auto rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden ring-1 ring-white/20"
        >
          {/* Header Banner */}
          <div className="h-32 sm:h-40 bg-gradient-to-r from-stone-900 to-black relative shrink-0">
             <button onClick={onClose} className="absolute top-4 right-4 text-stone-400 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-sm z-10"><X size={20}/></button>
          </div>

          <div className="px-5 sm:px-10 pb-0 shrink-0 bg-white border-b border-stone-100 z-10 relative">
             <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6 mb-4 relative z-10">
               {/* Profile Photo */}
               <div className="relative group cursor-pointer w-28 h-28 sm:w-32 sm:h-32 -mt-14 sm:-mt-16 rounded-full border-4 border-white bg-white shadow-md shrink-0 mx-auto sm:mx-0" onClick={() => editPhotoRef.current?.click()}>
                 <div className={`w-full h-full rounded-full p-1 bg-gradient-to-tr ${halo.color}`}>
                   {activeMember.photoBase64 ? (
                     <img src={activeMember.photoBase64} alt="Profile" className="w-full h-full object-cover rounded-full border-2 border-white" />
                   ) : (
                     <div className="w-full h-full bg-white text-stone-400 rounded-full flex items-center justify-center font-black text-4xl sm:text-5xl border-2 border-white">
                       {getInitial(activeMember.fullName || activeMember.name || 'U')}
                     </div>
                   )}
                 </div>
                 <div className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md border border-stone-100 text-stone-700 hover:text-[#FF9933] transition-colors z-10">
                   <Camera size={16}/>
                 </div>
                 <input type="file" accept="image/*" className="hidden" ref={editPhotoRef} onChange={handlePhotoUpload} />
               </div>

               <div className="flex-1 pb-2 text-center sm:text-left sm:ml-4 min-w-0">
                 <h2 className="text-2xl sm:text-3xl font-black text-stone-900 leading-tight mb-1 truncate px-2 sm:px-0">{activeMember.fullName || activeMember.name || 'Unnamed Profile'}</h2>
                 <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                   <span className="text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest bg-stone-100 text-stone-700 border border-stone-200">
                      {activeMember.role || 'Member'}
                   </span>
                   <span className="text-[10px] text-stone-500 font-mono font-bold tracking-wider px-2 py-1 bg-white border border-stone-200 rounded-md shadow-sm">ID: {activeMember.id}</span>
                 </div>
               </div>
             </div>

             {/* Profile Tabs */}
             <div className="flex items-center justify-start gap-4 sm:gap-6 border-b border-stone-200 overflow-x-auto scrollbar-hide w-full px-2 sm:px-0">
                <button onClick={()=>setProfileTab('PASS')} className={`pb-3 text-[11px] sm:text-xs font-black uppercase tracking-widest transition-colors whitespace-nowrap flex items-center gap-1.5 ${profileTab === 'PASS' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-stone-400 hover:text-stone-700'}`}><Ticket size={14} className="mb-0.5 mr-1"/> Gate Pass</button>
                <button onClick={()=>setProfileTab('IDENTITY')} className={`pb-3 text-[11px] sm:text-xs font-black uppercase tracking-widest transition-colors whitespace-nowrap ${profileTab === 'IDENTITY' ? 'text-[#FF9933] border-b-2 border-[#FF9933]' : 'text-stone-400 hover:text-stone-700'}`}>Identity</button>
                <button onClick={()=>setProfileTab('ACTIVITY')} className={`pb-3 text-[11px] sm:text-xs font-black uppercase tracking-widest transition-colors whitespace-nowrap ${profileTab === 'ACTIVITY' ? 'text-[#FF9933] border-b-2 border-[#FF9933]' : 'text-stone-400 hover:text-stone-700'}`}>Activity</button>
                <button onClick={()=>setProfileTab('GLOBAL')} className={`pb-3 text-[11px] sm:text-xs font-black uppercase tracking-widest transition-colors whitespace-nowrap flex items-center gap-1 ${profileTab === 'GLOBAL' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-stone-400 hover:text-stone-700'}`}><Globe2 size={14} className="mb-0.5"/> Vedic Hub</button>
                <button onClick={()=>setProfileTab('SECURITY')} className={`pb-3 text-[11px] sm:text-xs font-black uppercase tracking-widest transition-colors whitespace-nowrap ${profileTab === 'SECURITY' ? 'text-red-500 border-b-2 border-red-500' : 'text-stone-400 hover:text-stone-700'}`}>Security</button>
             </div>
          </div>

          <div className="p-4 sm:p-8 overflow-y-auto bg-stone-50 flex-1 min-h-0 pb-12 custom-scrollbar">

            {profileTab === 'PASS' && (
              <div className="space-y-6 animate-in fade-in flex flex-col items-center justify-center py-4">
                 <div className="bg-white rounded-3xl shadow-xl border border-stone-200 w-full max-w-sm overflow-hidden relative">
                    <div className="bg-gradient-to-r from-orange-500 to-red-600 p-6 text-center">
                       <h3 className="text-2xl font-black text-white tracking-widest uppercase">Gate Pass</h3>
                       <p className="text-orange-100 text-xs font-bold mt-1">{activeWorkspace.name}</p>
                    </div>
                    <div className="p-8 flex flex-col items-center bg-white relative">
                       <div className="absolute -left-4 top-0 w-8 h-8 bg-stone-50 rounded-full shadow-inner border border-stone-100"></div>
                       <div className="absolute -right-4 top-0 w-8 h-8 bg-stone-50 rounded-full shadow-inner border border-stone-100"></div>

                       <img
                         src={qrDataUrl}
                         alt="Safe Gate Pass QR"
                         className="w-48 h-48 rounded-2xl shadow-md border-4 border-white mb-6 bg-white p-2"
                       />
                       <h4 className="text-xl font-black text-stone-900 text-center">{activeMember.fullName || activeMember.name}</h4>
                       <p className="text-sm font-mono font-bold text-stone-500 tracking-widest mt-1 text-center">{activeMember.id}</p>

                       {completionScore === 100 ? (
                         <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1.5 rounded-full mt-5 border border-emerald-200 flex items-center gap-1.5">
                           <ShieldCheck size={14}/> Identity Verified
                         </p>
                       ) : (
                         <button onClick={() => setProfileTab('IDENTITY')} className="text-[10px] font-black text-stone-500 hover:text-orange-600 uppercase tracking-widest bg-stone-100 hover:bg-orange-50 px-3 py-1.5 rounded-full mt-5 border border-stone-200 hover:border-orange-200 flex items-center gap-1.5 transition-colors">
                           <AlertTriangle size={14}/> Complete Profile
                         </button>
                       )}
                    </div>
                    <div className="bg-stone-50 p-5 border-t border-stone-100 text-center">
                       <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest leading-relaxed">
                         Present this secure pass to volunteers at any event gate. It contains <strong className="text-red-500">no</strong> sensitive login credentials.
                       </p>
                    </div>
                 </div>
              </div>
            )}

            {profileTab === 'IDENTITY' && (
              <div className="space-y-6 animate-in fade-in">
                
                {/* Profile Completion Widget */}
                <div className="bg-white border border-stone-200 rounded-3xl p-5 shadow-sm flex flex-col gap-3">
                   <div className="flex justify-between items-end">
                     <div>
                       <h4 className="text-sm font-black text-stone-900">Profile Completion</h4>
                       <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mt-0.5">Unlock verified status</p>
                     </div>
                     <span className={`text-xl font-black ${completionScore === 100 ? 'text-emerald-500' : 'text-[#FF9933]'}`}>{completionScore}%</span>
                   </div>
                   <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
                     <motion.div 
                       initial={{ width: 0 }} animate={{ width: `${completionScore}%` }} 
                       className={`h-full rounded-full ${completionScore === 100 ? 'bg-emerald-500' : 'bg-gradient-to-r from-orange-400 to-[#FF9933]'}`} 
                     />
                   </div>
                </div>

                <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
                  <div className="bg-stone-50 px-5 py-3.5 border-b border-stone-200 flex justify-between items-center">
                    <span className="text-[10px] font-black text-stone-500 uppercase tracking-widest">Contact & Geography</span>
                    <span className="text-[10px] font-black text-[#FF9933] uppercase tracking-widest flex items-center gap-1"><Edit size={12}/> Tap to Edit</span>
                  </div>
                  <div className="divide-y divide-stone-100">

                    <div className="p-4 sm:p-5 flex justify-between items-center group hover:bg-stone-50 transition-colors min-w-0">
                      <div className="w-full overflow-hidden min-w-0"><p className="text-[9px] text-stone-400 font-bold uppercase tracking-wider mb-1">Full Name</p><p className="text-sm font-black text-stone-900 flex items-center gap-2 truncate"><User size={14} className="text-stone-400 shrink-0"/> {activeMember.fullName || activeMember.name}</p></div>
                      <button onClick={() => setEditModal({ field: 'fullName', displayName: 'Full Name', value: activeMember.fullName || activeMember.name || '' })} className="text-indigo-600 bg-indigo-50 p-2.5 rounded-xl shrink-0 ml-2 hover:bg-indigo-100 transition-colors border border-transparent hover:border-indigo-200"><Edit size={14}/></button>
                    </div>

                    <div className="p-4 sm:p-5 flex justify-between items-center group hover:bg-stone-50 transition-colors min-w-0 bg-stone-50/50">
                      <div className="w-full overflow-hidden min-w-0"><p className="text-[9px] text-stone-400 font-bold uppercase tracking-wider mb-1">Phone Number</p><p className="text-sm font-black text-stone-900 flex items-center gap-2 truncate"><Phone size={14} className="text-stone-400 shrink-0"/> {activeMember.phone || 'N/A'}</p></div>
                      <button onClick={() => setEditModal({ field: 'phone', displayName: 'Phone Number', value: activeMember.phone || '' })} className="text-indigo-600 bg-indigo-50 p-2.5 rounded-xl shrink-0 ml-2 hover:bg-indigo-100 transition-colors border border-transparent hover:border-indigo-200"><Edit size={14}/></button>
                    </div>

                    <div className="p-4 sm:p-5 flex justify-between items-center group hover:bg-stone-50 transition-colors min-w-0 bg-stone-50/50">
                      <div className="w-full overflow-hidden min-w-0"><p className="text-[9px] text-stone-400 font-bold uppercase tracking-wider mb-1">Email Address</p><p className="text-sm font-black text-stone-900 flex items-center gap-2 truncate"><Mail size={14} className="text-stone-400 shrink-0"/> {activeMember.email || 'N/A'}</p></div>
                      <button onClick={() => setEditModal({ field: 'email', displayName: 'Email', value: activeMember.email || '' })} className="text-indigo-600 bg-indigo-50 p-2.5 rounded-xl shrink-0 ml-2 hover:bg-indigo-100 transition-colors border border-transparent hover:border-indigo-200"><Edit size={14}/></button>
                    </div>

                    <div className="p-4 sm:p-5 flex justify-between items-center group hover:bg-stone-50 transition-colors min-w-0">
                      <div className="w-full overflow-hidden min-w-0"><p className="text-[9px] text-stone-400 font-bold uppercase tracking-wider mb-1">Govt ID / NID</p><p className="text-sm font-black text-stone-900 flex items-center gap-2 truncate"><CreditCard size={14} className="text-stone-400 shrink-0"/> {(activeMember as any).nid || 'Not Provided'}</p></div>
                      <button onClick={() => setEditModal({ field: 'nid', displayName: 'Govt ID / NID', value: (activeMember as any).nid || '' })} className="text-indigo-600 bg-indigo-50 p-2.5 rounded-xl shrink-0 ml-2 hover:bg-indigo-100 transition-colors border border-transparent hover:border-indigo-200"><Edit size={14}/></button>
                    </div>

                    <div className="p-4 sm:p-5 flex justify-between items-center group hover:bg-stone-50 transition-colors min-w-0">
                      <div className="w-full overflow-hidden min-w-0"><p className="text-[9px] text-stone-400 font-bold uppercase tracking-wider mb-1">Full Address</p><p className="text-sm font-black text-stone-900 flex items-start gap-2 max-w-lg leading-snug"><MapPin size={14} className="text-stone-400 shrink-0 mt-0.5"/> <span className="break-words">{activeMember.address || 'Not Provided'}</span></p></div>
                      <button onClick={() => setEditModal({ field: 'address', displayName: 'Full Address', value: activeMember.address || '' })} className="text-indigo-600 bg-indigo-50 p-2.5 rounded-xl shrink-0 ml-2 hover:bg-indigo-100 transition-colors border border-transparent hover:border-indigo-200"><Edit size={14}/></button>
                    </div>

                    <div className="grid grid-cols-2 divide-x divide-stone-100">
                      <div className="p-4 sm:p-5 flex justify-between items-center group hover:bg-stone-50 transition-colors min-w-0">
                        <div className="overflow-hidden min-w-0"><p className="text-[9px] text-stone-400 font-bold uppercase tracking-wider mb-1">Blood Group</p><p className="text-sm font-black text-stone-900 flex items-center gap-1.5 truncate"><Droplet size={14} className="text-red-400 shrink-0"/> {activeMember.bloodGroup || 'N/A'}</p></div>
                        <button onClick={() => setEditModal({ field: 'bloodGroup', displayName: 'Blood Group', value: activeMember.bloodGroup || '' })} className="text-indigo-600 bg-indigo-50 p-2 rounded-lg shrink-0 hover:bg-indigo-100 transition-colors border border-transparent hover:border-indigo-200"><Edit size={12}/></button>
                      </div>
                      <div className="p-4 sm:p-5 flex justify-between items-center group hover:bg-stone-50 transition-colors min-w-0">
                        <div className="overflow-hidden min-w-0"><p className="text-[9px] text-stone-400 font-bold uppercase tracking-wider mb-1">Gotra Lineage</p><p className="text-sm font-black text-stone-900 flex items-center gap-1.5 truncate"><ShieldCheck size={14} className="text-purple-400 shrink-0"/> {activeMember.gotra || 'N/A'}</p></div>
                        <button onClick={() => setEditModal({ field: 'gotra', displayName: 'Gotra Lineage', value: activeMember.gotra || '' })} className="text-indigo-600 bg-indigo-50 p-2 rounded-lg shrink-0 hover:bg-indigo-100 transition-colors border border-transparent hover:border-indigo-200"><Edit size={12}/></button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Emergency Details */}
                <div className="bg-rose-50/30 border border-rose-100 rounded-2xl overflow-hidden shadow-sm">
                  <div className="bg-rose-50 px-5 py-3.5 border-b border-rose-100 flex justify-between items-center">
                    <span className="text-[10px] font-black text-rose-600 uppercase tracking-widest flex items-center gap-1.5"><Heart size={12}/> Health & Emergency</span>
                  </div>
                  <div className="divide-y divide-rose-50 bg-white">
                    <div className="p-4 sm:p-5 flex justify-between items-center group hover:bg-rose-50/50 transition-colors min-w-0">
                      <div className="w-full overflow-hidden min-w-0"><p className="text-[9px] text-rose-400 font-bold uppercase tracking-wider mb-1">Emergency Contact Person</p><p className="text-sm font-black text-stone-900 flex items-center gap-2 truncate"><User size={14} className="text-rose-400 shrink-0"/> {activeMember.emergencyContact || 'Not Provided'}</p></div>
                      <button onClick={() => setEditModal({ field: 'emergencyContact', displayName: 'Emergency Contact Person', value: activeMember.emergencyContact || '' })} className="text-rose-600 bg-rose-50 p-2.5 rounded-xl shrink-0 ml-2 hover:bg-rose-100 transition-colors border border-transparent hover:border-rose-200"><Edit size={14}/></button>
                    </div>

                    <div className="p-4 sm:p-5 flex justify-between items-center group hover:bg-rose-50/50 transition-colors min-w-0">
                      <div className="w-full overflow-hidden min-w-0"><p className="text-[9px] text-rose-400 font-bold uppercase tracking-wider mb-1">Emergency Phone Number</p><p className="text-sm font-black text-stone-900 flex items-center gap-2 truncate"><Phone size={14} className="text-rose-400 shrink-0"/> {activeMember.emergencyPhone || 'Not Provided'}</p></div>
                      <button onClick={() => setEditModal({ field: 'emergencyPhone', displayName: 'Emergency Phone Number', value: activeMember.emergencyPhone || '' })} className="text-rose-600 bg-rose-50 p-2.5 rounded-xl shrink-0 ml-2 hover:bg-rose-100 transition-colors border border-transparent hover:border-rose-200"><Edit size={14}/></button>
                    </div>

                    <div className="p-4 sm:p-5 flex justify-between items-center group hover:bg-rose-50/50 transition-colors min-w-0">
                      <div className="w-full overflow-hidden min-w-0"><p className="text-[9px] text-rose-400 font-bold uppercase tracking-wider mb-1">Medical Notes (Allergies, Conditions)</p><p className="text-sm font-black text-stone-900 flex items-start gap-2 max-w-lg leading-snug"><AlertTriangle size={14} className="text-rose-400 shrink-0 mt-0.5"/> <span className="break-words">{activeMember.medicalNotes || 'None noted'}</span></p></div>
                      <button onClick={() => setEditModal({ field: 'medicalNotes', displayName: 'Medical Notes', value: activeMember.medicalNotes || '' })} className="text-rose-600 bg-rose-50 p-2.5 rounded-xl shrink-0 ml-2 hover:bg-rose-100 transition-colors border border-transparent hover:border-rose-200"><Edit size={14}/></button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {profileTab === 'ACTIVITY' && (
              <div className="space-y-6 animate-in fade-in">
                <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row items-center gap-6">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-tr ${halo.color} text-white flex items-center justify-center shrink-0 shadow-lg`}>
                    <Award size={28}/>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-lg font-black text-stone-900 mb-1">Seva Index: <span className="text-[#FF9933]">{score}</span></h3>
                    <p className="text-xs font-bold text-stone-500">Your current rank is <strong className="text-stone-800">{halo.name}</strong></p>
                  </div>
                </div>

                <div className="bg-white border border-emerald-200 rounded-3xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm relative overflow-hidden">
                   <div className="absolute top-0 right-0 -mt-6 -mr-6 opacity-5 pointer-events-none"><Banknote size={120} className="text-emerald-600"/></div>
                   <div className="text-center sm:text-left relative z-10">
                     <p className="text-[10px] font-black text-emerald-700 uppercase tracking-widest mb-1.5 flex items-center justify-center sm:justify-start gap-1.5"><Banknote size={14}/> Lifetime Donated</p>
                     <p className="text-4xl font-black text-emerald-600 tracking-tight">₹{(activeMember.totalDonated || 0).toLocaleString()}</p>
                   </div>
                </div>

                <div className="bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-sm">
                  <div className="bg-stone-50 px-5 py-4 border-b border-stone-200 flex flex-col gap-3">
                    <span className="text-[10px] font-black text-stone-500 uppercase tracking-widest flex items-center gap-1.5"><Filter size={14}/> Filters</span>

                    <div className="grid grid-cols-2 md:flex md:flex-row items-center gap-3 w-full">
                      <select 
                        value={activityFilterType} 
                        onChange={e => setActivityFilterType(e.target.value)}
                        className="col-span-2 md:col-span-1 p-3 bg-white border border-stone-200 rounded-xl text-xs font-bold text-stone-700 outline-none cursor-pointer shadow-sm transition-colors focus:border-[#FF9933]"
                      >
                        <option value="ALL">All Activities</option>
                        <option value="INCOME">Donations Only</option>
                        <option value="EXPENSE">Expenses Only</option>
                      </select>

                      <div className="col-span-2 md:w-auto flex items-center bg-white border border-stone-200 p-1.5 rounded-xl shadow-sm overflow-x-auto">
                        <input type="date" value={activityDateRange.start} onChange={e => setActivityDateRange({ ...activityDateRange, start: e.target.value })} className="p-1.5 bg-transparent text-xs text-stone-700 font-bold outline-none flex-1 min-w-[110px]" />
                        <span className="text-stone-300 font-bold px-2">-</span>
                        <input type="date" value={activityDateRange.end} onChange={e => setActivityDateRange({ ...activityDateRange, end: e.target.value })} className="p-1.5 bg-transparent text-xs text-stone-700 font-bold outline-none flex-1 min-w-[110px]" />
                        {(activityDateRange.start || activityDateRange.end) && (
                          <button onClick={() => setActivityDateRange({start:'', end:''})} className="bg-stone-100 hover:bg-stone-200 p-1.5 rounded-lg transition-colors ml-1"><X size={14}/></button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="max-h-72 overflow-y-auto p-3 custom-scrollbar">
                     {filteredPersonalTransactions.length > 0 ? (
                       <div className="space-y-2">
                         {filteredPersonalTransactions.map(tr => (
                           <div key={tr.id} className="p-4 bg-white border border-stone-100 hover:border-stone-200 hover:shadow-sm rounded-2xl transition-all flex justify-between items-center group min-w-0">
                             <div className="min-w-0 pr-4">
                               <p className="text-sm font-black text-stone-900 truncate">{tr.purpose || tr.category}</p>
                               <p className="text-[10px] font-bold text-stone-400 tracking-wider mt-1">{new Date(tr.date).toLocaleString()}</p>
                             </div>

                             <div className="flex items-center gap-4 shrink-0">
                               <div className="text-right">
                                 <p className={`text-base font-black ${tr.type === 'Income' ? 'text-emerald-600' : 'text-rose-600'}`}>{tr.type === 'Income' ? '+' : '-'}₹{Math.abs(tr.amount)}</p>
                                 <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest mt-0.5">By {tr.handledBy?.split(' ')[0] || 'System'}</p>
                               </div>
                               <button 
                                 onClick={async (e) => { 
                                   e.stopPropagation();
                                   try {
                                     await generateTaxReceiptPDF(tr, activeWorkspace);
                                     showToast("Receipt downloaded successfully.", "success");
                                   } catch (err: any) { showToast(err.message, "error"); }
                                 }} 
                                 className="text-stone-500 hover:text-[#FF9933] p-2.5 bg-stone-50 hover:bg-orange-50 rounded-xl border border-transparent hover:border-orange-200 transition-all shadow-sm" 
                                 title="Download Receipt"
                               >
                                 <FileDigit size={16}/>
                               </button>
                             </div>
                           </div>
                         ))}
                       </div>
                     ) : (
                       <div className="py-12 text-center text-stone-400">
                         <History size={32} className="mx-auto mb-3 opacity-20"/>
                         <p className="text-xs font-bold uppercase tracking-widest">No activities found.</p>
                       </div>
                     )}
                  </div>
                </div>
              </div>
            )}

            {profileTab === 'GLOBAL' && (
              <div className="space-y-6 animate-in fade-in">
                {/* VIVAH BANDHAN MATRIMONIAL WIDGET */}
                <div className="bg-gradient-to-br from-pink-50 to-purple-50 border border-pink-200 rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <div className="absolute top-0 right-0 -mt-6 -mr-6 opacity-10 pointer-events-none">
                     <Heart size={150} className="text-pink-500 fill-current"/>
                  </div>
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md border border-pink-100 shrink-0 relative z-10">
                    <HeartHandshake size={32} className="text-pink-600"/>
                  </div>
                  <div className="flex-1 text-center sm:text-left relative z-10">
                    <h4 className="text-lg font-black text-stone-900 mb-1">Vivah Bandhan Matrimonial</h4>
                    <p className="text-xs font-bold text-stone-600 mb-4 max-w-sm leading-relaxed">
                      Find verified, compatible matches within the Sanatan community based on strict Gotra alignment.
                    </p>
                    <button 
                      onClick={() => {
                        if (onNavigate) onNavigate('matrimony');
                      }}
                      className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-6 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 inline-flex items-center gap-2"
                    >
                      <Plus size={14}/> Create Matrimonial Profile
                    </button>
                  </div>
                </div>

                {/* GLOBAL PUROHIT WIDGET */}
                <div className="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <div className="absolute top-0 right-0 -mt-6 -mr-6 opacity-10 pointer-events-none">
                     <Flame size={150} className="text-orange-500 fill-current"/>
                  </div>
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md border border-orange-100 shrink-0 relative z-10">
                    <Sparkles size={32} className="text-[#FF9933]"/>
                  </div>
                  <div className="flex-1 text-center sm:text-left relative z-10">
                    <h4 className="text-lg font-black text-stone-900 mb-1">Global Purohit Registry</h4>
                    <p className="text-xs font-bold text-stone-600 mb-4 max-w-sm leading-relaxed">
                      Are you a qualified Acharya, Pandit, or Vedic Scholar? Apply to join the global registry.
                    </p>
                    <button 
                      onClick={() => {
                        if (onNavigate) onNavigate('purohitMarket');
                      }}
                      className="bg-stone-900 hover:bg-black text-white px-6 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 inline-flex items-center gap-2"
                    >
                      <Send size={14}/> Apply for Verified Badge
                    </button>
                  </div>
                </div>
              </div>
            )}

            {profileTab === 'SECURITY' && (
              <div className="space-y-6 animate-in fade-in">
                <div className="bg-white border border-indigo-100 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col sm:flex-row items-center gap-6 sm:gap-8 relative overflow-hidden text-center sm:text-left">
                   <div className="absolute top-0 left-0 w-1.5 sm:w-full h-full sm:h-1.5 bg-indigo-500"></div>

                   {showQR ? (
                     <div className="flex flex-col items-center bg-stone-50 p-4 rounded-2xl shadow-inner border border-stone-200 shrink-0 animate-in zoom-in-95 relative overflow-hidden">
                        <img 
                          src={qrDataUrl} 
                          alt="Secure Auto-Login URL QR" 
                          className="w-32 h-32 sm:w-40 sm:h-40 rounded-xl mb-3 border border-stone-200 shadow-sm blur-sm hover:blur-none transition-all duration-300"
                        />
                        <p className="text-[9px] font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-200 shadow-sm">Auto-Login Active</p>
                     </div>
                   ) : (
                     <div className="w-32 h-32 sm:w-40 sm:h-40 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-center text-indigo-300 shrink-0 shadow-inner">
                       <QrCode size={48}/>
                     </div>
                   )}

                   <div className="flex flex-col justify-center w-full">
                      <h3 className="text-lg font-black text-stone-900 mb-1">Account Recovery QR</h3>
                      <p className="text-xs font-bold text-stone-500 mb-4 max-w-sm mx-auto sm:mx-0 leading-relaxed">
                        Download or scan this to automatically log back into your workspace if you forget your PIN.
                      </p>

                      <p className="text-[10px] font-bold text-rose-500 mb-6 bg-rose-50 p-3 rounded-xl border border-rose-100 text-left flex items-start gap-2 leading-relaxed">
                        <AlertTriangle size={16} className="shrink-0 mt-0.5"/> 
                        WARNING: This QR code contains your secure PIN. Do not show this to volunteers at the gate. Use the "Gate Pass" tab instead.
                      </p>

                      <div className="flex flex-col sm:flex-row gap-3 w-full">
                         <button onClick={() => setShowQR(!showQR)} className="flex-1 bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 font-black py-3.5 rounded-xl text-[10px] uppercase tracking-widest transition-all shadow-sm">
                           {showQR ? 'Hide QR' : 'View QR'}
                         </button>
                         <button onClick={handleDownloadPDF} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-black py-3.5 rounded-xl text-[10px] uppercase tracking-widest shadow-md transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5">
                           <Download size={14}/> Download PDF
                         </button>
                      </div>
                   </div>
                </div>

                <div className="border border-rose-100 bg-rose-50/50 rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden mt-6">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-rose-500"></div>
                  <p className="text-[10px] font-black text-rose-600 flex items-center gap-2 uppercase tracking-widest mb-5 border-b border-rose-100 pb-4"><ShieldAlert size={16}/> Security Controls</p>

                  <button onClick={() => { logout(); onClose(); }} className="w-full bg-white border border-rose-200 text-rose-600 hover:bg-rose-600 hover:text-white font-black py-4 rounded-xl text-[10px] uppercase tracking-widest flex justify-center items-center gap-2 transition-all shadow-sm hover:-translate-y-0.5">
                    <LogOut size={16}/> Secure Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Inline Edit Modal */}
      {editModal && (
        <div className="fixed inset-0 bg-stone-900/80 backdrop-blur-sm z-[10000] flex items-center justify-center p-4">
           <div className="bg-white rounded-3xl w-full max-w-sm p-8 shadow-2xl animate-in zoom-in-95 ring-1 ring-white/20 relative">
              <button onClick={() => setEditModal(null)} className="absolute top-4 right-4 text-stone-400 hover:text-stone-900 bg-stone-100 p-2.5 rounded-full transition-colors"><X size={16}/></button>

              <div className="mb-6">
                <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-4 shadow-inner border border-indigo-100"><Edit size={24}/></div>
                <h3 className="text-xl font-black text-stone-900 tracking-tight">Update {editModal.displayName}</h3>
                <p className="text-xs font-bold text-stone-500 mt-1">Enter your new information below.</p>
              </div>

              {editModal.field === 'address' ? (
                <textarea 
                  rows={3} 
                  value={editModal.value} 
                  onChange={(e) => setEditModal({...editModal, value: e.target.value})} 
                  autoFocus
                  className="w-full p-4 bg-stone-50 border border-stone-200 rounded-xl outline-none text-sm font-bold text-stone-900 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all shadow-sm resize-none"
                  placeholder="Street, City, Zip Code..."
                />
              ) : (
                <input 
                  type={editModal.field === 'email' ? 'email' : editModal.field === 'phone' ? 'tel' : 'text'} 
                  value={editModal.value} 
                  onChange={(e) => setEditModal({...editModal, value: e.target.value})} 
                  autoFocus
                  className="w-full p-4 bg-stone-50 border border-stone-200 rounded-xl outline-none text-sm font-bold text-stone-900 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all shadow-sm"
                />
              )}

              <div className="flex gap-3 mt-8">
                 <button onClick={() => setEditModal(null)} className="flex-1 px-4 py-3.5 bg-stone-100 text-stone-600 hover:bg-stone-200 rounded-xl text-xs font-black uppercase tracking-widest transition-colors shadow-sm">Cancel</button>
                 <button onClick={submitEditField} className="flex-[2] px-4 py-3.5 bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl text-xs font-black uppercase tracking-widest shadow-md transition-all hover:-translate-y-0.5 flex justify-center items-center gap-2">
                   Save <CheckCircle2 size={16}/>
                </button>
              </div>
           </div>
        </div>
      )}
    </AnimatePresence>
  );
};
