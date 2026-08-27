const fs = require('fs');

let code = fs.readFileSync('src/components/public/LandingPage.tsx', 'utf8');

const schemaMarkup = `
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "SoftwareApplication",
                "name": "Sanatani Bandhan",
                "operatingSystem": "Web browser",
                "applicationCategory": "BusinessApplication",
                "description": "Enterprise grade cloud-based temple management software (ERP) for Mandirs, Goshalas, and Ashrams.",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "INR"
                }
              },
              {
                "@type": "Organization",
                "name": "Sanatani Bandhan",
                "url": "https://sanatanibandhan.com",
                "logo": "https://sanatanibandhan.com/logo.png",
                "description": "Provider of modern Dharmic administration and temple management software."
              }
            ]
          })
        }}
      />
`;

code = code.replace(
  `<div className="min-h-screen bg-white font-sans overflow-x-hidden selection:bg-[#FF9933] selection:text-white">`,
  `<div className="min-h-screen bg-white font-sans overflow-x-hidden selection:bg-[#FF9933] selection:text-white">\n${schemaMarkup}`
);

fs.writeFileSync('src/components/public/LandingPage.tsx', code);
