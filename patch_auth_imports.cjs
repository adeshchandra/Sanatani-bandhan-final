const fs = require('fs');
const file = 'src/context/AuthWorkspaceContext.tsx';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
  'import { doc, getDoc, setDoc } from "firebase/firestore";',
  'import { doc, getDoc, setDoc } from "firebase/firestore";'
);

// Actually, wait, let me check if `setDoc` is actually imported.
