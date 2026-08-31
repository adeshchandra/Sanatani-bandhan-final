import re

filepath = 'src/components/domain2/TreasuryLedgerDesk.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# 1. Add expenseFilter state
state_injection = """  const [filterType, setFilterType] = useState<'all' | 'Income' | 'Expense'>('all');
  const [expenseFilter, setExpenseFilter] = useState<'all' | 'org' | 'personal'>('all');"""
content = content.replace("  const [filterType, setFilterType] = useState<'all' | 'Income' | 'Expense'>('all');", state_injection)

# 2. Update filtering logic
filter_logic_orig = """    const matchType = filterType === 'all' || tx.type === filterType;
    return matchSearch && matchType;"""
filter_logic_new = """    const matchType = filterType === 'all' || tx.type === filterType;
    
    let matchExpense = true;
    if (filterType === 'Expense' && expenseFilter !== 'all') {
      const isPersonal = tx.category.toLowerCase().includes('sevadar') || tx.category.toLowerCase().includes('reimbursement') || tx.category.toLowerCase().includes('personal') || !!tx.devoteeId;
      if (expenseFilter === 'org' && isPersonal) matchExpense = false;
      if (expenseFilter === 'personal' && !isPersonal) matchExpense = false;
    }
    
    return matchSearch && matchType && matchExpense;"""
content = content.replace(filter_logic_orig, filter_logic_new)

# 3. Add expense filter UI when filterType is Expense
ui_filter_orig = """        <div className="flex items-center gap-2">
          {(['all', 'Income', 'Expense'] as const).map((t, idx) => ("""
ui_filter_new = """        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
          {filterType === 'Expense' && (
            <div className="flex items-center gap-1 bg-stone-950 p-1 rounded-xl border border-stone-800">
              {(['all', 'org', 'personal'] as const).map(ef => (
                <button
                  key={ef}
                  onClick={() => setExpenseFilter(ef)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${
                    expenseFilter === ef ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {ef === 'all' ? 'All Expenses' : ef === 'org' ? 'Organization Ops' : 'Personal (Sevadar)'}
                </button>
              ))}
              <div className="w-px h-4 bg-stone-700 mx-1"></div>
            </div>
          )}
          <div className="flex items-center gap-2">
            {(['all', 'Income', 'Expense'] as const).map((t, idx) => ("""
content = content.replace(ui_filter_orig, ui_filter_new)

# Need to update the first map from `ui_filter_orig` to properly close the `div`?
# ui_filter_orig had `<div className="flex items-center gap-2">` which we replaced with the `flex flex-col ...` and added an inner `div`.
# We need to make sure the end tags match. Since we just inserted it before the `.map`, it shouldn't affect closing tags. Wait, no, we replaced `<div className="flex items-center gap-2">` with TWO divs (outer + inner `div` for the Expense toggle, then `<div className="flex items-center gap-2">`), so we have one extra open `div`!
# Let's write a safer replace.

content = content.replace(ui_filter_new, ui_filter_orig) # undo if already replaced

with open(filepath, 'w') as f:
    f.write(content)
