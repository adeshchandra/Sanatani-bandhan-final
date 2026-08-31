import re

with open('src/components/domain1/DevoteeGrid.tsx', 'r') as f:
    content = f.read()

target = """          <div className="flex items-center gap-1.5 shrink-0 ml-2 border-l border-stone-700 pl-3">
            <button"""

replacement = """          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-stone-400 font-medium">Min Chanda:</span>
            <select
              value={advancedFilters.minDonation}
              onChange={(e) => setAdvancedFilters(prev => ({ ...prev, minDonation: Number(e.target.value) }))}
              className="bg-stone-800 border border-stone-700 rounded-xl px-2.5 py-1.5 text-xs text-stone-200 focus:outline-none"
            >
              <option value={0}>Any</option>
              <option value={1000}>₹1,000+</option>
              <option value={10000}>₹10,000+</option>
              <option value={100000}>₹1,00,000+</option>
            </select>
          </div>
          <div className="flex items-center gap-1.5 shrink-0 ml-2 border-l border-stone-700 pl-3">
            <button"""

if target in content:
    content = content.replace(target, replacement)
    with open('src/components/domain1/DevoteeGrid.tsx', 'w') as f:
        f.write(content)
    print("Patched advanced filter successfully")
else:
    print("Target adv filter not found")
