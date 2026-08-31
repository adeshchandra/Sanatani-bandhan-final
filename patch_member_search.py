import re

filepath = 'src/components/common/MemberSearchSelect.tsx'
with open(filepath, 'r') as f:
    content = f.read()

orig_filter = """  const filteredDevotees = devotees.filter(d => 
    d.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.phone?.includes(searchTerm) ||
    d.gotra?.toLowerCase().includes(searchTerm.toLowerCase())
  );"""

new_filter = """  const safeSearchTerm = searchTerm || '';
  const filteredDevotees = devotees.filter(d => {
    const nameMatch = (d.fullName || '').toLowerCase().includes(safeSearchTerm.toLowerCase());
    const phoneMatch = (d.phone || '').includes(safeSearchTerm);
    const gotraMatch = (d.gotra || '').toLowerCase().includes(safeSearchTerm.toLowerCase());
    return nameMatch || phoneMatch || gotraMatch;
  });"""

content = content.replace(orig_filter, new_filter)

with open(filepath, 'w') as f:
    f.write(content)
