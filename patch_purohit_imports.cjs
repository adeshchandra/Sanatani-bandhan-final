const fs = require('fs');
let content = fs.readFileSync('src/components/domain3/PurohitMarketDesk.tsx', 'utf8');

content = content.replace(
  "import { doc, collection, onSnapshot, writeBatch, setDoc, addDoc } from 'firebase/firestore';",
  "import { doc, collection, onSnapshot, writeBatch, setDoc, addDoc, query, where, orderBy, limit } from 'firebase/firestore';"
);

fs.writeFileSync('src/components/domain3/PurohitMarketDesk.tsx', content);
