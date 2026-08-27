const fs = require('fs');
let code = fs.readFileSync('src/components/domain5/PersonalSadhanaDesk.tsx', 'utf8');

code = code.replace(
  "const { session, executeSafeUpdate } = useAuthWorkspace();",
  "const { currentUser, activeWorkspace } = useAuthWorkspace();"
);

code = code.replace(
  "if (!session?.communityId) return;",
  "if (!activeWorkspace?.id || !currentUser?.id) return;"
);

code = code.replace(
  "communities/${session.communityId}",
  "communities/${activeWorkspace.id}"
);

code = code.replace(
  "l.uid === session.uid",
  "l.uid === currentUser?.id"
);

code = code.replace(
  "session]",
  "activeWorkspace, currentUser]"
);

code = code.replace(
  "communities/${session!.communityId}",
  "communities/${activeWorkspace!.id}"
);

code = code.replace(
  "uid: session!.uid,",
  "uid: currentUser!.id,"
);

code = code.replace(
  "await executeSafeUpdate(updates, 'Sadhana Logged for today!');",
  "const batch = writeBatch(db);\n      for (const [path, data] of Object.entries(updates)) {\n        const docRef = doc(db, path);\n        batch.set(docRef, data, { merge: true });\n      }\n      await batch.commit();\n      // showToast('Sadhana Logged for today!');"
);

fs.writeFileSync('src/components/domain5/PersonalSadhanaDesk.tsx', code);
