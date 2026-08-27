import { TreasuryTransaction, WorkspaceConfig } from '../types';

export const printThermalReceipt = (
  transaction: TreasuryTransaction,
  workspace: WorkspaceConfig
) => {
  // Create a hidden iframe
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document;
  if (!doc) return;

  const dateStr = new Date(transaction.date).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Receipt</title>
        <style>
          @page {
            margin: 0;
            size: 58mm auto; /* Thermal printer standard */
          }
          body {
            font-family: 'Courier New', Courier, monospace;
            width: 58mm; /* Adjust for 80mm if needed */
            margin: 0 auto;
            padding: 4mm;
            box-sizing: border-box;
            font-size: 12px;
            color: #000;
            line-height: 1.4;
          }
          .text-center { text-align: center; }
          .font-bold { font-weight: bold; }
          .text-lg { font-size: 16px; }
          .text-sm { font-size: 10px; }
          .divider { border-top: 1px dashed #000; margin: 4px 0; }
          .row { display: flex; justify-content: space-between; }
          .mt-2 { margin-top: 8px; }
          .mb-2 { margin-bottom: 8px; }
        </style>
      </head>
      <body>
        <div class="text-center font-bold text-lg">${workspace.name}</div>
        <div class="text-center text-sm">${workspace.address || 'Address'}</div>
        <div class="divider mt-2 mb-2"></div>
        <div class="text-center font-bold">DONATION RECEIPT</div>
        <div class="divider mt-2 mb-2"></div>
        
        <div class="row"><span>Rcpt No:</span> <span>${transaction.id.substring(0, 8)}</span></div>
        <div class="row"><span>Date:</span> <span>${dateStr}</span></div>
        <div class="row"><span>Mode:</span> <span>${transaction.paymentMode}</span></div>
        
        <div class="divider mt-2 mb-2"></div>
        <div class="row mt-2">
          <span>Name:</span>
          <span style="text-align:right; max-width: 60%;">${transaction.devoteeName || 'Walk-in'}</span>
        </div>
        <div class="row">
          <span>Purpose:</span>
          <span style="text-align:right; max-width: 60%;">${transaction.purpose || transaction.category}</span>
        </div>
        
        <div class="divider mt-2 mb-2"></div>
        <div class="row font-bold text-lg">
          <span>TOTAL:</span>
          <span>₹${transaction.amount.toFixed(2)}</span>
        </div>
        <div class="divider mt-2 mb-2"></div>
        
        <div class="text-center text-sm mt-2">
          Thank you for your generous contribution.
        </div>
        <div class="text-center text-sm">
          May the divine blessings be with you.
        </div>
        <br/><br/><br/>
      </body>
    </html>
  `;

  doc.open();
  doc.write(htmlContent);
  doc.close();

  // Wait for content to load, then print
  setTimeout(() => {
    iframe.contentWindow?.focus();
    iframe.contentWindow?.print();
    // Clean up
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000);
  }, 250);
};
