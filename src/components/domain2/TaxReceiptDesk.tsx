import React, { useState } from 'react';
import { Receipt, Download, Search, ShieldCheck, CheckCircle2, QrCode } from 'lucide-react';
import { useAuthWorkspace } from '../../context/AuthWorkspaceContext';
import { useData } from '../../context/DataContext';
import { generateTaxReceiptPDF, generateBulkTaxReceiptsPDF } from '../../utils/pdfGenerator';
import { useToast } from '../../context/ToastContext';

export const TaxReceiptDesk: React.FC = () => {
  const { activeWorkspace } = useAuthWorkspace();
  const { treasury } = useData();
  const { showToast } = useToast();

  const [searchTerm, setSearchTerm] = useState(''); const [selectedTxIds, setSelectedTxIds] = useState<Set<string>>(new Set());

  const eligibleTransactions = treasury.filter(
    (t) =>
      t.type === 'Income' &&
      t.is80GEligible &&
      ((t.devoteeName && t.devoteeName?.toLowerCase().includes(searchTerm?.toLowerCase())) ||
        t.id?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
        t.category?.toLowerCase().includes(searchTerm?.toLowerCase()))
  );

  const handleDownload = async (tx: any) => {
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
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-stone-900/90 border border-stone-800 p-6 rounded-3xl shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold uppercase tracking-wider">
              Legal Compliance
            </span>
            <span className="text-xs text-stone-400 font-mono">
              80G Reg: {activeWorkspace.taxExemptionNumber || 'CIT(E)/80G/VAR-2024'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-stone-100">
            Section 80G & 12A Tax Certificate Desk
          </h2>
          <p className="text-xs text-stone-400 mt-0.5">
            Instant PDF generation with SHA-256 cryptographic stamp and verification QR code
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-stone-900/90 border border-stone-800 p-4 rounded-2xl flex items-center justify-between gap-4">
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
      </div>

      {/* Tax Receipts List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {eligibleTransactions.map((tx, idx) => (
                    <div
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
              </div>

              <div className="py-2 space-y-1 text-xs text-stone-300">
                <p>
                  <span className="text-stone-400">Date:</span>{' '}
                  <span className="font-mono text-stone-200">{tx.date}</span>
                </p>
                <p>
                  <span className="text-stone-400">Category:</span>{' '}
                  <span className="font-medium text-stone-200">{tx.category}</span>
                </p>
                <p>
                  <span className="text-stone-400">Payment Mode:</span>{' '}
                  <span className="text-stone-200">{tx.paymentMode}</span>
                </p>
                <p>
                  <span className="text-stone-400">Trust Reg:</span>{' '}
                  <span className="font-mono text-[11px] text-stone-300">{activeWorkspace.trustRegNumber}</span>
                </p>
              </div>

              <div className="p-3 rounded-xl bg-stone-950/60 border border-stone-800 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-stone-400 font-semibold uppercase">Exempt Amount</p>
                  <p className="text-lg font-black text-emerald-400">₹{(tx.amount || 0).toLocaleString()}</p>
                </div>
                <ShieldCheck className="w-6 h-6 text-emerald-400 opacity-80" />
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleDownload(tx)}
              className="w-full py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-600/20 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Signed 80G Certificate PDF</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
