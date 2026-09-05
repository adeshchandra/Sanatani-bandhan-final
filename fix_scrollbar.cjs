const fs = require('fs');
let indexcss = fs.readFileSync('src/index.css', 'utf8');

if (!indexcss.includes('.scrollbar-hide')) {
  indexcss += `

@layer utilities {
  .scrollbar-hide::-webkit-scrollbar {
      display: none;
  }
  .scrollbar-hide {
      -ms-overflow-style: none;
      scrollbar-width: none;
  }
  
  .pt-safe {
    padding-top: env(safe-area-inset-top);
  }
  .pb-safe {
    padding-bottom: env(safe-area-inset-bottom);
  }
}
`;
  fs.writeFileSync('src/index.css', indexcss);
}
