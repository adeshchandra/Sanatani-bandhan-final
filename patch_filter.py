import re

with open('src/components/domain1/DevoteeGrid.tsx', 'r') as f:
    content = f.read()

target = """        (filterGroup === 'revoked' && d.pin === 'REVOKED');

      return matchSearch && matchGotra && matchTier && matchGroup;
    });
  }, [devotees, searchTerm, selectedGotra, selectedTier, filterGroup]);"""

replacement = """        (filterGroup === 'revoked' && d.pin === 'REVOKED');
      
      const matchAdvanced = (d.totalDonated || 0) >= advancedFilters.minDonation;

      return matchSearch && matchGotra && matchTier && matchGroup && matchAdvanced;
    });
  }, [devotees, searchTerm, selectedGotra, selectedTier, filterGroup, advancedFilters]);"""

if target in content:
    content = content.replace(target, replacement)
    with open('src/components/domain1/DevoteeGrid.tsx', 'w') as f:
        f.write(content)
    print("Patched successfully")
else:
    print("Target not found")
