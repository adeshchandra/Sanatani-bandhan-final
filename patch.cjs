const fs = require('fs');
let code = fs.readFileSync('src/components/domain3/PoojaBookingDesk.tsx', 'utf8');

code = code.replace(
`          <Plus className="w-4 h-4" />
          <span>Book Pooja / Sankalp</span>
        </button>
      </div>`,
`          <Plus className="w-4 h-4" />
          <span>Book Pooja / Sankalp</span>
        </button>
        </div>
      </div>`
);

fs.writeFileSync('src/components/domain3/PoojaBookingDesk.tsx', code);
