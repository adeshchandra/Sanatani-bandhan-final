const fs = require('fs');
let code = fs.readFileSync('src/components/public/PortalLogin.tsx', 'utf8');

if (!code.includes('X,')) {
    code = code.replace("Upload, Camera, Flame", "Upload, Camera, Flame, X");
}

fs.writeFileSync('src/components/public/PortalLogin.tsx', code);
