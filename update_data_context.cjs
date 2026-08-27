const fs = require('fs');

let code = fs.readFileSync('src/context/DataContext.tsx', 'utf8');

if (!code.includes('seedDemoData: (workspaceId: string, type: string) => void;')) {
    code = code.replace(
        `addDevotee: (devotee: Omit<DevoteeMember, 'id' | 'qrCodeRef' | 'joinedDate'>) => boolean;`,
        `seedDemoData: (workspaceId: string, type: string) => void;\n  addDevotee: (devotee: Omit<DevoteeMember, 'id' | 'qrCodeRef' | 'joinedDate'>) => boolean;`
    );
}

const seedMethod = `
  const seedDemoData = (workspaceId: string, type: string) => {
    // Add 2 dummy devotees
    const d1 = {
      id: "dev_" + Date.now() + "_1", workspaceId,
      name: 'Ramesh Sharma',
      phone: '+91 9876543210',
      gotra: 'Kashyapa',
      joinedDate: new Date().toISOString(),
      skills: ['Volunteer', 'Pooja'],
      address: 'Kashi',
      isActive: true,
      membershipTier: 'lifetime',
      qrCodeRef: 'SB-1001'
    };
    const d2 = {
      id: "dev_" + Date.now() + "_2", workspaceId,
      name: 'Priya Patel',
      phone: '+91 9876543211',
      gotra: 'Bharadwaja',
      joinedDate: new Date().toISOString(),
      skills: ['Accounts', 'Seva'],
      address: 'Ayodhya',
      isActive: true,
      membershipTier: 'annual',
      qrCodeRef: 'SB-1002'
    };
    setAllDevotees(prev => [...prev, d1, d2]);

    // Add 2 dummy transactions
    const t1 = {
      id: "tx_" + Date.now() + "_1", workspaceId,
      date: new Date().toISOString(),
      amount: 5100,
      type: 'IN',
      category: 'Donation',
      description: 'Gupt Daan',
      paymentMethod: 'UPI',
      referenceId: 'UPI-1001',
      handledBy: 'Demo Admin',
      auditVerified: true
    };
    const t2 = {
      id: "tx_" + Date.now() + "_2", workspaceId,
      date: new Date().toISOString(),
      amount: 2100,
      type: 'OUT',
      category: 'Maintenance',
      description: 'Flower Decoration',
      paymentMethod: 'Cash',
      handledBy: 'Demo Admin',
      auditVerified: true
    };
    setAllTreasury(prev => [...prev, t1, t2]);

    // Add 2 campaigns
    const c1 = {
      id: "camp_" + Date.now() + "_1", workspaceId,
      title: 'Mandir Jirnoddhar',
      description: 'Renovation of main sanctum',
      targetAmount: 500000,
      collectedAmount: 125000,
      currency: 'INR',
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 86400000 * 30).toISOString(),
      status: 'active',
      recentDonors: []
    };
    const c2 = {
      id: "camp_" + Date.now() + "_2", workspaceId,
      title: 'Goshala Fodder Fund',
      description: 'Monthly fodder for 100 cows',
      targetAmount: 50000,
      collectedAmount: 25000,
      currency: 'INR',
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 86400000 * 30).toISOString(),
      status: 'active',
      recentDonors: []
    };
    setAllCampaigns(prev => [...prev, c1, c2]);
  };
`;

if (!code.includes('const seedDemoData =')) {
    code = code.replace(
        `  const addDevotee = (data: Omit<DevoteeMember, 'id' | 'qrCodeRef' | 'joinedDate'>): boolean => {`,
        seedMethod + `\n  const addDevotee = (data: Omit<DevoteeMember, 'id' | 'qrCodeRef' | 'joinedDate'>): boolean => {`
    );
}

if (!code.includes('seedDemoData,')) {
    code = code.replace(
        `<DataContext.Provider value={{`,
        `<DataContext.Provider value={{\n      seedDemoData,`
    );
}

fs.writeFileSync('src/context/DataContext.tsx', code);
