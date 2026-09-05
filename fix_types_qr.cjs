const fs = require('fs');
let content = fs.readFileSync('src/types.ts', 'utf8');

if (!content.includes('isQrPublic?: boolean;')) {
  content = content.replace(
    "qrSecretVaultToken?: string; // Encrypted user secret vault token",
    "qrSecretVaultToken?: string;\n  isQrPublic?: boolean;"
  );
  fs.writeFileSync('src/types.ts', content);
}
