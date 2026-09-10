const fs = require('fs');
let code = fs.readFileSync('src/utils/pdfGenerator.ts', 'utf8');

const regex = /export const generateDevoteeCardPDF = async \([\s\S]*?\} catch \(e\) \{\s*console\.warn\(\"Failed to load avatar for PDF\", e\);\s*\}\s*\}\s*if \(!drawn\) \{[\s\S]*?doc\.save\(`\$\{member\.fullName\.replace\(\/\\s\+\/g, '_'\}_\}_SmartCard\.pdf`\);\s*\};/g;

const replacement = `export const generateDevoteeCardPDF = async (
  member: DevoteeMember,
  workspace: WorkspaceConfig
): Promise<void> => {
  // CR80 Standard ID Card vertical (54 mm x 86 mm)
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: [54, 86], 
  });

  const docRef = generateCryptoDocRef('CARD');
  const qrData = generateSecureQRToken(member);

  const qrDataUrl = await QRCode.toDataURL(qrData, {
    margin: 0,
    width: 200,
    color: { dark: '#000000', light: '#FFFFFF' },
  });

  // Base background
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, 54, 86, 'F');

  // Top Accent Banner (Deep Amber/Saffron)
  doc.setFillColor(217, 119, 6); 
  doc.rect(0, 0, 54, 15, 'F');
  
  // Secondary thin gold line
  doc.setFillColor(251, 191, 36); 
  doc.rect(0, 15, 54, 1.5, 'F');

  // Header Text
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text(workspace.name.toUpperCase().substring(0, 30), 27, 7, { align: 'center' });
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5);
  doc.text('OFFICIAL IDENTITY CARD', 27, 11, { align: 'center' });

  // Photo Box
  const photoY = 21;
  const photoSize = 22;
  const photoX = (54 - photoSize) / 2;
  
  let drawn = false;
  if (member.avatarUrl) {
    try {
      const b64 = await fetchImageAsBase64(member.avatarUrl);
      if (b64) {
        const fmt = getImageFormat(b64);
        doc.addImage(b64, fmt, photoX, photoY, photoSize, photoSize);
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.3);
        doc.rect(photoX, photoY, photoSize, photoSize);
        drawn = true;
      }
    } catch (e) {
      console.warn("Failed to load avatar for PDF", e);
    }
  }
  
  if (!drawn) {
    // Elegant fallback avatar box (no emojis which break in jsPDF)
    doc.setFillColor(243, 244, 246);
    doc.rect(photoX, photoY, photoSize, photoSize, 'F');
    doc.setDrawColor(209, 213, 219);
    doc.setLineWidth(0.3);
    doc.rect(photoX, photoY, photoSize, photoSize);
    
    doc.setTextColor(156, 163, 175);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    const initial = member.fullName.charAt(0).toUpperCase();
    doc.text(initial, 27, photoY + 14, { align: 'center' });
  }

  // Name & Identity
  doc.setTextColor(17, 24, 39); 
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text(member.fullName.substring(0, 25), 27, 49, { align: 'center' });

  if (member.spiritualName) {
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(6);
    doc.setTextColor(217, 119, 6);
    doc.text(\`"\${member.spiritualName}"\`, 27, 52.5, { align: 'center' });
  }

  // Metadata Details Box
  const startY = member.spiritualName ? 55 : 53;
  
  doc.setFillColor(249, 250, 251); 
  doc.rect(4, startY, 46, 13, 'F');
  doc.setDrawColor(229, 231, 235);
  doc.setLineWidth(0.2);
  doc.rect(4, startY, 46, 13);
  
  doc.setTextColor(75, 85, 99);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(4.5);
  
  // Row 1
  doc.text('ID NUMBER:', 6, startY + 4);
  doc.setFont('helvetica', 'normal');
  doc.text(member.id.substring(0, 15).toUpperCase(), 20, startY + 4);

  // Row 2
  doc.setFont('helvetica', 'bold');
  doc.text('PHONE:', 6, startY + 7.5);
  doc.setFont('helvetica', 'normal');
  doc.text(member.phone || 'N/A', 20, startY + 7.5);

  // Row 3
  doc.setFont('helvetica', 'bold');
  doc.text('BLOOD GRP:', 6, startY + 11);
  doc.setFont('helvetica', 'normal');
  doc.text(member.bloodGroup || 'N/A', 20, startY + 11);

  // QR Code
  doc.addImage(qrDataUrl, 'PNG', 4, 70, 13, 13);

  // Footer / Auth
  doc.setTextColor(107, 114, 128);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(4);
  doc.text('Scan for Verification', 10.5, 85, { align: 'center' });
  
  // Signature Line
  doc.setDrawColor(156, 163, 175);
  doc.setLineWidth(0.2);
  doc.line(30, 80, 50, 80);
  doc.text('Authorized Signature', 40, 83, { align: 'center' });

  // Security strip at bottom
  doc.setFillColor(217, 119, 6);
  doc.rect(0, 85, 54, 1, 'F');

  doc.save(\`\${member.fullName.replace(/\\s+/g, '_')}_ID_Card.pdf\`);
};`;

code = code.replace(regex, replacement);
fs.writeFileSync('src/utils/pdfGenerator.ts', code);
