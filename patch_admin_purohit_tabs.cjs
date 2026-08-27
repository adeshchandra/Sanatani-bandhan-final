const fs = require('fs');
let code = fs.readFileSync('src/components/domain3/PurohitDesk.tsx', 'utf8');

const appsBlock = `
      {activeTab === 'APPLICATIONS' && (
        <div className="space-y-6 animate-in fade-in">
          {applications.length > 0 ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {applications.map(app => (
                <div key={app.id} className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className={\`px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-widest mb-3 inline-block border shadow-sm \${app.status === 'PENDING' ? 'bg-orange-50 text-orange-700 border-orange-200' : app.status === 'APPROVED' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}\`}>
                          {app.status}
                        </span>
                        <h4 className="text-lg font-black text-gray-900">{app.name}</h4>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{app.specialization} • {app.experienceYears} Years Exp</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100 mb-6">
                      <div className="flex items-start gap-2 text-sm text-gray-700">
                        <Phone size={16} className="text-gray-400 shrink-0 mt-0.5"/>
                        <span className="font-bold">{app.phone}</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-gray-700">
                        <MapPin size={16} className="text-gray-400 shrink-0 mt-0.5"/>
                        <span className="font-bold">{app.address}</span>
                      </div>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div>
                        <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Why Join?</h5>
                        <p className="text-sm font-medium text-gray-700">{app.whyJoin}</p>
                      </div>
                      {app.certificates && (
                        <div>
                          <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Certifications / Lineage</h5>
                          <p className="text-sm font-medium text-gray-700">{app.certificates}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {app.status === 'PENDING' && (
                    <div className="flex gap-4 pt-6 border-t border-gray-100 mt-auto">
                      <button onClick={() => handleApproveApplication(app)} className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-black uppercase tracking-widest shadow-md transition-all">
                        Approve
                      </button>
                      <button onClick={() => handleRejectApplication(app)} className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-black uppercase tracking-widest transition-all">
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
             <div className="py-20 text-center text-gray-400 border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50/50">
               <Award size={48} className="mx-auto mb-4 opacity-20"/>
               <p className="text-sm font-bold uppercase tracking-widest">No applications found</p>
             </div>
          )}
        </div>
      )}
`;

code = code.replace(
  "            </div>\n          )}\n        </div>\n      )}",
  "            </div>\n          )}\n        </div>\n      )}\n" + appsBlock
);

fs.writeFileSync('src/components/domain3/PurohitDesk.tsx', code);
