import re

filepath = 'src/types.ts'
with open(filepath, 'r') as f:
    content = f.read()

content = content.replace(
    "auditVerified: boolean;",
    "auditVerified: boolean;\n  isRecurring?: boolean;\n  recurringInterval?: 'Monthly' | 'Annually';"
)

with open(filepath, 'w') as f:
    f.write(content)

