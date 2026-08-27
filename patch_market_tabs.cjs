const fs = require('fs');
let code = fs.readFileSync('src/components/domain3/PurohitMarketDesk.tsx', 'utf8');

const applyPurohitBlock = `
      {activeTab === 'APPLY_PUROHIT' && (
        <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in pb-12">
          {purohitApplication && purohitApplication.status === 'PENDING' ? (
            <div className="bg-orange-50 border border-orange-200 p-8 rounded-3xl text-center">
              <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock size={32} />
              </div>
              <h2 className="text-xl font-black text-orange-900 mb-2">Application Under Review</h2>
              <p className="text-orange-700 text-sm">Your application to become a verified Purohit is currently being reviewed by the Mandir administration. You will be notified once approved.</p>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden p-6 sm:p-8">
              <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-4">
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center shrink-0">
                  <Award size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Become a Verified Purohit</h2>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">Offer your Vedic services to the global community</p>
                </div>
              </div>

              <form onSubmit={handleApplyPurohit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Full Name *</label>
                    <input type="text" required value={applyForm.name} onChange={e=>setApplyForm({...applyForm, name: e.target.value})} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-black outline-none focus:bg-white focus:border-orange-500 transition-all" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Phone / WhatsApp *</label>
                    <input type="tel" required value={applyForm.phone} onChange={e=>setApplyForm({...applyForm, phone: e.target.value})} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-black outline-none focus:bg-white focus:border-orange-500 transition-all" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Specialization *</label>
                    <select value={applyForm.specialization} onChange={e=>setApplyForm({...applyForm, specialization: e.target.value})} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-black outline-none focus:bg-white focus:border-orange-500 transition-all">
                      <option value="Vedic Rituals">Vedic Rituals & Puja</option>
                      <option value="Astrology">Astrology & Kundli</option>
                      <option value="Katha Vachak">Katha Vachak</option>
                      <option value="Sanskrit Teaching">Sanskrit Teaching</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Experience (Years) *</label>
                    <input type="number" required min="0" value={applyForm.experienceYears} onChange={e=>setApplyForm({...applyForm, experienceYears: e.target.value})} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-black outline-none focus:bg-white focus:border-orange-500 transition-all" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Address / Base Location *</label>
                  <input type="text" required value={applyForm.address} onChange={e=>setApplyForm({...applyForm, address: e.target.value})} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-black outline-none focus:bg-white focus:border-orange-500 transition-all" />
                </div>

                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Why do you want to join? *</label>
                  <textarea required rows={3} value={applyForm.whyJoin} onChange={e=>setApplyForm({...applyForm, whyJoin: e.target.value})} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium outline-none focus:bg-white focus:border-orange-500 transition-all custom-scrollbar"></textarea>
                </div>
                
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Certifications / Lineage (Optional)</label>
                  <textarea rows={2} value={applyForm.certificates} onChange={e=>setApplyForm({...applyForm, certificates: e.target.value})} placeholder="Veda Pathashala, Parampara, etc." className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium outline-none focus:bg-white focus:border-orange-500 transition-all custom-scrollbar"></textarea>
                </div>

                <div className="pt-4">
                  <button type="submit" disabled={submitting} className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-sm font-black uppercase tracking-widest shadow-lg transition-all flex justify-center items-center gap-2">
                    {submitting ? <Loader2 size={18} className="animate-spin"/> : <Award size={18}/>} Submit Application
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      {activeTab === 'MY_OFFERED_GIGS' && (
        <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in pb-12">
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-8">
            <h3 className="text-lg font-black text-gray-900 flex items-center gap-2 mb-6"><Star className="text-blue-600"/> Create New Gig</h3>
            <form onSubmit={handleCreateGig} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Service Title *</label>
                  <input type="text" required value={gigForm.title} onChange={e=>setGigForm({...gigForm, title: e.target.value})} className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-black outline-none focus:bg-white focus:border-blue-500 transition-all" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Category *</label>
                  <select value={gigForm.category} onChange={e=>setGigForm({...gigForm, category: e.target.value})} className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-black outline-none focus:bg-white focus:border-blue-500 transition-all">
                    <option value="Mandir & Home Rituals">Mandir & Home Rituals</option>
                    <option value="Special Seva">Special Seva</option>
                    <option value="Off-site Seva">Off-site Seva</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Duration (Hours) *</label>
                  <input type="number" required min="0.5" step="0.5" value={gigForm.durationHours} onChange={e=>setGigForm({...gigForm, durationHours: Number(e.target.value)})} className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-black outline-none focus:bg-white focus:border-blue-500 transition-all" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Dakshina Fee ({curSymbol}) *</label>
                  <input type="number" required min="0" value={gigForm.dakshinaFee} onChange={e=>setGigForm({...gigForm, dakshinaFee: Number(e.target.value)})} className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-black outline-none focus:bg-white focus:border-blue-500 transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Description / Samagri Requirements *</label>
                <textarea required rows={3} value={gigForm.description} onChange={e=>setGigForm({...gigForm, description: e.target.value})} className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium outline-none focus:bg-white focus:border-blue-500 transition-all custom-scrollbar"></textarea>
              </div>
              <div className="pt-2">
                <button type="submit" disabled={submitting} className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-black uppercase tracking-widest shadow-md transition-all flex items-center justify-center gap-2 w-full sm:w-auto">
                  {submitting ? <Loader2 size={16} className="animate-spin"/> : <Sparkles size={16}/>} Publish Gig
                </button>
              </div>
            </form>
          </div>
          
          <div className="mt-12">
            <h3 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-2"><Star className="text-gray-400"/> My Active Gigs ({myOfferedGigs.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myOfferedGigs.map(gig => (
                <div key={gig.gigId} className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 relative">
                   <div className="absolute top-4 right-4 bg-green-100 text-green-700 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest">Active</div>
                   <h4 className="font-bold text-gray-900 line-clamp-2 pr-12">{gig.title}</h4>
                   <p className="text-xs text-gray-500 mt-1 mb-4">{gig.category}</p>
                   <div className="flex items-center justify-between mt-auto">
                     <span className="text-sm font-black text-blue-600">{curSymbol}{gig.dakshinaFee}</span>
                     <span className="text-xs font-bold text-gray-500">{gig.durationHours} hrs</span>
                   </div>
                </div>
              ))}
              {myOfferedGigs.length === 0 && (
                <div className="col-span-full py-12 text-center text-gray-400 border-2 border-dashed border-gray-200 rounded-3xl">
                  <Star size={32} className="mx-auto mb-3 opacity-20"/>
                  <p className="text-sm font-bold uppercase tracking-widest">No gigs published yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
`;

code = code.replace(
  "        {activeTab === 'MY_ORDERS' && (",
  applyPurohitBlock + "\n        {activeTab === 'MY_ORDERS' && ("
);

fs.writeFileSync('src/components/domain3/PurohitMarketDesk.tsx', code);
