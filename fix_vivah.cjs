const fs = require('fs');
let code = fs.readFileSync('src/components/domain4/SanataniVivahDesk.tsx', 'utf8');

code = code.replace(
  "const { session, executeSafeUpdate } = useAuthWorkspace();",
  "const { currentUser, activeWorkspace } = useAuthWorkspace();"
);

code = code.replace(
  "name: session?.userName || '',",
  "name: currentUser?.name || '',"
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
  "p.uid === session.uid",
  "p.uid === currentUser?.id"
);

code = code.replace(
  "session]",
  "activeWorkspace, currentUser]"
);

code = code.replace(
  "communities/${session!.communityId}/vivah_profiles/${session!.uid}",
  "communities/${activeWorkspace!.id}/vivah_profiles/${currentUser!.id}"
);

code = code.replace(
  "uid: session!.uid,",
  "uid: currentUser!.id,"
);

code = code.replaceAll(
  "session?.uid",
  "currentUser?.id"
);


code = code.replace(
  "await executeSafeUpdate(updates, 'Vivah Profile Updated Successfully!');",
  "const batch = writeBatch(db);\n      for (const [path, data] of Object.entries(updates)) {\n        const docRef = doc(db, path);\n        batch.set(docRef, data, { merge: true });\n      }\n      await batch.commit();\n      // showToast('Vivah Profile Updated Successfully!');"
);

fs.writeFileSync('src/components/domain4/SanataniVivahDesk.tsx', code);
