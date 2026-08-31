import re

filepath = 'src/context/DataContext.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# Add imports for Firestore
import_statement = """import { db } from '../lib/firebase';
import { doc, setDoc, deleteDoc, collection, onSnapshot, query, where, getDocs } from 'firebase/firestore';
"""
content = content.replace("import { useToast } from './ToastContext';", "import { useToast } from './ToastContext';\n" + import_statement)

# We need to add a massive useEffect in DataContext to load from Firestore
sync_effect = """
  // FIREBASE SYNC EFFECT
  useEffect(() => {
    if (!activeWorkspace?.id) return;
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
      return onSnapshot(collection(db, c.name), (snapshot) => {
        if (!snapshot.empty) {
          const items = snapshot.docs.map(doc => doc.data() as any);
          // Only update if there are items, to not overwrite initial mock data if db is empty
          c.setter(items);
        }
      }, (err) => console.error("Firebase sync error", err));
    });

    return () => unsubscribes.forEach(unsub => unsub());
  }, [activeWorkspace?.id]);

  // Helper to push to firestore
  const pushToFirestore = (colName: string, id: string, data: any) => {
    setDoc(doc(db, colName, id), data, { merge: true }).catch(console.error);
  };
"""
content = content.replace("const [allShifts, setAllShifts] = useState<SevadarDutyShift[]>(INITIAL_SHIFTS);", "const [allShifts, setAllShifts] = useState<SevadarDutyShift[]>(INITIAL_SHIFTS);\n" + sync_effect)

# Now replace the addX functions to also call pushToFirestore
replacements = [
    (r"setAllDevotees\(\(prev\) => \[\.\.\.prev, newMember\]\);", r"setAllDevotees((prev) => [...prev, newMember]);\n    pushToFirestore('devotees', id, newMember);"),
    (r"setAllDevotees\(\(prev\) =>\s*prev\.map\(\(d\) => \(d\.id === id \? \{ \.\.\.d, \.\.\.updates \} : d\)\)\s*\);", r"setAllDevotees((prev) => prev.map((d) => (d.id === id ? { ...d, ...updates } : d)));\n    pushToFirestore('devotees', id, updates);"),
    (r"setAllDevotees\(\(prev\) => prev\.filter\(\(d\) => d\.id !== id\)\);", r"setAllDevotees((prev) => prev.filter((d) => d.id !== id));\n    deleteDoc(doc(db, 'devotees', id)).catch(console.error);"),
    
    (r"setAllFamilies\(\(prev\) => \[\.\.\.prev, newFamily\]\);", r"setAllFamilies((prev) => [...prev, newFamily]);\n    pushToFirestore('families', newFamily.id, newFamily);"),
    
    (r"setAllTreasury\(\(prev\) => \[\.\.\.prev, newTx\]\);", r"setAllTreasury((prev) => [...prev, newTx]);\n    pushToFirestore('treasury', newTx.id, newTx);"),
    
    (r"setAllAssets\(\(prev\) => \[\.\.\.prev, newAsset\]\);", r"setAllAssets((prev) => [...prev, newAsset]);\n    pushToFirestore('assets', newAsset.id, newAsset);"),
    
    (r"setAllInventory\(\(prev\) => \[\.\.\.prev, newItem\]\);", r"setAllInventory((prev) => [...prev, newItem]);\n    pushToFirestore('inventory', newItem.id, newItem);"),
    
    (r"setAllInventory\(\(prev\) =>\s*prev\.map\(\(i\) =>\s*i\.id === id \? \{ \.\.\.i, currentStock: newStock \} : i\s*\)\s*\);", r"setAllInventory((prev) => prev.map((i) => i.id === id ? { ...i, currentStock: newStock } : i));\n    pushToFirestore('inventory', id, { currentStock: newStock });"),
    
    (r"setAllPoojaBookings\(\(prev\) => \[\.\.\.prev, newBooking\]\);", r"setAllPoojaBookings((prev) => [...prev, newBooking]);\n    pushToFirestore('poojaBookings', newBooking.id, newBooking);"),
    
    (r"setAllPoojaBookings\(\(prev\) =>\s*prev\.map\(\(b\) => \(b\.id === id \? \{ \.\.\.b, status \} : b\)\)\s*\);", r"setAllPoojaBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));\n    pushToFirestore('poojaBookings', id, { status });"),

    (r"setAllCows\(\(prev\) => \[\.\.\.prev, newCow\]\);", r"setAllCows((prev) => [...prev, newCow]);\n    pushToFirestore('cows', newCow.id, newCow);"),
    
    (r"setAllAnnadanamList\(\(prev\) => \[\.\.\.prev, newAnn\]\);", r"setAllAnnadanamList((prev) => [...prev, newAnn]);\n    pushToFirestore('annadanam', newAnn.id, newAnn);"),
    
    (r"setAllResolutions\(\(prev\) => \[\.\.\.prev, newRes\]\);", r"setAllResolutions((prev) => [...prev, newRes]);\n    pushToFirestore('resolutions', newRes.id, newRes);"),
    
    (r"setAllResidentPujas\(\(prev\) => \[\.\.\.prev, newPuja\]\);", r"setAllResidentPujas((prev) => [...prev, newPuja]);\n    pushToFirestore('residentPujas', newPuja.id, newPuja);"),
    
    (r"setAllPitruRecords\(\(prev\) => \[\.\.\.prev, newRecord\]\);", r"setAllPitruRecords((prev) => [...prev, newRecord]);\n    pushToFirestore('pitruRecords', newRecord.id, newRecord);"),
    
    (r"setAllGurukulStudents\(\(prev\) => \[\.\.\.prev, newStudent\]\);", r"setAllGurukulStudents((prev) => [...prev, newStudent]);\n    pushToFirestore('gurukulStudents', newStudent.id, newStudent);"),
    
    (r"setAllShifts\(\(prev\) => \[\.\.\.prev, newShift\]\);", r"setAllShifts((prev) => [...prev, newShift]);\n    pushToFirestore('shifts', newShift.id, newShift);")
]

for old, new_r in replacements:
    content = re.sub(old, new_r, content)

with open(filepath, 'w') as f:
    f.write(content)
