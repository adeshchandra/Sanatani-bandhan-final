const fs = require('fs');
let code = fs.readFileSync('src/components/domain3/PoojaBookingDesk.tsx', 'utf8');

const lines = code.split('\n');
const start = 394;
const end = 430;

const newLines = `
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-stone-800 text-stone-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
`;

code = [...lines.slice(0, start + 1), ...newLines.split('\n').filter(l => l !== ''), ...lines.slice(end + 1)].join('\n');
fs.writeFileSync('src/components/domain3/PoojaBookingDesk.tsx', code);
