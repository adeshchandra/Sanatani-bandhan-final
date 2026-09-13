const fs = require('fs');
let content = fs.readFileSync('src/context/AuthWorkspaceContext.tsx', 'utf8');

// Replace loginWithPin
content = content.replace(
`  const loginWithPin = (pin: string, devoteeList: DevoteeMember[]): boolean => {
    // Firebase Auth is bypassed due to IAM lock. Local state governs the prototype UI.

    // Admin Master Override PIN
    if (pin === '1008' || pin === activeWorkspace.adminPin) {
      setCurrentRole('SUPER_ADMIN');
      setIsAuthenticated(true);
      return true;
    }

    // Match devotee by PIN
    const match = devoteeList.find((d) => d.pin === pin || d.phone.endsWith(pin));
    if (match) {
      setCurrentDevotee(match);
      setCurrentRole(match.role || 'DEVOTEE');
      setIsAuthenticated(true);
      set('sanatani_current_devotee', match);
      return true;
    }
    return false;
  };`,
`  const loginWithPin = (pin: string, devoteeList: DevoteeMember[]): boolean => {
    if (pin === '1008' || pin === activeWorkspace.adminPin) {
      setCurrentRole('SUPER_ADMIN');
      setIsAuthenticated(true);
      signInAnonymously(auth).catch(console.error);
      return true;
    }
    const match = devoteeList.find((d) => d.pin === pin || d.phone.endsWith(pin));
    if (match) {
      setCurrentDevotee(match);
      setCurrentRole(match.role || 'DEVOTEE');
      setIsAuthenticated(true);
      set('sanatani_current_devotee', match);
      signInAnonymously(auth).catch(console.error);
      return true;
    }
    return false;
  };`
);

// Replace loginAsRole
content = content.replace(
`  const loginAsRole = (role: UserRole, customName?: string) => {
    // Firebase Auth is bypassed due to IAM lock. Local state governs the prototype UI.
    
    setCurrentRole(role);
    setIsAuthenticated(true);
    setViewMode('MANAGER');`,
`  const loginAsRole = (role: UserRole, customName?: string) => {
    setCurrentRole(role);
    setIsAuthenticated(true);
    setViewMode('MANAGER');
    signInAnonymously(auth).catch(console.error);`
);

fs.writeFileSync('src/context/AuthWorkspaceContext.tsx', content);
