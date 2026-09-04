import re

filepath = 'src/components/domain6/PanchayatPollingDesk.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# Make the quorum calculation reactive instead of just relying on the fixed flag.
# If votes in favor > 3, we declare quorum met visually (just as an example).

old_quorum = """                {/* Progress Bar for Votes */}
                {res.quorumMet && ("""

new_quorum = """                {/* Progress Bar for Votes */}
                {(res.quorumMet || res.votesInFavor >= 3) && ("""

content = content.replace(old_quorum, new_quorum)

with open(filepath, 'w') as f:
    f.write(content)
