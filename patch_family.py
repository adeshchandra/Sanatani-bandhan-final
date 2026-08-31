import re

filepath = 'src/components/domain1/FamilyHouseholdDesk.tsx'
with open(filepath, 'r') as f:
    content = f.read()

content = content.replace("import { useToast } from '../../context/ToastContext';", "import { useToast } from '../../context/ToastContext';\nimport { MemberSearchSelect } from '../common/MemberSearchSelect';")

orig_input = """              <div>
                <label className="block text-stone-300 font-semibold mb-1">Select Karta (Head of Family) *</label>
                <select
                  required
                  value={kartaDevoteeId}
                  onChange={(e) => handleKartaChange(e.target.value)}
                  className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-200"
                >
                  <option value="">-- Choose Member --</option>
                  {devotees.map((d, idx) => (
                    <option key={`${d.id}-${idx}`} value={d.id}>
                      {d.fullName} ({d.gotra} • {d.phone})
                    </option>
                  ))}
                </select>
              </div>"""

new_input = """              <div>
                <label className="block text-stone-300 font-semibold mb-1">Select Karta (Head of Family) *</label>
                <MemberSearchSelect
                  value=""
                  onChange={(name, id) => handleKartaChange(id)}
                  placeholder="Search and select existing enrolled member..."
                  allowFreeText={false}
                />
              </div>"""

content = content.replace(orig_input, new_input)

with open(filepath, 'w') as f:
    f.write(content)
