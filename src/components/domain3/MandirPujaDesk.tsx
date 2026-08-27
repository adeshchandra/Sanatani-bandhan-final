import React, { useState, useEffect } from 'react';
import { Sun, Moon, Clock, Flame, Users, Sparkles, Video, BellRing, Music, CheckCircle2, ChevronRight } from 'lucide-react';
import { useAuthWorkspace } from '../../context/AuthWorkspaceContext';
import { useToast } from '../../context/ToastContext';
import { useData } from '../../context/DataContext';

interface AartiSchedule {
  id: string;
  name: string;
  time: string;
  priestInCharge: string;
  mantra: string;
  bhogDescription: string;
  isLive: boolean;
}

interface LongFormRitual {
  id: string;
  devoteeName: string;
  service: string;
  stages: string[];
  currentStage: number; // 0-indexed
}

export const MandirPujaDesk: React.FC = () => {
  const { activeWorkspace } = useAuthWorkspace();
  const { showToast } = useToast();

  const { residentPujas } = useData();
  const schedules = residentPujas.map(p => ({
    id: p.id,
    name: p.ritualName || p.pujaName || 'Aarti',
    time: p.time || p.timings || 'N/A',
    priestInCharge: p.priestName || p.leadPurohit || 'N/A',
    mantra: p.deity ? `Dedicated to ${p.deity}` : 'N/A',
    bhogDescription: p.samagriList ? p.samagriList.join(', ') : 'N/A',
    isLive: p.isOpenForPublic || false,
  }));

  const [longFormRituals] = useState<LongFormRitual[]>([
    {
      id: 'lfr-1',
      devoteeName: 'Sharma Parivar',
      service: 'Maha Mrityunjaya Havan',
      stages: ['Sankalpa', 'Veda Parayanam', 'Mula Mantra Japa', 'Purnahuti', 'Prasadam Dispatch'],
      currentStage: 2, 
    },
    {
      id: 'lfr-2',
      devoteeName: 'Desai Family (NRI)',
      service: 'Sahasra Chandi Paath',
      stages: ['Kalash Sthapana', 'Navaran Japa', 'Havan & Kanya Pujan', 'Brahmin Bhojan', 'Ashirvad Video'],
      currentStage: 4,
    }
  ]);

  const handleNotifyMe = (aartiName: string) => {
    showToast(`Temple bell notification set for ${aartiName}`, 'info', 'Aarti Reminder Activated');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-stone-900/90 border border-stone-800 p-6 rounded-3xl shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold uppercase tracking-wider">
              Nitya Seva & Garbhagriha
            </span>
            <span className="text-xs text-stone-400 font-mono">
              4 Nitya Daily Aartis Scheduled
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-stone-100">
            Daily Temple Aarti & Priest Roster Desk
          </h2>
          <p className="text-xs text-stone-400 mt-0.5">
            Real-time daily worship schedule, Chappan Bhog allocations, and live darshan telemetry
          </p>
        </div>
      </div>

      {/* Live Sanctum Stream Hero */}
      <div className="bg-stone-950/80 border border-amber-500/30 rounded-3xl p-6 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-lg">
          <span className="px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 w-fit">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            Live Sanctum Telecast Active
          </span>
          <h3 className="text-lg font-black text-stone-100">
            Garbhagriha Live Darshan Stream
          </h3>
          <p className="text-xs text-stone-400">
            Connected to 4K Ultra-Low Latency streaming hub for overseas Sanatani devotees.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-amber-600/20 transition-all"
          >
            <Video className="w-4 h-4" />
            <span>Open HD Sanctum Player</span>
          </a>
        </div>
      </div>

      {/* Long-Form Rituals Progress Tracker */}
      <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6 border-b border-stone-800 pb-4">
          <h3 className="text-lg font-extrabold text-stone-100 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            Devotee Long-Form Ritual Services
          </h3>
          <span className="text-xs font-bold text-stone-400 bg-stone-800 px-3 py-1 rounded-full">
            Live Telemetry Tracker
          </span>
        </div>

        <div className="space-y-6">
          {longFormRituals.map((ritual) => (
            <div key={ritual.id} className="bg-stone-950 rounded-2xl p-5 border border-stone-800 shadow-inner">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <div>
                  <h4 className="text-base font-bold text-stone-100">{ritual.service}</h4>
                  <p className="text-sm text-stone-400">Yajamana: <span className="text-amber-200">{ritual.devoteeName}</span></p>
                </div>
                <div className="text-xs font-bold px-3 py-1.5 bg-amber-500/10 text-amber-400 rounded-lg border border-amber-500/20 w-fit">
                  Stage {ritual.currentStage + 1} of {ritual.stages.length} In Progress
                </div>
              </div>

              {/* Progress Bar Container */}
              <div className="relative">
                {/* Background Track */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-stone-800 -translate-y-1/2 rounded-full hidden md:block"></div>
                {/* Active Track */}
                <div 
                  className="absolute top-1/2 left-0 h-1 bg-amber-500 -translate-y-1/2 rounded-full transition-all duration-1000 hidden md:block shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                  style={{ width: `${(ritual.currentStage / (ritual.stages.length - 1)) * 100}%` }}
                ></div>

                <div className="relative flex flex-col md:flex-row justify-between gap-4 md:gap-0">
                  {ritual.stages.map((stage, idx) => {
                    const isCompleted = idx < ritual.currentStage;
                    const isActive = idx === ritual.currentStage;
                    const isPending = idx > ritual.currentStage;

                    return (
                      <div key={idx} className="flex md:flex-col items-center gap-3 md:gap-2 z-10 w-full md:w-32">
                        {/* Status Indicator Bubble */}
                        <div 
                          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 transition-all ${
                            isCompleted ? 'bg-amber-500 border-amber-500 text-stone-900 shadow-[0_0_15px_rgba(245,158,11,0.4)]' :
                            isActive ? 'bg-stone-900 border-amber-500 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]' :
                            'bg-stone-900 border-stone-700 text-stone-600'
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="w-5 h-5" />
                          ) : isActive ? (
                            <div className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-pulse" />
                          ) : (
                            <span className="text-[10px] font-bold">{idx + 1}</span>
                          )}
                        </div>

                        {/* Mobile Connective Line */}
                        <div className={`w-0.5 h-6 md:hidden ${idx === ritual.stages.length - 1 ? 'hidden' : ''} ${isCompleted ? 'bg-amber-500' : 'bg-stone-800'}`}></div>

                        {/* Stage Label */}
                        <div className="md:text-center flex-1 md:flex-none">
                          <p className={`text-xs font-bold ${
                            isCompleted ? 'text-stone-300' :
                            isActive ? 'text-amber-400' :
                            'text-stone-500'
                          }`}>
                            {stage}
                          </p>
                          <p className="text-[10px] text-stone-500 font-mono mt-0.5 md:mx-auto">
                            {isCompleted ? 'Completed' : isActive ? 'Active Now' : 'Pending'}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Aarti Schedule Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {schedules.map((aarti) => (
          <div
            key={aarti.id}
            className="bg-stone-900/90 border border-stone-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start justify-between gap-2 pb-3 border-b border-stone-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-stone-100">{aarti.name}</h3>
                    <p className="text-xs font-mono font-bold text-amber-400">{aarti.time}</p>
                  </div>
                </div>

                {aarti.isLive && (
                  <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-bold">
                    Broadcasts Live
                  </span>
                )}
              </div>

              <div className="py-2 space-y-2 text-xs text-stone-300">
                <div>
                  <span className="text-stone-400">Acharya on Duty:</span>
                  <p className="font-semibold text-stone-100">{aarti.priestInCharge}</p>
                </div>

                <div>
                  <span className="text-stone-400">Chanting & Stotram:</span>
                  <p className="text-amber-200/90 italic text-[11px]">{aarti.mantra}</p>
                </div>

                <div>
                  <span className="text-stone-400">Sacred Naivedyam (Bhog):</span>
                  <p className="text-stone-300 text-[11px]">{aarti.bhogDescription}</p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleNotifyMe(aarti.name)}
              className="w-full py-2 rounded-xl bg-stone-800 hover:bg-stone-750 border border-stone-700 text-stone-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <BellRing className="w-3.5 h-3.5 text-amber-400" />
              <span>Subscribe to Aarti Alert</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
