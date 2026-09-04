import re

filepath = 'src/components/domain2/MandirCampaignsDesk.tsx'
with open(filepath, 'r') as f:
    content = f.read()

content = content.replace("camp.topDonors.map((d, idx) =>", "(camp.topDonors || []).map((d, idx) =>")
content = content.replace("campaigns.map((camp, idx) =>", "(campaigns || []).map((camp, idx) =>")

with open(filepath, 'w') as f:
    f.write(content)
