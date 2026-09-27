import React from 'react';
import {
  ShieldCheck,
  Calculator,
  FileCode2,
  Globe,
  Building2,
  ArrowRight,
  Lock,
  CheckCircle2,
  Sparkles,
  Landmark,
  TrendingDown,
  Layers,
  Utensils,
  Receipt,
  WifiOff,
  Flame,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthWorkspace } from '../context/AuthWorkspaceContext';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { loginAsRole } = useAuthWorkspace();

  const handleStartDemo = () => {
    loginAsRole('SuperAdmin', 'Sri Kashi Vishwanath Mandir Trust');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-white">
      {/* Top Navigation Bar */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-white shadow-lg shadow-amber-500/20">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-black tracking-tight text-white block leading-tight">
                SANATANI BANDHAN
              </span>
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                Sovereign Spiritual ERP
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleStartDemo}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <span>Explore Demo</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-98 text-slate-950 text-xs font-black shadow-md shadow-amber-500/20 transition-all cursor-pointer"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Tenant Login</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1">
        {/* SECTION 1: HERO */}
        <section className="relative pt-16 pb-20 px-4 sm:px-6 max-w-6xl mx-auto text-center">
          {/* Subtle Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 blur-3xl pointer-events-none rounded-full" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Next-Gen Operating System for Temples, Mathas & Trusts</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight sm:leading-none">
            The Sovereign Spiritual ERP for <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300">Dharmic Institutions</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Eliminate cash disputes, digitize temple treasuries with instant Tally Prime sync, automate 80G tax certificates, and manage kitchen grocery BOMs with mathematical rigor.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={handleStartDemo}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2.5 transition-all active:scale-98 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-slate-900" />
              <span>Start Sandbox Demo</span>
              <ArrowRight className="w-4 h-4 text-slate-900" />
            </button>

            <button
              type="button"
              onClick={() => navigate('/login')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Building2 className="w-4 h-4 text-amber-400" />
              <span>Tenant Login</span>
            </button>
          </div>
        </section>

        {/* SECTION 2: COMPLIANCE MATRIX */}
        <section className="border-y border-slate-800 bg-slate-950/60 py-6 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-[11px] font-bold text-center text-slate-500 uppercase tracking-widest mb-4">
              Institutional Governance & Security Certifications
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-xs font-black text-white">SOC2 Ready</div>
                  <div className="text-[10px] text-slate-400">Enterprise Data Isolation</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80">
                <FileCode2 className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <div className="text-xs font-black text-white">Native Tally Prime XML</div>
                  <div className="text-[10px] text-slate-400">Direct Statutory CA Ingestion</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80">
                <Receipt className="w-5 h-5 text-indigo-400 shrink-0" />
                <div>
                  <div className="text-xs font-black text-white">Automated 80G Form 10BD</div>
                  <div className="text-[10px] text-slate-400">Instant PDF Tax Receipts</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80">
                <WifiOff className="w-5 h-5 text-rose-400 shrink-0" />
                <div>
                  <div className="text-xs font-black text-white">True Offline PWA</div>
                  <div className="text-[10px] text-slate-400">IndexedDB Bi-Directional Sync</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: FIDUCIARY ROI & VALUE PILLARS */}
        <section className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase text-amber-400 tracking-wider">
              Quantifiable Operational Impact
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-2">
              Prevent Hundi Leakage. Automate Double-Entry Ledgers. Digitize Prasad BOMs.
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-3 leading-relaxed">
              Designed specifically for Mandir Management Committees, Dharmada Trusts, and Auditor Chartered Accountants to ensure transparency across all 7 operational domains.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pillar 1 */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-500/40 transition-colors flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4 border border-amber-500/20">
                  <Landmark className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  Zero Cash Leakage & Hundi Audit
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Dual-key physical count reconciliation with automated denomination tallying, CCTV counter stamps, and instant ledger locking.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] text-amber-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>100% Audit Reconciliation Traceability</span>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-500/40 transition-colors flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4 border border-indigo-500/20">
                  <Calculator className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  Double-Entry Treasury & 80G Tax Engine
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Generate instant digital receipts with QR verification. Export monthly ledger journals directly formatted for Tally Prime and Marg ERP.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] text-indigo-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>One-Click XML Export for CAs</span>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-500/40 transition-colors flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center mb-4 border border-orange-500/20">
                  <Utensils className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  Smart Bhandar & Prasad Recipe BOM
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Automated ingredient depletion for Annadanam kitchens and sacred naivedyam batches. Prevents grocery spoilage with low-stock alerts.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] text-orange-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Automated Grocery Inventory Deduction</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-8 px-4 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            &copy; {new Date().getFullYear()} Sanatani Bandhan ERP. Built for Dharmic Trusts & Heritage Kshetra Clusters.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="hover:text-white transition-colors cursor-pointer" onClick={() => navigate('/login')}>
              Tenant Login
            </span>
            <span>&bull;</span>
            <span className="hover:text-white transition-colors cursor-pointer" onClick={handleStartDemo}>
              Launch SuperAdmin
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
