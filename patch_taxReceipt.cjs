const fs = require('fs');
let code = fs.readFileSync('src/utils/pdfGenerator.ts', 'utf8');

const sigRegex = /export const generateTaxReceiptPDF = async \([\s\S]*?returnType: 'save' \| 'blob' = 'save',/g;
code = code.replace(sigRegex, `export const generateTaxReceiptPDF = async (
  tx: TreasuryTransaction,
  workspace: WorkspaceConfig,
  returnType: 'save' | 'blob' | 'bloburl' = 'save',`);

const retRegex = /\): Promise<void \| Blob> => \{/g;
code = code.replace(retRegex, `): Promise<void | Blob | string> => {`);

const endRegex = /  if \(returnType === 'blob'\) \{\n    return doc\.output\('blob'\);\n  \}\n  doc\.save\(\`80G_Receipt_\$\{tx\.id\}\.pdf\`\);\n\};/g;
code = code.replace(endRegex, `  if (returnType === 'blob') {
    return doc.output('blob');
  } else if (returnType === 'bloburl') {
    return doc.output('bloburl');
  }
  doc.save(\`80G_Receipt_\${tx.id}.pdf\`);
};`);

fs.writeFileSync('src/utils/pdfGenerator.ts', code);
