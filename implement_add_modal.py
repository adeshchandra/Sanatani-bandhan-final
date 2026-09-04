import re

filepath = 'src/components/domain6/PanchayatPollingDesk.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# Make the plus button open the modal
if "onClick={() => setIsAddModalOpen(true)}" not in content:
    print("Warning: Add Modal opener not found")


# Update the add resolution modal styling to match the new Audit Modal design
old_modal_start = """      {/* Add Resolution Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md">
          <div className="bg-stone-900 border border-stone-700 rounded-2xl max-w-lg w-full p-6 text-stone-100 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800 mb-4">
              <h3 className="font-bold text-sm">Propose New Resolution</h3>"""

new_modal_start = """      {/* Add Resolution Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md">
          <div className="bg-stone-900 border border-stone-700 rounded-2xl max-w-lg w-full p-6 text-stone-100 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800 mb-4">
              <h3 className="text-lg font-black text-stone-100 flex items-center gap-2">
                 <Vote className="text-indigo-500 w-5 h-5"/> Propose New Resolution
              </h3>"""

content = content.replace(old_modal_start, new_modal_start)


with open(filepath, 'w') as f:
    f.write(content)
