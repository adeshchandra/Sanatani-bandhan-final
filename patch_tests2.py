import re

with open('tests/firestore.rules.spec.ts', 'r') as f:
    content = f.read()

content = content.replace("authenticatedContext('global-admin-user')", "authenticatedContext('global-admin-uid')")
content = content.replace("const demoDb = testEnv.authenticatedContext('demo-user').firestore();\n    await assertSucceeds(demoDb.collection('yatra_broadcasts').add({ communityId: 'DEMO_123', type: 'RICH_SOS' }));", """const demoDb = testEnv.authenticatedContext('demo-user').firestore();
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await context.firestore().collection('users').doc('demo-user').set({ workspaceId: 'DEMO_123' });
    });
    await assertSucceeds(demoDb.collection('yatra_broadcasts').add({ communityId: 'DEMO_123', type: 'RICH_SOS' }));""")

with open('tests/firestore.rules.spec.ts', 'w') as f:
    f.write(content)
