const fs = require('fs');
let content = fs.readFileSync('src/utils/pdfGenerator.ts', 'utf8');

// Modify function signature
content = content.replace(
  "export const generateTaxReceiptPDF = async (\n  tx: TreasuryTransaction,\n  workspace: WorkspaceConfig\n): Promise<void> => {",
  "export const generateTaxReceiptPDF = async (\n  tx: TreasuryTransaction,\n  workspace: WorkspaceConfig,\n  returnType: 'save' | 'blob' = 'save',\n  isCopy: boolean = false,\n  devoteePan: string = ''\n): Promise<void | Blob> => {"
);

content = content.replace(
  "export const generateTaxReceiptPDF = async (\n  tx: TreasuryTransaction,\n  workspace: WorkspaceConfig\n): Promise<void> => {",
  "export const generateTaxReceiptPDF = async (\n  tx: TreasuryTransaction,\n  workspace: WorkspaceConfig,\n  returnType: 'save' | 'blob' = 'save',\n  isCopy: boolean = false,\n  devoteePan: string = ''\n): Promise<void | Blob> => {"
); // Fallback for some formatting issues

content = content.replace(
  "export const generateTaxReceiptPDF = async (\n  tx: TreasuryTransaction,\n  workspace: WorkspaceConfig\n): Promise<void>",
  "export const generateTaxReceiptPDF = async (\n  tx: TreasuryTransaction,\n  workspace: WorkspaceConfig,\n  returnType: 'save' | 'blob' = 'save',\n  isCopy: boolean = false,\n  devoteePan: string = ''\n): Promise<void | Blob>"
);

// If it's a straight line
content = content.replace(
  "export const generateTaxReceiptPDF = async (tx: TreasuryTransaction, workspace: WorkspaceConfig): Promise<void> => {",
  "export const generateTaxReceiptPDF = async (tx: TreasuryTransaction, workspace: WorkspaceConfig, returnType: 'save' | 'blob' = 'save', isCopy: boolean = false, devoteePan: string = ''): Promise<void | Blob> => {"
);


// Add PAN below Donor Name
content = content.replace(
  "doc.text(tx.devoteeName || 'Generous Sanatan Bhakta', 65, 90);",
  "doc.text(tx.devoteeName || 'Generous Sanatan Bhakta', 65, 90);\n  if (devoteePan) {\n    doc.setFont('helvetica', 'normal');\n    doc.setTextColor(107, 114, 128);\n    doc.text('Donor PAN:', 130, 90);\n    doc.setTextColor(17, 24, 39);\n    doc.setFont('helvetica', 'bold');\n    doc.text(devoteePan, 155, 90);\n  }"
);

// Add Watermark
content = content.replace(
  "// Footer",
  "if (isCopy) {\n    doc.setTextColor(200, 200, 200);\n    doc.setFontSize(80);\n    doc.text('COPY', 105, 150, { align: 'center', angle: -45 });\n  }\n  // Footer"
);

// Modify return logic
content = content.replace(
  "doc.save(`80G_Receipt_${tx.id}.pdf`);\n};",
  "if (returnType === 'blob') {\n    return doc.output('blob');\n  }\n  doc.save(`80G_Receipt_${tx.id}.pdf`);\n};"
);

fs.writeFileSync('src/utils/pdfGenerator.ts', content);
