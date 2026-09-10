const fs = require('fs');
let code = fs.readFileSync('src/components/public/PortalLogin.tsx', 'utf8');

if (!code.includes("from 'motion/react'")) {
  code = "import { motion, AnimatePresence } from 'motion/react';\n" + code;
  fs.writeFileSync('src/components/public/PortalLogin.tsx', code);
}
