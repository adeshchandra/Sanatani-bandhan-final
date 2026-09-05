const fs = require('fs');
let fileContent = fs.readFileSync('src/components/common/MySpaceModal.tsx', 'utf8');

const targetStr = `<div className="bg-stone-50 p-5 border-t border-stone-100 text-center">
                       <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest leading-relaxed">
                         Present this secure pass to volunteers at any event gate. It contains <strong className="text-red-500">no</strong> sensitive login credentials.
                       </p>
                    </div>
                 </div>`;

const newStr = `<div className="bg-stone-50 p-5 border-t border-stone-100 text-center">
                       <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest leading-relaxed">
                         Present this secure pass to volunteers at any event gate. It contains <strong className="text-red-500">no</strong> sensitive login credentials.
                       </p>
                    </div>
                 </div>
                 
                 {/* Quick Actions (Gate Pass) */}
                 <div className="flex gap-3 w-full max-w-sm mt-4">
                    <button onClick={handleDownloadPDF} className="flex-1 bg-white border border-stone-200 text-stone-700 hover:text-stone-900 hover:bg-stone-50 font-black py-4 rounded-xl text-[10px] uppercase tracking-widest flex justify-center items-center gap-2 shadow-sm transition-all hover:-translate-y-0.5">
                      <Download size={16}/> Download
                    </button>
                    <button onClick={() => {
                        const shareText = \`Here is my Digital Gate Pass for \${activeWorkspace.name}\`;
                        const whatsappUrl = \`https://wa.me/?text=\${encodeURIComponent(shareText)}\`;
                        window.open(whatsappUrl, '_blank');
                    }} className="flex-[2] bg-emerald-500 hover:bg-emerald-600 text-white font-black py-4 rounded-xl text-[10px] uppercase tracking-widest flex justify-center items-center gap-2 shadow-sm transition-all hover:-translate-y-0.5">
                      <Send size={16}/> Share on WhatsApp
                    </button>
                 </div>`;

fileContent = fileContent.replace(targetStr, newStr);
fs.writeFileSync('src/components/common/MySpaceModal.tsx', fileContent);
