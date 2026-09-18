import re

with open('tests/firestore.rules.spec.ts', 'r') as f:
    content = f.read()

new_tests = """
  it('40. Anonymous user cannot read production Yatra broadcasts', async () => {
    const unauthDb = testEnv.unauthenticatedContext().firestore();
    await assertFails(unauthDb.collection('yatra_broadcasts').doc('broadcast-ws-1').get());
  });
  
  it('41. Anonymous user cannot create production Yatra broadcasts', async () => {
    const unauthDb = testEnv.unauthenticatedContext().firestore();
    await assertFails(unauthDb.collection('yatra_broadcasts').add({ communityId: 'ws-1', type: 'RICH_SOS' }));
  });

  it('42. Authorized tenant user can read their own tenants broadcasts', async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await context.firestore().collection('yatra_broadcasts').doc('broadcast-ws-1').set({ communityId: 'ws-1', type: 'RICH_SOS' });
    });
    const user1Db = testEnv.authenticatedContext('user-1').firestore();
    await assertSucceeds(user1Db.collection('yatra_broadcasts').doc('broadcast-ws-1').get());
  });

  it('43. Authorized tenant user can create a broadcast for their own tenant', async () => {
    const user1Db = testEnv.authenticatedContext('user-1').firestore();
    await assertSucceeds(user1Db.collection('yatra_broadcasts').add({ communityId: 'ws-1', type: 'RICH_SOS' }));
  });

  it('44. Tenant A cannot read Tenant Bs broadcast', async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await context.firestore().collection('yatra_broadcasts').doc('broadcast-ws-2').set({ communityId: 'ws-2', type: 'RICH_SOS' });
    });
    const user1Db = testEnv.authenticatedContext('user-1').firestore();
    await assertFails(user1Db.collection('yatra_broadcasts').doc('broadcast-ws-2').get());
  });

  it('45. Tenant A cannot create a broadcast for Tenant B', async () => {
    const user1Db = testEnv.authenticatedContext('user-1').firestore();
    await assertFails(user1Db.collection('yatra_broadcasts').add({ communityId: 'ws-2', type: 'RICH_SOS' }));
  });

  it('46. Tenant A cannot update Tenant Bs broadcast', async () => {
    const user1Db = testEnv.authenticatedContext('user-1').firestore();
    await assertFails(user1Db.collection('yatra_broadcasts').doc('broadcast-ws-2').update({ sosStatus: 'RESPONDED' }));
  });

  it('47. Tenant A cannot delete Tenant Bs broadcast', async () => {
    const user1Db = testEnv.authenticatedContext('user-1').firestore();
    await assertFails(user1Db.collection('yatra_broadcasts').doc('broadcast-ws-2').delete());
  });

  it('48. Tenant A cannot change its own broadcasts tenant/workspace to Tenant B', async () => {
    const user1Db = testEnv.authenticatedContext('user-1').firestore();
    await assertFails(user1Db.collection('yatra_broadcasts').doc('broadcast-ws-1').update({ communityId: 'ws-2' }));
  });

  it('49. Global admin can read and delete any broadcast', async () => {
    const adminDb = testEnv.authenticatedContext('global-admin-user').firestore();
    await assertSucceeds(adminDb.collection('yatra_broadcasts').doc('broadcast-ws-1').get());
    await assertSucceeds(adminDb.collection('yatra_broadcasts').doc('broadcast-ws-1').delete());
  });

  it('50. DEMO isolation remains intact for broadcasts', async () => {
    const demoDb = testEnv.authenticatedContext('demo-user').firestore();
    await assertSucceeds(demoDb.collection('yatra_broadcasts').add({ communityId: 'DEMO_123', type: 'RICH_SOS' }));
  });

  it('51. Production cannot be accessed through a DEMO workspace path for broadcasts', async () => {
    const demoDb = testEnv.authenticatedContext('demo-user').firestore();
    await assertFails(demoDb.collection('yatra_broadcasts').doc('broadcast-ws-1').get());
    await assertFails(demoDb.collection('yatra_broadcasts').add({ communityId: 'ws-1', type: 'RICH_SOS' }));
  });
"""

# Replace the last }); with the new tests and then });
content = re.sub(r'}\);\s*$', new_tests + '});\n', content)

with open('tests/firestore.rules.spec.ts', 'w') as f:
    f.write(content)
