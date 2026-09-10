const fs = require('fs');
let code = fs.readFileSync('src/components/domain1/DevoteeGrid.tsx', 'utf8');

// Add import for PdfPreviewModal
const importToAdd = "import { PdfPreviewModal } from '../common/PdfPreviewModal';\n";
if (!code.includes("PdfPreviewModal")) {
  code = code.replace(/import \{ generateDevoteeCardPDF \} from '\.\.\/\.\.\/utils\/pdfGenerator';/, "import { generateDevoteeCardPDF } from '../../utils/pdfGenerator';\n" + importToAdd);
}

// Add state for preview
const stateToAdd = `  const [previewPdfUrl, setPreviewPdfUrl] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewFileName, setPreviewFileName] = useState('');`;

if (!code.includes("const [previewPdfUrl")) {
  code = code.replace(/const \[isAddModalOpen, setIsAddModalOpen\] = useState\(false\);/, "const [isAddModalOpen, setIsAddModalOpen] = useState(false);\n" + stateToAdd);
}

// Update handlePrintCard to open preview instead of saving directly
const handlePrintReplacement = `const handlePrintCard = async (devotee: DevoteeMember) => {
    try {
      showToast('Generating preview...', 'info');
      setIsPreviewOpen(true);
      setPreviewFileName(\`\${devotee.fullName.replace(/\\s+/g, '_')}_ID_Card.pdf\`);
      const blobUrl = await generateDevoteeCardPDF(devotee, activeWorkspace, 'bloburl');
      if (blobUrl) {
        setPreviewPdfUrl(blobUrl);
      }
    } catch (e: any) {
      showToast('Error generating PDF preview', 'error');
      setIsPreviewOpen(false);
    }
  };`;

code = code.replace(/const handlePrintCard = async \([\s\S]*?\}\n  \};/g, handlePrintReplacement);

// Render modal at the end
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

export default DevoteeGrid;`;

code = code.replace(/    <\/div>\n  \);\n\};\n\nexport default DevoteeGrid;/g, modalRender);

fs.writeFileSync('src/components/domain1/DevoteeGrid.tsx', code);
