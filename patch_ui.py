import re

with open('src/components/domain1/DevoteeGrid.tsx', 'r') as f:
    content = f.read()

target = """      {/* Quick Filters */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mt-2 mb-2 scrollbar-hide">"""

replacement = """      {/* Floating Bulk Action Bar */}
      {selectedIds.size > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-stone-900 border border-amber-500/30 px-6 py-4 rounded-full shadow-2xl flex items-center gap-4 animate-in slide-in-from-bottom-10 fade-in duration-300">
          <div className="flex items-center gap-2 border-r border-stone-800 pr-4">
            <span className="flex items-center justify-center bg-amber-500 text-stone-950 font-bold w-6 h-6 rounded-full text-xs">
              {selectedIds.size}
            </span>
            <span className="text-sm font-semibold text-stone-200">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setSelectedIds(new Set())} className="px-3 py-1.5 text-xs text-stone-400 hover:text-stone-200 transition-colors">Clear</button>
            <button onClick={handleBulkWhatsApp} className="px-3 py-1.5 bg-green-500/20 hover:bg-green-500/30 text-green-400 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors">
              <MessageCircle className="w-3.5 h-3.5" /> Broadcast
            </button>
            <button onClick={handleBulkTag} className="px-3 py-1.5 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-400 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors">
              <Tag className="w-3.5 h-3.5" /> Update Tags
            </button>
          </div>
        </div>
      )}

      {/* Quick Filters */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mt-2 mb-2 scrollbar-hide">"""

if target in content:
    content = content.replace(target, replacement)
    with open('src/components/domain1/DevoteeGrid.tsx', 'w') as f:
        f.write(content)
    print("Patched UI successfully")
else:
    print("Target UI not found")
