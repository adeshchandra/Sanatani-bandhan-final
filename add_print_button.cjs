const fs = require('fs');
let content = fs.readFileSync('src/components/devotee/DevoteePortal.tsx', 'utf8');

// 1. Add Printer to lucide-react import
content = content.replace(
  "Zap, X",
  "Zap, X, Printer"
);

// 2. Add generateDevoteeCardPDF to import
content = content.replace(
  "import { generateAnnualDonationSummaryPDF } from '../../utils/pdfGenerator';",
  "import { generateAnnualDonationSummaryPDF, generateDevoteeCardPDF } from '../../utils/pdfGenerator';"
);

// 3. Add handlePrintProfile
const handlePrintProfile = `  const handlePrintProfile = async () => {
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
  };`;

content = content.replace(
  "  const handleDownloadTaxReceipt = () => {",
  handlePrintProfile + "\n\n  const handleDownloadTaxReceipt = () => {"
);

// 4. Update the quick actions grid
const oldGrid = `          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">`;
const newGrid = `          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">`;
content = content.replace(oldGrid, newGrid);

// 5. Add the Print Profile button to the end of the quick actions
const oldQrButton = `            <button onClick={() => setIsQrOpen(true)} className="flex flex-col items-center justify-center p-4 bg-stone-50 hover:bg-purple-50 rounded-xl border border-stone-100 hover:border-purple-200 transition-colors gap-3">
              <div className="p-3 bg-purple-100 text-purple-600 rounded-full"><QrCode className="w-5 h-5" /></div>
              <span className="text-xs font-bold text-stone-700">QR Pass</span>
            </button>`;

const newButtons = `            <button onClick={() => setIsQrOpen(true)} className="flex flex-col items-center justify-center p-4 bg-stone-50 hover:bg-purple-50 rounded-xl border border-stone-100 hover:border-purple-200 transition-colors gap-3">
              <div className="p-3 bg-purple-100 text-purple-600 rounded-full"><QrCode className="w-5 h-5" /></div>
              <span className="text-xs font-bold text-stone-700">QR Pass</span>
            </button>
            <button onClick={handlePrintProfile} className="flex flex-col items-center justify-center p-4 bg-stone-50 hover:bg-rose-50 rounded-xl border border-stone-100 hover:border-rose-200 transition-colors gap-3">
              <div className="p-3 bg-rose-100 text-rose-600 rounded-full"><Printer className="w-5 h-5" /></div>
              <span className="text-xs font-bold text-stone-700">Print Profile</span>
            </button>`;

content = content.replace(oldQrButton, newButtons);

fs.writeFileSync('src/components/devotee/DevoteePortal.tsx', content);
