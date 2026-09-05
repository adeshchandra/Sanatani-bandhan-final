const fs = require('fs');
let fileContent = fs.readFileSync('src/components/domain3/PurohitMarketDesk.tsx', 'utf8');

const targetButtonStr = `<button 
                     onClick={() => setCheckoutStep('FORM')}
                     className="w-full py-4 sm:py-5 bg-stone-900 hover:bg-black text-white rounded-xl sm:rounded-2xl text-xs sm:text-sm font-black uppercase tracking-widest shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 flex justify-center items-center gap-2"
                   >
                     Continue to Booking <ChevronRight size={18}/>
                   </button>`;

const replacementStr = `<div className="flex flex-col gap-3">
                     <div className="flex gap-3">
                       <button 
                         onClick={() => {
                           const msg = \`Hari Om Pandit ji, I am interested in booking: \${selectedGig.title}. Can we discuss?\`;
                           const phone = selectedGig.phone || '919876543210';
                           window.open(\`https://wa.me/\${phone}?text=\${encodeURIComponent(msg)}\`, '_blank');
                         }}
                         className="flex-1 py-4 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex justify-center items-center gap-2"
                       >
                         <Phone size={16}/> WhatsApp
                       </button>
                       <button 
                         onClick={() => {
                           showToast(\`Opening secure chat with \${selectedGig.purohitName}...\`, 'success');
                           // In a real app, this would route to the in-app chat module
                         }}
                         className="flex-1 py-4 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex justify-center items-center gap-2"
                       >
                         <MessageSquare size={16}/> In-App Chat
                       </button>
                     </div>
                     <button 
                       onClick={() => setCheckoutStep('FORM')}
                       className="w-full py-4 sm:py-5 bg-stone-900 hover:bg-black text-white rounded-xl sm:rounded-2xl text-xs sm:text-sm font-black uppercase tracking-widest shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 flex justify-center items-center gap-2 mt-2"
                     >
                       Continue to Booking <ChevronRight size={18}/>
                     </button>
                   </div>`;

fileContent = fileContent.replace(targetButtonStr, replacementStr);
fs.writeFileSync('src/components/domain3/PurohitMarketDesk.tsx', fileContent);
