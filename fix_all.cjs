const fs = require('fs');

// 1. Fix types.ts for panNumber
let types = fs.readFileSync('src/types.ts', 'utf8');
types = types.replace(/panNumber\?: string;.*?\n/g, "");
types = types.replace(
  "idCardValidThru?: string;",
  "idCardValidThru?: string;\n  panNumber?: string;"
);
fs.writeFileSync('src/types.ts', types);

// 2. Fix App.tsx import
let app = fs.readFileSync('src/App.tsx', 'utf8');
if (!app.includes("import { QRScanner }")) {
  app = app.replace(
    "import { RestrictedAccess } from './components/common/RestrictedAccess';",
    "import { RestrictedAccess } from './components/common/RestrictedAccess';\nimport { QRScanner } from './components/admin/QRScanner';"
  );
  fs.writeFileSync('src/App.tsx', app);
}

// 3. Fix Sidebar.tsx import
let sidebar = fs.readFileSync('src/components/common/Sidebar.tsx', 'utf8');
if (!sidebar.includes("ShieldCheck,")) {
  sidebar = sidebar.replace(
    "import { ",
    "import { ShieldCheck, "
  );
  fs.writeFileSync('src/components/common/Sidebar.tsx', sidebar);
}

// 4. Fix pdfGenerator.ts
let pdfGen = fs.readFileSync('src/utils/pdfGenerator.ts', 'utf8');
// The issue is likely in generateTaxReceiptPDF definition missing the parameters.
pdfGen = pdfGen.replace(/export const generateTaxReceiptPDF = async \([\s\S]*?\): Promise<void \| Blob> => {/, `export const generateTaxReceiptPDF = async (
  tx: TreasuryTransaction,
  workspace: WorkspaceConfig,
  returnType: 'save' | 'blob' = 'save',
  isCopy: boolean = false,
  devoteePan: string = ''
): Promise<void | Blob> => {`);
fs.writeFileSync('src/utils/pdfGenerator.ts', pdfGen);
