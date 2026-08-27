const fs = require('fs');
let code = fs.readFileSync('src/components/domain3/PurohitMarketDesk.tsx', 'utf8');

const completeFunc = `
  const handleCompleteOrder = async (conId: string) => {
    try {
      setSubmitting(true);
      const updates: any = {};
      updates[\`communities/\${session.communityId}/purohit_contracts/\${conId}/status\`] = 'COMPLETED';
      await executeSafeUpdate(updates, 'Order marked as completed!');
    } catch (e: any) {
      showToast(e.message, 'error');
    } finally {
      setSubmitting(false);
    }
  };
`;

code = code.replace(
  "  const filteredGigs = useMemo(() => {",
  completeFunc + "\n  const filteredGigs = useMemo(() => {"
);

const btnStr = `
                    <button className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-black py-2.5 px-4 rounded-xl text-[10px] uppercase tracking-widest shadow-sm transition-all flex items-center gap-1.5">
                      <MessageSquare size={14}/> Contact
                    </button>
                    {con.purohitId === session.uid && con.status !== 'COMPLETED' && (
                      <button onClick={() => handleCompleteOrder(con.contractId)} disabled={submitting} className="bg-green-600 hover:bg-green-700 text-white font-black py-2.5 px-4 rounded-xl text-[10px] uppercase tracking-widest shadow-sm transition-all flex items-center gap-1.5">
                        <CheckCircle2 size={14}/> Complete
                      </button>
                    )}
`;

code = code.replace(
  "                    <button className=\"bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-black py-2.5 px-4 rounded-xl text-[10px] uppercase tracking-widest shadow-sm transition-all flex items-center gap-1.5\">\n                      <MessageSquare size={14}/> Contact\n                    </button>",
  btnStr
);

fs.writeFileSync('src/components/domain3/PurohitMarketDesk.tsx', code);
