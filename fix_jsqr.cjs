const fs = require('fs');
let code = fs.readFileSync('src/components/public/PortalLogin.tsx', 'utf8');

code = code.replace(
  `const code = jsQR(imageData.data, imageData.width, imageData.height);`,
  `const jsQRModule = await import('jsqr');\n                                const jsQR = jsQRModule.default || jsQRModule;\n                                const code = jsQR(imageData.data, imageData.width, imageData.height);`
);

code = code.replace(
  `reader.onload = (evt) => {`,
  `reader.onload = async (evt) => {`
);

fs.writeFileSync('src/components/public/PortalLogin.tsx', code);
