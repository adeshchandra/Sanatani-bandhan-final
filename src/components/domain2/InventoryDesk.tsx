import React, { useState } from 'react';
import { Package, Plus, Search, AlertTriangle, CheckCircle2, TrendingDown, X, Download, ScanBarcode } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useAuthWorkspace } from '../../context/AuthWorkspaceContext';
import { useData } from '../../context/DataContext';
import { InventoryItem } from '../../types';
import { useToast } from '../../context/ToastContext';
import { CameraScanner } from '../common/CameraScanner';

export const InventoryDesk: React.FC = () => {
  const { activeWorkspace } = useAuthWorkspace();
  const { inventory, updateInventoryStock, addInventoryItem } = useData();
  const { showToast } = useToast();

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingStockItem, setEditingStockItem] = useState<InventoryItem | null>(null);
  const [newStockVal, setNewStockVal] = useState<number>(0);

  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState<'Ghee & Oils' | 'Camphor & Dhoop' | 'Rice & Grains' | 'Spices & Dry Fruits' | 'Prasad Supplies' | 'General Stores'>('Ghee & Oils');
  const [currentStock, setCurrentStock] = useState<number>(50);
  const [unit, setUnit] = useState<'kg' | 'liters' | 'packets' | 'pieces'>('kg');
  const [minReorderLevel, setMinReorderLevel] = useState<number>(20);
  const [costPerUnit, setCostPerUnit] = useState<number>(1000);
  const [supplierName, setSupplierName] = useState('');
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const filteredInventory = inventory.filter(
    (i) =>
      i.itemName?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      i.category?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      i.id?.toLowerCase() === searchTerm?.toLowerCase()
  );

  const handleScanBarcode = (data: string) => {
    setSearchTerm(data);
    showToast(`Scanned Tag: ${data}`, 'success');
    setIsScannerOpen(false);
    return true;
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(16);
    doc.text('Inventory Status Report', 14, 15);
    
    // Subtitle
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 22);

    // Table Data
    const tableColumn = ["Item Name", "Category", "Current Stock", "Min Reorder", "Status", "Cost/Unit", "Supplier"];
    const tableRows = filteredInventory.map(item => {
      const isLow = item.currentStock <= item.minReorderLevel;
      return [
        item.itemName,
        item.category,
        `${item.currentStock} ${item.unit}`,
        `${item.minReorderLevel} ${item.unit}`,
        isLow ? 'Low Stock' : 'Optimal',
        `Rs.${item.costPerUnit}`,
        item.supplierName || 'N/A'
      ];
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 28,
      theme: 'grid',
      styles: { fontSize: 8 },
      headStyles: { fillColor: [245, 158, 11] }, // Amber-500 roughly
      didParseCell: function(data) {
        // Highlight low stock status in red
        if (data.section === 'body' && data.column.index === 4) {
          if (data.cell.raw === 'Low Stock') {
            data.cell.styles.textColor = [220, 38, 38]; // red-600
            data.cell.styles.fontStyle = 'bold';
          } else {
            data.cell.styles.textColor = [5, 150, 105]; // emerald-600
          }
        }
      }
    });

    doc.save(`inventory_report_${new Date().getTime()}.pdf`);
    showToast('Inventory Report Downloaded', 'success');
  };

  const handleUpdateStock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStockItem) return;
    updateInventoryStock(editingStockItem.id, Number(newStockVal));
    setEditingStockItem(null);
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemName.trim()) return;

    addInventoryItem({
      workspaceId: activeWorkspace.id,
      itemName: itemName.trim(),
      category,
      currentStock: Number(currentStock),
      unit,
      minReorderLevel: Number(minReorderLevel),
      costPerUnit: Number(costPerUnit),
      supplierName: supplierName.trim() || undefined,
    });

    setIsAddModalOpen(false);
    setItemName('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-stone-900/90 border border-stone-800 p-6 rounded-3xl shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold uppercase tracking-wider">
              Bhandara & Pooja Samagri Store
            </span>
            <span className="text-xs text-stone-400 font-mono">
              {inventory.length} Tracked Consumables
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-stone-100">
            Store & Consumables Inventory Desk
          </h2>
          <p className="text-xs text-stone-400 mt-0.5">
            Monitor stock levels of Desi Ghee, Bhimseni Camphor, Akshat rice, and automatic reorder alerts
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setIsScannerOpen(true)}
            className="px-4 py-2 rounded-xl bg-indigo-900/80 hover:bg-indigo-800 border border-indigo-700/50 text-indigo-200 font-bold text-xs flex items-center gap-1.5 shadow-lg transition-all cursor-pointer"
          >
            <ScanBarcode className="w-4 h-4" />
            <span>Scan Tag</span>
          </button>
          <button
            type="button"
            onClick={exportToPDF}
            className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 font-bold text-xs flex items-center gap-1.5 shadow-lg transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export PDF</span>
          </button>
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-amber-600/20 transition-all cursor-pointer"
          >
          <Plus className="w-4 h-4" />
          <span>Add Stock Item</span>
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredInventory.map((item) => {
          const isLow = item.currentStock <= item.minReorderLevel;

          return (
            <div
              key={item.id}
              className={`bg-stone-900/90 border rounded-2xl p-5 shadow-lg flex flex-col justify-between space-y-4 transition-all ${
                isLow ? 'border-amber-500/60 bg-amber-950/10' : 'border-stone-800'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 pb-3 border-b border-stone-800">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-amber-400">
                      {item.category}
                    </span>
                    <h3 className="font-extrabold text-sm text-stone-100 mt-0.5">{item.itemName}</h3>
                  </div>
                  {isLow ? (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold animate-pulse">
                      <AlertTriangle className="w-3 h-3" />
                      Low Stock
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                      <CheckCircle2 className="w-3 h-3" />
                      Optimal
                    </span>
                  )}
                </div>

                <div className="py-2 space-y-1 text-xs text-stone-300">
                  <p>
                    <span className="text-stone-400">Min Reorder Level:</span>{' '}
                    <span className="font-mono text-stone-200">
                      {item.minReorderLevel} {item.unit}
                    </span>
                  </p>
                  <p>
                    <span className="text-stone-400">Cost per unit:</span>{' '}
                    <span className="font-mono text-amber-400">₹{item.costPerUnit}</span>
                  </p>
                  {item.supplierName && (
                    <p className="text-[11px] text-stone-400 truncate">
                      Supplier: {item.supplierName}
                    </p>
                  )}
                </div>

                <div className={`p-3 rounded-xl flex items-center justify-between ${
                  isLow ? 'bg-rose-950/40 border border-rose-500/50' : 'bg-stone-950/60 border border-stone-800'
                }`}>
                  <div>
                    <p className={`text-[10px] font-semibold uppercase ${isLow ? 'text-rose-400' : 'text-stone-400'}`}>Current Stock</p>
                    <p className={`text-xl font-black ${isLow ? 'text-rose-500' : 'text-stone-100'}`}>
                      {item.currentStock} <span className={`text-xs font-normal ${isLow ? 'text-rose-400' : 'text-amber-400'}`}>{item.unit}</span>
                    </p>
                  </div>
                  {isLow ? (
                    <AlertTriangle className="w-5 h-5 text-rose-500 opacity-80" />
                  ) : (
                    <Package className="w-5 h-5 text-amber-400 opacity-80" />
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setEditingStockItem(item);
                  setNewStockVal(item.currentStock);
                }}
                className="w-full py-1.5 rounded-xl bg-stone-800 hover:bg-stone-750 border border-stone-700 text-stone-200 text-xs font-semibold"
              >
                Update Stock Count
              </button>
            </div>
          );
        })}
      </div>

      {/* Update Stock Modal */}
      {editingStockItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md">
          <div className="bg-stone-900 border border-stone-700 rounded-2xl max-w-sm w-full p-5 text-stone-100 shadow-2xl">
            <h4 className="font-bold text-sm mb-1">Update Stock for {editingStockItem.itemName}</h4>
            <p className="text-xs text-stone-400 mb-4">Unit: {editingStockItem.unit}</p>

            <form onSubmit={handleUpdateStock} className="space-y-3">
              <input
                type="number"
                required
                min="0"
                value={newStockVal}
                onChange={(e) => setNewStockVal(Number(e.target.value))}
                className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-sm font-bold text-amber-400"
              />

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingStockItem(null)}
                  className="px-3 py-1.5 rounded-xl bg-stone-800 text-stone-300 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs"
                >
                  Save Stock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Item Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md">
          <div className="bg-stone-900 border border-stone-700 rounded-2xl max-w-md w-full p-6 text-stone-100 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800 mb-4">
              <h3 className="font-bold text-sm">Add New Store Consumable</h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-stone-400 hover:text-stone-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddItem} className="space-y-3 text-xs">
              <div>
                <label className="block text-stone-300 font-semibold mb-1">Item Name *</label>
                <input
                  type="text"
                  required
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  placeholder="e.g. Pure Desi Cow Ghee"
                  className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-stone-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-stone-200"
                  >
                    <option>Ghee & Oils</option>
                    <option>Camphor & Dhoop</option>
                    <option>Rice & Grains</option>
                    <option>Spices & Dry Fruits</option>
                    <option>Prasad Supplies</option>
                    <option>General Stores</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Unit</label>
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value as any)}
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-stone-200"
                  >
                    <option value="kg">kg</option>
                    <option value="liters">liters</option>
                    <option value="packets">packets</option>
                    <option value="pieces">pieces</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Initial Stock</label>
                  <input
                    type="number"
                    value={currentStock}
                    onChange={(e) => setCurrentStock(Number(e.target.value))}
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-stone-200"
                  />
                </div>

                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Min Reorder</label>
                  <input
                    type="number"
                    value={minReorderLevel}
                    onChange={(e) => setMinReorderLevel(Number(e.target.value))}
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-stone-200"
                  />
                </div>

                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Cost/Unit (₹)</label>
                  <input
                    type="number"
                    value={costPerUnit}
                    onChange={(e) => setCostPerUnit(Number(e.target.value))}
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-stone-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-300 font-semibold mb-1">Supplier Name</label>
                <input
                  type="text"
                  value={supplierName}
                  onChange={(e) => setSupplierName(e.target.value)}
                  className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-stone-200"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-stone-800 text-stone-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold"
                >
                  Add Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Barcode Scanner Modal */}
      {isScannerOpen && (
        <CameraScanner
          onScan={handleScanBarcode}
          onClose={() => setIsScannerOpen(false)}
        />
      )}
    </div>
  );
};
