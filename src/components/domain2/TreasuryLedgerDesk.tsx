import React, { useState } from 'react';
import {
  Landmark,
  Plus,
  Search,
  Filter,
  Download,
  Receipt,
  FileSpreadsheet,
  ArrowDownLeft,
  ArrowUpRight,
  ShieldCheck,
  Image as ImageIcon,
  X,
  CheckCircle2,
} from 'lucide-react';
import { useAuthWorkspace } from '../../context/AuthWorkspaceContext';
import { useData } from '../../context/DataContext';
import { TreasuryTransaction } from '../../types';
import { generateTaxReceiptPDF, generateTreasuryLedgerPDF } from '../../utils/pdfGenerator';
import { printThermalReceipt } from '../../utils/printUtils';
import { exportToCSV } from '../../utils/csvEngine';
import { useToast } from '../../context/ToastContext';
import { MemberSearchSelect } from '../common/MemberSearchSelect';

interface TreasuryLedgerDeskProps {
  onOpenQuickPay: () => void;
}

export const TreasuryLedgerDesk: React.FC<TreasuryLedgerDeskProps> = ({ onOpenQuickPay }) => {
  const { activeWorkspace } = useAuthWorkspace();
  const { treasury, addTreasuryTransaction } = useData();
  const { showToast } = useToast();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'Income' | 'Expense'>('all');
  const [expenseFilter, setExpenseFilter] = useState<'all' | 'org' | 'personal'>('all');
  const [utsavFilter, setUtsavFilter] = useState<string>('all');
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [isRecurring, setIsRecurring] = useState(false);
  const [selectedMemoUrl, setSelectedMemoUrl] = useState<string | null>(null);

  const availableUtsavs = Array.from(new Set(treasury.filter(t => t.eventName).map(t => t.eventName!)));

  // Financial Metrics
  const totalIncome = treasury
    .filter((t) => t.type === 'Income')
    .reduce((a, b) => a + b.amount, 0);

  const totalExpense = treasury
    .filter((t) => t.type === 'Expense')
    .reduce((a, b) => a + b.amount, 0);

  const netBalance = totalIncome - totalExpense;

  const filteredTreasury = treasury.filter((tx) => {
    const matchSearch =
      tx.category?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      (tx.devoteeName && tx.devoteeName?.toLowerCase().includes(searchTerm?.toLowerCase())) ||
      tx.handledBy?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      tx.purpose?.toLowerCase().includes(searchTerm?.toLowerCase());

    const matchType = filterType === 'all' || tx.type === filterType;
    
    let matchExpense = true;
    if (filterType === 'Expense' && expenseFilter !== 'all') {
      const isPersonal = (tx.category || '').toLowerCase().includes('sevadar') || (tx.category || '').toLowerCase().includes('reimbursement') || (tx.category || '').toLowerCase().includes('personal') || !!tx.devoteeId;
      if (expenseFilter === 'org' && isPersonal) matchExpense = false;
      if (expenseFilter === 'personal' && !isPersonal) matchExpense = false;
    }
    
    return matchSearch && matchType && matchExpense;
  });

  const handlePrintReceipt = async (tx: TreasuryTransaction) => {
    try {
      await generateTaxReceiptPDF(tx, activeWorkspace);
      showToast(`Section 80G Tax Receipt generated for ${tx.devoteeName || 'Devotee'}`, 'success');
    } catch (err: any) {
      showToast('Error generating Tax Receipt PDF', 'error');
    }
  };

  const handleExportPDF = async () => {
    try {
      await generateTreasuryLedgerPDF(filteredTreasury, activeWorkspace, `Treasury & Expense Ledger (${filterType} View)`);
      showToast('Ledger PDF generated successfully!', 'success');
    } catch (err: any) {
      showToast('Error generating Ledger PDF', 'error');
    }
  };

  const handleExportCSV = () => {
    const headers = ['TX ID', 'Date', 'Type', 'Category', 'Amount', 'Donor / Payee', 'Payment Mode', 'Custody Handled By', 'Purpose', '80G Eligible'];
    const rows = filteredTreasury.map((t, idx) => [
      t.id,
      t.date,
      t.type,
      t.category,
      t.amount.toString(),
      t.devoteeName || t.vendorName || '',
      t.paymentMode,
      t.handledBy,
      t.purpose || '',
      t.is80GEligible ? 'YES' : 'NO',
    ]);
    exportToCSV(`Treasury_Ledger_${activeWorkspace.type}_${new Date().toISOString().slice(0, 10)}.csv`, headers, rows);
    showToast('Double-Entry Ledger CSV exported!', 'success');
  };

  const handleExportTally = () => {
    let xml = `<ENVELOPE>
  <HEADER>
    <TALLYREQUEST>Import Data</TALLYREQUEST>
  </HEADER>
  <BODY>
    <IMPORTDATA>
      <REQUESTDESC>
        <REPORTNAME>Vouchers</REPORTNAME>
      </REQUESTDESC>
      <REQUESTDATA>
`;
    
    filteredTreasury.forEach(tx => {
      xml += `        <TALLYMESSAGE xmlns:UDF="TallyUDF">
          <VOUCHER>
            <DATE>${tx.date.split('T')[0].replace(/-/g, '')}</DATE>
            <VOUCHERTYPENAME>${tx.type === 'Income' ? 'Receipt' : 'Payment'}</VOUCHERTYPENAME>
            <NARRATION>${tx.purpose.replace(/&/g, '&amp;')} - ${tx.devoteeName ? tx.devoteeName.replace(/&/g, '&amp;') : 'Walk-in'}</NARRATION>
            <ALLLEDGERENTRIES.LIST>
              <LEDGERNAME>${tx.type === 'Income' ? 'Cash/Bank' : tx.category.replace(/&/g, '&amp;')}</LEDGERNAME>
              <ISDEEMEDPOSITIVE>${tx.type === 'Income' ? 'Yes' : 'No'}</ISDEEMEDPOSITIVE>
              <AMOUNT>${tx.type === 'Income' ? `-${tx.amount}` : tx.amount}</AMOUNT>
            </ALLLEDGERENTRIES.LIST>
            <ALLLEDGERENTRIES.LIST>
              <LEDGERNAME>${tx.type === 'Income' ? tx.category.replace(/&/g, '&amp;') : 'Cash/Bank'}</LEDGERNAME>
              <ISDEEMEDPOSITIVE>${tx.type === 'Income' ? 'No' : 'Yes'}</ISDEEMEDPOSITIVE>
              <AMOUNT>${tx.type === 'Income' ? tx.amount : `-${tx.amount}`}</AMOUNT>
            </ALLLEDGERENTRIES.LIST>
          </VOUCHER>
        </TALLYMESSAGE>\n`;
    });
    
    xml += `      </REQUESTDATA>
    </IMPORTDATA>
  </BODY>
</ENVELOPE>`;

    const blob = new Blob([xml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Tally_Export_${activeWorkspace.type}_${new Date().toISOString().slice(0, 10)}.xml`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast('Tally ERP 9 XML Exported Successfully', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-stone-900/90 border border-stone-800 p-6 rounded-3xl shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
              Double-Entry Dharma Accounting
            </span>
            <span className="text-xs text-stone-400 font-mono">
              Audit Verified & Section 80G Compliant
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-stone-100">
            Treasury & Expense Ledger
          </h2>
          <p className="text-xs text-stone-400 mt-0.5">
            Real-time balance sheet, cash/UPI custody tracking, and instant tax exemption receipts
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={handleExportTally}
            className="px-3.5 py-2 rounded-xl bg-indigo-900 hover:bg-indigo-800 border border-indigo-700/50 text-indigo-100 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Tally XML</span>
          </button>
          
          <button
            type="button"
            onClick={handleExportPDF}
            className="px-3.5 py-2 rounded-xl bg-rose-900/50 hover:bg-rose-800/50 border border-rose-700/50 text-rose-100 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>PDF</span>
          </button>
          
          <button
            type="button"
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-750 border border-stone-700 text-stone-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>CSV</span>
          </button>

          <button
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
            onClick={() => { setIsRecurring(false); setShowExpenseModal(true); }}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-rose-600/20 transition-all cursor-pointer"
          >
            <ArrowUpRight className="w-4 h-4" />
            <span>Log Expense</span>
          </button>
        </div>
      </div>

      {/* 3 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span className="font-bold uppercase tracking-wider">Total Inflow (Chanda)</span>
            <ArrowDownLeft className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-emerald-400 mt-2">
            + ₹{totalIncome.toLocaleString()}
          </p>
          <p className="text-[11px] text-stone-400 mt-1">Pranami, Pujas & Donations</p>
        </div>

        <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span className="font-bold uppercase tracking-wider">Total Outflow (Seva)</span>
            <ArrowUpRight className="w-4 h-4 text-rose-400" />
          </div>
          <p className="text-2xl font-black text-rose-400 mt-2">
            - ₹{totalExpense.toLocaleString()}
          </p>
          <p className="text-[11px] text-stone-400 mt-1">Ghee, Utilities, Maintenance</p>
        </div>

        <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span className="font-bold uppercase tracking-wider">Net Available Treasury</span>
            <ShieldCheck className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-black text-stone-100 mt-2">
            ₹{netBalance.toLocaleString()}
          </p>
          <p className="text-[11px] text-amber-400/90 mt-1 font-semibold">100% Reconciled</p>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="bg-stone-900/90 border border-stone-800 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by category, donor, custody..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-stone-800 border border-stone-700 rounded-xl pl-9 pr-3 py-2 text-xs text-stone-200 placeholder-stone-400 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex items-center gap-3 ml-auto overflow-x-auto w-full sm:w-auto no-scrollbar pb-1 sm:pb-0">
          {filterType === 'Expense' && (
            <div className="flex items-center gap-1 bg-stone-950 p-1 rounded-xl border border-stone-800 shadow-inner">
              {(['all', 'org', 'personal'] as const).map(ef => (
                <button
                  key={ef}
                  onClick={() => setExpenseFilter(ef)}
                  className={`px-3 py-1 rounded-lg text-[10px] font-black tracking-wide uppercase transition-all whitespace-nowrap ${
                    expenseFilter === ef ? 'bg-rose-500 text-white shadow-xs' : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
                  }`}
                >
                  {ef === 'all' ? 'All Expenses' : ef === 'org' ? 'Org Ops' : 'Personal (Sevadar)'}
                </button>
              ))}
              <div className="w-px h-4 bg-stone-700 mx-1"></div>
            </div>
          )}
          <div className="flex items-center gap-1 bg-stone-800 p-1 rounded-xl border border-stone-700">
            {(['all', 'Income', 'Expense'] as const).map((t, idx) => (
              <button
                key={t}
                type="button"
                onClick={() => setFilterType(t)}
                className={`px-3 py-1.5 rounded-lg font-bold text-[11px] transition-all cursor-pointer whitespace-nowrap ${
                  filterType === t
                    ? (t === 'Income' ? 'bg-emerald-500 text-stone-950' : t === 'Expense' ? 'bg-rose-500 text-white' : 'bg-amber-500 text-stone-950')
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-750'
                }`}
              >
                {t === 'all' ? 'All Entries' : t === 'Income' ? 'Inflows (Income)' : 'Outflows (Expense)'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 shadow-xl overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-xs">
            <thead className="text-[10px] text-stone-400 uppercase bg-stone-950/60 font-semibold border-b border-stone-800">
              <tr>
                <th className="p-3">Date & ID</th>
                <th className="p-3">Type & Category</th>
                <th className="p-3">Devotee / Purpose</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Custody (Handled By)</th>
                <th className="p-3">Payment Mode</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800">
              {filteredTreasury.map((tx, idx) => (
                <tr key={`${tx.id}-${idx}`} className="hover:bg-stone-800/40 transition-colors">
                  <td className="p-3">
                    <p className="font-mono text-stone-200 font-semibold">{tx.date}</p>
                    <p className="text-[10px] text-stone-400 font-mono">{tx.id}</p>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          tx.type === 'Income'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        {tx.type}
                      </span>
                      {tx.type === 'Expense' && (
                        <span
                          className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${
                            (tx.category || '').toLowerCase().includes('sevadar') || (tx.category || '').toLowerCase().includes('personal') || !!tx.devoteeId
                              ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                              : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          }`}
                        >
                          {(tx.category || '').toLowerCase().includes('sevadar') || (tx.category || '').toLowerCase().includes('personal') || !!tx.devoteeId ? 'Personal (Sevadar)' : 'Org Ops'}
                        </span>
                      )}
                    </div>
                    <p className="font-semibold text-stone-200">{tx.category}</p>
                    {tx.eventName && (
                      <span className="mt-1 inline-block px-1.5 py-0.5 rounded bg-stone-800 text-stone-400 text-[9px] font-bold uppercase border border-stone-700">
                        {tx.eventName}
                      </span>
                    )}
                  </td>
                  <td className="p-3">
                    <p className="font-bold text-stone-100">{tx.devoteeName || '-'}</p>
                    <p className="text-[11px] text-stone-400 truncate max-w-[200px]">{tx.purpose}</p>
                  </td>
                  <td className="p-3">
                    <p
                      className={`font-black text-sm ${
                        tx.type === 'Income' ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {tx.type === 'Income' ? '+' : '-'} ₹{(tx.amount || 0).toLocaleString()}
                    </p>
                    {tx.is80GEligible && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-mono">
                        80G Eligible
                      </span>
                    )}
                  </td>
                  <td className="p-3">
                    <p className="text-stone-300 font-medium">{tx.handledBy}</p>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-stone-800 text-stone-300 text-[10px] font-mono border border-stone-700">
                      {tx.paymentMode}
                    </span>
                    {tx.referenceNo && (
                      <p className="text-[10px] text-stone-400 font-mono mt-0.5 truncate max-w-[120px]">
                        {tx.referenceNo}
                      </p>
                    )}
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {tx.memoImageBase64 && (
                        <button
                          type="button"
                          onClick={() => setSelectedMemoUrl(tx.memoImageBase64!)}
                          className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300"
                          title="View Payment Memo"
                        >
                          <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                        </button>
                      )}
                      {tx.type === 'Income' && (
                        <>
                          <button
                            type="button"
                            onClick={() => {
                              try {
                                printThermalReceipt(tx, activeWorkspace);
                                showToast('Printing thermal slip...', 'info');
                              } catch(e) {
                                showToast('Error printing slip', 'error');
                              }
                            }}
                            className="px-2.5 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-750 text-indigo-400 border border-stone-700 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                            title="Thermal Print Slip"
                          >
                            <span>Print Slip</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handlePrintReceipt(tx)}
                            className="px-2.5 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-750 text-amber-400 border border-stone-700 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                            title="Download 80G Tax Receipt PDF"
                          >
                            <Receipt className="w-3.5 h-3.5" />
                            <span>80G Receipt</span>
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Memo Modal */}
      {selectedMemoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md">
          <div className="bg-stone-900 border border-stone-700 rounded-2xl max-w-md w-full p-4 text-stone-100 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-stone-800 mb-3">
              <h4 className="font-bold text-xs">Attached Payment Memo / Voucher</h4>
              <button
                type="button"
                onClick={() => setSelectedMemoUrl(null)}
                className="text-stone-400 hover:text-stone-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <img
              src={selectedMemoUrl}
              alt="Payment Memo"
              className="rounded-xl w-full max-h-96 object-contain border border-stone-800"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )}
      {/* Add Utsav Expense Modal */}
      {showExpenseModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md animate-in fade-in">
          <div className="bg-stone-900 border border-stone-700 rounded-3xl w-full max-w-lg p-6 shadow-2xl text-stone-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <ArrowUpRight className="w-5 h-5 text-rose-500" />
                  Log Organization Expense
                </h3>
                <p className="text-xs text-stone-400 mt-1">Record a general operational cost or an event-specific expense.</p>
              </div>
              <button onClick={() => setShowExpenseModal(false)} className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center hover:bg-stone-700 text-stone-400 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              
              addTreasuryTransaction({
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
              });
              showToast('Event Expense Logged!', 'success');
              setShowExpenseModal(false);
            }} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-stone-400 uppercase mb-1.5">Event / Utsav Name (Optional)</label>
                <input name="eventName" type="text" placeholder="Optional: e.g., Durga Puja 2026" list="utsav-list" className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-sm text-stone-200 focus:border-rose-500 focus:outline-none" />
                <datalist id="utsav-list">
                  {availableUtsavs.map(ev => <option key={ev} value={ev} />)}
                </datalist>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-stone-400 uppercase mb-1.5">Amount (₹)</label>
                  <input required name="amount" type="number" placeholder="0.00" min="1" className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-sm text-stone-200 focus:border-rose-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-stone-400 uppercase mb-1.5">Category</label>
                  <select required name="category" className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-sm text-stone-200 focus:border-rose-500 focus:outline-none">
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
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-stone-400 uppercase mb-1.5">Vendor / Payee Name (Search Devotee or enter new)</label>
                <MemberSearchSelect 
                  name="vendor"
                  value=""
                  onChange={() => {}}
                  placeholder="Name of person or company paid"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-stone-400 uppercase mb-1.5">Purpose / Notes</label>
                <input required name="purpose" type="text" placeholder="What was this for?" className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-sm text-stone-200 focus:border-amber-500 focus:outline-none" />
              </div>
              <div>
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
              </div>
              <div className="pt-4 flex justify-end">
                <button type="submit" className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-rose-600/20">
                  Log Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
