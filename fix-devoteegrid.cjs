const fs = require('fs');

let content = fs.readFileSync('src/components/domain1/DevoteeGrid.tsx', 'utf8');

const targetPhoneInput = `<input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                  />`;
const replacementPhoneInput = `<input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={!!editingDevotee}
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    title={editingDevotee ? "Phone is locked to maintain login integrity" : ""}
                  />`;

const targetEmailInput = `<input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none"
                  />`;
const replacementEmailInput = `<input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={!!editingDevotee}
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                    title={editingDevotee ? "Email is locked to maintain login integrity" : ""}
                  />`;

content = content.replace(targetPhoneInput, replacementPhoneInput);
content = content.replace(targetEmailInput, replacementEmailInput);

fs.writeFileSync('src/components/domain1/DevoteeGrid.tsx', content);
