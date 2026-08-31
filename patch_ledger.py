import re

filepath = 'src/components/domain2/TreasuryLedgerDesk.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# Add a state for isRecurring to show/hide the interval select
content = content.replace(
    "const [showExpenseModal, setShowExpenseModal] = useState(false);",
    "const [showExpenseModal, setShowExpenseModal] = useState(false);\n  const [isRecurring, setIsRecurring] = useState(false);"
)

# Update form submit to include recurring fields
old_submit = """addTreasuryTransaction({
                date: new Date().toISOString(),
                type: 'Expense',
                category: fd.get('category') as string,
                amount: Number(fd.get('amount')),
                handledBy: 'Current Admin',
                vendorName: fd.get('vendor') as string,
                purpose: fd.get('purpose') as string,
                paymentMode: fd.get('paymentMode') as string,
                eventName: fd.get('eventName') as string,
                workspaceId: activeWorkspace.id,
                is80GEligible: false
              });"""

new_submit = """addTreasuryTransaction({
                date: new Date().toISOString(),
                type: 'Expense',
                category: fd.get('category') as string,
                amount: Number(fd.get('amount')),
                handledBy: 'Current Admin',
                vendorName: fd.get('vendor') as string,
                purpose: fd.get('purpose') as string,
                paymentMode: fd.get('paymentMode') as string,
                eventName: fd.get('eventName') as string,
                workspaceId: activeWorkspace.id,
                is80GEligible: false,
                isRecurring: isRecurring,
                recurringInterval: isRecurring ? (fd.get('recurringInterval') as 'Monthly' | 'Annually') : undefined
              });"""

content = content.replace(old_submit, new_submit)

# Reset isRecurring state when modal opens
content = content.replace(
    "onClick={() => setShowExpenseModal(true)}",
    "onClick={() => { setIsRecurring(false); setShowExpenseModal(true); }}"
)

# Add the recurring toggle and interval select fields
payment_mode_div = """              <div>
                <label className="block text-[11px] font-bold text-stone-400 uppercase mb-1.5">Payment Mode</label>
                <select required name="paymentMode" className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-sm text-stone-200 focus:border-amber-500 focus:outline-none">
                  <option value="Bank Transfer (NEFT/RTGS)">Bank Transfer (NEFT/RTGS)</option>
                  <option value="UPI">UPI</option>
                  <option value="Cash">Cash</option>
                  <option value="Cheque">Cheque</option>
                </select>
              </div>"""

recurring_fields = """              <div>
                <label className="block text-[11px] font-bold text-stone-400 uppercase mb-1.5">Payment Mode</label>
                <select required name="paymentMode" className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-sm text-stone-200 focus:border-amber-500 focus:outline-none">
                  <option value="Bank Transfer (NEFT/RTGS)">Bank Transfer (NEFT/RTGS)</option>
                  <option value="UPI">UPI</option>
                  <option value="Cash">Cash</option>
                  <option value="Cheque">Cheque</option>
                </select>
              </div>
              
              <div className="bg-stone-950/50 border border-stone-800 p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-stone-700 bg-stone-900 text-rose-500 focus:ring-rose-500 focus:ring-offset-stone-900"
                      checked={isRecurring}
                      onChange={(e) => setIsRecurring(e.target.checked)}
                    />
                    <span className="text-[12px] font-bold text-stone-200">Recurring Transaction</span>
                  </label>
                  <p className="text-[10px] text-stone-400 mt-1 pl-6">Schedule automatic utility or operational cost entries.</p>
                </div>
                
                {isRecurring && (
                  <div className="w-full sm:w-auto">
                    <select name="recurringInterval" className="w-full sm:w-40 bg-stone-900 border border-stone-700 rounded-lg px-3 py-1.5 text-xs text-stone-200 focus:border-rose-500 focus:outline-none">
                      <option value="Monthly">Monthly</option>
                      <option value="Annually">Annually</option>
                    </select>
                  </div>
                )}
              </div>"""

content = content.replace(payment_mode_div, recurring_fields)

# Add visual indicator in table
type_category_td = """                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${tx.type === 'Income' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'}`}>
                      {tx.type}
                    </span>
                    <p className="font-semibold text-stone-200 text-sm mt-1">{tx.category}</p>
                    {tx.subcategory && <p className="text-[10px] text-stone-400">{tx.subcategory}</p>}
                  </td>"""

type_category_td_new = """                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${tx.type === 'Income' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'}`}>
                        {tx.type}
                      </span>
                      {tx.isRecurring && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500/10 text-amber-500 border border-amber-500/20">
                          {tx.recurringInterval || 'Recurring'}
                        </span>
                      )}
                    </div>
                    <p className="font-semibold text-stone-200 text-sm mt-1">{tx.category}</p>
                    {tx.subcategory && <p className="text-[10px] text-stone-400">{tx.subcategory}</p>}
                  </td>"""

content = content.replace(type_category_td, type_category_td_new)

with open(filepath, 'w') as f:
    f.write(content)

