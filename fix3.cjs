const fs = require('fs');
let code = fs.readFileSync('src/components/domain3/PoojaBookingDesk.tsx', 'utf8');

code = code.replace(
`              <div className="pt-4 flex items-center justify-end gap-3 border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-semibold"
                >
                  Cancel
                </button>
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
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold"
                >
                  Confirm Booking
                </button>
              </div>`,
`              <div className="pt-4 flex items-center justify-end gap-3 border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold"
                >
                  Confirm Booking
                </button>
              </div>`
);

fs.writeFileSync('src/components/domain3/PoojaBookingDesk.tsx', code);
