import re

filepath = 'src/utils/pdfGenerator.ts'
with open(filepath, 'r') as f:
    content = f.read()

bulk_pdf_code = """
export const generateBulkTaxReceiptsPDF = async (
  txs: TreasuryTransaction[],
  workspace: WorkspaceConfig
): Promise<void> => {
  if (txs.length === 0) return;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  for (let i = 0; i < txs.length; i++) {
    const tx = txs[i];
    if (i > 0) doc.addPage();

    const docRef = generateCryptoDocRef('TAX80G');
    const qrData = JSON.stringify({
      txId: tx.id,
      receiptNo: tx.taxReceiptNumber || `SB-TAX-${String(tx.id || '').slice(-6)}`,
      amount: tx.amount,
      date: tx.date,
      donor: tx.devoteeName,
      taxReg: workspace.taxExemptionNumber,
    });

    const qrDataUrl = await QRCode.toDataURL(qrData, { margin: 1, width: 180 });

    // Border & Header
    doc.setDrawColor(180, 83, 9);
    doc.setLineWidth(1);
    doc.rect(10, 10, 190, 277);

    // Header Title
    doc.setFillColor(254, 243, 199);
    doc.rect(11, 11, 188, 32, 'F');
    
    if (workspace.logoBase64) {
      try {
        doc.addImage(workspace.logoBase64, 'PNG', 15, 14, 24, 24);
      } catch(e) {}
    }

    doc.setTextColor(180, 83, 9);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text(workspace.name, 105, 22, { align: 'center' });

    doc.setFontSize(10);
    doc.setTextColor(107, 114, 128);
    doc.text(workspace.address + ', ' + workspace.city + ', ' + workspace.country, 105, 28, { align: 'center' });
    doc.text(`Trust Reg: ${workspace.trustRegNumber || 'TRUST/VEDIC/2024'} | 80G Exemption: ${workspace.taxExemptionNumber || 'CIT(E)/80G/SB-998'}`, 105, 34, { align: 'center' });

    // Title Box
    doc.setFillColor(180, 83, 9);
    doc.rect(11, 44, 188, 10, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.text('OFFICIAL DONATION & TAX EXEMPTION RECEIPT (SECTION 80G)', 105, 51, { align: 'center' });

    // Receipt meta
    doc.setTextColor(31, 41, 55);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text(`Receipt No: ${tx.taxReceiptNumber || 'TX-80G-' + tx.id}`, 20, 65);
    doc.text(`Date of Issue: ${tx.date}`, 140, 65);

    doc.text(`Payment Mode: ${tx.paymentMode}`, 20, 72);
    doc.text(`Ref/UTR No: ${tx.referenceNo || 'UPI-' + String(tx.id || '').slice(-8)}`, 140, 72);

    // Donor Table Box
    doc.setDrawColor(229, 231, 235);
    doc.setFillColor(249, 250, 251);
    doc.rect(20, 80, 170, 45, 'FD');

    doc.setFontSize(10);
    doc.setTextColor(107, 114, 128);
    doc.text('Donor Name:', 25, 90);
    doc.setTextColor(17, 24, 39);
    doc.setFont('helvetica', 'bold');
    doc.text(tx.devoteeName || 'Generous Sanatan Bhakta', 65, 90);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(107, 114, 128);
    doc.text('Seva / Purpose:', 25, 100);
    doc.setTextColor(17, 24, 39);
    doc.text(`${tx.category} - ${tx.purpose}`, 65, 100);

    doc.setTextColor(107, 114, 128);
    doc.text('Custody Handled By:', 25, 110);
    doc.setTextColor(17, 24, 39);
    doc.text(tx.handledBy || 'Treasury Sevadar', 65, 110);

    // Amount Box
    doc.setFillColor(254, 243, 199);
    doc.rect(20, 132, 170, 25, 'FD');
    doc.setTextColor(180, 83, 9);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text(`Total Amount Received: ${workspace.currencySymbol || '₹'} ${tx.amount.toLocaleString()}`, 25, 147);

    // Exemption Text
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(75, 85, 99);
    const legalNote = `This official receipt qualifies for tax deduction under Section 80G/12A of the Income Tax Act. We gratefully acknowledge this sacred contribution towards our Dharmic, educational, and charitable humanitarian activities. May Sri Hari shower you with eternal peace and divine grace.`;
    doc.text(doc.splitTextToSize(legalNote, 170), 20, 168);

    // QR Code & Signatures
    doc.addImage(qrDataUrl, 'PNG', 25, 195, 38, 38);
    doc.setFontSize(7);
    doc.text('Scan to verify digital audit stamp', 25, 238);

    // Authorized Signatory
    doc.line(130, 225, 180, 225);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(17, 24, 39);
    doc.text('Authorized Signatory', 135, 231);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(107, 114, 128);
    doc.text(`For ${workspace.name}`, 135, 236);

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(156, 163, 175);
    doc.text(docRef, 105, 268, { align: 'center' });
    doc.text('Made with ❤️ by TrackIQ Academy • Universal Community Management', 105, 273, { align: 'center' });
  }

  doc.save(`Bulk_80G_Receipts_${new Date().toISOString().slice(0, 10)}.pdf`);
};
"""

content = content.replace("export const generateTaxReceiptPDF", bulk_pdf_code + "\nexport const generateTaxReceiptPDF")

with open(filepath, 'w') as f:
    f.write(content)
