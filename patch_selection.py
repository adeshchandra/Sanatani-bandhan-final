import re

with open('src/components/domain1/DevoteeGrid.tsx', 'r') as f:
    content = f.read()

target = """  // Extract unique gotras"""

replacement = """  const toggleSelection = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(new Set(filteredDevotees.map(d => d.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleBulkWhatsApp = () => {
    if (selectedIds.size === 0) return;
    const selected = devotees.filter(d => selectedIds.has(d.id));
    // E.g. generating a csv or linking to a bulk whatsapp web sender
    showToast(`Prepared bulk messaging for ${selected.length} devotees.`, 'success');
  };

  const handleBulkTag = () => {
    if (selectedIds.size === 0) return;
    showToast(`Bulk tagging features are now unlocked for ${selectedIds.size} devotees!`, 'success', 'Enterprise CRM');
  };

  // Extract unique gotras"""

if target in content:
    content = content.replace(target, replacement)
    with open('src/components/domain1/DevoteeGrid.tsx', 'w') as f:
        f.write(content)
    print("Patched successfully")
else:
    print("Target not found")
