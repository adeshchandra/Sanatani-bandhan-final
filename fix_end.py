import re
filepath = 'src/components/domain7/YatraNetDesk.tsx'
with open(filepath, 'r') as f:
    text = f.read()

# Let's replace from line 882 to end
replacement = '''          </div>
        </div>
      )}

      </>
      )}
      </div>
      )}
    </div>
  );
}'''

# Find the index of "BROADCAST TO MESH NETWORK" to anchor our replacement
import re
text = re.sub(r'          </div>\s+</div>\s+)}\s+</>\s+)}\s+</div>\s+\);\s+}', replacement, text)

with open(filepath, 'w') as f:
    f.write(text)
