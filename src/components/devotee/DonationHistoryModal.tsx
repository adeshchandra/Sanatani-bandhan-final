import React from 'react';
import { X, Calendar, Download, Heart, Receipt } from 'lucide-react';
import { TreasuryTransaction, WorkspaceConfig } from '../../types';
import { generateTaxReceiptPDF } from '../../utils/pdfGenerator';
import { useToast } from '../../context/ToastContext';

interface DonationHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  donations: TreasuryTransaction[];
  workspace: WorkspaceConfig | null;
  devoteeName: string;
}

export const DonationHistoryModal: React.FC<DonationHistoryModalProps> = ({ 
  isOpen, 
  onClose, 
  donations,
  workspace,
  devoteeName
}) => {
  const { showToast } = useToast();

  if (!isOpen) return null;

  const handleDownloadReceipt = async (tx: TreasuryTransaction) => {
    if (!workspace) {
      showToast('Workspace data not available', 'error');
      return;
    }
    
    try {
      showToast('Generating Receipt...', 'info');
      await generateTaxReceiptPDF(tx, workspace);
    } catch (e) {
      console.error(e);
      showToast('Failed to generate receipt', 'error');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-stone-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-200 border border-stone-200 flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 flex items-center justify-center rounded-xl shadow-inner">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-stone-900 leading-tight">My Donation History</h3>
              <p className="text-xs text-stone-500 font-medium">Track your past contributions and download receipts</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-full transition-colors"
          >
             <X className="w-4 h-4" />
          </button>
        </div>
        
        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
          {donations.length === 0 ? (
            <div className="text-center py-10">
              <Receipt className="w-12 h-12 text-stone-300 mx-auto mb-3" />
              <p className="text-base font-bold text-stone-700">No Donations Yet</p>
              <p className="text-sm text-stone-500 mt-1">Your contributions will appear here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {donations.map((tx) => (
                <div key={tx.id} className="bg-white border border-stone-200 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-emerald-200 transition-colors">
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="w-12 h-12 bg-stone-50 border border-stone-100 flex flex-col items-center justify-center rounded-xl shrink-0">
                      <span className="text-[10px] font-bold text-stone-500 uppercase">{new Date(tx.date).toLocaleString('default', { month: 'short' })}</span>
                      <span className="text-sm font-black text-stone-900">{new Date(tx.date).getDate()}</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-stone-900">{tx.category}</p>
                      {tx.subcategory && (
                         <p className="text-xs text-stone-500 mb-1">{tx.subcategory}</p>
                      )}
                      <div className="flex items-center gap-2 mt-1">
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-widest rounded-md border border-emerald-100">
                          {tx.type || 'Income'}
                        </span>
                        {tx.paymentMode && (
                          <span className="px-2 py-0.5 bg-stone-100 text-stone-600 text-[10px] font-bold uppercase tracking-widest rounded-md border border-stone-200">
                            {tx.paymentMode}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between sm:justify-end gap-6 sm:w-auto w-full border-t sm:border-t-0 border-stone-100 pt-3 sm:pt-0">
                    <div className="text-left sm:text-right">
                      <p className="text-xs text-stone-500 font-bold uppercase tracking-wider mb-0.5">Amount</p>
                      <p className="text-lg font-black text-emerald-600">₹{tx.amount.toLocaleString()}</p>
                    </div>
                    
                    <button 
                      onClick={() => handleDownloadReceipt(tx)}
                      className="flex items-center justify-center w-10 h-10 bg-stone-50 hover:bg-stone-100 text-stone-600 rounded-xl transition-colors border border-stone-200"
                      title="Download Receipt"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Footer */}
        {donations.length > 0 && (
           <div className="px-6 py-4 border-t border-stone-100 bg-stone-50 shrink-0 text-right">
             <p className="text-xs text-stone-500 font-medium">
               Showing {donations.length} total contributions.
             </p>
           </div>
        )}
      </div>
    </div>
  );
};
