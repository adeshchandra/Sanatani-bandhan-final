const fs = require('fs');

let code = fs.readFileSync('src/components/public/PortalLogin.tsx', 'utf8');

code = code.replace(
  `<p>© {new Date().getFullYear()} Sanatani Bandhan</p>`,
  `<p>Made with ❤️ by TrackIQ Academy • Universal Community Management</p>\n          <p>© {new Date().getFullYear()} Sanatani Bandhan</p>`
);

fs.writeFileSync('src/components/public/PortalLogin.tsx', code);
