const fs = require('fs');
let code = fs.readFileSync('src/components/domain3/PurohitMarketDesk.tsx', 'utf8');

const handlers = `
  const handleApplyPurohit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const updates: any = {};
      updates[\`communities/\${session.communityId}/purohit_applications/\${session.uid}\`] = {
        id: session.uid,
        name: applyForm.name,
        phone: applyForm.phone,
        specialization: applyForm.specialization,
        experienceYears: applyForm.experienceYears,
        address: applyForm.address,
        whyJoin: applyForm.whyJoin,
        status: 'PENDING',
        createdAt: Date.now()
      };
      await executeSafeUpdate(updates, 'Application submitted successfully! Please wait for admin approval.');
    } catch (err: any) {
      showToast(err.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCreateGig = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const gigId = \`GIG-\${Math.floor(1000 + Math.random() * 9000)}\`;
      const updates: any = {};
      updates[\`communities/\${session.communityId}/purohit_gigs/\${gigId}\`] = {
        gigId,
        purohitId: session.uid,
        purohitName: session.userName,
        title: gigForm.title,
        description: gigForm.description,
        category: gigForm.category,
        durationHours: Number(gigForm.durationHours),
        dakshinaFee: Number(gigForm.dakshinaFee),
        ratingAvg: 0,
        totalReviewsCount: 0,
        verifiedBadge: true,
        completedOrders: 0,
        createdAt: Date.now()
      };
      await executeSafeUpdate(updates, 'Gig created successfully!');
      setGigForm({ title: '', description: '', category: 'Mandir & Home Rituals', durationHours: 2, dakshinaFee: 1500 });
      setActiveTab('MY_OFFERED_GIGS');
    } catch (err: any) {
      showToast(err.message, "error");
    } finally {
      setSubmitting(false);
    }
  };
`;

code = code.replace(
  "  // 🤝 Book Gig (Checkout with Sankalp & Auto-Treasury Sync)",
  handlers + "\n  // 🤝 Book Gig (Checkout with Sankalp & Auto-Treasury Sync)"
);

// Add Tabs
code = code.replace(
  `          <button onClick={() => setActiveTab('MY_ORDERS')} className={\`flex-1 sm:w-40 py-3 rounded-lg text-[10px] font-black tracking-widest uppercase transition-all flex items-center justify-center gap-2 whitespace-nowrap px-4 \${activeTab === 'MY_ORDERS' ? 'bg-gray-900 text-white shadow-md' : 'text-gray-500 hover:text-gray-800'}\`}>
            <FileText size={14}/> {safeTranslate('my_orders', 'My Orders')}
          </button>`,
  `          <button onClick={() => setActiveTab('MY_ORDERS')} className={\`flex-1 sm:w-40 py-3 rounded-lg text-[10px] font-black tracking-widest uppercase transition-all flex items-center justify-center gap-2 whitespace-nowrap px-4 \${activeTab === 'MY_ORDERS' ? 'bg-gray-900 text-white shadow-md' : 'text-gray-500 hover:text-gray-800'}\`}>
            <FileText size={14}/> {safeTranslate('my_orders', 'My Orders')}
          </button>
          {isVerifiedPurohit ? (
             <button onClick={() => setActiveTab('MY_OFFERED_GIGS')} className={\`flex-1 sm:w-40 py-3 rounded-lg text-[10px] font-black tracking-widest uppercase transition-all flex items-center justify-center gap-2 whitespace-nowrap px-4 \${activeTab === 'MY_OFFERED_GIGS' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:text-gray-800'}\`}>
               <Star size={14}/> My Offered Gigs
             </button>
          ) : (
             <button onClick={() => setActiveTab('APPLY_PUROHIT')} className={\`flex-1 sm:w-40 py-3 rounded-lg text-[10px] font-black tracking-widest uppercase transition-all flex items-center justify-center gap-2 whitespace-nowrap px-4 \${activeTab === 'APPLY_PUROHIT' ? 'bg-orange-500 text-white shadow-md' : 'text-gray-500 hover:text-gray-800'}\`}>
               <Award size={14}/> Become a Purohit
             </button>
          )}`
);

fs.writeFileSync('src/components/domain3/PurohitMarketDesk.tsx', code);
