const fs = require('fs');
let content = fs.readFileSync('src/utils/pdfGenerator.ts', 'utf8');

const helper = `
/**
 * Safely fetches an image from URL and converts to base64 for jsPDF
 */
const fetchImageAsBase64 = async (url: string): Promise<string | null> => {
  if (url.startsWith('data:image/')) return url;
  
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      } else {
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = url;
  });
};
`;

if (!content.includes('fetchImageAsBase64')) {
  content = content.replace("/**\n * Helper to inspect Base64", helper + "\n/**\n * Helper to inspect Base64");
  
  // Now replace the avatar drawing logic in generateDevoteeCardPDF
  const oldLogic = `  if (member.avatarUrl && member.avatarUrl.startsWith('data:image/')) {
    try {
      const fmt = getImageFormat(member.avatarUrl);
      doc.addImage(member.avatarUrl, fmt, 30.8, photoY, 24, 24);
    } catch (e) {
      doc.setFillColor(251, 191, 36);
      doc.roundedRect(30.8, photoY, 24, 24, 2, 2, 'F');
      doc.setTextColor(146, 64, 14);
      doc.setFontSize(14);
      doc.text('🕉️', 42.8, photoY + 14, { align: 'center' });
    }
  } else {
    doc.setFillColor(251, 191, 36);
    doc.roundedRect(30.8, photoY, 24, 24, 2, 2, 'F');
    doc.setTextColor(146, 64, 14);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('🕉️', 42.8, photoY + 15, { align: 'center' });
  }`;

  const newLogic = `  let drawn = false;
  if (member.avatarUrl) {
    try {
      const b64 = await fetchImageAsBase64(member.avatarUrl);
      if (b64) {
        const fmt = getImageFormat(b64);
        doc.addImage(b64, fmt, 30.8, photoY, 24, 24);
        drawn = true;
      }
    } catch (e) {
      console.warn("Failed to load avatar for PDF", e);
    }
  }
  
  if (!drawn) {
    doc.setFillColor(251, 191, 36);
    doc.roundedRect(30.8, photoY, 24, 24, 2, 2, 'F');
    doc.setTextColor(146, 64, 14);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('🕉️', 42.8, photoY + 15, { align: 'center' });
  }`;

  content = content.replace(oldLogic, newLogic);
  fs.writeFileSync('src/utils/pdfGenerator.ts', content);
}

