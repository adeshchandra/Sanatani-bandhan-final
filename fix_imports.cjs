const fs = require('fs');
let code = fs.readFileSync('src/components/public/PortalLogin.tsx', 'utf8');

code = code.replace(
  `import { auth, signInWithEmailAndPassword, sendPasswordResetEmail } from '../../firebase';`,
  `import { auth, googleProvider, signInWithPopup, signInWithEmailAndPassword, sendPasswordResetEmail } from '../../firebase';`
);

code = code.replace(
  `import { auth, googleProvider, signInWithPopup } from '../../firebase';`,
  ``
);

fs.writeFileSync('src/components/public/PortalLogin.tsx', code);
