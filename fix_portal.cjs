const fs = require('fs');
let content = fs.readFileSync('src/components/devotee/DevoteePortal.tsx', 'utf8');

// Replace the inline modal
const oldModal = `      {/* QR Code Modal */}
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
      )}`;

const newModal = `      {/* QR Code Pass */}
      <DevoteeQRPass 
        isOpen={isQrOpen} 
        onClose={() => setIsQrOpen(false)} 
        devotee={currentDevotee}
        workspaceName={activeWorkspace?.name}
      />`;

content = content.replace(oldModal, newModal);

// Add import
if (!content.includes('DevoteeQRPass')) {
  content = content.replace(
    "import { MySpaceModal } from '../common/MySpaceModal';",
    "import { MySpaceModal } from '../common/MySpaceModal';\nimport { DevoteeQRPass } from './DevoteeQRPass';"
  );
}

// Remove QRCode effect and state
content = content.replace(/const \[qrCodeDataUrl, setQrCodeDataUrl\] = React\.useState\(''\);\n/, '');
content = content.replace(/const uid = currentUser\?.id \|\| currentDevotee\?.id \|\| '';\n/, '');

const effectStr = `  React.useEffect(() => {
    if (isQrOpen && uid) {
      QRCode.toDataURL(\`devotee:\${uid}\`, { width: 200, margin: 1, color: { dark: '#1c1917', light: '#ffffff' } }).then(setQrCodeDataUrl).catch(console.error);
    }
  }, [isQrOpen, uid]);`;

content = content.replace(effectStr, '');

// Clean up unused QRCode import
content = content.replace("import QRCode from 'qrcode';\n", '');

fs.writeFileSync('src/components/devotee/DevoteePortal.tsx', content);
