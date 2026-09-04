import re

with open('src/components/domain6/PanchayatPollingDesk.tsx', 'r') as f:
    content = f.read()

# I will find the badly patched block and replace it correctly.
# First let's restore the whole file to my earlier backup if I had one? No I didn't back it up.
# Let's write python to fix the broken block.

