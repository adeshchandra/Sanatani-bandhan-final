with open('src/components/domain6/PanchayatPollingDesk.tsx', 'r') as f:
    content = f.read()

# Fix the trailing braces issue
new_content = content.replace("      )}\n\n        </div>\n      ) : (\n        <CommunityPollsTab />\n      )}\n      <UpsellModal ", "      )}\n\n        </div>\n      ) : (\n        <CommunityPollsTab />\n      )}\n      <UpsellModal ")

with open('src/components/domain6/PanchayatPollingDesk.tsx', 'w') as f:
    f.write(new_content)
