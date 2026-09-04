import re

filepath = 'src/context/AuthWorkspaceContext.tsx'
with open(filepath, 'r') as f:
    content = f.read()

if "firebaseUser:" not in content:
    # Add to interface
    content = content.replace("isAuthenticated: boolean;", "isAuthenticated: boolean;\n  firebaseUser: any;")
    
    # Add state
    content = content.replace("const [currentDevotee, setCurrentDevotee] = useState", "const [firebaseUser, setFirebaseUser] = useState<any>(null);\n  const [currentDevotee, setCurrentDevotee] = useState")
    
    # Update onAuthStateChanged
    content = content.replace("const unsubscribe = onAuthStateChanged(auth, async (user) => {\n      if (user) {", "const unsubscribe = onAuthStateChanged(auth, async (user) => {\n      setFirebaseUser(user);\n      if (user) {")
    content = content.replace("} else {\n        setIsAuthenticated(false);", "} else {\n        setFirebaseUser(null);\n        setIsAuthenticated(false);")
    
    # Add to Provider value
    content = content.replace("isAuthenticated,", "isAuthenticated,\n        firebaseUser,")

with open(filepath, 'w') as f:
    f.write(content)

