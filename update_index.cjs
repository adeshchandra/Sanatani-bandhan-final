const fs = require('fs');

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sanatani Bandhan | Enterprise Temple Management Software</title>
    <meta name="description" content="The leading cloud-based temple management software (ERP) for Mandirs, Goshalas, and Ashrams. Manage devotees, treasury, donations, and 80G receipts securely." />
    <meta name="keywords" content="temple management software, dharmic ERP, mandir software, goshala management, ashram software, donation management, 80G receipts software, devotee CRM" />
    <meta property="og:title" content="Sanatani Bandhan | Enterprise Temple Management Software" />
    <meta property="og:description" content="Secure, offline-first cloud ERP for Mandirs, Goshalas, and Ashrams. Streamline treasury, devotee management, and Utsavs." />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Sanatani Bandhan" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Sanatani Bandhan | Temple Management Software" />
    <meta name="twitter:description" content="Secure, offline-first cloud ERP for Mandirs, Goshalas, and Ashrams." />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;

fs.writeFileSync('index.html', html);
