const fs = require('fs');
let code = fs.readFileSync('src/components/domain3/PurohitMarketDesk.tsx', 'utf8');

const applyView = `
        {activeTab === 'APPLY_PUROHIT' && (
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm max-w-2xl mx-auto mt-8">
            <h3 className="text-xl font-black text-gray-900 mb-2">Apply to become a Verified Purohit</h3>
            <p className="text-sm text-gray-500 mb-6">Offer your services, manage gigs, and get a verified badge.</p>
            {purohitApplication ? (
              <div className="p-6 bg-blue-50 border border-blue-100 rounded-2xl text-center">
                <CheckCircle2 size={32} className="mx-auto text-blue-500 mb-3"/>
                <h4 className="text-lg font-bold text-blue-900">Application Submitted</h4>
                <p className="text-sm text-blue-700 mt-2">Your application is currently <strong>{purohitApplication.status}</strong>.</p>
                <p className="text-xs text-blue-600 mt-1">Our backend team will review and approve your application soon.</p>
              </div>
            ) : (
              <form onSubmit={handleApplyPurohit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Full Name</label>
                  <input type="text" required value={applyForm.name} onChange={e=>setApplyForm({...applyForm, name: e.target.value})} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-black text-gray-900 outline-none focus:bg-white focus:border-blue-500 transition-all" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Phone Number</label>
                  <input type="text" required value={applyForm.phone} onChange={e=>setApplyForm({...applyForm, phone: e.target.value})} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-black text-gray-900 outline-none focus:bg-white focus:border-blue-500 transition-all" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Specialization</label>
                    <input type="text" required value={applyForm.specialization} onChange={e=>setApplyForm({...applyForm, specialization: e.target.value})} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-black text-gray-900 outline-none focus:bg-white focus:border-blue-500 transition-all" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Years of Experience</label>
                    <input type="number" required value={applyForm.experienceYears} onChange={e=>setApplyForm({...applyForm, experienceYears: e.target.value})} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-black text-gray-900 outline-none focus:bg-white focus:border-blue-500 transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Why do you want to join?</label>
                  <textarea rows={3} required value={applyForm.whyJoin} onChange={e=>setApplyForm({...applyForm, whyJoin: e.target.value})} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-black text-gray-900 outline-none focus:bg-white focus:border-blue-500 transition-all" />
                </div>
                <button type="submit" disabled={submitting} className="w-full py-4 bg-gray-900 hover:bg-black text-white rounded-xl text-sm font-black uppercase tracking-widest shadow-lg transition-all flex justify-center items-center gap-2">
                  {submitting ? <Loader2 size={18} className="animate-spin"/> : <Award size={18}/>} Submit Application
                </button>
              </form>
            )}
          </div>
        )}

        {activeTab === 'MY_OFFERED_GIGS' && (
          <div className="space-y-6 mt-6">
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2"><Star className="text-orange-500"/> Create New Gig</h3>
              <form onSubmit={handleCreateGig} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Title</label>
                    <input type="text" required value={gigForm.title} onChange={e=>setGigForm({...gigForm, title: e.target.value})} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-black text-gray-900 outline-none focus:bg-white focus:border-blue-500 transition-all" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Category</label>
                    <select required value={gigForm.category} onChange={e=>setGigForm({...gigForm, category: e.target.value})} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-black text-gray-900 outline-none focus:bg-white focus:border-blue-500 transition-all">
                      <option value="Mandir & Home Rituals">Mandir & Home Rituals</option>
                      <option value="Special Seva">Special Seva</option>
                      <option value="Astrology & Consultation">Astrology & Consultation</option>
                      <option value="Off-site Seva">Off-site Seva</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Description</label>
                  <textarea rows={2} required value={gigForm.description} onChange={e=>setGigForm({...gigForm, description: e.target.value})} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-black text-gray-900 outline-none focus:bg-white focus:border-blue-500 transition-all" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Duration (Hours)</label>
                    <input type="number" required step="0.5" value={gigForm.durationHours} onChange={e=>setGigForm({...gigForm, durationHours: Number(e.target.value)})} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-black text-gray-900 outline-none focus:bg-white focus:border-blue-500 transition-all" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Dakshina Fee ({curSymbol})</label>
                    <input type="number" required value={gigForm.dakshinaFee} onChange={e=>setGigForm({...gigForm, dakshinaFee: Number(e.target.value)})} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-black text-gray-900 outline-none focus:bg-white focus:border-blue-500 transition-all" />
                  </div>
                </div>
                <button type="submit" disabled={submitting} className="py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-black uppercase tracking-widest shadow-lg transition-all flex items-center gap-2">
                  {submitting ? <Loader2 size={18} className="animate-spin"/> : <Plus size={18}/>} Add Gig
                </button>
              </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {myOfferedGigs.map(gig => (
                <div key={gig.gigId} className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] uppercase font-black tracking-widest bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full">{gig.category}</span>
                    <span className="text-xl font-black text-green-600">{curSymbol}{gig.dakshinaFee}</span>
                  </div>
                  <h3 className="text-lg font-black text-gray-900 mb-2 leading-tight">{gig.title}</h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">{gig.description}</p>
                  <div className="flex items-center gap-4 text-xs font-bold text-gray-500">
                     <span className="flex items-center gap-1"><Clock size={14}/> {gig.durationHours}h</span>
                     <span className="flex items-center gap-1"><Star size={14} className="text-orange-400"/> {gig.ratingAvg}</span>
                  </div>
                </div>
              ))}
              {myOfferedGigs.length === 0 && (
                 <div className="col-span-full py-12 text-center text-gray-400">
                    <Star size={48} className="mx-auto mb-4 opacity-20"/>
                    <p className="text-sm font-bold">You haven't offered any gigs yet.</p>
                 </div>
              )}
            </div>
          </div>
        )}
`;

code = code.replace(
  "{/* Main Content Area */}",
  "{/* Main Content Area */}\n" + applyView
);

// Add missing icon Plus
code = code.replace(
  "ShieldCheck, BookOpen",
  "ShieldCheck, BookOpen, Plus"
);

fs.writeFileSync('src/components/domain3/PurohitMarketDesk.tsx', code);
