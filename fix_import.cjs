const fs = require('fs');

let content = fs.readFileSync('src/firebase.ts', 'utf8');
content = content.replace(
  '} , enableMultiTabIndexedDbPersistence } from "firebase/firestore";',
  ', enableMultiTabIndexedDbPersistence } from "firebase/firestore";'
);
fs.writeFileSync('src/firebase.ts', content);

let libContent = fs.readFileSync('src/lib/firebase.ts', 'utf8');
libContent = libContent.replace(
  '} , enableMultiTabIndexedDbPersistence } from "firebase/firestore";',
  ', enableMultiTabIndexedDbPersistence } from "firebase/firestore";'
);
fs.writeFileSync('src/lib/firebase.ts', libContent);

