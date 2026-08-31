import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Coins, X, Upload, CheckCircle, Receipt, User, CreditCard, QrCode } from 'lucide-react';
import { useAuthWorkspace } from '../../context/AuthWorkspaceContext';
import { useData } from '../../context/DataContext';
import { compressExpenseMemo } from '../../utils/imageCompression';
import { useToast } from '../../context/ToastContext';
import { usePlanGate } from '../../hooks/usePlanGate';
import { UpsellModal } from './UpsellModal';
import { MemberSearchSelect } from './MemberSearchSelect';
import { generateUPIQRCode } from '../../utils/qrUtils';
import { printThermalReceipt } from '../../utils/printUtils';

interface QuickChandaModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledDevoteeId?: string;
  prefilledDevoteeName?: string;
}

export const QuickChandaModal: React.FC<QuickChandaModalProps> = ({
  isOpen,
  onClose,
  prefilledDevoteeId,
  prefilledDevoteeName,
}) => {
  const { activeWorkspace } = useAuthWorkspace();
  const { checkGate, showUpsell, upsellModule, closeUpsell } = usePlanGate();
  
  const { devotees, treasury, addTreasuryTransaction } = useData();
  const { showToast } = useToast();

  const [devoteeName, setDevoteeName] = useState('');
  const [selectedDevoteeId, setSelectedDevoteeId] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (prefilledDevoteeId && prefilledDevoteeName) {
        setSelectedDevoteeId(prefilledDevoteeId);
        setDevoteeName(prefilledDevoteeName);
      } else {
        setSelectedDevoteeId('');
        setDevoteeName('');
      }
      setAmount(1100);
      setCategory('Chanda / Pranami');
      setPaymentMode('UPI / QR');
      setReferenceNo('');
      setPurpose('');
      setMemoImageBase64('');
    }
  }, [isOpen, prefilledDevoteeId, prefilledDevoteeName]);
  const [amount, setAmount] = useState<number | ''>(1100);
  const [category, setCategory] = useState('Chanda / Pranami');
  const [paymentMode, setPaymentMode] = useState<'UPI / QR' | 'Cash' | 'Bank Transfer' | 'Cheque'>('UPI / QR');
  const [referenceNo, setReferenceNo] = useState('');
  const [purpose, setPurpose] = useState('General Mandir Seva & Deepam');
  const [handledBy, setHandledBy] = useState('Treasury Sevadar');
  const [is80GEligible, setIs80GEligible] = useState(true);
  const [memoImageBase64, setMemoImageBase64] = useState<string>('');
  const [isCompressing, setIsCompressing] = useState(false);
  const [upiQrCodeUrl, setUpiQrCodeUrl] = useState<string>('');

  useEffect(() => {
    if (paymentMode === 'UPI / QR' && amount && amount > 0) {
      // In production, the VPA (UPI ID) should be fetched from activeWorkspace config
      const vpa = 'sanatanibandhan@ybl'; 
      generateUPIQRCode(activeWorkspace.name || 'Sanatani Bandhan', vpa, Number(amount), purpose)
        .then(url => setUpiQrCodeUrl(url));
    } else {
      setUpiQrCodeUrl('');
    }
  }, [amount, paymentMode, purpose, activeWorkspace]);

  const handleDevoteeSelect = (id: string) => {
    setSelectedDevoteeId(id);
    const found = devotees.find((d) => d.id === id);
    if (found) {
      setDevoteeName(found.fullName);
    }
  };

  const handleMemoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsCompressing(true);
      const compressed = await compressExpenseMemo(file);
      setMemoImageBase64(compressed);
      showToast('Receipt securely uploaded to Cloud Storage', 'info');
    } catch (err: any) {
      showToast('Failed to compress receipt image', 'error');
    } finally {
      setIsCompressing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || amount <= 0) {
      showToast('Please enter a valid amount', 'warning');
      return;
    }
    if (!devoteeName.trim()) {
      showToast('Please enter or select devotee name', 'warning');
      return;
    }

    if (!checkGate('transactions', treasury.length)) {
      return; // UpsellModal will pop up over this
    }

    const newTx: any = {
      workspaceId: activeWorkspace.id,
      date: new Date().toISOString().slice(0, 10),
      type: 'Income',
      category,
      amount: Number(amount),
      handledBy,
      devoteeId: selectedDevoteeId || undefined,
      devoteeName: devoteeName.trim(),
      paymentMode,
      referenceNo: referenceNo.trim() || undefined,
      purpose: purpose.trim(),
      is80GEligible,
      memoImageBase64: memoImageBase64 || undefined,
    };

    addTreasuryTransaction(newTx);
    
    // Attempt thermal print automatically
    try {
      printThermalReceipt(
        { ...newTx, id: `tx_${Date.now()}` }, // provide temporary ID for print if not returned
        activeWorkspace
      );
      showToast('Thermal Receipt generated successfully', 'success');
    } catch (e) {
      console.error(e);
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        id="quick-chanda-modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-stone-900 border border-stone-700/80 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden text-stone-100 flex flex-col"
        >
          {/* Header */}
          <div className="p-4 border-b border-stone-800 flex items-center justify-between bg-stone-950/50">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Coins className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-stone-100">Log Chanda / Pranami / Dakshina</h3>
                <p className="text-[11px] text-stone-400">Instant Double-Entry Ledger & 80G Receipt</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto max-h-[75vh] custom-scrollbar">
            {/* Quick Amounts */}
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                Preset Sacred Amounts (₹)
              </label>
              <div className="grid grid-cols-5 gap-2">
                {[501, 1100, 2100, 5100, 11000].map((preset, idx) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setAmount(preset)}
                    className={`py-1.5 rounded-xl text-xs font-bold transition-all ${
                      amount === preset
                        ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                        : 'bg-stone-800 text-stone-300 hover:bg-stone-750'
                    }`}
                  >
                    ₹{preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Amount */}
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                Amount ({activeWorkspace.currencySymbol}) *
              </label>
              <input
                type="number"
                id="quick-chanda-amount-input"
                required
                min="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : '')}
                className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-sm font-bold text-amber-400 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Devotee Selector or Name */}
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                Devotee / Donor Name *
              </label>
              <div className="space-y-2">
                <select
                  value={selectedDevoteeId}
                  onChange={(e) => handleDevoteeSelect(e.target.value)}
                  className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                >
                  <option value="">-- Choose from Enrolled Members or Enter Below --</option>
                  {devotees.map((d, idx) => (
                    <option key={`${d.id}-${idx}`} value={d.id}>
                      {d.fullName} ({d.gotra} • {d.phone})
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  placeholder="Or enter donor name directly..."
                  required
                  value={devoteeName}
                  onChange={(e) => setDevoteeName(e.target.value)}
                  className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Category & Payment Mode */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none"
                >
                  <option>Chanda / Pranami</option>
                  <option>Pooja Dakshina</option>
                  <option>Annadanam Sponsorship</option>
                  <option>Mandir Nirman Fund</option>
                  <option>Gau Seva Nidhi</option>
                  <option>Guru Dakshina</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Payment Mode</label>
                <select
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value as any)}
                  className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none"
                >
                  <option>UPI / QR</option>
                  <option>Cash</option>
                  <option>Bank Transfer</option>
                  <option>Cheque</option>
                </select>
              </div>
            </div>

            {/* Dynamic UPI QR Code Display */}
            {paymentMode === 'UPI / QR' && upiQrCodeUrl && (
              <div className="bg-stone-800/50 border border-stone-700 rounded-xl p-4 flex flex-col items-center justify-center space-y-2 mt-2">
                <p className="text-xs font-semibold text-amber-500 mb-1 flex items-center gap-1">
                  <QrCode className="w-3.5 h-3.5" /> Scan to Pay Exactly ₹{amount}
                </p>
                <div className="bg-white p-2 rounded-lg shadow-sm">
                  <img src={upiQrCodeUrl} alt="UPI QR Code" className="w-32 h-32 object-contain" />
                </div>
                <p className="text-[10px] text-stone-400">Directly settles to {activeWorkspace.name} Treasury</p>
              </div>
            )}

            {/* Handled By & Ref */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Handled By (Custody)</label>
                <input
                  type="text"
                  required
                  value={handledBy}
                  onChange={(e) => setHandledBy(e.target.value)}
                  className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-200"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">UTR / Ref No (Optional)</label>
                <input
                  type="text"
                  placeholder="UPI transaction ID..."
                  value={referenceNo}
                  onChange={(e) => setReferenceNo(e.target.value)}
                  className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-200"
                />
              </div>
            </div>

            {/* Purpose */}
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">Seva Purpose / Sankalp</label>
              <input
                type="text"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-200"
              />
            </div>

            {/* 80G Checkbox & Zero-Cost Memo Upload */}
            <div className="pt-2 border-t border-stone-800 space-y-3">
              <label className="flex items-center gap-2 text-xs text-stone-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={is80GEligible}
                  onChange={(e) => setIs80GEligible(e.target.checked)}
                  className="rounded bg-stone-800 border-stone-700 text-amber-500 focus:ring-0"
                />
                <span>Generate Section 80G Tax Exemption Certificate</span>
              </label>

              <div>
                <label className="block text-xs font-semibold text-stone-400 mb-1">
                  Upload Payment Memo / Receipt Photo (Compressed locally)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleMemoUpload}
                  className="w-full text-xs text-stone-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-stone-800 file:text-stone-300 hover:file:bg-stone-700 cursor-pointer"
                />
                {memoImageBase64 && (
                  <p className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Memo compressed and attached
                  </p>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                id="submit-quick-chanda-btn"
                className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs shadow-lg shadow-amber-600/20 transition-all cursor-pointer"
              >
                Confirm & Record Treasury Transaction
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      <UpsellModal 
        isOpen={showUpsell} 
        onClose={closeUpsell} 
        onUpgrade={() => { window.location.href = '/?action=signup'; }} 
        module={upsellModule} 
      />
    </AnimatePresence>
  );
};
