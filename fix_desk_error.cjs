const fs = require('fs');
const filePath = 'src/components/domain2/TreasuryLedgerDesk.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Undo the first replacement if we messed it up
content = content.replace(/<ErrorBoundary moduleName="Treasury Ledger">\n\s*<div/g, '<div');
content = content.replace(/<\/ErrorBoundary>\n\s*\);\n};/g, ');\n};');

// Re-apply it safely
content = content.replace(
  'return (\n    <div className',
  'return (\n    <ErrorBoundary moduleName="Treasury Ledger">\n    <div className'
);

// find the last '</div>\n  );\n};'
const lastTag = '    </div>\n  );\n};';
if (content.endsWith(lastTag) || content.endsWith('    </div>\n  );\n};\n')) {
  content = content.substring(0, content.lastIndexOf('</div>')) + '</div>\n    </ErrorBoundary>\n  );\n};\n';
}

fs.writeFileSync(filePath, content);
