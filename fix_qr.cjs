const fs = require('fs');
let content = fs.readFileSync('src/components/devotee/DevoteePortal.tsx', 'utf8');

content = content.replace("import { QRCodeSVG } from 'qrcode.react';", "import QRCode from 'qrcode';");

// add state
content = content.replace(
  "  const [isQrOpen, setIsQrOpen] = useState(false);",
  "  const [isQrOpen, setIsQrOpen] = useState(false);\n  const [qrCodeDataUrl, setQrCodeDataUrl] = React.useState('');\n\n  React.useEffect(() => {\n    if (isQrOpen && uid) {\n      QRCode.toDataURL(`devotee:${uid}`, { width: 200, margin: 1, color: { dark: '#1c1917', light: '#ffffff' } }).then(setQrCodeDataUrl).catch(console.error);\n    }\n  }, [isQrOpen, uid]);"
);

// replace QRCodeSVG component
content = content.replace(
  /<QRCodeSVG[\s\S]*?\/>/,
  "{qrCodeDataUrl ? <img src={qrCodeDataUrl} alt=\"QR Pass\" className=\"w-48 h-48 mx-auto\" /> : <div className=\"w-48 h-48 bg-stone-100 animate-pulse rounded-xl mx-auto\"></div>}"
);

fs.writeFileSync('src/components/devotee/DevoteePortal.tsx', content);
