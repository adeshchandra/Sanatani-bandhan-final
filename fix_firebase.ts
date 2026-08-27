import fs from 'fs';

function fixFile(file: string) {
  let content = fs.readFileSync(file, 'utf8');

  // Fix imports
  content = content.replace(/import \{ ref, onValue, update, push \} from 'firebase\/database';/, 
    `import { doc, collection, onSnapshot, writeBatch, deleteDoc, setDoc, addDoc } from 'firebase/firestore';`);
  
  // Fix pushToDataLayer
  content = content.replace(/import \{ pushToDataLayer \} from '..\/..\/utils\/gtm';/, `// pushToDataLayer removed`);
  content = content.replace(/pushToDataLayer\([^;]+;/g, `console.log('Telemetry skipped');`);

  // Fix workspaceType
  content = content.replace(/const \{ t, language, workspaceType \} = useLanguage\(\);/, `const { t, language } = useLanguage();`);
  content = content.replace(/workspaceType: workspaceType/g, `workspaceType: activeWorkspace.type`);
  
  // Fix checkQuota
  content = content.replace(/const \{ checkQuota \} = usePlanGate\(session as any\);/, `const { checkGate } = usePlanGate();`);
  content = content.replace(/checkQuota\(/g, `checkGate(`);
  
  // Fix SUPER_ADMIN
  content = content.replace(/currentRole === 'super_admin'/g, `currentRole === 'SUPER_ADMIN'`);

  // Fix rtdb methods
  content = content.replace(/const purohitRef = ref\(db, `([^`]+)`\);/g, `const purohitRef = collection(db, \`$1\`);`);
  content = content.replace(/const yajRef = ref\(db, `([^`]+)`\);/g, `const yajRef = collection(db, \`$1\`);`);
  content = content.replace(/const anuRef = ref\(db, `([^`]+)`\);/g, `const anuRef = collection(db, \`$1\`);`);
  content = content.replace(/const samRef = ref\(db, `([^`]+)`\);/g, `const samRef = collection(db, \`$1\`);`);
  content = content.replace(/const gigsRef = ref\(db, `([^`]+)`\);/g, `const gigsRef = collection(db, \`$1\`);`);
  content = content.replace(/const conRef = ref\(db, `([^`]+)`\);/g, `const conRef = collection(db, \`$1\`);`);

  // Fix onValue for collections
  content = content.replace(/const unsubPur = onValue\(purohitRef, \(snap\) => \{([\s\S]*?)\}\);/g, `const unsubPur = onSnapshot(purohitRef, (snap) => {
      if (!snap.empty) {
        const arr = snap.docs.map(d => ({ purohitId: d.id, ...d.data() }));
        setPurohits(arr);
        localStorage.setItem(\`sb_purohits_\${session.communityId}\`, JSON.stringify(arr));
      } else setPurohits([]);
    });`);

  content = content.replace(/const unsubYaj = onValue\(yajRef, \(snap\) => \{([\s\S]*?)\}\);/g, `const unsubYaj = onSnapshot(yajRef, (snap) => {
      if (!snap.empty) {
        const arr = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        setYajamans(arr);
        localStorage.setItem(\`sb_yajamans_\${session.communityId}\`, JSON.stringify(arr));
      } else setYajamans([]);
    });`);

  content = content.replace(/const unsubAnu = onValue\(anuRef, \(snap\) => \{([\s\S]*?)\}\);/g, `const unsubAnu = onSnapshot(anuRef, (snap) => {
      if (!snap.empty) {
        const arr = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        arr.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        setAnushthans(arr);
        localStorage.setItem(\`sb_anushthans_\${session.communityId}\`, JSON.stringify(arr));
      } else setAnushthans([]);
    });`);

  content = content.replace(/const unsubSam = onValue\(samRef, \(snap\) => \{([\s\S]*?)\}\);/g, `const unsubSam = onSnapshot(samRef, (snap) => {
      if (!snap.empty) {
        const arr = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        setSamagri(arr);
        localStorage.setItem(\`sb_samagri_\${session.communityId}\`, JSON.stringify(arr));
      } else setSamagri([]);
      setLoading(false);
    });`);

  content = content.replace(/const unsubGigs = onValue\(gigsRef, \(snap\) => \{([\s\S]*?)\}\);/g, `const unsubGigs = onSnapshot(gigsRef, (snap) => {
      if (!snap.empty) {
        const list = snap.docs.map(d => ({ gigId: d.id, ...d.data() }));
        setGigs(list);
        localStorage.setItem(\`sb_purohit_gigs_\${session.communityId}\`, JSON.stringify(list));
      } else {
        // Fallback Premium Gigs (Seed Data for Marketplace Demo)
        setGigs([
          {
            gigId: 'GIG-101',
            purohitName: 'Pt. Shrikant Sharma',
            title: 'Complete Satyanarayan Katha & Puja Vidhi',
            description: 'Traditional performance with precise Vedic Sanskrit pronunciation and Katha meaning explanation. Includes complete Sankalp, Navagraha Shanti, and Havan.',
            category: 'Mandir & Home Rituals',
            durationHours: 2.5,
            dakshinaFee: 1500,
            ratingAvg: 4.9,
            totalReviewsCount: 128,
            verifiedBadge: true,
            completedOrders: 340
          },
          {
            gigId: 'GIG-102',
            purohitName: 'Acharya Devavrat Shastri',
            title: 'Rudrabhishek Seva & Maha Mrityunjaya Mantra',
            description: 'Powerful ritual for health, peace, and spiritual shielding performed according to Vedic scriptures. I will bring all primary Yantra materials.',
            category: 'Special Seva',
            durationHours: 3,
            dakshinaFee: 2500,
            ratingAvg: 5.0,
            totalReviewsCount: 89,
            verifiedBadge: true,
            completedOrders: 195
          },
          {
            gigId: 'GIG-103',
            purohitName: 'Pandit Ramakant Ji',
            title: 'Vastu Shanti & Griha Pravesh Anushthan',
            description: 'Complete home purification ritual ensuring peace and prosperity in your new dwelling. Includes Dwar Puja and Kalash Sthapana.',
            category: 'Off-site Seva',
            durationHours: 4,
            dakshinaFee: 3500,
            ratingAvg: 4.8,
            totalReviewsCount: 45,
            verifiedBadge: false,
            completedOrders: 92
          }
        ]);
      }
      setLoading(false);
    });`);

  content = content.replace(/const unsubCon = onValue\(conRef, \(snap\) => \{([\s\S]*?)\}\);/g, `const unsubCon = onSnapshot(conRef, (snap) => {
      if (!snap.empty) {
        const list = snap.docs.map(d => ({ contractId: d.id, ...d.data() }));
        list.sort((a: any,b: any) => b.createdAt - a.createdAt);
        setContracts(list);
        localStorage.setItem(\`sb_purohit_contracts_\${session.communityId}\`, JSON.stringify(list));
      } else {
        setContracts([]);
      }
    });`);

  // executeSafeUpdate refactor
  content = content.replace(/const executeSafeUpdate = async \([^\{]+\{[\s\S]*?\} catch[^\{]+\{[\s\S]*?\}\s*\};/g, `const executeSafeUpdate = async (updates: any, successMsg: string | null = null) => {
    try {
      const batch = writeBatch(db);
      for (const path of Object.keys(updates)) {
        const docRef = doc(db, path);
        if (updates[path] === null) {
          batch.delete(docRef);
        } else {
          batch.set(docRef, updates[path], { merge: true });
        }
      }
      await batch.commit();
      if (successMsg) showToast(successMsg, 'success');
    } catch (e: any) {
      if (!isOnline) {
         showToast(safeTranslate('offline_saved', 'Action cached offline. Syncing soon.'), 'offline');
      } else {
         showToast(safeTranslate('error', 'Error') + ": " + e.message, "error");
      }
    }
  };`);

  // logAudit
  content = content.replace(/push\(ref\(db, `communities\/\$\{session.communityId\}\/audit_logs`\)/g, `addDoc(collection(db, \`communities/\${session.communityId}/audit_logs\`)\n`);

  // ScrollText in PurohitMarketDesk.tsx
  if (file.includes('PurohitMarketDesk')) {
     if (!content.includes('ScrollText')) {
        content = content.replace(/MessageSquare, AlertTriangle/, `MessageSquare, AlertTriangle, ScrollText`);
     }
  }

  // Remove title from ShieldCheck
  content = content.replace(/<ShieldCheck([^>]+)title="[^"]*"([^>]*)>/g, `<ShieldCheck$1$2>`);

  fs.writeFileSync(file, content);
}

fixFile('src/components/domain3/PurohitDesk.tsx');
fixFile('src/components/domain3/PurohitMarketDesk.tsx');
