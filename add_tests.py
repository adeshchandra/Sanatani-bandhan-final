import re

with open('tests/firestore.rules.spec.ts', 'r') as f:
    content = f.read()

new_tests = """
  it('30. Ordinary user cannot create platform admin record', async () => {
    const user1Db = testEnv.authenticatedContext('user-1').firestore();
    await assertFails(user1Db.collection('platform_admins').doc('user-1').set({ active: true }));
  });

  it('31. Ordinary user cannot modify platform admin record', async () => {
    const user1Db = testEnv.authenticatedContext('user-1').firestore();
    await assertFails(user1Db.collection('platform_admins').doc('admin-1').update({ active: false }));
  });

  it('32. Demo user cannot alter production workspaces', async () => {
    const demoDb = testEnv.authenticatedContext('demo-user-1').firestore();
    await assertFails(demoDb.collection('workspaces').doc('ws-1').update({ name: 'Hacked' }));
  });

  it('33. Chat participant can access chat', async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await context.firestore().collection('chats').doc('chat1').set({ participants: ['user-1', 'user-2'] });
    });
    const user1Db = testEnv.authenticatedContext('user-1').firestore();
    await assertSucceeds(user1Db.collection('chats').doc('chat1').get());
  });

  it('34. Participant cannot arbitrarily change participants', async () => {
    const user1Db = testEnv.authenticatedContext('user-1').firestore();
    await assertFails(user1Db.collection('chats').doc('chat1').update({ participants: ['user-1', 'hacker'] }));
  });

  it('35. SenderId cannot be forged in chat messages', async () => {
    const user1Db = testEnv.authenticatedContext('user-1').firestore();
    await assertFails(user1Db.collection('chats').doc('chat1').collection('messages').add({ senderId: 'user-2', text: 'Forgery' }));
  });

  it('36. Ordinary user can create only their own legitimate audit event', async () => {
    const user1Db = testEnv.authenticatedContext('user-1').firestore();
    await assertSucceeds(user1Db.collection('audit_logs').add({ workspaceId: 'ws-1', actorId: 'user-1', action: 'test' }));
  });

  it('37. ActorId cannot be forged in audit event', async () => {
    const user1Db = testEnv.authenticatedContext('user-1').firestore();
    await assertFails(user1Db.collection('audit_logs').add({ workspaceId: 'ws-1', actorId: 'user-2', action: 'test' }));
  });

  it('38. WorkspaceId cannot be forged in audit event', async () => {
    const user1Db = testEnv.authenticatedContext('user-1').firestore();
    await assertFails(user1Db.collection('audit_logs').add({ workspaceId: 'ws-2', actorId: 'user-1', action: 'test' }));
  });

  it('39. Cross-workspace access denied in audit logs', async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await context.firestore().collection('audit_logs').doc('audit-ws-2').set({ workspaceId: 'ws-2', actorId: 'user-2', action: 'test' });
    });
    const user1Db = testEnv.authenticatedContext('user-1').firestore();
    await assertFails(user1Db.collection('audit_logs').doc('audit-ws-2').get());
  });
});
"""

# Replace the closing "});" at the end of the file
content = re.sub(r'}\);\s*$', new_tests, content)

with open('tests/firestore.rules.spec.ts', 'w') as f:
    f.write(content)
