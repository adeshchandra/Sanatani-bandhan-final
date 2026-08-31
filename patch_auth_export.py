import re

filepath = 'src/context/AuthWorkspaceContext.tsx'
with open(filepath, 'r') as f:
    content = f.read()
    
# We want to make sure it exports everything cleanly
