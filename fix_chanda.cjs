const fs = require('fs');
let content = fs.readFileSync('src/components/common/QuickChandaModal.tsx', 'utf8');
content = content.replace(/memoImageBase64/g, 'memoImageUrl');
content = content.replace(/setMemoImageBase64/g, 'setMemoImageUrl');
fs.writeFileSync('src/components/common/QuickChandaModal.tsx', content);

let types = fs.readFileSync('src/types.ts', 'utf8');
types = types.replace(/memoImageBase64/g, 'memoImageUrl');
fs.writeFileSync('src/types.ts', types);

let ledger = fs.readFileSync('src/components/domain2/TreasuryLedgerDesk.tsx', 'utf8');
ledger = ledger.replace(/memoImageBase64/g, 'memoImageUrl');
fs.writeFileSync('src/components/domain2/TreasuryLedgerDesk.tsx', ledger);
