import re

filepath = 'src/components/domain2/TreasuryLedgerDesk.tsx'
with open(filepath, 'r') as f:
    content = f.read()

orig_handle_csv = """  const handleExportCSV = () => {"""
new_handle_pdf = """  const handleExportPDF = async () => {
    try {
      await generateTreasuryLedgerPDF(filteredTreasury, activeWorkspace, `Treasury & Expense Ledger (${filterType} View)`);
      showToast('Ledger PDF generated successfully!', 'success');
    } catch (err: any) {
      showToast('Error generating Ledger PDF', 'error');
    }
  };

  const handleExportCSV = () => {"""

content = content.replace(orig_handle_csv, new_handle_pdf)

with open(filepath, 'w') as f:
    f.write(content)
