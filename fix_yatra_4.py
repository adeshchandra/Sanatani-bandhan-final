import re
filepath = 'src/components/domain7/YatraNetDesk.tsx'
with open(filepath, 'r') as f:
    c = f.read()

c = c.replace("      )}\n    </div>\n  );\n}", "      </div>\n      )}\n    </div>\n  );\n}")

with open(filepath, 'w') as f:
    f.write(c)
