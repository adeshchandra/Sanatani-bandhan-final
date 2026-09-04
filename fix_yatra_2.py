import re
filepath = 'src/components/domain7/YatraNetDesk.tsx'
with open(filepath, 'r') as f:
    c = f.read()
# We need to make sure the MESH container is closed properly
c = c.replace('''      </div>
      )} {/* End MESH tab */}
    </div>''', '''      </div>
      )}
    </div>''')
with open(filepath, 'w') as f:
    f.write(c)
