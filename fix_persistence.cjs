const fs = require('fs');

function addPersistence(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (!content.includes('enableMultiTabIndexedDbPersistence')) {
    // Add import
    content = content.replace(
      /from ['"]firebase\/firestore['"];/,
      ', enableMultiTabIndexedDbPersistence } from "firebase/firestore";'
    );
    
    // Add initialization logic
    const dbExportMatch = content.match(/export const db =[^;]+;/);
    if (dbExportMatch) {
      const persistenceCode = `\n// Enable offline persistence\nenableMultiTabIndexedDbPersistence(db).catch((err) => {\n  if (err.code === 'failed-precondition') {\n    console.warn('Multiple tabs open, persistence can only be enabled in one tab at a a time.');\n  } else if (err.code === 'unimplemented') {\n    console.warn('The current browser does not support all of the features required to enable persistence');\n  }\n});\n`;
      content = content.replace(dbExportMatch[0], dbExportMatch[0] + persistenceCode);
      fs.writeFileSync(filePath, content);
    }
  }
}

addPersistence('src/lib/firebase.ts');
addPersistence('src/firebase.ts');
