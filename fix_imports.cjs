const fs = require('fs');
let content = fs.readFileSync('src/context/DataContext.tsx', 'utf8');

// Remove the top line added by our script earlier
content = content.replace("import { collection, addDoc, serverTimestamp } from 'firebase/firestore';\n", "");

// Ensure addDoc and serverTimestamp are in the main import
if (!content.includes('addDoc') || !content.includes('serverTimestamp')) {
    content = content.replace(
        "import { doc, setDoc, deleteDoc, collection, onSnapshot, query, where, getDocs } from 'firebase/firestore';",
        "import { doc, setDoc, deleteDoc, collection, onSnapshot, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';"
    );
}

fs.writeFileSync('src/context/DataContext.tsx', content);
