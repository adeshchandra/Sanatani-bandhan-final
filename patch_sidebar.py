import re

filepath = 'src/components/common/Sidebar.tsx'
with open(filepath, 'r') as f:
    content = f.read()

content = content.replace("  Check,\n  Wifi,\n  WifiOff,\n  CloudOff,\n  RefreshCcw\n}", "  Check\n}")

with open(filepath, 'w') as f:
    f.write(content)
