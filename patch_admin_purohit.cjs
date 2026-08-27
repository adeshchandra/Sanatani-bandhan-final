const fs = require('fs');
let code = fs.readFileSync('src/components/domain3/PurohitDesk.tsx', 'utf8');

const applicationsTabBtn = `
          <button onClick={() => setActiveTab('APPLICATIONS')} className={\`flex-1 sm:w-32 py-2.5 rounded-lg text-[10px] font-black tracking-widest uppercase transition-all flex items-center justify-center gap-2 whitespace-nowrap px-3 \${activeTab === 'APPLICATIONS' ? 'bg-white text-orange-500 shadow-sm border border-gray-100' : 'text-gray-500 hover:bg-gray-200'}\`}>
            <Award size={14}/> {applications.filter(a => a.status === 'PENDING').length > 0 ? <span className="bg-red-500 text-white rounded-full px-1.5 py-0.5 text-[8px]">{applications.filter(a => a.status === 'PENDING').length}</span> : ''} Apps
          </button>
`;

code = code.replace(
  "          <button onClick={() => setActiveTab('MANDALI')} className={`flex-1 sm:w-32 py-2.5 rounded-lg text-[10px] font-black tracking-widest uppercase transition-all flex items-center justify-center gap-2 whitespace-nowrap px-3 ${activeTab === 'MANDALI' ? 'bg-white text-orange-500 shadow-sm border border-gray-100' : 'text-gray-500 hover:bg-gray-200'}`}>",
  "          <button onClick={() => setActiveTab('MANDALI')} className={`flex-1 sm:w-32 py-2.5 rounded-lg text-[10px] font-black tracking-widest uppercase transition-all flex items-center justify-center gap-2 whitespace-nowrap px-3 ${activeTab === 'MANDALI' ? 'bg-white text-orange-500 shadow-sm border border-gray-100' : 'text-gray-500 hover:bg-gray-200'}`}>\n            <UserCheck size={14}/> {safeTranslate('mandali', 'Mandali')}\n          </button>" + applicationsTabBtn
);

// We need to remove the original Mandali inner HTML because we included it in the replace string to be safe.
// Wait, the replace string only matches the start tag.
