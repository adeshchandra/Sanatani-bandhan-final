const fs = require('fs');
let content = fs.readFileSync('src/components/devotee/DevoteePortal.tsx', 'utf8');

if (!content.includes('TaxReceiptsWidget')) {
  // Import
  content = content.replace(
    "import { DonationHistoryModal } from './DonationHistoryModal';",
    "import { DonationHistoryModal } from './DonationHistoryModal';\nimport { TaxReceiptsWidget } from './TaxReceiptsWidget';"
  );

  // State
  content = content.replace(
    "const [isDonationHistoryOpen, setIsDonationHistoryOpen] = useState(false);",
    "const [isDonationHistoryOpen, setIsDonationHistoryOpen] = useState(false);\n  const [isTaxWidgetOpen, setIsTaxWidgetOpen] = useState(false);"
  );

  // Quick Action
  content = content.replace(
    "onClick={handleDownloadTaxReceipt}",
    "onClick={() => setIsTaxWidgetOpen(true)}"
  );

  // Render Modal
  const modalHTML = `
      {/* Tax Receipts Modal */}
      {isTaxWidgetOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-stone-900/60 backdrop-blur-sm">
          <div className="bg-transparent rounded-3xl w-full max-w-4xl max-h-[90vh] relative animate-in zoom-in-95 duration-200 flex flex-col">
            <div className="flex justify-end mb-2">
               <button onClick={() => setIsTaxWidgetOpen(false)} className="p-2 bg-white hover:bg-stone-100 text-stone-600 rounded-full transition-colors shadow-sm">
                 <X className="w-5 h-5" />
               </button>
            </div>
            <div className="overflow-y-auto custom-scrollbar rounded-2xl shadow-2xl">
               <TaxReceiptsWidget />
            </div>
          </div>
        </div>
      )}
      
      {/* Donation History Modal */}`;

  content = content.replace("{/* Donation History Modal */}", modalHTML);

  fs.writeFileSync('src/components/devotee/DevoteePortal.tsx', content);
}
