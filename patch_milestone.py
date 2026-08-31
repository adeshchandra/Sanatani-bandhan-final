import re

with open('src/context/DataContext.tsx', 'r') as f:
    content = f.read()

target = """      // Update devotee total if linked
      if (tx.devoteeId) {
        setAllDevotees((prev) =>
          prev.map((d) =>
            d.id === tx.devoteeId
              ? {
                  ...d,
                  totalDonated: d.totalDonated + tx.amount,
                  sevaIndex: Math.min(1000, d.sevaIndex + Math.floor(tx.amount / 100)),
                }
              : d
          )
        );
      }"""

replacement = """      // Update devotee total if linked
      if (tx.devoteeId) {
        const devotee = allDevotees.find(d => d.id === tx.devoteeId);
        if (devotee) {
          const oldTotal = devotee.totalDonated || 0;
          const newTotal = oldTotal + tx.amount;
          const milestones = [100000, 500000, 1000000, 5000000, 10000000];
          for (const m of milestones) {
            if (oldTotal < m && newTotal >= m) {
              setTimeout(() => {
                showToast(`🏆 Milestone Alert! ${devotee.fullName} crossed ₹${m.toLocaleString()} in lifetime donations!`, 'success', 'Major Contributor');
              }, 1500);
            }
          }
        }

        setAllDevotees((prev) =>
          prev.map((d) =>
            d.id === tx.devoteeId
              ? {
                  ...d,
                  totalDonated: (d.totalDonated || 0) + tx.amount,
                  sevaIndex: Math.min(1000, (d.sevaIndex || 0) + Math.floor(tx.amount / 100)),
                }
              : d
          )
        );
      }"""

if target in content:
    content = content.replace(target, replacement)
    with open('src/context/DataContext.tsx', 'w') as f:
        f.write(content)
    print("Patched successfully")
else:
    print("Target not found")
