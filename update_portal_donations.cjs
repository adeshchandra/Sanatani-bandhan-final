const fs = require('fs');
let content = fs.readFileSync('src/components/devotee/DevoteePortal.tsx', 'utf8');

// Add Import
if (!content.includes('DonationHistoryModal')) {
  content = content.replace(
    "import { DevoteeQRPass } from './DevoteeQRPass';",
    "import { DevoteeQRPass } from './DevoteeQRPass';\nimport { DonationHistoryModal } from './DonationHistoryModal';"
  );
}

// Add state
if (!content.includes('isDonationHistoryOpen')) {
  content = content.replace(
    "const [isQrOpen, setIsQrOpen] = useState(false);",
    "const [isQrOpen, setIsQrOpen] = useState(false);\n  const [isDonationHistoryOpen, setIsDonationHistoryOpen] = useState(false);"
  );
}

// Add the modal rendering
if (!content.includes('<DonationHistoryModal')) {
  const modalRender = `      {/* QR Code Pass */}
      <DevoteeQRPass 
        isOpen={isQrOpen} 
        onClose={() => setIsQrOpen(false)} 
        devotee={currentDevotee}
        workspaceName={activeWorkspace?.name}
      />

      {/* Donation History Modal */}
      <DonationHistoryModal
        isOpen={isDonationHistoryOpen}
        onClose={() => setIsDonationHistoryOpen(false)}
        donations={donations}
        workspace={activeWorkspace}
        devoteeName={currentDevotee?.spiritualName || currentDevotee?.fullName || currentUser?.name || 'Devotee'}
      />`;
      
  content = content.replace(
    /{[\s\S]*{\/\* QR Code Pass \*\/}[\s\S]*<DevoteeQRPass[\s\S]*\/>/,
    modalRender
  );
}

// Add View All Donations button
const viewAllButton = `                {poojas.length === 0 && donations.length === 0 && (
                   <p className="text-sm text-stone-500 italic pl-6">No recent activity found.</p>
                )}
              </div>
              
              {donations.length > 0 && (
                <div className="mt-6 pt-4 border-t border-stone-100 flex justify-center">
                  <button 
                    onClick={() => setIsDonationHistoryOpen(true)}
                    className="flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-xl"
                  >
                    <Heart className="w-4 h-4" /> View Full Donation History
                  </button>
                </div>
              )}`;

content = content.replace(
  `                {poojas.length === 0 && donations.length === 0 && (
                   <p className="text-sm text-stone-500 italic pl-6">No recent activity found.</p>
                )}
              </div>`,
  viewAllButton
);

fs.writeFileSync('src/components/devotee/DevoteePortal.tsx', content);
