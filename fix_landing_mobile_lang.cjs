const fs = require('fs');
let code = fs.readFileSync('src/components/public/LandingPage.tsx', 'utf8');

const mobileLangSwitcher = `            <div className="flex bg-slate-100 rounded-lg p-1 my-2">
              {(['en', 'hi', 'bn', 'sa'] as const).map(lang => (
                <button
                  key={lang}
                  onClick={() => { setLanguage(lang); setIsMobileMenuOpen(false); }}
                  className={\`flex-1 py-2 rounded-md text-xs font-bold uppercase transition-colors \${language === lang ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}\`}
                >
                  {lang}
                </button>
              ))}
            </div>`;

code = code.replace(
  `<div className="flex gap-4 pt-4 border-t border-slate-100">`,
  mobileLangSwitcher + `\n            <div className="flex gap-4 pt-4 border-t border-slate-100">`
);

fs.writeFileSync('src/components/public/LandingPage.tsx', code);
