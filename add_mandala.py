import re

with open('src/components/public/PortalLogin.tsx', 'r') as f:
    content = f.read()

# Replace the generic geometric pattern with a subtle traditional/mandala-like pattern
old_pattern = r'url\("data:image/svg\+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www\.w3\.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"\)'

# A simple floral/mandala tile pattern
new_pattern = r'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M20 20c-5-5-10-5-10 0s5 10 10 10 10-5 10-10-5-10-10-10zm0 0c5-5 5-10 0-10s-10 5-10 10 5 10 10 10 10-5 10-10z\' fill=\'%23ffffff\' fill-opacity=\'1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")'

content = re.sub(old_pattern, new_pattern, content)

with open('src/components/public/PortalLogin.tsx', 'w') as f:
    f.write(content)
