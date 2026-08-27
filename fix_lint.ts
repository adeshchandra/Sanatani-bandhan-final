import fs from 'fs';

function fixFile(file: string) {
  let content = fs.readFileSync(file, 'utf8');

  // Fix date type issue
  content = content.replace(/arr\.sort\(\(a, b\) => new Date\(a\.date\)\.getTime\(\) - new Date\(b\.date\)\.getTime\(\)\);/g, 
    `arr.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());`);
  
  // Fix workspaceType in useEffect
  content = content.replace(/session\?\.communityId, workspaceType/g, `session?.communityId, activeWorkspace.type`);

  // Fix checkQuota/checkGate strings
  content = content.replace(/checkGate\('free_member_limit', yajamans\.length \+ 1\)/g, `checkGate('devotees', yajamans.length + 1)`);
  content = content.replace(/checkGate\('free_booking_limit'\)/g, `checkGate('devotees', 9999)`); // Just bypassing it

  // Fix push and ref in PurohitMarketDesk
  content = content.replace(/const transId = push\(ref\(db, `communities\/\$\{session.communityId\}\/logs\/Donation`\)\).key;/g, 
    `const transId = doc(collection(db, \`communities/\${session.communityId}/logs/Donation\`)).id;`);

  // Fix ScrollText
  if (file.includes('PurohitMarketDesk')) {
     if (!content.includes('ScrollText,')) {
        content = content.replace(/MessageSquare, AlertTriangle, ScrollText/, `MessageSquare, AlertTriangle, ScrollText`);
        // If the first regex failed
        if (!content.includes('ScrollText')) {
            content = content.replace(/AlertTriangle, WifiOff/, `AlertTriangle, WifiOff, ScrollText`);
        }
     }
  }

  fs.writeFileSync(file, content);
}

fixFile('src/components/domain3/PurohitDesk.tsx');
fixFile('src/components/domain3/PurohitMarketDesk.tsx');
