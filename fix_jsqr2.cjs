const fs = require('fs');
let code = fs.readFileSync('src/components/public/PortalLogin.tsx', 'utf8');

code = code.replace(
  `img.onload = () => {`,
  `img.onload = async () => {`
);

code = code.replace(
  `const jsQR = jsQRModule.default || jsQRModule;`,
  `const jsQR = (jsQRModule.default || jsQRModule) as any;`
);

fs.writeFileSync('src/components/public/PortalLogin.tsx', code);
