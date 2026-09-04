import re

filepath = 'src/components/domain6/PanchayatPollingDesk.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# Add Quorum Met visualizer
old_progress = """                {/* Progress Bar for Votes */}"""

new_progress = """                {/* Progress Bar for Votes */}
                {res.quorumMet && (
                  <div className="mb-2 inline-flex items-center gap-1 bg-indigo-500/10 text-indigo-400 text-[9px] font-black uppercase px-2 py-1 rounded-md border border-indigo-500/20">
                    <CheckCircle2 className="w-3 h-3" /> Quorum Met
                  </div>
                )}"""

content = content.replace(old_progress, new_progress + "\n" + old_progress)

with open(filepath, 'w') as f:
    f.write(content)
