const fs = require('fs');
let code = fs.readFileSync('src/components/domain3/PurohitMarketDesk.tsx', 'utf8');

// Add states
code = code.replace(
  "const [submitting, setSubmitting] = useState(false);",
  "const [submitting, setSubmitting] = useState(false);\n  const [isVerifiedPurohit, setIsVerifiedPurohit] = useState(false);\n  const [purohitApplication, setPurohitApplication] = useState<any>(null);\n  const [applyForm, setApplyForm] = useState({ name: session?.userName || '', phone: '', specialization: 'Vedic Rituals', experienceYears: '5', address: '', whyJoin: '' });\n  const [myOfferedGigs, setMyOfferedGigs] = useState<any[]>([]);\n  const [gigForm, setGigForm] = useState({ title: '', description: '', category: 'Mandir & Home Rituals', durationHours: 2, dakshinaFee: 1500 });"
);

// Add snapshot listeners
code = code.replace(
  "const unsubCon = onSnapshot(conRef, (snap) => {",
  `const myPurohitRef = doc(db, \`communities/\${session.communityId}/purohits/\${session.uid}\`);
    const unsubMyPurohit = onSnapshot(myPurohitRef, (docSnap) => {
      if (docSnap.exists()) {
        setIsVerifiedPurohit(true);
      } else {
        setIsVerifiedPurohit(false);
      }
    });

    const myAppRef = doc(db, \`communities/\${session.communityId}/purohit_applications/\${session.uid}\`);
    const unsubMyApp = onSnapshot(myAppRef, (docSnap) => {
      if (docSnap.exists()) {
        setPurohitApplication(docSnap.data());
      } else {
        setPurohitApplication(null);
      }
    });
    
    const unsubCon = onSnapshot(conRef, (snap) => {`
);

code = code.replace(
  "return () => { unsubGigs(); unsubCon(); clearTimeout(failsafe); };",
  "return () => { unsubGigs(); unsubCon(); unsubMyPurohit(); unsubMyApp(); clearTimeout(failsafe); };"
);

// Populate myOfferedGigs
code = code.replace(
  "setGigs(list);",
  "setGigs(list);\n        setMyOfferedGigs(list.filter(g => g.purohitId === session.uid));"
);

fs.writeFileSync('src/components/domain3/PurohitMarketDesk.tsx', code);
