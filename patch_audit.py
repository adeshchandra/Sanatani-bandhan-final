import re

filepath = 'src/components/domain6/AuditLogDesk.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# add useData import
if "useData" not in content:
    content = content.replace(
        "import { useAuthWorkspace } from '../../context/AuthWorkspaceContext';",
        "import { useAuthWorkspace } from '../../context/AuthWorkspaceContext';\nimport { useData } from '../../context/DataContext';"
    )

# find where to inject the widget
# inside AuditLogDesk:
# const { activeWorkspace, currentUser } = useAuthWorkspace();
# we add const { devotees } = useData();

content = content.replace(
    "const { activeWorkspace, currentUser } = useAuthWorkspace();",
    "const { activeWorkspace, currentUser } = useAuthWorkspace();\n  const { devotees } = useData();"
)

widget_code = """
      {/* Security Health Check Widget */}
      <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-rose-500/10 rounded-xl border border-rose-500/20">
            <ShieldAlert className="w-5 h-5 text-rose-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-stone-100">Security Health Check</h3>
            <p className="text-xs text-stone-400">Monitoring for excessive permissions and privileged accounts.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(() => {
            const elevatedRoles = ['trustee', 'superadmin', 'manager', 'master_admin', 'head_admin'];
            const elevatedUsers = devotees.filter(d => elevatedRoles.includes(d.role));
            // A non-admin user with trustee roles might be someone with a generic email or low seva index
            const suspiciousUsers = elevatedUsers.filter(d => d.sevaIndex < 100 || !d.email?.includes('@'));
            
            return (
              <>
                <div className="bg-stone-950/50 border border-stone-800 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-stone-300">Privileged Accounts</span>
                    <span className="text-xs font-mono bg-stone-800 text-stone-300 px-2 py-0.5 rounded-lg">{elevatedUsers.length}</span>
                  </div>
                  <p className="text-[10px] text-stone-500">Total accounts with administrative or trustee access.</p>
                </div>
                
                <div className="bg-rose-950/20 border border-rose-900/30 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-rose-400">Suspicious Access</span>
                    <span className={`text-xs font-mono px-2 py-0.5 rounded-lg ${suspiciousUsers.length > 0 ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                      {suspiciousUsers.length} Flags
                    </span>
                  </div>
                  <p className="text-[10px] text-stone-500">Privileged accounts with missing emails or low Seva Index.</p>
                  
                  {suspiciousUsers.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {suspiciousUsers.map(u => (
                        <div key={u.id} className="flex items-center justify-between bg-stone-900/50 p-2 rounded-xl border border-rose-500/10">
                          <div>
                            <p className="text-xs font-bold text-stone-200">{u.fullName || u.name || 'Unknown'}</p>
                            <p className="text-[10px] text-rose-400 font-mono uppercase">{u.role}</p>
                          </div>
                          <button className="text-[10px] bg-stone-800 hover:bg-stone-700 text-stone-300 px-2 py-1 rounded border border-stone-700 transition-colors">
                            Review
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            );
          })()}
        </div>
      </div>

"""

content = content.replace(
    "{/* Search Bar */}",
    widget_code + "      {/* Search Bar */}"
)

with open(filepath, 'w') as f:
    f.write(content)

