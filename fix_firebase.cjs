const fs = require('fs');

// Fix src/lib/firebase.ts
const libFirebasePath = 'src/lib/firebase.ts';
if (fs.existsSync(libFirebasePath)) {
  let content = fs.readFileSync(libFirebasePath, 'utf8');
  content = content.replace(
    /initializeFirestore\(app, \{\}, dbId\)/g,
    'initializeFirestore(app, { experimentalForceLongPolling: true }, dbId)'
  );
  content = content.replace(
    /getFirestore\(app\)/g,
    'initializeFirestore(app, { experimentalForceLongPolling: true })'
  );
  fs.writeFileSync(libFirebasePath, content);
}

// Fix src/firebase.ts
const firebasePath = 'src/firebase.ts';
if (fs.existsSync(firebasePath)) {
  let content = fs.readFileSync(firebasePath, 'utf8');
  if (!content.includes('experimentalForceLongPolling: true')) {
    content = content.replace(
      /getFirestore\(app\)/g,
      'initializeFirestore(app, { experimentalForceLongPolling: true })'
    );
    fs.writeFileSync(firebasePath, content);
  }
}
