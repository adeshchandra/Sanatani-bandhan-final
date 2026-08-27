const fs = require('fs');
let code = fs.readFileSync('src/components/domain3/PurohitDesk.tsx', 'utf8');

// Add applications state
code = code.replace(
  "const [samagri, setSamagri] = useState<any[]>(() => {",
  "const [applications, setApplications] = useState<any[]>([]);\n  const [samagri, setSamagri] = useState<any[]>(() => {"
);

// Add applications listener
code = code.replace(
  "const unsubSam = onSnapshot(samRef, (snap) => {",
  `const appRef = collection(db, \`communities/\${session.communityId}/purohit_applications\`);
    const unsubApp = onSnapshot(appRef, (snap) => {
      if (!snap.empty) {
        setApplications(snap.docs.map(d => d.data()));
      } else {
        setApplications([]);
      }
    });
    
    const unsubSam = onSnapshot(samRef, (snap) => {`
);

code = code.replace(
  "return () => { unsubPur(); unsubYaj(); unsubAnu(); unsubSam(); clearTimeout(failsafe); };",
  "return () => { unsubPur(); unsubYaj(); unsubAnu(); unsubSam(); unsubApp(); clearTimeout(failsafe); };"
);

// Add admin handler
const handler = `
  const handleApproveApplication = async (app: any) => {
    setSubmitting(true);
    try {
      const purohitId = app.id;
      const updates: any = {};
      
      // Update application status
      updates[\`communities/\${session.communityId}/purohit_applications/\${purohitId}\`] = {
        ...app,
        status: 'APPROVED',
        approvedAt: Date.now()
      };
      
      // Create Purohit profile
      updates[\`communities/\${session.communityId}/purohits/\${purohitId}\`] = {
        purohitId,
        name: app.name,
        phone: app.phone,
        specialization: app.specialization,
        experienceYears: app.experienceYears,
        availabilityStatus: 'AVAILABLE',
        address: app.address,
        adminNotes: 'Approved via application',
        verifiedBadge: true
      };

      await executeSafeUpdate(updates, 'Application approved & Purohit verified successfully!');
      logAudit("PUROHIT_APPROVED", \`Approved purohit application for \${app.name}\`);
    } catch (err: any) {
      showToast(err.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRejectApplication = async (app: any) => {
    setSubmitting(true);
    try {
      const updates: any = {};
      updates[\`communities/\${session.communityId}/purohit_applications/\${app.id}\`] = {
        ...app,
        status: 'REJECTED',
        rejectedAt: Date.now()
      };
      await executeSafeUpdate(updates, 'Application rejected.');
    } catch (err: any) {
      showToast(err.message, "error");
    } finally {
      setSubmitting(false);
    }
  };
`;

code = code.replace(
  "// Handle Delete Forms",
  handler + "\n  // Handle Delete Forms"
);

// Add Tabs
code = code.replace(
  `<button onClick={() => setActiveTab('MANDALI')} className={\`py-2.5 px-5 rounded-lg text-[10px] font-black tracking-widest uppercase transition-all whitespace-nowrap \${activeTab === 'MANDALI' ? 'bg-orange-600 text-white shadow-md' : 'text-gray-500 hover:text-gray-800'}\`}>
            {safeTranslate('purohit_mandali', 'Purohit Mandali')}
          </button>`,
  `<button onClick={() => setActiveTab('MANDALI')} className={\`py-2.5 px-5 rounded-lg text-[10px] font-black tracking-widest uppercase transition-all whitespace-nowrap \${activeTab === 'MANDALI' ? 'bg-orange-600 text-white shadow-md' : 'text-gray-500 hover:text-gray-800'}\`}>
            {safeTranslate('purohit_mandali', 'Purohit Mandali')}
          </button>
          <button onClick={() => setActiveTab('APPLICATIONS')} className={\`py-2.5 px-5 rounded-lg text-[10px] font-black tracking-widest uppercase transition-all whitespace-nowrap flex items-center gap-2 \${activeTab === 'APPLICATIONS' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:text-gray-800'}\`}>
            Applications
            {applications.filter(a => a.status === 'PENDING').length > 0 && (
              <span className="bg-red-500 text-white text-[8px] px-1.5 py-0.5 rounded-full">{applications.filter(a => a.status === 'PENDING').length}</span>
            )}
          </button>`
);

fs.writeFileSync('src/components/domain3/PurohitDesk.tsx', code);
