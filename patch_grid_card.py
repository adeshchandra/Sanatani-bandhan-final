import re

with open('src/components/domain1/DevoteeGrid.tsx', 'r') as f:
    content = f.read()

target = """                {/* Card Header */}
                <div className="flex items-start justify-between gap-3 pb-3 border-b border-stone-800">
                  <div className="flex items-center gap-3">"""

replacement = """                {/* Card Header */}
                <div className="flex items-start justify-between gap-3 pb-3 border-b border-stone-800">
                  <div className="flex items-center gap-3">
                    <div className="pt-1 pr-1" onClick={(e) => e.stopPropagation()}>
                      <input 
                        type="checkbox" 
                        checked={selectedIds.has(devotee.id)} 
                        onChange={(e) => toggleSelection(devotee.id, e as any)}
                        className="w-4 h-4 rounded border-stone-700 bg-stone-900/50 text-amber-500 focus:ring-amber-500/50 cursor-pointer"
                      />
                    </div>"""

if target in content:
    content = content.replace(target, replacement)
    with open('src/components/domain1/DevoteeGrid.tsx', 'w') as f:
        f.write(content)
    print("Patched grid card successfully")
else:
    print("Target grid card not found")
