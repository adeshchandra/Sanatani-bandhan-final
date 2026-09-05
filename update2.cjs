const fs = require('fs');
let content = fs.readFileSync('src/components/domain3/PoojaBookingDesk.tsx', 'utf8');

content = content.replace(
  "import { useData } from '../../context/DataContext';",
  "import { useData } from '../../context/DataContext';\nimport { useScopedData } from '../../hooks/useScopedData';"
);

content = content.replace(
  "  const { poojas, devotees, addPoojaBooking, updatePoojaStatus } = useData();",
  "  const { devotees, addPoojaBooking, updatePoojaStatus } = useData();\n  const poojas = useScopedData<PoojaBookingRecord>('pooja_bookings', {}, { orderBy: { field: 'bookingDate', direction: 'desc' } });"
);

fs.writeFileSync('src/components/domain3/PoojaBookingDesk.tsx', content);
