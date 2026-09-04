import re

filepath = 'src/context/DataContext.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# Replace interface method
content = content.replace(
    "updatePoojaStatus: (id: string, status: PoojaBooking['status']) => void;", 
    "updatePoojaStatus: (id: string, status: PoojaBooking['status'], additionalUpdates?: Partial<PoojaBooking>) => void;"
)

# Replace implementation
impl_old = """  const updatePoojaStatus = (id: string, status: PoojaBooking['status']) => {
    setAllPoojaBookings((prev) =>
      prev.map((b, idx) => (b.id === id ? { ...b, status } : b))
    );
    showToast(`Pooja status updated to ${status}`, 'success');
  };"""

impl_new = """  const updatePoojaStatus = (id: string, status: PoojaBooking['status'], additionalUpdates?: Partial<PoojaBooking>) => {
    setAllPoojaBookings((prev) =>
      prev.map((b, idx) => (b.id === id ? { ...b, status, ...additionalUpdates } : b))
    );
    showToast(`Pooja status updated to ${status}`, 'success');
  };"""

content = content.replace(impl_old, impl_new)

with open(filepath, 'w') as f:
    f.write(content)
