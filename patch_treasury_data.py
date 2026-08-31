import re

filepath = 'src/context/DataContext.tsx'
with open(filepath, 'r') as f:
    content = f.read()

mock_data = """export const INITIAL_TREASURY: TreasuryLedger[] = [
  {
    id: 'tx-01',
    workspaceId: 'ws-mandir',
    date: '2026-08-28',
    type: 'Income',
    category: 'Chanda / Pranami',
    amount: 11000,
    handledBy: 'Treasury Admin',
    devoteeId: 'dev-101',
    devoteeName: 'Sri Rameshwar Shastri',
    paymentMode: 'Bank Transfer (NEFT)',
    purpose: 'Special Seva Sankalpa',
    is80GEligible: true,
    auditVerified: true
  },
  {
    id: 'tx-02',
    workspaceId: 'ws-mandir',
    date: '2026-08-25',
    type: 'Expense',
    category: 'Travel & Logistics',
    amount: 4500,
    handledBy: 'Treasury Admin',
    devoteeId: 'dev-101',
    devoteeName: 'Sri Rameshwar Shastri',
    vendorName: 'Sri Rameshwar Shastri',
    paymentMode: 'Cash',
    purpose: 'Reimbursement for Kashi Yatra transport',
    is80GEligible: false,
    auditVerified: true
  },
"""

content = content.replace("export const INITIAL_TREASURY: TreasuryLedger[] = [", mock_data)

with open(filepath, 'w') as f:
    f.write(content)
