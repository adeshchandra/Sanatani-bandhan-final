import re

filepath = 'src/components/domain2/TreasuryLedgerDesk.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# 1. Rename showUtsavExpenseModal to showExpenseModal
content = content.replace("showUtsavExpenseModal", "showExpenseModal")
content = content.replace("setShowUtsavExpenseModal", "setShowExpenseModal")

# 2. Add the button in the header
header_buttons_orig = """          <button
            type="button"
            id="log-treasury-tx-btn"
            onClick={onOpenQuickPay}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-amber-600/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Record Transaction</span>
          </button>"""

header_buttons_new = """          <button
            type="button"
            id="log-treasury-tx-btn"
            onClick={onOpenQuickPay}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Log Income (Chanda)</span>
          </button>
          
          <button
            type="button"
            onClick={() => setShowExpenseModal(true)}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-rose-600/20 transition-all cursor-pointer"
          >
            <ArrowUpRight className="w-4 h-4" />
            <span>Log Expense</span>
          </button>"""

content = content.replace(header_buttons_orig, header_buttons_new)

# 3. Modify the modal text and fields
modal_orig = """                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Plus className="w-5 h-5 text-amber-500" />
                  Log Utsav/Event Expense
                </h3>
                <p className="text-xs text-stone-400 mt-1">Record a specific cost associated with a campaign or festival.</p>"""

modal_new = """                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <ArrowUpRight className="w-5 h-5 text-rose-500" />
                  Log Organization Expense
                </h3>
                <p className="text-xs text-stone-400 mt-1">Record a general operational cost or an event-specific expense.</p>"""

content = content.replace(modal_orig, modal_new)

# Make eventName not required
event_input_orig = """<input required name="eventName" type="text" placeholder="e.g., Durga Puja 2026" list="utsav-list" className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-sm text-stone-200 focus:border-amber-500 focus:outline-none" />"""
event_input_new = """<input name="eventName" type="text" placeholder="Optional: e.g., Durga Puja 2026" list="utsav-list" className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-sm text-stone-200 focus:border-rose-500 focus:outline-none" />"""
content = content.replace(event_input_orig, event_input_new)

event_label_orig = """<label className="block text-[11px] font-bold text-stone-400 uppercase mb-1.5">Event / Utsav Name</label>"""
event_label_new = """<label className="block text-[11px] font-bold text-stone-400 uppercase mb-1.5">Event / Utsav Name (Optional)</label>"""
content = content.replace(event_label_orig, event_label_new)

# Add more expense categories
category_orig = """                  <select required name="category" className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-sm text-stone-200 focus:border-amber-500 focus:outline-none">
                    <option value="Event Setup / Decor">Event Setup / Decor</option>
                    <option value="Catering / Prasad">Catering / Prasad</option>
                    <option value="Artist / Purohit Dakshina">Artist / Purohit Dakshina</option>
                    <option value="Marketing / Print">Marketing / Print</option>
                    <option value="Logistics / Travel">Logistics / Travel</option>
                    <option value="Misc Event Expense">Misc Event Expense</option>
                  </select>"""
                  
category_new = """                  <select required name="category" className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-sm text-stone-200 focus:border-rose-500 focus:outline-none">
                    <optgroup label="Operational">
                      <option value="Utilities & Maintenance">Utilities & Maintenance</option>
                      <option value="Staff / Sevadar Reimbursement">Staff / Sevadar Reimbursement</option>
                      <option value="Groceries & Mandir Supplies">Groceries & Mandir Supplies</option>
                      <option value="Logistics / Travel">Logistics / Travel</option>
                    </optgroup>
                    <optgroup label="Event Specific">
                      <option value="Event Setup / Decor">Event Setup / Decor</option>
                      <option value="Catering / Prasad">Catering / Prasad</option>
                      <option value="Artist / Purohit Dakshina">Artist / Purohit Dakshina</option>
                      <option value="Marketing / Print">Marketing / Print</option>
                      <option value="Misc Event Expense">Misc Event Expense</option>
                    </optgroup>
                  </select>"""
content = content.replace(category_orig, category_new)

submit_orig = """Log Utsav Expense"""
submit_new = """Log Expense"""
content = content.replace(submit_orig, submit_new)

with open(filepath, 'w') as f:
    f.write(content)
