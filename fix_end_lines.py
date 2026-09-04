with open('src/components/domain7/YatraNetDesk.tsx', 'r') as f:
    lines = f.readlines()

# find the line with "BROADCAST TO MESH NETWORK"
idx = -1
for i, line in enumerate(lines):
    if "BROADCAST TO MESH NETWORK" in line:
        idx = i
        break

if idx != -1:
    new_end = [
        "              </button>\n",
        "            </div>\n",
        "          </div>\n",
        "        </div>\n",
        "      )}\n",
        "\n",
        "      </>\n",
        "      )}\n",
        "      </div>\n",
        "      )}\n",
        "    </div>\n",
        "  );\n",
        "}\n"
    ]
    # Keep up to the line with "BROADCAST TO MESH NETWORK"
    # Actually wait, the "BROADCAST" is at idx.
    # So idx+1 should be "</button>".
    lines = lines[:idx+1] + new_end
    
    with open('src/components/domain7/YatraNetDesk.tsx', 'w') as f:
        f.writelines(lines)
