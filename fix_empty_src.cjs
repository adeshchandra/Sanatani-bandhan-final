const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/**/*.tsx');

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // Pattern 1: src={someVariable}
  content = content.replace(/src={([a-zA-Z0-9_.\?]+)}/g, (match, p1) => {
    // If it's already got an OR condition, skip or handle carefully.
    if (p1.includes('||')) return match;
    // Don't modify if it's already checking
    if (content.includes(`src={${p1} || undefined}`)) return match;
    return `src={${p1} || undefined}`;
  });

  // Pattern 2: src={someVariable || otherVariable}
  content = content.replace(/src={([a-zA-Z0-9_.\?]+)\s*\|\|\s*([a-zA-Z0-9_.\?]+)}/g, (match, p1, p2) => {
    if (p2 === "undefined") return match;
    if (p2 === "'/logo.svg'" || p2 === '"/logo.svg"') return match;
    if (p2 === "'https://images.unsplash.com/photo-1599839619722-39751411ea63?w=800&q=80'") return match;
    return `src={${p1} || ${p2} || undefined}`;
  });

  if (content !== originalContent) {
    console.log('Fixed:', file);
    fs.writeFileSync(file, content);
  }
}
