const fs = require('fs');
let code = fs.readFileSync('src/main.tsx', 'utf8');

if (!code.includes("const originalConsoleError")) {
  code = `
const originalConsoleError = console.error;
console.error = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('two children with the same key')) {
    originalConsoleError(...args);
    console.trace('Duplicate key trace');
  } else {
    originalConsoleError(...args);
  }
};
` + code;
  fs.writeFileSync('src/main.tsx', code);
}
