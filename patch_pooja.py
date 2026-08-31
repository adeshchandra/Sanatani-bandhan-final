import re

filepath = 'src/components/domain3/PoojaBookingDesk.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# Add import
content = content.replace("import { useToast } from '../../context/ToastContext';", "import { useToast } from '../../context/ToastContext';\nimport { MemberSearchSelect } from '../common/MemberSearchSelect';")

# Replace dual inputs
orig_input = """              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Select Registered Devotee</label>
                  <select
                    value={devoteeId}
                    onChange={(e) => handleDevoteeSelect(e.target.value)}
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-200"
                  >
                    <option value="">-- Or enter name manually --</option>
                    {devotees.map((d, idx) => (
                      <option key={`${d.id}-${idx}`} value={d.id}>
                        {d.fullName} ({d.gotra})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Devotee Name *</label>
                  <input
                    type="text"
                    required
                    value={devoteeName}
                    onChange={(e) => setDevoteeName(e.target.value)}
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-200"
                  />
                </div>
              </div>"""

new_input = """              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="block text-stone-300 font-semibold mb-1">Devotee / Sponsor Name *</label>
                  <MemberSearchSelect
                    value={devoteeName}
                    onChange={(name, id) => {
                      setDevoteeName(name);
                      setDevoteeId(id);
                    }}
                    placeholder="Search enrolled devotees or type new name..."
                  />
                </div>
              </div>"""

content = content.replace(orig_input, new_input)

with open(filepath, 'w') as f:
    f.write(content)
