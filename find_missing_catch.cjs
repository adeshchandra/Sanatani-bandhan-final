const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/**/*.tsx').concat(glob.sync('src/**/*.ts'));
for (const file of files) {
  const code = fs.readFileSync(file, 'utf8');
  if (code.includes('onSnapshot(')) {
    // Basic heuristic: check if onSnapshot( has 3 arguments or 2
    // A bit hard to parse perfectly, but we can look for `(error) =>` or `(err) =>` inside the same file
    if (!code.includes('(error)') && !code.includes('(err)')) {
        console.log(`Missing error handler in ${file}?`);
    }
  }
}
