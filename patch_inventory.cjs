const fs = require('fs');
let code = fs.readFileSync('src/components/domain2/InventoryDesk.tsx', 'utf8');

// 1. Add imports
code = code.replace(
  `import { Package, Plus, Search, AlertTriangle, CheckCircle2, TrendingDown, X } from 'lucide-react';`,
  `import { Package, Plus, Search, AlertTriangle, CheckCircle2, TrendingDown, X, Download } from 'lucide-react';\nimport jsPDF from 'jspdf';\nimport autoTable from 'jspdf-autotable';`
);

// 2. Add Export function inside the component
if (!code.includes('exportToPDF')) {
  code = code.replace(
    `  const handleUpdateStock = (e: React.FormEvent) => {`,
    `  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(16);
    doc.text('Inventory Status Report', 14, 15);
    
    // Subtitle
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(\`Generated on: \${new Date().toLocaleString()}\`, 14, 22);

    // Table Data
    const tableColumn = ["Item Name", "Category", "Current Stock", "Min Reorder", "Status", "Cost/Unit", "Supplier"];
    const tableRows = filteredInventory.map(item => {
      const isLow = item.currentStock <= item.minReorderLevel;
      return [
        item.itemName,
        item.category,
        \`\${item.currentStock} \${item.unit}\`,
        \`\${item.minReorderLevel} \${item.unit}\`,
        isLow ? 'Low Stock' : 'Optimal',
        \`Rs.\${item.costPerUnit}\`,
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

    doc.save(\`inventory_report_\${new Date().getTime()}.pdf\`);
    showToast('Inventory Report Downloaded', 'success');
  };

  const handleUpdateStock = (e: React.FormEvent) => {`
  );
}

// 3. Add button in the UI
if (!code.includes('exportToPDF')) {
  console.log("Failed to inject exportToPDF");
} else {
  code = code.replace(
    `        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-amber-600/20 transition-all cursor-pointer"
        >`,
    `        <div className="flex items-center gap-3">
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
          >`
  );
  
  code = code.replace(
    `          <span>Add Stock Item</span>
        </button>
      </div>`,
    `          <span>Add Stock Item</span>
          </button>
        </div>
      </div>`
  );
}

fs.writeFileSync('src/components/domain2/InventoryDesk.tsx', code);
