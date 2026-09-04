import re
filepath = 'src/services/OfflineSyncManager.ts'
with open(filepath, 'r') as f:
    text = f.read()

text = text.replace("'FORWARD_SOS' | 'RESOLVE_SOS';", "'FORWARD_SOS' | 'RESOLVE_SOS' | 'POST_SOCIAL' | 'PRANAM_POST' | 'HIDE_SOCIAL_POST';")

with open(filepath, 'w') as f:
    f.write(text)
