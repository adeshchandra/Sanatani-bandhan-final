const fs = require('fs');
let code = fs.readFileSync('src/components/domain3/PurohitDesk.tsx', 'utf8');

const appsView = `
        {activeTab === 'APPLICATIONS' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-gray-800 tracking-tight">Purohit Applications</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {applications.length === 0 ? (
                <div className="col-span-full py-12 text-center text-gray-400 bg-white rounded-3xl border border-gray-100 shadow-sm">
                   <Award size={48} className="mx-auto mb-4 opacity-20"/>
                   <p className="text-sm font-bold">No applications found.</p>
                </div>
              ) : (
                applications.map(app => (
                  <div key={app.id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-black text-gray-900">{app.name}</h3>
                        <span className={\`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full \${app.status === 'APPROVED' ? 'bg-green-100 text-green-700' : app.status === 'REJECTED' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}\`}>
                          {app.status}
                        </span>
                      </div>
                      <div className="space-y-2 mt-4 text-sm text-gray-600">
                        <p><strong className="text-gray-900">Phone:</strong> {app.phone}</p>
                        <p><strong className="text-gray-900">Specialization:</strong> {app.specialization}</p>
                        <p><strong className="text-gray-900">Experience:</strong> {app.experienceYears} Years</p>
                        <p><strong className="text-gray-900">Address:</strong> {app.address}</p>
                        <div className="mt-3 bg-gray-50 p-3 rounded-lg border border-gray-100 text-xs italic">
                          "{app.whyJoin}"
                        </div>
                      </div>
                    </div>
                    
                    {app.status === 'PENDING' && (
                      <div className="flex gap-3 mt-6">
                        <button onClick={() => handleApproveApplication(app)} disabled={submitting} className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-md transition-all flex items-center justify-center gap-2">
                           <CheckCircle2 size={16}/> Approve
                        </button>
                        <button onClick={() => handleRejectApplication(app)} disabled={submitting} className="flex-1 py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                           <X size={16}/> Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
`;

code = code.replace(
  "{/* Main Content Area */}",
  "{/* Main Content Area */}\n" + appsView
);

fs.writeFileSync('src/components/domain3/PurohitDesk.tsx', code);
