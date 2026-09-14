import re

with open('firestore.rules', 'r') as f:
    rules = f.read()

# Fix users create rule
rules = re.sub(
    r"allow create: if isAuthenticated\(\) && request\.auth\.uid == userId \s*&&\s*!request\.resource\.data\.keys\(\)\.hasAny\(\['admin', 'isGlobalAdmin', 'status'\]\)\s*&&\s*\(\s*!request\.resource\.data\.keys\(\)\.hasAny\(\['workspaceId', 'defaultWorkspaceId', 'role'\]\)\s*\|\|\s*isDemoWorkspace\(request\.resource\.data\.get\('workspaceId', null\)\)\s*\);",
    """allow create: if isAuthenticated() && request.auth.uid == userId 
        && !request.resource.data.keys().hasAny(['admin', 'isGlobalAdmin', 'status'])
        && ( 
           !request.resource.data.keys().hasAny(['workspaceId', 'defaultWorkspaceId', 'role', 'membership']) 
           || isDemoWorkspace(request.resource.data.get('workspaceId', null))
        );""",
    rules
)

with open('firestore.rules', 'w') as f:
    f.write(rules)
