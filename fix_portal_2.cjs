const fs = require('fs');
let content = fs.readFileSync('src/components/devotee/DevoteePortal.tsx', 'utf8');

// fix uid order
content = content.replace(
  "  const [isQrOpen, setIsQrOpen] = useState(false);\n  const [qrCodeDataUrl, setQrCodeDataUrl] = React.useState('');\n\n  React.useEffect(() => {\n    if (isQrOpen && uid) {\n      QRCode.toDataURL(`devotee:${uid}`, { width: 200, margin: 1, color: { dark: '#1c1917', light: '#ffffff' } }).then(setQrCodeDataUrl).catch(console.error);\n    }\n  }, [isQrOpen, uid]);\n\n  const uid = currentUser?.id || currentDevotee?.id || '';",
  "  const [isQrOpen, setIsQrOpen] = useState(false);\n  const [qrCodeDataUrl, setQrCodeDataUrl] = React.useState('');\n\n  const uid = currentUser?.id || currentDevotee?.id || '';\n\n  React.useEffect(() => {\n    if (isQrOpen && uid) {\n      QRCode.toDataURL(`devotee:${uid}`, { width: 200, margin: 1, color: { dark: '#1c1917', light: '#ffffff' } }).then(setQrCodeDataUrl).catch(console.error);\n    }\n  }, [isQrOpen, uid]);"
);

// fix PDF function args
content = content.replace(
  "generateAnnualDonationSummaryPDF(activeWorkspace!, currentDevotee as any || { fullName: currentUser?.name }, donations);",
  "generateAnnualDonationSummaryPDF(currentDevotee as any || { fullName: currentUser?.name }, donations, activeWorkspace!);"
);

fs.writeFileSync('src/components/devotee/DevoteePortal.tsx', content);
