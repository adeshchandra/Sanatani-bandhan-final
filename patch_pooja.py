import re

filepath = 'src/components/domain3/PoojaBookingDesk.tsx'
with open(filepath, 'r') as f:
    content = f.read()

target = """                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    pooja.status === 'Completed'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : pooja.status === 'In-Progress'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse'
                      : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                  }`}
                >
                  {pooja.status}
                </span>"""

replacement = """                <span
                  className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-sm ${
                    pooja.status === 'Completed'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/50'
                      : pooja.status === 'Confirmed'
                      ? 'bg-blue-950 text-blue-400 border border-blue-800/50'
                      : pooja.status === 'In-Progress'
                      ? 'bg-amber-950 text-amber-400 border border-amber-800/50 animate-pulse'
                      : 'bg-stone-800 text-stone-400 border border-stone-700'
                  }`}
                >
                  {pooja.status || 'Pending'}
                </span>"""

content = content.replace(target, replacement)
with open(filepath, 'w') as f:
    f.write(content)
