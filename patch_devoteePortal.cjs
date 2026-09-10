const fs = require('fs');
let code = fs.readFileSync('src/components/devotee/DevoteePortal.tsx', 'utf8');

const importToAdd = "import { PdfPreviewModal } from '../common/PdfPreviewModal';\n";
if (!code.includes("PdfPreviewModal")) {
  code = code.replace(/import \{ generateAnnualDonationSummaryPDF, generateDevoteeCardPDF \} from '\.\.\/\.\.\/utils\/pdfGenerator';/, "import { generateAnnualDonationSummaryPDF, generateDevoteeCardPDF } from '../../utils/pdfGenerator';\n" + importToAdd);
}

const stateToAdd = `  const [previewPdfUrl, setPreviewPdfUrl] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewFileName, setPreviewFileName] = useState('');`;

if (!code.includes("const [previewPdfUrl")) {
  code = code.replace(/const \[activeTab, setActiveTab\] = useState\('dashboard'\);/, "const [activeTab, setActiveTab] = useState('dashboard');\n" + stateToAdd);
}

const handlePrintReplacement = `const handlePrintProfile = async () => {
    if (!currentDevotee) {
      showToast('Profile data not found', 'error');
      return;
    }
    if (!activeWorkspace) {
      showToast('Workspace data not found', 'error');
      return;
    }
    
    try {
      showToast('Generating preview...', 'info');
      setIsPreviewOpen(true);
      setPreviewFileName(\`\${currentDevotee.fullName.replace(/\\s+/g, '_')}_ID_Card.pdf\`);
      const blobUrl = await generateDevoteeCardPDF(currentDevotee, activeWorkspace, 'bloburl');
      if (blobUrl) {
        setPreviewPdfUrl(blobUrl);
      }
    } catch(e) {
      console.error(e);
      showToast('Error generating ID card', 'error');
      setIsPreviewOpen(false);
    }
  };`;

code = code.replace(/const handlePrintProfile = async \(\) => \{[\s\S]*?\} catch\(e\) \{[\s\S]*?\}\n  \};/g, handlePrintReplacement);

const modalRender = `      {/* PDF Preview Modal */}
      <PdfPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => {
          setIsPreviewOpen(false);
          setPreviewPdfUrl(null);
        }}
        pdfBlobUrl={previewPdfUrl}
        fileName={previewFileName}
        title="Smart Pass Preview"
      />
    </div>
  );
};

export default DevoteePortal;`;

code = code.replace(/    <\/div>\n  \);\n\};\n\nexport default DevoteePortal;/g, modalRender);

fs.writeFileSync('src/components/devotee/DevoteePortal.tsx', code);
