const fs = require('fs');
let content = fs.readFileSync('src/utils/pdfGenerator.ts', 'utf8');

// The function signature was completely mangled, let's fix it safely
// Find the exact line:
// export const generateTaxReceiptPDF = async (
//   tx: TreasuryTransaction,
//   workspace: WorkspaceConfig,
//   returnType: 'save' | 'blob' = 'save',
//   isCopy: boolean = false,
//   devoteePan: string = ''
// ): Promise<void | Blob> => {

// Let's replace the whole function definition until the first doc.rect
content = content.replace(/export const generateTaxReceiptPDF[\s\S]*?doc\.rect\(10,\ 10,\ 190,\ 277\);/, `export const generateTaxReceiptPDF = async (
  tx: TreasuryTransaction,
  workspace: WorkspaceConfig,
  returnType: 'save' | 'blob' = 'save',
  isCopy: boolean = false,
  devoteePan: string = ''
): Promise<void | Blob> => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const docRef = generateCryptoDocRef('TAX80G');

  const qrData = JSON.stringify({
    txId: tx.id,
    receiptNo: tx.taxReceiptNumber || \`SB-TAX-\${String(tx.id || '').slice(-6)}\`,
    amount: tx.amount,
    date: tx.date,
    donor: tx.devoteeName,
    taxReg: workspace.taxExemptionNumber,
  });

  const qrDataUrl = await QRCode.toDataURL(qrData, { margin: 1, width: 180 });

  if (isCopy) {
    doc.setTextColor(200, 200, 200);
    doc.setFontSize(80);
    doc.text('COPY', 105, 150, { align: 'center', angle: -45 });
  }

  // Border & Header
  doc.setDrawColor(180, 83, 9);
  doc.setLineWidth(1);
  doc.rect(10, 10, 190, 277);`);

// Make sure devoteePan works
content = content.replace("if (devoteePan) {\n    doc.setFont('helvetica', 'normal');", "if (devoteePan) {\n    doc.setFont('helvetica', 'normal');");

// Make sure returnType works
content = content.replace("if (returnType === 'blob') {\n    return doc.output('blob');\n  }", "if (returnType === 'blob') {\n    return doc.output('blob');\n  }");

fs.writeFileSync('src/utils/pdfGenerator.ts', content);
