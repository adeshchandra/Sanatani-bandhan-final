import { assertFails, assertSucceeds, initializeTestEnvironment, RulesTestEnvironment } from '@firebase/rules-unit-testing';
import * as fs from 'fs';

let testEnv: RulesTestEnvironment;

beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: 'demo-sanatanibandhan',
    firestore: {
      rules: fs.readFileSync('firestore.rules', 'utf8'),
      host: '127.0.0.1',
      port: 8080,
    },
  });
});

beforeEach(async () => {
  await testEnv.clearFirestore();
  
  await testEnv.withSecurityRulesDisabled(async (context) => {
    const db = context.firestore();
    // Setup Admin
    await db.collection('platform_admins').doc('global-admin-uid').set({ active: true });
    
    // Setup Workspaces
    await db.collection('workspaces').doc('ws-1').set({ name: 'Workspace 1' });
    await db.collection('workspaces').doc('ws-2').set({ name: 'Workspace 2' });

    // Setup Users
    await db.collection('users').doc('admin-1').set({ workspaceId: 'ws-1', role: 'SUPER_ADMIN' });
    await db.collection('users').doc('user-1').set({ workspaceId: 'ws-1', role: 'DEVOTEE' });
    await db.collection('users').doc('user-2').set({ workspaceId: 'ws-2', role: 'DEVOTEE' });

    // Setup Devotees (Tenant Data)
    await db.collection('devotees').doc('dev-1').set({ workspaceId: 'ws-1', name: 'Devotee 1' });
    await db.collection('devotees').doc('dev-2').set({ workspaceId: 'ws-2', name: 'Devotee 2' });

    // Setup Treasury
    await db.collection('treasury').doc('tr-1').set({ workspaceId: 'ws-1', amount: 100 });
  });
});

afterAll(async () => {
  await testEnv.cleanup();
});

describe('Firestore Security Rules', () => {

  it('1. Anonymous user cannot read protected tenant data', async () => {
    const unauthedDb = testEnv.unauthenticatedContext().firestore();
    await assertFails(unauthedDb.collection('devotees').get());
  });

  it('2. Workspace A user cannot read Workspace B devotees', async () => {
    const user1Db = testEnv.authenticatedContext('user-1').firestore();
    const query = user1Db.collection('devotees').where('workspaceId', '==', 'ws-2');
    await assertFails(query.get());
  });

  it('3. Workspace A user cannot write Workspace B data', async () => {
    const user1Db = testEnv.authenticatedContext('user-1').firestore();
    await assertFails(user1Db.collection('devotees').add({ workspaceId: 'ws-2', name: 'Hack' }));
  });

  it('4. User cannot change their own role', async () => {
    const user1Db = testEnv.authenticatedContext('user-1').firestore();
    await assertFails(user1Db.collection('users').doc('user-1').update({ role: 'SUPER_ADMIN' }));
  });

  it('5. User cannot change their own workspace membership', async () => {
    const user1Db = testEnv.authenticatedContext('user-1').firestore();
    await assertFails(user1Db.collection('users').doc('user-1').update({ workspaceId: 'ws-2' }));
  });

  it('6. Unauthorized user cannot create treasury records', async () => {
    const user1Db = testEnv.authenticatedContext('user-1').firestore(); // role DEVOTEE
    await assertFails(user1Db.collection('treasury').add({ workspaceId: 'ws-1', amount: 500 }));
  });

  it('7. Unauthorized user cannot modify treasury records', async () => {
    const user1Db = testEnv.authenticatedContext('user-1').firestore(); // role DEVOTEE
    await assertFails(user1Db.collection('treasury').doc('tr-1').update({ amount: 9999 }));
  });

  it('8. Non-participant cannot read a private chat', async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await context.firestore().collection('chats').doc('admin-1_user-1').collection('messages').add({ text: 'Hello' });
    });
    const user2Db = testEnv.authenticatedContext('user-2').firestore();
    await assertFails(user2Db.collection('chats').doc('admin-1_user-1').collection('messages').get());
  });

  it('9. Non-authorized user cannot modify protected chat data', async () => {
    const user2Db = testEnv.authenticatedContext('user-2').firestore();
    await assertFails(user2Db.collection('chats').doc('admin-1_user-1').set({ text: 'Hack' }));
  });

  it('10. Cross-workspace community access is denied', async () => {
    const user1Db = testEnv.authenticatedContext('user-1').firestore();
    await assertFails(user1Db.collection('communities').doc('ws-2').collection('social_feed').get());
  });

  it('11. Ordinary user cannot modify audit records', async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await context.firestore().collection('audit_logs').doc('audit-1').set({ workspaceId: 'ws-1', action: 'test' });
    });
    const user1Db = testEnv.authenticatedContext('user-1').firestore();
    await assertFails(user1Db.collection('audit_logs').doc('audit-1').update({ action: 'hacked' }));
  });

  it('12. Ordinary user cannot delete audit records', async () => {
    const user1Db = testEnv.authenticatedContext('user-1').firestore();
    await assertFails(user1Db.collection('audit_logs').doc('audit-1').delete());
  });

  it('13. User cannot change protected admin flags', async () => {
    const user1Db = testEnv.authenticatedContext('user-1').firestore();
    await assertFails(user1Db.collection('users').doc('user-1').update({ admin: true }));
  });

  it('14. User cannot impersonate another user', async () => {
    const user1Db = testEnv.authenticatedContext('user-1').firestore();
    await assertFails(user1Db.collection('users').doc('user-2').set({ role: 'DEVOTEE' }));
  });

  it('15. Authorized workspace administrator succeeds', async () => {
    const adminDb = testEnv.authenticatedContext('admin-1').firestore(); // SUPER_ADMIN in ws-1
    await assertSucceeds(adminDb.collection('treasury').add({ workspaceId: 'ws-1', amount: 1000 }));
  });

  it('16. Authorized global administrator succeeds where intended', async () => {
    const globalAdminDb = testEnv.authenticatedContext('global-admin-uid').firestore();
    await assertSucceeds(globalAdminDb.collection('devotees').doc('dev-2').update({ name: 'Updated' }));
  });

  it('17. Demo workspace bypass allows role setting', async () => {
    const demoDb = testEnv.authenticatedContext('demo-user').firestore();
    await assertSucceeds(demoDb.collection('users').doc('demo-user').set({ workspaceId: 'DEMO_123', role: 'SUPER_ADMIN' }));
  });

});
