import re

with open('src/components/domain1/DevoteeGrid.tsx', 'r') as f:
    content = f.read()

target = """            <div className="flex border-b border-stone-800 bg-stone-900/50 px-6">
              <button
                onClick={() => setDetailTab('profile')}
                className={`py-3 px-4 text-sm font-semibold border-b-2 transition-colors ${detailTab === 'profile' ? 'border-amber-500 text-amber-500' : 'border-transparent text-stone-400 hover:text-stone-300'}`}
              >
                Profile Information
              </button>
              {canViewFinancials && (
                <button
                  onClick={() => setDetailTab('donations')}
                  className={`py-3 px-4 text-sm font-semibold border-b-2 transition-colors ${detailTab === 'donations' ? 'border-amber-500 text-amber-500' : 'border-transparent text-stone-400 hover:text-stone-300'}`}
                >
                  Donation History
                </button>
              )}
            </div>"""

replacement = """            <div className="flex border-b border-stone-800 bg-stone-900/50 px-6 overflow-x-auto scrollbar-hide">
              <button
                onClick={() => setDetailTab('profile' as any)}
                className={`py-3 px-4 whitespace-nowrap text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${detailTab === 'profile' ? 'border-amber-500 text-amber-500' : 'border-transparent text-stone-400 hover:text-stone-300'}`}
              >
                <UserCog className="w-4 h-4" /> Profile Info
              </button>
              {canViewFinancials && (
                <button
                  onClick={() => setDetailTab('donations' as any)}
                  className={`py-3 px-4 whitespace-nowrap text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${detailTab === 'donations' ? 'border-amber-500 text-amber-500' : 'border-transparent text-stone-400 hover:text-stone-300'}`}
                >
                  <Receipt className="w-4 h-4" /> Ledger
                </button>
              )}
              <button
                onClick={() => setDetailTab('timeline' as any)}
                className={`py-3 px-4 whitespace-nowrap text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${detailTab === 'timeline' ? 'border-amber-500 text-amber-500' : 'border-transparent text-stone-400 hover:text-stone-300'}`}
              >
                <Activity className="w-4 h-4" /> Engagement Timeline
              </button>
            </div>"""

if target in content:
    content = content.replace(target, replacement)
    with open('src/components/domain1/DevoteeGrid.tsx', 'w') as f:
        f.write(content)
    print("Patched tabs successfully")
else:
    print("Target tabs not found")
