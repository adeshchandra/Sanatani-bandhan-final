import re

filepath = 'src/components/domain7/YatraNetDesk.tsx'
with open(filepath, 'r') as f:
    content = f.read()

content = content.replace("        </div>\n      ) : (\n      {/* Hardware Requirement Banner */}", "        </div>\n      ) : (\n      <div className=\"space-y-6 animate-in slide-in-from-bottom-4\">\n      {/* Hardware Requirement Banner */}")
content = content.replace("      )} {/* End MESH tab */}\n    </div>", "      </div>\n      )} {/* End MESH tab */}\n    </div>")

with open(filepath, 'w') as f:
    f.write(content)
