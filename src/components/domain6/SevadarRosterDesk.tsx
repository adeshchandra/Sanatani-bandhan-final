import React, { useState } from 'react';
import { Calendar, Clock, UserCheck, Search, Plus, MapPin, Shield, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { db } from '../../firebase';
import { doc, writeBatch, serverTimestamp, increment } from 'firebase/firestore';
import { useAuthWorkspace } from '../../context/AuthWorkspaceContext';
import { useToast } from '../../context/ToastContext';

export const SevadarRosterDesk: React.FC = () => {
  const { t } = useLanguage();
  const { currentDevotee, activeWorkspace } = useAuthWorkspace();
  const { showToast } = useToast();
  const [activeView, setActiveView] = useState<'upcoming' | 'past'>('upcoming');


  const completeShift = async (shift: any) => {
    if (!currentDevotee) {
      showToast('Error', 'You must be logged in as a devotee to claim karma points.', 'error');
      return;
    }

    try {
      const batch = writeBatch(db);
      
      // Update devotee's total karma (sevaIndex)
      const devoteeRef = doc(db, 'workspaces', activeWorkspace.id, 'devotees', currentDevotee.id);
      batch.update(devoteeRef, {
        sevaIndex: increment(shift.karmaPoints)
      });

      // Log the karma transaction
      const ledgerRef = doc(db, 'workspaces', activeWorkspace.id, 'karma_ledger', `${Date.now()}_${currentDevotee.id}`);
      batch.set(ledgerRef, {
        devoteeId: currentDevotee.id,
        points: shift.karmaPoints,
        source: 'Sevadar Shift',
        shiftRole: shift.role,
        timestamp: serverTimestamp()
      });

      await batch.commit();
      showToast('Karma Awarded!', `Successfully awarded ${shift.karmaPoints} pts to your profile.`, 'success');
    } catch (error) {
      console.error("Error awarding karma:", error);
      showToast('Update Failed', 'Could not record karma points. Check connection.', 'error');
    }
  };

  const shifts = [
    { id: '1', role: 'Crowd Control', location: 'Main Temple Gate', time: '06:00 AM - 10:00 AM', status: 'FILLED', volunteers: ['Rahul S.', 'Amit K.'], required: 2, karmaPoints: 50 },
    { id: '2', role: 'Prasadam Distribution', location: 'Annadanam Hall', time: '12:00 PM - 03:00 PM', status: 'NEEDS_VOLUNTEERS', volunteers: ['Priya M.'], required: 4, karmaPoints: 75 },
    { id: '3', role: 'Shoe Counter', location: 'Gate 2', time: '04:00 PM - 08:00 PM', status: 'FILLED', volunteers: ['Suresh V.'], required: 1, karmaPoints: 30 }
  ];

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-indigo-600" />
            {t('sevadarRoster') || 'Sevadar Shift Roster'}
          </h1>
          <p className="text-slate-500 text-sm mt-1">Manage volunteer schedules and assign tasks for daily operations.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors">
          <Plus className="w-4 h-4" />
          Create Shift
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl inline-flex w-full sm:w-auto overflow-x-auto">
            <button 
              onClick={() => setActiveView('upcoming')}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors whitespace-nowrap ${activeView === 'upcoming' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Upcoming Shifts
            </button>
            <button 
              onClick={() => setActiveView('past')}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors whitespace-nowrap ${activeView === 'past' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Past & Completed
            </button>
          </div>

          <div className="space-y-4">
            {shifts.map(shift => (
              <div key={shift.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-indigo-200 transition-colors">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold text-slate-800">{shift.role}</h3>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${shift.status === 'FILLED' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-amber-100 text-amber-800 border-amber-200'}`}>
                        {shift.status.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 font-medium">
                      <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-slate-400" /> {shift.location}</div>
                      <div className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-slate-400" /> {shift.time}</div>
                    </div>
                  </div>
                  <div className="text-right sm:text-left">
                    <div className="bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-lg inline-flex items-center gap-1.5 text-indigo-700 font-bold text-xs">
                      <ShieldCheck className="w-4 h-4" />
                      +{shift.karmaPoints} Karma Points
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {shift.volunteers.map((v, i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-600">
                          {v.charAt(0)}
                        </div>
                      ))}
                    </div>
                    <span className="text-sm font-medium text-slate-500 ml-2">
                      {shift.volunteers.length} / {shift.required} Volunteers
                    </span>
                  </div>
                  {shift.status !== 'FILLED' ? (
                    <button className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-xl text-sm transition-colors">
                      Assign
                    </button>
                  ) : (
                    <button onClick={() => completeShift(shift)} className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded-xl text-sm transition-colors">
                      Complete & Award Karma
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-500" />
              Calendar Overview
            </h3>
            <div className="bg-slate-50 rounded-xl p-8 border border-slate-100 text-center">
              <p className="text-sm font-bold text-slate-500">Calendar Widget</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
