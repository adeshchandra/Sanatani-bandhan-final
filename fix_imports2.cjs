const fs = require('fs');
let content = fs.readFileSync('src/context/DataContext.tsx', 'utf8');

// The previous script didn't apply correctly. Let's force the replacement.
content = content.replace(
    "import { doc, setDoc, deleteDoc, collection, onSnapshot, query, where, getDocs } from 'firebase/firestore';",
    "import { doc, setDoc, deleteDoc, collection, onSnapshot, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';"
);

fs.writeFileSync('src/context/DataContext.tsx', content);
