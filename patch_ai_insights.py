import re

filepath = 'src/components/domain6/PanchayatPollingDesk.tsx'
with open(filepath, 'r') as f:
    content = f.read()

insights_code = """
      {/* ✨ PANCHAYAT AI INSIGHTS (Integrated from Review) */}
      <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 p-4 sm:p-5 rounded-2xl shadow-xl flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="bg-indigo-500/20 text-indigo-400 p-3 rounded-xl shrink-0 self-start sm:self-auto">
          <BarChart3 size={24} />
        </div>
        <div>
          <h3 className="text-xs font-black text-indigo-300 uppercase tracking-widest mb-1">Panchayat AI Insight</h3>
          <p className="text-sm font-bold text-stone-300 leading-snug">
            Active resolutions currently have a <strong className="text-emerald-400">high quorum engagement</strong>. 
            The latest resolution reached consensus in record time.
          </p>
        </div>
      </div>
"""

# Find where to insert it - after the KPI Cards
kpi_end = "      {/* Controls */}"
content = content.replace(kpi_end, insights_code + "\n" + kpi_end)

import_lucide = "BarChart3"
if "BarChart3" not in content:
    content = content.replace("Users } from 'lucide-react';", "Users, BarChart3 } from 'lucide-react';")

with open(filepath, 'w') as f:
    f.write(content)
