import re
filepath = 'src/components/domain3/PurohitMarketDesk.tsx'
with open(filepath, 'r') as f:
    c = f.read()

c = c.replace('''            )}
          </div>
        )}
      </div>

      {selectedGig''', '''            )}
          </div>
        </div>
      )}

      {selectedGig''')

with open(filepath, 'w') as f:
    f.write(c)
