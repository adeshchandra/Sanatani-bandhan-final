const { initializeTestEnvironment, assertFails, assertSucceeds } = require('@firebase/rules-unit-testing');
const fs = require('fs');

let testEnv;

async function runTests() {
  testEnv = await initializeTestEnvironment({
    projectId: 'demo-project',
    firestore: {
      rules: fs.readFileSync('firestore.rules', 'utf8'),
    },
  });

  // Test setup
  await testEnv.withSecurityRulesDisabled(async (context) => {
    const db = context.firestore();
    // Create Workspace 1 and 2
    await db.collection('workspaces').doc('ws1').set({ name: 'Workspace 1' });
    await db.collection('workspaces').doc('ws2').set({ name: 'Workspace 2' });
    
    // User roles
    await db.collection('users').doc('devotee1').set({
      role: 'DEVOTEE',
      roles: { 'ws1': 'DEVOTEE' }
    });
    
    await db.collection('users').doc('accountant1').set({
      role: 'DEVOTEE',
      roles: { 'ws1': 'ACCOUNTANT' }
    });
    
    await db.collection('users').doc('admin1').set({
      roles: { 'ws1': 'SUPER_ADMIN' }
    });
    
    // Devotee records
    await db.collection('workspaces').doc('ws1').collection('devotees').doc('devotee1').set({ name: 'Devotee 1' });
    await db.collection('workspaces').doc('ws1').collection('devotees').doc('devotee2').set({ name: 'Devotee 2' });
    
    // Treasury
    await db.collection('workspaces').doc('ws1').collection('treasury').doc('don1').set({ amount: 100 });
  });

  const devotee1 = testEnv.authenticatedContext('devotee1').firestore();
  const accountant1 = testEnv.authenticatedContext('accountant1').firestore();
  const admin1 = testEnv.authenticatedContext('admin1').firestore();
  
  // Verify DEVOTEE from Workspace A cannot access Workspace B data
  // Devotee1 tries to read ws2
  await assertFails(devotee1.collection('workspaces').doc('ws2').get());
  
  // Verify DEVOTEE can only see their own data
  await assertSucceeds(devotee1.collection('workspaces').doc('ws1').collection('devotees').doc('devotee1').get());
  await assertFails(devotee1.collection('workspaces').doc('ws1').collection('devotees').doc('devotee2').get());
  
  // Verify ACCOUNTANT can see all workspace donations (treasury)
  await assertSucceeds(accountant1.collection('workspaces').doc('ws1').collection('treasury').doc('don1').get());
  // Devotee should fail to see treasury
  await assertFails(devotee1.collection('workspaces').doc('ws1').collection('treasury').doc('don1').get());
  
  // Admin can see treasury
  await assertSucceeds(admin1.collection('workspaces').doc('ws1').collection('treasury').doc('don1').get());
  
  console.log("ALL TESTS PASSED");
}

runTests().catch(e => {
  console.error("TEST FAILED", e);
  process.exit(1);
});
