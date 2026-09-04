import re

filepath = 'src/components/domain4/SanataniVivahDesk.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# Add states for education, filters, and modal
state_injection = """
  const [profileForm, setProfileForm] = useState({
"""
state_replacement = """
  const [filterCity, setFilterCity] = useState('');
  const [filterGotra, setFilterGotra] = useState('');
  const [filterEducation, setFilterEducation] = useState('');
  const [selectedProfile, setSelectedProfile] = useState<any>(null);

  const [profileForm, setProfileForm] = useState({
"""
content = content.replace(state_injection, state_replacement)

# Add education to initial profileForm
content = content.replace(
    "profession: '',\n    location: '',", 
    "profession: '',\n    education: '',\n    location: '',"
)

# Add education to useEffect
content = content.replace(
    "profession: myProfile.profession || '',\n        location: myProfile.location || '',",
    "profession: myProfile.profession || '',\n        education: myProfile.education || '',\n        location: myProfile.location || '',"
)

# Add education to the form UI
profession_location_fields = """
                <div>
                  <label className="block text-[10px] font-black text-stone-500 uppercase tracking-widest mb-2">Profession / Occupation</label>
                  <input type="text" required value={profileForm.profession} onChange={e=>setProfileForm({...profileForm, profession: e.target.value})} className="w-full p-4 bg-stone-50 border border-stone-200 rounded-xl text-sm font-bold outline-none focus:border-stone-500 transition-all" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-stone-500 uppercase tracking-widest mb-2">Current Location (City)</label>
                  <input type="text" required value={profileForm.location} onChange={e=>setProfileForm({...profileForm, location: e.target.value})} className="w-full p-4 bg-stone-50 border border-stone-200 rounded-xl text-sm font-bold outline-none focus:border-stone-500 transition-all" />
                </div>"""

profession_location_education_fields = """
                <div>
                  <label className="block text-[10px] font-black text-stone-500 uppercase tracking-widest mb-2">Profession / Occupation</label>
                  <input type="text" required value={profileForm.profession} onChange={e=>setProfileForm({...profileForm, profession: e.target.value})} className="w-full p-4 bg-stone-50 border border-stone-200 rounded-xl text-sm font-bold outline-none focus:border-stone-500 transition-all" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-stone-500 uppercase tracking-widest mb-2">Education</label>
                  <input type="text" required placeholder="e.g. B.Tech, MBA" value={profileForm.education} onChange={e=>setProfileForm({...profileForm, education: e.target.value})} className="w-full p-4 bg-stone-50 border border-stone-200 rounded-xl text-sm font-bold outline-none focus:border-stone-500 transition-all" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-stone-500 uppercase tracking-widest mb-2">Current Location (City)</label>
                  <input type="text" required value={profileForm.location} onChange={e=>setProfileForm({...profileForm, location: e.target.value})} className="w-full p-4 bg-stone-50 border border-stone-200 rounded-xl text-sm font-bold outline-none focus:border-stone-500 transition-all" />
                </div>"""

content = content.replace(profession_location_fields, profession_location_education_fields)

# Modify BROWSE tab rendering to include filters and apply them
browse_tab_target = """
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in">
            {profiles
              .filter(p => p.uid !== currentUser?.id)
              // Core Filter: Enforce Sagotra Prohibition
              .filter(p => !myProfile?.gotra || (p.gotra?.toLowerCase() !== myProfile.gotra?.toLowerCase())) 
"""

browse_tab_replacement = """
          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 shadow-inner mb-6 flex flex-wrap gap-4 items-end animate-in fade-in">
            <div className="flex-1 min-w-[150px]">
              <label className="block text-[10px] font-black text-stone-500 uppercase tracking-widest mb-1.5"><Filter size={10} className="inline mr-1"/> Filter City</label>
              <input type="text" placeholder="All Cities" value={filterCity} onChange={e=>setFilterCity(e.target.value)} className="w-full p-3 bg-white border border-stone-200 rounded-xl text-xs font-bold outline-none focus:border-stone-500 transition-all" />
            </div>
            <div className="flex-1 min-w-[150px]">
              <label className="block text-[10px] font-black text-stone-500 uppercase tracking-widest mb-1.5"><Filter size={10} className="inline mr-1"/> Filter Gotra</label>
              <input type="text" placeholder="All Gotras" value={filterGotra} onChange={e=>setFilterGotra(e.target.value)} className="w-full p-3 bg-white border border-stone-200 rounded-xl text-xs font-bold outline-none focus:border-stone-500 transition-all" />
            </div>
            <div className="flex-1 min-w-[150px]">
              <label className="block text-[10px] font-black text-stone-500 uppercase tracking-widest mb-1.5"><Filter size={10} className="inline mr-1"/> Education</label>
              <input type="text" placeholder="All Degrees" value={filterEducation} onChange={e=>setFilterEducation(e.target.value)} className="w-full p-3 bg-white border border-stone-200 rounded-xl text-xs font-bold outline-none focus:border-stone-500 transition-all" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in">
            {profiles
              .filter(p => p.uid !== currentUser?.id)
              // Core Filter: Enforce Sagotra Prohibition
              .filter(p => !myProfile?.gotra || (p.gotra?.toLowerCase() !== myProfile.gotra?.toLowerCase()))
              // Advanced Filters
              .filter(p => !filterCity || p.location?.toLowerCase().includes(filterCity.toLowerCase()))
              .filter(p => !filterGotra || p.gotra?.toLowerCase().includes(filterGotra.toLowerCase()))
              .filter(p => !filterEducation || p.education?.toLowerCase().includes(filterEducation.toLowerCase()))
"""

content = content.replace(browse_tab_target, browse_tab_replacement)

# Make cards clickable to open modal
card_target = """                return (
                  <div key={`${profile.uid}-${idx}`} className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden flex flex-col group relative">
                    
                    {/* Privacy Badge overlay */}"""

card_replacement = """                return (
                  <div key={`${profile.uid}-${idx}`} onClick={() => setSelectedProfile(profile)} className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden flex flex-col group relative cursor-pointer hover:border-rose-200 transition-colors">
                    
                    {/* Privacy Badge overlay */}"""
content = content.replace(card_target, card_replacement)

button_target = """                      <button 
                        onClick={() => status ? null : handleConnect(profile.uid)}"""

button_replacement = """                      <button 
                        onClick={(e) => { e.stopPropagation(); status ? null : handleConnect(profile.uid); }}"""

content = content.replace(button_target, button_replacement)


# Append Quick View Modal before final closing div
modal_code = """
      {selectedProfile && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">
            {(() => {
              const conn = connections[selectedProfile.uid];
              const status = conn?.status;
              const isConnected = status === 'ACCEPTED';
              const maskedName = isConnected ? selectedProfile.name : (selectedProfile.name?.charAt(0) + '********');
              const maskedProfession = isConnected ? selectedProfile.profession : 'Hidden until connected';
              const maskedLocation = isConnected ? selectedProfile.location : 'Hidden until connected';
              const maskedEducation = isConnected ? (selectedProfile.education || 'NA') : 'Hidden until connected';

              return (
                <>
                  <div className="relative h-64 bg-stone-100">
                    {selectedProfile.photoUrl ? (
                      <img 
                        src={selectedProfile.photoUrl} 
                        alt="Profile" 
                        className={`w-full h-full object-cover ${!isConnected ? 'blur-xl grayscale opacity-70' : ''}`}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-stone-50 to-stone-200">
                        <UserCircle size={80} className="text-stone-300"/>
                      </div>
                    )}
                    <button onClick={() => setSelectedProfile(null)} className="absolute top-4 right-4 bg-white/50 hover:bg-white/90 backdrop-blur-md p-2 rounded-full text-stone-900 transition-all shadow-sm">
                      <X size={20}/>
                    </button>
                    {!isConnected && (
                      <div className="absolute top-4 left-4 bg-stone-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-[9px] font-black text-white flex items-center gap-1.5 shadow-xl">
                        <EyeOff size={14} className="text-rose-400"/> PRIVACY MASKED
                      </div>
                    )}
                  </div>
                  <div className="p-8">
                    <h2 className="text-2xl font-black text-stone-900 tracking-tight mb-2">{maskedName}</h2>
                    <p className="text-sm font-bold text-stone-500 flex items-center gap-2 mb-6">
                      <span>{selectedProfile.dob || 'Age NA'}</span> 
                      <span className="w-1 h-1 rounded-full bg-stone-300"></span> 
                      <span>{selectedProfile.height || 'Height NA'}</span>
                    </p>

                    <div className="space-y-4 mb-8 bg-stone-50 p-5 rounded-2xl border border-stone-100">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-stone-500 font-bold flex items-center gap-2"><Star size={16} className="text-rose-400"/> Gotra</span>
                        <span className="font-black text-stone-900">{selectedProfile.gotra}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-stone-500 font-bold flex items-center gap-2"><ShieldCheck size={16} className={selectedProfile.dosha !== 'None' ? 'text-rose-600' : 'text-emerald-500'}/> Dosha</span>
                        <span className={`font-black ${selectedProfile.dosha !== 'None' ? 'text-rose-700' : 'text-stone-900'}`}>{selectedProfile.dosha || 'None'}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm border-t border-stone-200 pt-4">
                        <span className="text-stone-500 font-bold flex items-center gap-2"><Briefcase size={16} className="text-stone-400"/> Profession</span>
                        <span className={isConnected ? 'font-bold text-stone-900' : 'font-medium text-stone-400 italic'}>{maskedProfession}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-stone-500 font-bold flex items-center gap-2"><ImageIcon size={16} className="text-stone-400"/> Education</span>
                        <span className={isConnected ? 'font-bold text-stone-900' : 'font-medium text-stone-400 italic'}>{maskedEducation}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-stone-500 font-bold flex items-center gap-2"><MapPin size={16} className="text-stone-400"/> Location</span>
                        <span className={isConnected ? 'font-bold text-stone-900' : 'font-medium text-stone-400 italic'}>{maskedLocation}</span>
                      </div>
                    </div>

                    <div className="mb-8">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">About & Preferences</h4>
                      <p className="text-sm text-stone-700 font-medium leading-relaxed bg-white border border-stone-100 p-4 rounded-xl shadow-sm italic">
                        "{selectedProfile.bio || 'No bio provided.'}"
                      </p>
                    </div>

                    <button 
                      onClick={() => {
                        if (!status) handleConnect(selectedProfile.uid);
                      }}
                      disabled={!!status}
                      className={`w-full py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all border flex items-center justify-center gap-2 
                        ${status === 'PENDING' ? 'bg-stone-100 text-stone-500 border-stone-200 cursor-not-allowed' 
                        : status === 'ACCEPTED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                        : 'bg-stone-900 hover:bg-black text-white border-stone-800 shadow-md hover:shadow-xl hover:-translate-y-0.5'}`}
                    >
                      {status === 'PENDING' ? <Clock size={16}/> : status === 'ACCEPTED' ? <MessageCircle size={16}/> : <UserPlus size={16}/>}
                      {status === 'PENDING' ? 'Request Pending' : status === 'ACCEPTED' ? 'Chat Available' : 'Connect'}
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
"""

content = content.replace("    </div>\n  );\n}", modal_code)

with open(filepath, 'w') as f:
    f.write(content)

