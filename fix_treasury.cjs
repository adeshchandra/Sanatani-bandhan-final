const fs = require('fs');

const ctxPath = 'src/context/DataContext.tsx';
let ctxContent = fs.readFileSync(ctxPath, 'utf8');

// Ensure db, collection, addDoc, serverTimestamp are imported.
if (!ctxContent.includes("import { db }")) {
  ctxContent = "import { db } from '../lib/firebase';\n" + ctxContent;
}
if (!ctxContent.includes("addDoc") && !ctxContent.includes("import { collection, addDoc")) {
  ctxContent = "import { collection, addDoc, serverTimestamp } from 'firebase/firestore';\n" + ctxContent;
} else if (ctxContent.includes("import { doc, setDoc")) {
    ctxContent = ctxContent.replace("import { doc, setDoc", "import { doc, setDoc, addDoc, serverTimestamp");
}

// Replace addTreasuryTransaction implementation to include Firebase logic
const regex = /const addTreasuryTransaction = \(tx: Omit<TreasuryTransaction, 'id' \| 'auditVerified'>\): boolean => \{([\s\S]*?)setAllTreasury\(\(prev\) => \[newTx, \.\.\.prev\]\);/;

const replacement = `const addTreasuryTransaction = (tx: Omit<TreasuryTransaction, 'id' | 'auditVerified'>): boolean => {
    if (!checkAndIncrementModuleQuota('treasury')) return false;
    const id = \`tx-\${Date.now()}\`;
    const now = Date.now();
    const newTx: any = {
      ...tx,
      id,
      workspaceId: tx.workspaceId || activeWorkspace.id,
      auditVerified: true,
      taxReceiptNumber: tx.is80GEligible ? \`SB-80G-\${new Date().getFullYear()}-\${id.slice(-4)}\` : undefined,
      _createdAt: now,
      _expiresAt: now + AUTO_PURGE_TTL_MS,
    };
    
    // Optimistic UI Update
    setAllTreasury((prev) => [newTx, ...prev]);
    
    // Firestore DB Write
    try {
      addDoc(collection(db, 'treasury'), {
        ...newTx,
        timestamp: serverTimestamp()
      }).catch(err => console.error("Firebase Treasury Write Error:", err));
    } catch(e) {
      console.error(e);
    }`;

if (ctxContent.match(regex)) {
    ctxContent = ctxContent.replace(regex, replacement);
    fs.writeFileSync(ctxPath, ctxContent);
    console.log("Updated DataContext.tsx with Firebase write for Treasury.");
} else {
    console.log("Could not match DataContext regex");
}
