const fs = require('fs');
let code = fs.readFileSync('src/components/domain3/PurohitMarketDesk.tsx', 'utf8');

// Update applyForm state to include certificates
code = code.replace(
  "const [applyForm, setApplyForm] = useState({ name: session?.userName || '', phone: '', specialization: 'Vedic Rituals', experienceYears: '5', address: '', whyJoin: '' });",
  "const [applyForm, setApplyForm] = useState({ name: session?.userName || '', phone: '', specialization: 'Vedic Rituals', experienceYears: '5', address: '', whyJoin: '', certificates: '' });"
);

// Update payload to include certificates
code = code.replace(
  "whyJoin: applyForm.whyJoin,",
  "whyJoin: applyForm.whyJoin,\n        certificates: applyForm.certificates,"
);

// Add input field for certificates
const formCodeOld = `<div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Why do you want to join?</label>
                  <textarea rows={3} required value={applyForm.whyJoin} onChange={e=>setApplyForm({...applyForm, whyJoin: e.target.value})} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-black text-gray-900 outline-none focus:bg-white focus:border-blue-500 transition-all" />
                </div>`;

const formCodeNew = `<div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Credentials / Certificate Links (Drive/Dropbox)</label>
                  <input type="text" value={applyForm.certificates} onChange={e=>setApplyForm({...applyForm, certificates: e.target.value})} placeholder="https://..." className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-black text-gray-900 outline-none focus:bg-white focus:border-blue-500 transition-all mb-4" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Why do you want to join?</label>
                  <textarea rows={3} required value={applyForm.whyJoin} onChange={e=>setApplyForm({...applyForm, whyJoin: e.target.value})} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-black text-gray-900 outline-none focus:bg-white focus:border-blue-500 transition-all" />
                </div>`;

code = code.replace(formCodeOld, formCodeNew);

// Make sure Verified Badge is very prominent on Profile in Marketplace.
// Look for where purohitName is displayed in gigs
code = code.replace(
  '<span className="font-bold text-gray-900 flex items-center gap-1">{gig.purohitName}',
  '<span className="font-bold text-gray-900 flex items-center gap-1">{gig.purohitName}{gig.verifiedBadge && <ShieldCheck size={14} className="text-blue-500" title="Verified Scholar"/>}'
);

fs.writeFileSync('src/components/domain3/PurohitMarketDesk.tsx', code);
