import re

filepath = 'src/components/domain6/CrisisCommandCenter.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# 1. Add doc, updateDoc to imports
content = content.replace("import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';", "import { collection, query, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';")

# 2. Add handleAcknowledge logic inside component
ack_logic = """
  const handleAcknowledge = async (id: string) => {
    try {
      const docRef = doc(db, 'yatra_broadcasts', id);
      await updateDoc(docRef, {
        sosStatus: 'RESOLVED',
        resolvedAt: new Date().toISOString(),
        resolvedBy: 'Sevadar Team'
      });
    } catch (e) {
      console.error('Error acknowledging alert', e);
    }
  };

  const activeIncidents = incidents.filter(i => i.sosStatus !== 'RESOLVED');
"""

content = content.replace("  const activeIncidents = incidents.filter(i => i.sosStatus !== 'RESOLVED');", ack_logic)

# 3. Add Quick-View Widget
quick_view_widget = """        {/* Emergency Quick-View Widget */}
        {activeIncidents.length > 0 && (
          <div className="bg-rose-50 rounded-3xl border-2 border-rose-200 shadow-sm p-6 animate-pulse-slow">
            <h3 className="font-black text-rose-800 flex items-center gap-2 mb-4 text-lg">
              <ShieldAlert className="w-6 h-6 animate-pulse text-rose-600" /> Pending Emergencies Requires Immediate Action
            </h3>
            <div className="flex flex-col gap-3">
              {activeIncidents.map(inc => (
                <div key={inc.id} className="bg-white p-4 rounded-2xl shadow-sm border border-rose-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h4 className="text-rose-700 font-bold text-sm">{inc.situation?.replace('_', ' ') || 'Emergency SOS'}</h4>
                    <p className="text-slate-600 text-xs mt-1 font-medium"><span className="font-bold text-slate-800">{inc.senderName}</span> requires assistance.</p>
                    <div className="flex items-center gap-3 mt-2 text-[10px] font-bold text-slate-500 uppercase">
                      {inc.location && <span className="flex items-center gap-1 text-indigo-600"><MapPin className="w-3 h-3" /> Location Tracked</span>}
                      <span className="flex items-center gap-1 text-slate-400"><Clock className="w-3 h-3" /> {new Date(inc.timestamp).toLocaleTimeString()}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleAcknowledge(inc.id)}
                    className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition-colors shadow-lg shadow-rose-600/20 whitespace-nowrap shrink-0"
                  >
                    Acknowledge & Resolve
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Left Column: Map & Chart */}"""

content = content.replace("{/* Left Column: Map & Chart */}", quick_view_widget)

with open(filepath, 'w') as f:
    f.write(content)
