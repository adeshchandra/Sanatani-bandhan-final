const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/components/**/*.tsx');
let changedFiles = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  // Regex to match anything like `foo.toLowerCase()` and replace with `foo?.toLowerCase()`
  // Be careful with method chains or simple strings, but `?.` is mostly safe on strings or undefined.
  content = content.replace(/([a-zA-Z0-9_\]]+)\.toLowerCase\(\)/g, '$1?.toLowerCase()');
  
  if (content !== original) {
    fs.writeFileSync(file, content);
    changedFiles++;
    console.log(`Updated ${file}`);
  }
});

console.log(`Changed ${changedFiles} files`);
