import re

file1 = 'src/components/domain3/PurohitMarketDesk.tsx'
with open(file1, 'r') as f:
    content1 = f.read()
# The issue is that the opening {activeTab === 'GIGS' && ( doesn't have a matching div?
# Let's just fix it automatically.
content1 = content1.replace('''            )}
          </div>
        </div>
      )}''', '''            )}
          </div>
        )}
      </div>''')
with open(file1, 'w') as f:
    f.write(content1)

file2 = 'src/components/domain7/YatraNetDesk.tsx'
with open(file2, 'r') as f:
    content2 = f.read()

# fix the end of file
content2 = content2.replace('''      )}
      </>
      )}
    </div>
  );
}''', '''      )}
    </div>
  );
}''')
content2 = content2.replace("    <div className=\"max-w-4xl mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-300 pb-24\">\n      {/* Tabs */}", "    <div className=\"max-w-4xl mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-300 pb-24\">\n      {/* Tabs */}")
# Wait, YatraNetDesk.tsx line 297: `JSX element 'div' has no corresponding closing tag.`
# Around line 297 is where the `MESH` tab starts.
# `      ) : (\n      <div className="space-y-6 animate-in slide-in-from-bottom-4">`
content2 = content2.replace("        </div>\n      ) : (\n      <div className=\"space-y-6 animate-in slide-in-from-bottom-4\">\n      {/* Hardware Requirement Banner */}", "        </div>\n      ) : (\n      <div className=\"space-y-6 animate-in slide-in-from-bottom-4\">\n      {/* Hardware Requirement Banner */}")
with open(file2, 'w') as f:
    f.write(content2)
