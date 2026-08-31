import re

filepath = 'src/components/domain2/TreasuryLedgerDesk.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# Add import
content = content.replace("import { useToast } from '../../context/ToastContext';", "import { useToast } from '../../context/ToastContext';\nimport { MemberSearchSelect } from '../common/MemberSearchSelect';")

# replace vendor input
vendor_input_orig = """                <label className="block text-[11px] font-bold text-stone-400 uppercase mb-1.5">Vendor / Payee Name</label>
                <input required name="vendor" type="text" placeholder="Name of person or company paid" className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-sm text-stone-200 focus:border-amber-500 focus:outline-none" />"""

vendor_input_new = """                <label className="block text-[11px] font-bold text-stone-400 uppercase mb-1.5">Vendor / Payee Name (Search Devotee or enter new)</label>
                <MemberSearchSelect 
                  name="vendor"
                  value=""
                  onChange={() => {}}
                  placeholder="Name of person or company paid"
                />"""

content = content.replace(vendor_input_orig, vendor_input_new)

# Note: We need a piece of state if we want controlled component behavior, but since MemberSearchSelect manages its own `searchTerm` (using the initial `value`), if we pass `value=""`, it will initialize as empty and track internally. However, if we need it to be controlled... Wait, I used `useEffect` on `value` in MemberSearchSelect, which sets `searchTerm(value)`. If we pass `""` every render without state, it might reset!
# Let's check `MemberSearchSelect.tsx` `useEffect`.
with open(filepath, 'w') as f:
    f.write(content)
