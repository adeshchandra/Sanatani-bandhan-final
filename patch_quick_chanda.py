import re

filepath = 'src/components/common/QuickChandaModal.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# Add import
content = content.replace("import { UpsellModal } from './UpsellModal';", "import { UpsellModal } from './UpsellModal';\nimport { MemberSearchSelect } from './MemberSearchSelect';")

# Replace form element
orig_element = """              <div className="space-y-2">
                <select
                  value={selectedDevoteeId}
                  onChange={(e) => handleDevoteeSelect(e.target.value)}
                  className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                >
                  <option value="">-- Choose from Enrolled Members or Enter Below --</option>
                  {devotees.map((d, idx) => (
                    <option key={`${d.id}-${idx}`} value={d.id}>
                      {d.fullName} ({d.gotra} • {d.phone})
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Or enter donor name directly..."
                  required
                  value={devoteeName}
                  onChange={(e) => setDevoteeName(e.target.value)}
                  className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                />
              </div>"""

new_element = """              <MemberSearchSelect
                value={devoteeName}
                onChange={(name, id) => {
                  setDevoteeName(name);
                  setSelectedDevoteeId(id);
                }}
                placeholder="Search enrolled members or enter new name..."
              />"""

content = content.replace(orig_element, new_element)

with open(filepath, 'w') as f:
    f.write(content)
