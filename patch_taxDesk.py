import re

filepath = 'src/components/domain2/TaxReceiptDesk.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# 1. Import generateBulkTaxReceiptsPDF
content = content.replace(
    "import { generateTaxReceiptPDF } from '../../utils/pdfGenerator';",
    "import { generateTaxReceiptPDF, generateBulkTaxReceiptsPDF } from '../../utils/pdfGenerator';"
)

# 2. Add state and bulk download handler
state_block = """  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTxIds, setSelectedTxIds] = useState<Set<string>>(new Set());"""

content = content.replace(
    "  const { showToast } = useToast();\n  const [searchTerm, setSearchTerm] = useState('');",
    state_block
)

# Bulk download handler
handlers_block = """  const handleDownload = async (tx: any) => {
    try {
      await generateTaxReceiptPDF(tx, activeWorkspace);
      showToast(`Section 80G Tax Exemption Certificate downloaded for ${tx.devoteeName || 'Devotee'}`, 'success');
    } catch (e: any) {
      showToast('Error generating certificate', 'error');
    }
  };

  const handleBulkDownload = async () => {
    const selectedTxs = eligibleTransactions.filter(tx => selectedTxIds.has(tx.id));
    if (selectedTxs.length === 0) return;
    
    try {
      await generateBulkTaxReceiptsPDF(selectedTxs, activeWorkspace);
      showToast(`Bulk Section 80G Certificates generated for ${selectedTxs.length} transactions`, 'success');
      setSelectedTxIds(new Set()); // Reset selection after download
    } catch (e: any) {
      showToast('Error generating bulk certificates', 'error');
    }
  };

  const toggleSelection = (id: string) => {
    const newSelection = new Set(selectedTxIds);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedTxIds(newSelection);
  };

  const toggleSelectAll = () => {
    if (selectedTxIds.size === eligibleTransactions.length) {
      setSelectedTxIds(new Set());
    } else {
      setSelectedTxIds(new Set(eligibleTransactions.map(tx => tx.id)));
    }
  };"""

content = content.replace(
    """  const handleDownload = async (tx: any) => {
    try {
      await generateTaxReceiptPDF(tx, activeWorkspace);
      showToast(`Section 80G Tax Exemption Certificate downloaded for ${tx.devoteeName || 'Devotee'}`, 'success');
    } catch (e: any) {
      showToast('Error generating certificate', 'error');
    }
  };""",
    handlers_block
)

# 3. Add UI elements for bulk selection
search_bar = """      {/* Search */}
      <div className="bg-stone-900/90 border border-stone-800 p-4 rounded-2xl flex items-center justify-between gap-4 flex-wrap">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search eligible donations by donor, TX ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-stone-800 border border-stone-700 rounded-xl pl-9 pr-3 py-2 text-xs text-stone-200 placeholder-stone-400 focus:outline-none focus:border-amber-500"
          />
        </div>
        
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-300 font-bold bg-stone-800 px-3 py-2 rounded-xl border border-stone-700 hover:bg-stone-750 transition-colors">
            <input 
              type="checkbox"
              className="w-4 h-4 rounded border-stone-600 bg-stone-900 text-amber-500 focus:ring-amber-500 focus:ring-offset-stone-900"
              checked={eligibleTransactions.length > 0 && selectedTxIds.size === eligibleTransactions.length}
              onChange={toggleSelectAll}
            />
            Select All
          </label>
          
          {selectedTxIds.size > 0 && (
            <button
              onClick={handleBulkDownload}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-emerald-600/20"
            >
              <Download className="w-4 h-4" />
              Download Selected ({selectedTxIds.size})
            </button>
          )}
        </div>
      </div>"""

content = re.sub(r'\{\/\* Search \*\/}.*?<\/div>      <\/div>', search_bar, content, flags=re.DOTALL)

# 4. Add checkbox inside the card
card_start = """          <div
            key={`${tx.id}-${idx}`}
            className={`bg-stone-900/90 border rounded-2xl p-5 shadow-lg flex flex-col justify-between space-y-4 transition-all ${
              selectedTxIds.has(tx.id) ? 'border-amber-500 shadow-amber-500/10 bg-stone-800/80' : 'border-stone-800'
            }`}
          >
            <div>
              <div className="flex items-start justify-between gap-2 pb-3 border-b border-stone-800">
                <div className="flex items-start gap-3">
                  <input 
                    type="checkbox"
                    className="mt-1 w-4 h-4 rounded border-stone-600 bg-stone-900 text-amber-500 focus:ring-amber-500 focus:ring-offset-stone-900 cursor-pointer"
                    checked={selectedTxIds.has(tx.id)}
                    onChange={() => toggleSelection(tx.id)}
                  />
                  <div>
                    <h3 className="font-extrabold text-sm text-stone-100">{tx.devoteeName || 'Donor'}</h3>
                    <p className="text-[11px] text-amber-400 font-mono">
                      Receipt #{tx.taxReceiptNumber || `SB-80G-${String(tx.id || '').slice(-4)}`}
                    </p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                  80G Certified
                </span>
              </div>"""

content = re.sub(
    r'<div\s+key={`\$\{tx\.id\}-\$\{idx\}`}\s+className="bg-stone-900/90 border border-stone-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between space-y-4"\s*>\s*<div>\s*<div className="flex items-start justify-between gap-2 pb-3 border-b border-stone-800">\s*<div>\s*<h3 className="font-extrabold text-sm text-stone-100">\{tx\.devoteeName \|\| \'Donor\'\}<\/h3>\s*<p className="text-\[11px\] text-amber-400 font-mono">\s*Receipt #\{tx\.taxReceiptNumber \|\| `SB-80G-\$\{String\(tx\.id \|\| \'\'\)\.slice\(-4\)\}`\}\s*<\/p>\s*<\/div>\s*<span className="px-2 py-0\.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-\[10px\] font-bold">\s*80G Certified\s*<\/span>\s*<\/div>',
    card_start,
    content
)

with open(filepath, 'w') as f:
    f.write(content)
