import re

with open('src/components/domain1/DevoteeGrid.tsx', 'r') as f:
    content = f.read()

target = """                    <button
                      onClick={() => generateDonationHistoryPDF(selectedDevotee, selectedDevoteeDonations, activeWorkspace)}
                      className="px-3 py-1.5 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-400 text-xs font-bold rounded-lg border border-indigo-500/30 flex items-center gap-1.5 transition-colors"
                    >
                      <FileText className="w-4 h-4" /> Export PDF
                    </button>"""

replacement = """                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => generateAnnualDonationSummaryPDF(selectedDevotee, selectedDevoteeDonations, activeWorkspace)}
                        className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-bold rounded-lg border border-stone-700 flex items-center gap-1.5 transition-colors"
                      >
                        <Printer className="w-4 h-4" /> Print Summary
                      </button>
                      <button
                        onClick={() => generateDonationHistoryPDF(selectedDevotee, selectedDevoteeDonations, activeWorkspace)}
                        className="px-3 py-1.5 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-400 text-xs font-bold rounded-lg border border-indigo-500/30 flex items-center gap-1.5 transition-colors"
                      >
                        <FileText className="w-4 h-4" /> Export PDF
                      </button>
                    </div>"""

if target in content:
    content = content.replace(target, replacement)
    with open('src/components/domain1/DevoteeGrid.tsx', 'w') as f:
        f.write(content)
    print("Patched successfully")
else:
    print("Target not found")
