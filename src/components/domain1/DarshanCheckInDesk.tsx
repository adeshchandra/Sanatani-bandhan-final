import React, { useState, useEffect } from 'react';
import {
  ScanFace,
  CheckCircle2,
  AlertOctagon,
  Waypoints,
  ArrowRight,
  Users,
  ShieldCheck,
  Sparkles,
  RefreshCw,
  Camera,
  Activity,
  Clock,
  MapPin,
  Lock,
  Flame,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export type ScanStatus = 'idle' | 'scanning' | 'verified' | 'rejected';
export type CorridorType = 'Alpha' | 'Brahma' | 'Shakti';

interface MockDevoteeProfile {
  name: string;
  spiritualName?: string;
  gotra: string;
  kuladevata: string;
  passType: string;
  matchConfidence: number;
  corridor: CorridorType;
  corridorGate: string;
  corridorColor: string;
  waitTimeMins: number;
  photoUrl?: string;
  memberId: string;
}

const MOCK_PROFILES: MockDevoteeProfile[] = [
  {
    name: 'Pandit Radheshyam Joshi',
    spiritualName: 'Radha Vallabh Das',
    gotra: 'Kashyapa Gotra',
    kuladevata: 'Mata Vindhyavasini Devi',
    passType: 'VIP Shighra Darshan (Yajaman)',
    matchConfidence: 98.4,
    corridor: 'Brahma',
    corridorGate: 'GATE 2B (SANCTUM NORTH)',
    corridorColor: 'from-amber-500/20 via-orange-500/20 to-amber-500/10 border-amber-500/50 text-amber-300',
    waitTimeMins: 6,
    memberId: 'DEV-KSH-8821',
  },
  {
    name: 'Smt. Gayatri Devi Agrawal',
    gotra: 'Gargya Gotra',
    kuladevata: 'Mata Shakambhari Devi',
    passType: 'Vriddha & Divyang Priority Pass',
    matchConfidence: 99.1,
    corridor: 'Shakti',
    corridorGate: 'RAMP 1 (ACCESSIBLE CORRIDOR)',
    corridorColor: 'from-purple-500/20 via-indigo-500/20 to-purple-500/10 border-purple-500/50 text-purple-300',
    waitTimeMins: 4,
    memberId: 'DEV-VRN-1049',
  },
  {
    name: 'Sri Amit Vikram Somani',
    gotra: 'Bharadvaja Gotra',
    kuladevata: 'Lord Somnath Mahadev',
    passType: 'Sugam General Queue Pass',
    matchConfidence: 97.8,
    corridor: 'Alpha',
    corridorGate: 'GATE 4 (EAST CORRIDOR)',
    corridorColor: 'from-blue-500/20 via-cyan-500/20 to-blue-500/10 border-blue-500/50 text-blue-300',
    waitTimeMins: 28,
    memberId: 'DEV-SMN-3920',
  },
];

export const DarshanCheckInDesk: React.FC = () => {
  const { getTaxonomy } = useLanguage();
  const [scanStatus, setScanStatus] = useState<ScanStatus>('idle');
  const [profileIndex, setProfileIndex] = useState(0);
  const [devoteeData, setDevoteeData] = useState<MockDevoteeProfile | null>(null);
  const [liveAlphaCount, setLiveAlphaCount] = useState(340);
  const [liveBrahmaCount, setLiveBrahmaCount] = useState(42);
  const [liveShaktiCount, setLiveShaktiCount] = useState(18);

  // Micro-fluctuate throughput telemetry
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveAlphaCount((prev) => Math.max(280, Math.min(420, prev + (Math.random() > 0.5 ? 2 : -2))));
      setLiveBrahmaCount((prev) => Math.max(30, Math.min(65, prev + (Math.random() > 0.6 ? 1 : -1))));
      setLiveShaktiCount((prev) => Math.max(12, Math.min(30, prev + (Math.random() > 0.5 ? 1 : -1))));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleSimulateScan = () => {
    if (scanStatus === 'scanning') return;
    setScanStatus('scanning');
    setDevoteeData(null);

    setTimeout(() => {
      // Rotate profiles
      const profile = MOCK_PROFILES[profileIndex % MOCK_PROFILES.length];
      setProfileIndex((prev) => prev + 1);
      setDevoteeData(profile);
      setScanStatus('verified');
    }, 1500);
  };

  const handleReset = () => {
    setScanStatus('idle');
    setDevoteeData(null);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30">
              Domain 1 &bull; Biometric Turnstile Terminal
            </span>
            <span className="text-xs text-slate-500 font-mono">
              Terminal: TURNSTILE-GATE-02 &bull; Mode: High-Velocity
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <ScanFace className="w-8 h-8 text-amber-600" />
            <span>Biometric Gate Command & Corridor Routing</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Sub-second facial mesh anti-scalping verification with dynamic Shastric corridor load dispatch.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors cursor-pointer shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
            <span>Reset Camera</span>
          </button>
        </div>
      </div>

      {/* Main Command Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* SECTION 1: THE SCANNER PROXY (Camera Box with FaceMesh Overlay) */}
        <div className="lg:col-span-6 bg-slate-950 border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between text-slate-100 min-h-[460px]">
          {/* Top Bar inside Scanner */}
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                LIVENESS SENSOR ACTIVE
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-400 bg-slate-900/90 px-2 py-0.5 rounded border border-slate-800">
              FPS: 60 &bull; HD 1080p
            </span>
          </div>

          {/* Center: FaceMesh Overlay Simulation */}
          <div className="my-auto relative flex items-center justify-center">
            {/* Dark Camera Viewport Mock */}
            <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-3xl border-2 border-slate-700/80 bg-slate-900/60 relative overflow-hidden flex items-center justify-center shadow-inner">
              {/* Corner Brackets for Face Targeting */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-amber-400"></div>
              <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-amber-400"></div>
              <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-amber-400"></div>
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-amber-400"></div>

              {/* Laser Scanning Animation */}
              {scanStatus === 'scanning' && (
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_15px_#f59e0b] animate-bounce top-1/2 -translate-y-1/2" />
              )}

              {/* Face Silhouette & Vector Node Matrix */}
              <div className="relative text-center">
                <div className={`w-28 h-28 mx-auto rounded-full border border-dashed flex items-center justify-center transition-all ${
                  scanStatus === 'verified'
                    ? 'border-emerald-400 bg-emerald-950/40 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                    : scanStatus === 'scanning'
                    ? 'border-amber-400 bg-amber-950/30 text-amber-300 animate-pulse'
                    : 'border-slate-600 bg-slate-800/40 text-slate-400'
                }`}>
                  <ScanFace className="w-16 h-16" />
                </div>

                <div className="mt-3 text-xs font-mono">
                  {scanStatus === 'scanning' && (
                    <span className="text-amber-400 font-bold animate-pulse">
                      Analyzing 128 FaceMesh Landmark Points...
                    </span>
                  )}
                  {scanStatus === 'verified' && (
                    <span className="text-emerald-400 font-bold">
                      Match Confirmed: {devoteeData?.matchConfidence}% Confidence
                    </span>
                  )}
                  {scanStatus === 'idle' && (
                    <span className="text-slate-400">
                      Align Pilgrim Face within Optical Targeting Reticle
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Scanner Bottom Action Controls */}
          <div className="pt-4 border-t border-slate-800 relative z-10 flex items-center justify-between gap-3">
            <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Anti-Pass Scalping Vault Lock</span>
            </div>

            <button
              type="button"
              onClick={handleSimulateScan}
              disabled={scanStatus === 'scanning'}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs shadow-lg transition-all active:scale-98 cursor-pointer flex items-center gap-2 ${
                scanStatus === 'scanning'
                  ? 'bg-amber-600/50 text-white cursor-wait'
                  : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/25'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>{scanStatus === 'scanning' ? 'Verifying FaceMesh...' : 'Simulate Facial Scan'}</span>
            </button>
          </div>
        </div>

        {/* SECTION 2 & 3: THE VERIFICATION PAYLOAD & DYNAMIC CORRIDOR DISPATCH */}
        <div className="lg:col-span-6 flex flex-col justify-between gap-6">
          {/* SECTION 2: VERIFICATION PAYLOAD */}
          {scanStatus === 'verified' && devoteeData ? (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              {/* Giant Success Banner */}
              <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 mb-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-emerald-400 block">
                      STATUS: PASS VERIFIED & AUTHENTICATED
                    </span>
                    <span className="text-base font-black text-white">
                      Valid Pilgrim Pass Issued
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    Biometric: {devoteeData.matchConfidence}% Match
                  </span>
                </div>
              </div>

              {/* Devotee Demographic & Shastric Lineage Details */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-black text-white tracking-tight">
                      {devoteeData.name}
                    </h3>
                    {devoteeData.spiritualName && (
                      <p className="text-xs text-amber-400 font-serif italic">
                        Spiritual Name: {devoteeData.spiritualName}
                      </p>
                    )}
                    <p className="text-xs text-slate-400 font-mono mt-0.5">
                      Member ID: {devoteeData.memberId}
                    </p>
                  </div>

                  <span className="px-3 py-1 rounded-xl text-xs font-bold uppercase bg-slate-800 text-amber-400 border border-slate-700">
                    {devoteeData.passType}
                  </span>
                </div>

                {/* Shastric Gotra & Kuldevi Correlation */}
                <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                      Vedic Gotra
                    </span>
                    <span className="text-xs font-bold text-slate-200 mt-0.5 block flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-amber-500" />
                      {devoteeData.gotra}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                      Kuladevata / Ishta
                    </span>
                    <span className="text-xs font-bold text-slate-200 mt-0.5 block truncate">
                      {devoteeData.kuladevata}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xs flex flex-col items-center justify-center text-center min-h-[220px]">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 mb-3">
                <Waypoints className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-slate-800">
                Awaiting Optical Verification
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mt-1">
                Trigger simulated camera scan on the left to extract the encrypted pass payload and dispatch queue instructions.
              </p>
            </div>
          )}

          {/* SECTION 3: DYNAMIC CORRIDOR DISPATCH (Oversized Routing Card) */}
          {scanStatus === 'verified' && devoteeData ? (
            <div className={`p-6 rounded-3xl border bg-linear-to-r shadow-xl relative overflow-hidden ${devoteeData.corridorColor}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-black uppercase tracking-widest flex items-center gap-1.5">
                  <Waypoints className="w-4 h-4" />
                  DYNAMIC QUEUE CORRIDOR ROUTING
                </span>
                <span className="flex items-center gap-1 text-xs font-mono font-bold px-2 py-0.5 rounded bg-black/30 border border-white/20">
                  <Clock className="w-3.5 h-3.5" />
                  Est. Wait: ~{devoteeData.waitTimeMins} Mins
                </span>
              </div>

              <div className="my-3">
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight uppercase leading-tight">
                  &gt;&gt; PROCEED TO CORRIDOR {devoteeData.corridor.toUpperCase()} &lt;&lt;
                </h2>
                <div className="flex items-center gap-2 mt-2 text-xs font-bold font-mono">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span>{devoteeData.corridorGate}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold">
                <span>Sanctum Arrival Window: <strong>Low Congestion</strong></span>
                <span className="flex items-center gap-1 font-bold">
                  <span>Follow Floor Markers</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-3xl border border-dashed border-slate-300 bg-slate-50/50 flex items-center justify-center text-xs text-slate-400 font-mono text-center">
              Corridor Dispatch Guidance Card will activate immediately upon verification
            </div>
          )}
        </div>
      </div>

      {/* SECTION 4: LIVE LOAD TELEMETRY (Bottom Live Turnstile Bar) */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 shadow-lg text-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Live Queue Velocity & Turnstile Throughput:
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1 max-w-2xl">
            {/* Corridor Alpha */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-blue-500/30 text-xs font-mono">
              <span className="text-blue-400 font-bold">Corridor Alpha (General):</span>
              <span className="text-white font-black">{liveAlphaCount} / min</span>
            </div>

            {/* Corridor Brahma */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-amber-500/30 text-xs font-mono">
              <span className="text-amber-400 font-bold">Corridor Brahma (VIP):</span>
              <span className="text-white font-black">{liveBrahmaCount} / min</span>
            </div>

            {/* Corridor Shakti */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-purple-500/30 text-xs font-mono">
              <span className="text-purple-400 font-bold">Corridor Shakti (Divyang):</span>
              <span className="text-white font-black">{liveShaktiCount} / min</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DarshanCheckInDesk;
