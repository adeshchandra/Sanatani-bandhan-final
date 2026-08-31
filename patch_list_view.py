import re

with open('src/components/domain1/DevoteeGrid.tsx', 'r') as f:
    content = f.read()

target_th = """              <tr>
                <th className="px-4 py-3">Member</th>"""

replacement_th = """              <tr>
                <th className="px-4 py-3 w-8">
                  <input 
                    type="checkbox" 
                    onChange={selectAll}
                    checked={selectedIds.size === filteredDevotees.length && filteredDevotees.length > 0}
                    className="w-4 h-4 rounded border-stone-700 bg-stone-900/50 text-amber-500 focus:ring-amber-500/50 cursor-pointer"
                  />
                </th>
                <th className="px-4 py-3">Member</th>"""

target_td = """              {filteredDevotees.map((devotee, idx) => (
                <tr 
                  key={`${devotee.id}-${idx}`} 
                  onClick={() => openDetailModal(devotee)}
                  className="hover:bg-stone-800/40 transition-colors cursor-pointer"
                >
                  <td className="px-4 py-3">"""

replacement_td = """              {filteredDevotees.map((devotee, idx) => (
                <tr 
                  key={`${devotee.id}-${idx}`} 
                  onClick={() => openDetailModal(devotee)}
                  className="hover:bg-stone-800/40 transition-colors cursor-pointer"
                >
                  <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                    <input 
                      type="checkbox" 
                      checked={selectedIds.has(devotee.id)} 
                      onChange={(e) => toggleSelection(devotee.id, e as any)}
                      className="w-4 h-4 rounded border-stone-700 bg-stone-900/50 text-amber-500 focus:ring-amber-500/50 cursor-pointer"
                    />
                  </td>
                  <td className="px-4 py-3">"""

if target_th in content and target_td in content:
    content = content.replace(target_th, replacement_th).replace(target_td, replacement_td)
    with open('src/components/domain1/DevoteeGrid.tsx', 'w') as f:
        f.write(content)
    print("Patched list view successfully")
else:
    print("Target list view not found")
