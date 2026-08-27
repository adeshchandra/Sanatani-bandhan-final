const fs = require('fs');
let code = fs.readFileSync('src/components/domain3/PoojaBookingDesk.tsx', 'utf8');

code = code.replace(
`              <h3 className="font-bold text-sm">Schedule Sacred Pooja / Sankalp</h3>
              <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            type="button"
            onClick={() => setIsScannerOpen(true)}
            className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 font-bold text-xs flex items-center gap-1.5 shadow-lg transition-all cursor-pointer w-full sm:w-auto"
          >
            <Scan className="w-4 h-4 text-amber-500" />
            <span>Scan Pass</span>
          </button>
          <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-stone-400 hover:text-stone-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>`,
`              <h3 className="font-bold text-sm">Schedule Sacred Pooja / Sankalp</h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-stone-400 hover:text-stone-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>`
);

fs.writeFileSync('src/components/domain3/PoojaBookingDesk.tsx', code);
