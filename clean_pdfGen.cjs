const fs = require('fs');
let pdfGen = fs.readFileSync('src/utils/pdfGenerator.ts', 'utf8');

// Fix DevoteeCard
pdfGen = pdfGen.replace(
  "  if (isCopy) {\n    doc.setTextColor(200, 200, 200);\n    doc.setFontSize(80);\n    doc.text('COPY', 105, 150, { align: 'center', angle: -45 });\n  }",
  ""
);

// Fix Bulk Tax Receipt
pdfGen = pdfGen.replace(
  "  if (devoteePan) {\n    doc.setFont('helvetica', 'normal');\n    doc.setTextColor(107, 114, 128);\n    doc.text('Donor PAN:', 130, 90);\n    doc.setTextColor(17, 24, 39);\n    doc.setFont('helvetica', 'bold');\n    doc.text(devoteePan, 155, 90);\n  }",
  ""
);

fs.writeFileSync('src/utils/pdfGenerator.ts', pdfGen);
