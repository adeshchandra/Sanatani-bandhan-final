import React, { useState, useEffect } from 'react';
import { Heart, Search, UserCircle, Star, Filter, CheckCircle2, X, MessageCircle, ShieldCheck, MapPin, Briefcase, Calendar } from 'lucide-react';
import { doc, collection, onSnapshot, writeBatch } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuthWorkspace } from '../../context/AuthWorkspaceContext';
import { useLanguage } from '../../context/LanguageContext';

export default function SanataniVivahDesk() {
  const { currentUser, activeWorkspace } = useAuthWorkspace();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('BROWSE'); // BROWSE, MY_PROFILE
  const [profiles, setProfiles] = useState<any[]>([]);
  const [myProfile, setMyProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [profileForm, setProfileForm] = useState({
    name: currentUser?.name || '',
    gender: 'Male',
    dob: '',
    height: '',
    gotra: '',
    nakshatra: '',
    mangalik: 'No',
    education: '',
    profession: '',
    income: '',
    location: '',
    bio: '',
    photoUrl: ''
  });

  const safeTranslate = (key: string, fb: string) => {
    const res = (t as any)(key);
    return res !== key ? res : fb;
  };

  useEffect(() => {
    if (!activeWorkspace?.id || !currentUser?.id) return;

    // Listen to all vivah profiles in the global ecosystem or community
    // For this vision, treating it as a global/community shared pool
    const profilesRef = collection(db, `communities/${activeWorkspace.id}/vivah_profiles`);
    const unsub = onSnapshot(profilesRef, (snap) => {
      const list = snap.docs.map(d => d.data());
      setProfiles(list.filter(p => p.status === 'ACTIVE'));
      
      const mine = list.find(p => p.uid === currentUser?.id);
      if (mine) {
        setMyProfile(mine);
        setProfileForm(mine as any);
      }
      setLoading(false);
    });

    return () => unsub();
  }, [activeWorkspace, currentUser]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const updates: any = {};
      updates[`communities/${activeWorkspace!.id}/vivah_profiles/${currentUser!.id}`] = {
        ...profileForm,
        uid: currentUser!.id,
        status: 'ACTIVE',
        updatedAt: Date.now()
      };
      const batch = writeBatch(db);
      for (const [path, data] of Object.entries(updates)) {
        const docRef = doc(db, path);
        batch.set(docRef, data, { merge: true });
      }
      await batch.commit();
      // showToast('Vivah Profile Updated Successfully!');
      setActiveTab('BROWSE');
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-10 text-center"><div className="animate-spin w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full mx-auto"></div></div>;

  return (
    <div className="h-full flex flex-col bg-gray-50/50">
      <div className="bg-white border-b border-gray-200 p-6 shrink-0 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none"><Heart size={100}/></div>
        <div className="relative z-10">
          <p className="text-[10px] font-black text-rose-600 uppercase tracking-widest mb-1 flex items-center gap-1.5"><Heart size={14}/> Sanatani Vivah</p>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Matrimonial Connect</h1>
          <p className="text-sm text-gray-500 font-bold mt-1 max-w-xl">Find your perfect life partner within the Sanatani ecosystem. Verified, secure, and culturally aligned matchmaking.</p>
        </div>
        <div className="flex bg-gray-100 p-1.5 rounded-xl z-10 w-full sm:w-auto">
          <button onClick={() => setActiveTab('BROWSE')} className={`flex-1 sm:w-32 py-2.5 rounded-lg text-[10px] font-black tracking-widest uppercase transition-all flex justify-center items-center gap-2 ${activeTab === 'BROWSE' ? 'bg-white text-rose-600 shadow-sm' : 'text-gray-500'}`}>
            <Search size={14}/> Browse
          </button>
          <button onClick={() => setActiveTab('MY_PROFILE')} className={`flex-1 sm:w-32 py-2.5 rounded-lg text-[10px] font-black tracking-widest uppercase transition-all flex justify-center items-center gap-2 ${activeTab === 'MY_PROFILE' ? 'bg-white text-rose-600 shadow-sm' : 'text-gray-500'}`}>
            <UserCircle size={14}/> My Profile
          </button>
        </div>
      </div>

      <div className="p-6 flex-1 overflow-y-auto custom-scrollbar">
        {activeTab === 'MY_PROFILE' && (
          <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
              <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center text-rose-600"><UserCircle size={24}/></div>
              <div>
                <h2 className="text-xl font-black text-gray-900">Your Matrimonial Profile</h2>
                <p className="text-xs font-bold text-gray-500">Provide accurate details to find the best match.</p>
              </div>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5">Full Name *</label>
                  <input type="text" required value={profileForm.name} onChange={e=>setProfileForm({...profileForm, name: e.target.value})} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold outline-none focus:bg-white focus:border-rose-500 transition-all" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5">Gender *</label>
                  <select required value={profileForm.gender} onChange={e=>setProfileForm({...profileForm, gender: e.target.value})} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold outline-none focus:bg-white focus:border-rose-500 transition-all">
                    <option>Male</option><option>Female</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5">Date of Birth *</label>
                  <input type="date" required value={profileForm.dob} onChange={e=>setProfileForm({...profileForm, dob: e.target.value})} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold outline-none focus:bg-white focus:border-rose-500 transition-all" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5">Height</label>
                  <input type="text" placeholder="5 ft 8 in" value={profileForm.height} onChange={e=>setProfileForm({...profileForm, height: e.target.value})} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold outline-none focus:bg-white focus:border-rose-500 transition-all" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5">Location</label>
                  <input type="text" placeholder="City, State" value={profileForm.location} onChange={e=>setProfileForm({...profileForm, location: e.target.value})} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold outline-none focus:bg-white focus:border-rose-500 transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 p-5 bg-rose-50/50 rounded-2xl border border-rose-100">
                <div>
                  <label className="block text-[10px] font-black text-rose-800 uppercase tracking-widest mb-1.5">Gotra *</label>
                  <input type="text" required placeholder="e.g. Kashyap" value={profileForm.gotra} onChange={e=>setProfileForm({...profileForm, gotra: e.target.value})} className="w-full p-4 bg-white border border-rose-200 rounded-xl text-sm font-bold outline-none focus:border-rose-500 transition-all shadow-sm" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-rose-800 uppercase tracking-widest mb-1.5">Nakshatra</label>
                  <input type="text" placeholder="e.g. Rohini" value={profileForm.nakshatra} onChange={e=>setProfileForm({...profileForm, nakshatra: e.target.value})} className="w-full p-4 bg-white border border-rose-200 rounded-xl text-sm font-bold outline-none focus:border-rose-500 transition-all shadow-sm" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-rose-800 uppercase tracking-widest mb-1.5">Mangalik?</label>
                  <select value={profileForm.mangalik} onChange={e=>setProfileForm({...profileForm, mangalik: e.target.value})} className="w-full p-4 bg-white border border-rose-200 rounded-xl text-sm font-bold outline-none focus:border-rose-500 transition-all shadow-sm">
                    <option>No</option><option>Yes</option><option>Anshik (Partial)</option><option>Don't Know</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5">Education</label>
                  <input type="text" placeholder="B.Tech, MBA..." value={profileForm.education} onChange={e=>setProfileForm({...profileForm, education: e.target.value})} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold outline-none focus:bg-white focus:border-rose-500 transition-all" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5">Profession</label>
                  <input type="text" placeholder="Software Engineer" value={profileForm.profession} onChange={e=>setProfileForm({...profileForm, profession: e.target.value})} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold outline-none focus:bg-white focus:border-rose-500 transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5">Bio / About Me</label>
                <textarea rows={4} placeholder="Describe yourself, your values, and what you are looking for..." value={profileForm.bio} onChange={e=>setProfileForm({...profileForm, bio: e.target.value})} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold outline-none focus:bg-white focus:border-rose-500 transition-all resize-none" />
              </div>
              
              <div>
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5">Profile Photo (Auto-compressed)</label>
                <div className="flex gap-4 items-center">
                  {profileForm.photoUrl && (
                    <img src={profileForm.photoUrl} alt="Avatar" className="w-16 h-16 rounded-2xl object-cover shadow-sm border border-gray-200" />
                  )}
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={async (e) => {
                      if (e.target.files && e.target.files[0]) {
                        try {
                          // Dynamic import to avoid circular dependencies or simply call the util if imported
                          const { compressAvatarImage } = await import('../../utils/imageCompression');
                          const compressed = await compressAvatarImage(e.target.files[0]);
                          setProfileForm({ ...profileForm, photoUrl: compressed });
                        } catch (err) {
                          console.error('Failed to compress image:', err);
                        }
                      }
                    }} 
                    className="w-full text-sm font-bold text-gray-500 file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:uppercase file:tracking-widest file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 transition-all cursor-pointer" 
                  />
                </div>
              </div>

              <button type="submit" disabled={submitting} className="w-full py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-sm font-black uppercase tracking-widest shadow-lg transition-all flex justify-center items-center gap-2">
                <CheckCircle2 size={18}/> {submitting ? 'Saving...' : 'Save & Publish Profile'}
              </button>
            </form>
          </div>
        )}

        {activeTab === 'BROWSE' && (
          <div className="space-y-6">
            {!myProfile && (
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3 text-amber-800">
                  <Star size={20} className="shrink-0"/>
                  <span className="text-sm font-bold">Create your profile to start connecting with matches.</span>
                </div>
                <button onClick={() => setActiveTab('MY_PROFILE')} className="px-4 py-2 bg-amber-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-md shrink-0">Create Profile</button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {profiles.filter(p => p.uid !== currentUser?.id).map(profile => (
                <div key={profile.uid} className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col hover:shadow-xl transition-all group">
                  <div className="h-48 bg-gray-100 relative overflow-hidden">
                    {profile.photoUrl ? (
                      <img src={profile.photoUrl} alt={profile.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-rose-50 to-pink-100">
                        <UserCircle size={64} className="text-rose-200"/>
                      </div>
                    )}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-800 flex items-center gap-1 shadow-sm">
                      <ShieldCheck size={12} className="text-green-600"/> Verified
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-lg font-black text-gray-900">{profile.name}</h3>
                    </div>
                    <p className="text-xs font-bold text-gray-500 mb-4">{profile.dob} • {profile.height}</p>
                    
                    <div className="space-y-2 mb-4 flex-1">
                      <div className="flex items-center gap-2 text-sm text-gray-700"><Briefcase size={14} className="text-gray-400"/> <span className="font-bold">{profile.profession || 'N/A'}</span></div>
                      <div className="flex items-center gap-2 text-sm text-gray-700"><MapPin size={14} className="text-gray-400"/> <span className="font-bold">{profile.location || 'N/A'}</span></div>
                      <div className="flex items-center gap-2 text-sm text-gray-700"><Star size={14} className="text-rose-400"/> <span className="font-bold">Gotra: {profile.gotra}</span></div>
                    </div>
                    
                    <button className="w-full py-3 bg-gray-50 hover:bg-rose-50 text-gray-900 hover:text-rose-600 rounded-xl text-xs font-black uppercase tracking-widest transition-all border border-gray-200 hover:border-rose-200 flex items-center justify-center gap-2">
                      <MessageCircle size={14}/> Connect
                    </button>
                  </div>
                </div>
              ))}
              {profiles.filter(p => p.uid !== currentUser?.id).length === 0 && (
                <div className="col-span-full py-20 text-center text-gray-400">
                  <Heart size={64} className="mx-auto mb-4 opacity-20"/>
                  <p className="text-lg font-bold">No active profiles found right now.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
