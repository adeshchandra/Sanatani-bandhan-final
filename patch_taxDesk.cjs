const fs = require('fs');
let code = fs.readFileSync('src/components/domain2/TaxReceiptDesk.tsx', 'utf8');

const importToAdd = "import { PdfPreviewModal } from '../common/PdfPreviewModal';\n";
if (!code.includes("PdfPreviewModal")) {
  code = code.replace(/import \{ generateTaxReceiptPDF, generateBulkTaxReceiptsPDF \} from '\.\.\/\.\.\/utils\/pdfGenerator';/, "import { generateTaxReceiptPDF, generateBulkTaxReceiptsPDF } from '../../utils/pdfGenerator';\n" + importToAdd);
}

const stateToAdd = `  const [previewPdfUrl, setPreviewPdfUrl] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewFileName, setPreviewFileName] = useState('');`;

if (!code.includes("const [previewPdfUrl")) {
  code = code.replace(/const \[searchTerm, setSearchTerm\] = useState\(''\);/, "const [searchTerm, setSearchTerm] = useState('');\n" + stateToAdd);
}

const handleDownloadReplacement = `const handleDownload = async (tx: any) => {
    try {
      showToast('Generating preview...', 'info');
      setIsPreviewOpen(true);
      setPreviewFileName(\`80G_Receipt_\${tx.id}.pdf\`);
      const blobUrl = await generateTaxReceiptPDF(tx, activeWorkspace, 'bloburl');
      if (blobUrl) {
        setPreviewPdfUrl(blobUrl as string);
      }
    } catch (e: any) {
      showToast('Error generating certificate preview', 'error');
      setIsPreviewOpen(false);
    }
  };`;

code = code.replace(/const handleDownload = async \(tx: any\) => \{[\s\S]*?\} catch \(e: any\) \{[\s\S]*?\}\n  \};/g, handleDownloadReplacement);

const modalRender = `      {/* PDF Preview Modal */}
      <PdfPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => {
          setIsPreviewOpen(false);
          setPreviewPdfUrl(null);
        }}
        pdfBlobUrl={previewPdfUrl}
        fileName={previewFileName}
        title="80G Certificate Preview"
      />
    </div>
  );
};

export default TaxReceiptDesk;`;

code = code.replace(/    <\/div>\n  \);\n\};\n\nexport default TaxReceiptDesk;/g, modalRender);

fs.writeFileSync('src/components/domain2/TaxReceiptDesk.tsx', code);
