const fs = require('fs');
let code = fs.readFileSync('src/context/DataContext.tsx', 'utf8');

const replacement = `
    const collections = [
      { name: 'devotees', setter: setAllDevotees },
      { name: 'families', setter: setAllFamilies },
      { name: 'treasury', setter: setAllTreasury },
      { name: 'assets', setter: setAllAssets },
      { name: 'inventory', setter: setAllInventory },
      { name: 'poojaBookings', setter: setAllPoojaBookings },
      { name: 'residentPujas', setter: setAllResidentPujas },
      { name: 'pitruRecords', setter: setAllPitruRecords },
      { name: 'cows', setter: setAllCows },
      { name: 'annadanam', setter: setAllAnnadanamList },
      { name: 'gurukulStudents', setter: setAllGurukulStudents },
      { name: 'campaigns', setter: setAllCampaigns },
      { name: 'resolutions', setter: setAllResolutions },
      { name: 'shifts', setter: setAllShifts }
    ];

    const unsubscribes = collections.map(c => {
      let q;
      
      // Strict RBAC filtering for the global data sync
      if (['SUPER_ADMIN', 'TRUSTEE', 'ACCOUNTANT', 'MANAGER'].includes(currentRole)) {
        // Staff see all workspace data
        q = query(collection(db, c.name), where('workspaceId', '==', activeWorkspace.id));
      } else if (currentRole === 'PUROHIT') {
        // Purohit sees pooja bookings assigned to them, but also basic workspace data
        if (c.name === 'poojaBookings') {
           q = query(collection(db, c.name), where('workspaceId', '==', activeWorkspace.id), where('assignedPurohit', '==', firebaseUser.uid));
        } else {
           q = query(collection(db, c.name), where('workspaceId', '==', activeWorkspace.id));
        }
      } else {
        // DEVOTEE / VOLUNTEER see strictly their own data
        if (c.name === 'devotees') {
          q = query(collection(db, c.name), where('workspaceId', '==', activeWorkspace.id), where('id', '==', firebaseUser.uid));
        } else if (c.name === 'poojaBookings' || c.name === 'treasury') {
          q = query(collection(db, c.name), where('workspaceId', '==', activeWorkspace.id), where('devoteeId', '==', firebaseUser.uid));
        } else {
           // Skip fetching full collections for Devotees
           c.setter([]);
           return () => {};
        }
      }

      return onSnapshot(q, (snapshot) => {
        if (!snapshot.empty) {
          const items = snapshot.docs.map(doc => doc.data() as any);
          c.setter(items);
        }
      }, (err) => console.error("Firebase sync error for " + c.name, err));
    });
`;

code = code.replace(/const collections = \[[\s\S]*?console\.error\("Firebase sync error", err\)\);\n    }\);\n/, replacement);
fs.writeFileSync('src/context/DataContext.tsx', code);
