const fs = require('fs');
const path = require('path');

const walk = (dir, done) => {
  let results = [];
  fs.readdir(dir, (err, list) => {
    if (err) return done(err);
    let pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(file => {
      file = path.resolve(dir, file);
      fs.stat(file, (err, stat) => {
        if (stat && stat.isDirectory()) {
          walk(file, (err, res) => {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });
  });
};

const replacements = [
  { regex: /'Mandir'/g, repl: "'MANDIR'" },
  { regex: /'Goshala'/g, repl: "'GOSHALA'" },
  { regex: /'Sangha'/g, repl: "'SANGHA'" },
  { regex: /'Ashram'/g, repl: "'ASHRAM'" },
  { regex: /'Gurukul'/g, repl: "'GURUKUL'" },
  { regex: /'Satsang'/g, repl: "'SATSANG'" },
  { regex: /'Yoga'/g, repl: "'YOGA_CENTER'" },
  { regex: /'Trust'/g, repl: "'TRUST'" },
  { regex: /'Vidyalaya'/g, repl: "'VIDYALAYA'" },
  { regex: /'PurohitSabha'/g, repl: "'PUROHIT_SABHA'" },
  // Need to be careful with 'Purohit' because it could be UserRole or WorkspaceType. UserRole is 'purohit' or 'PUROHIT'. WorkspaceType 'Purohit' -> 'PUROHIT_SABHA'? The user might just use 'PUROHIT' for UserRole. Let's see if there is 'Purohit' in WorkspaceType.
  { regex: /'Tirth'/g, repl: "'TIRTH'" },
  { regex: /'Samaj'/g, repl: "'SAMAJ'" },
  { regex: /'AkshayaPatra'/g, repl: "'ANNADAN_TRUST'" },
  { regex: /'DharmadaTrust'/g, repl: "'ANNADAN_TRUST'" },
  { regex: /'MahotsavSamiti'/g, repl: "'MAHOTSAV_SAMITI'" },
  { regex: /'KashiKshetra'/g, repl: "'KASHI_KSHETRA'" },
  // Roles
  { regex: /'superadmin'/g, repl: "'SUPER_ADMIN'" },
  { regex: /'trustee'/g, repl: "'TRUSTEE'" },
  { regex: /'accountant'/g, repl: "'ACCOUNTANT'" },
  { regex: /'purohit'/g, repl: "'PUROHIT'" },
  { regex: /'volunteer'/g, repl: "'VOLUNTEER'" },
  { regex: /'devotee'/g, repl: "'DEVOTEE'" },
  { regex: /'manager'/g, repl: "'MANAGER'" },
  { regex: /'head_admin'/g, repl: "'SUPER_ADMIN'" },
  { regex: /'master_admin'/g, repl: "'SUPER_ADMIN'" },
  { regex: /'anonymous'/g, repl: "'ANONYMOUS'" },
  { regex: /'admin'/g, repl: "'MANAGER'" }, 
  { regex: /'ADMIN'/g, repl: "'MANAGER'" },
];

walk('src', (err, results) => {
  if (err) throw err;
  results.forEach(file => {
    if (!file.endsWith('.ts') && !file.endsWith('.tsx')) return;
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    replacements.forEach(r => {
      content = content.replace(r.regex, r.repl);
    });
    if (content !== original) {
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Updated ${file}`);
    }
  });
});
