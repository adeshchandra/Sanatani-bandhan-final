import React, { useState } from 'react';
import {
  Globe2,
  Sparkles,
  QrCode,
  Activity,
  Menu,
  Coins,
  LogOut,
  HeartPulse,
  MessageSquare,
  Bell,
  Check,
  Flame,
  Shield
} from 'lucide-react';
import { useAuthWorkspace } from '../../context/AuthWorkspaceContext';
import { useLanguage } from '../../context/LanguageContext';
import { useWorkspaceTaxonomy } from '../../hooks/useWorkspaceTaxonomy';
import { useNotifications } from '../../context/NotificationContext';
import { calculatePanchang } from '../../utils/panchang';
import { UserRole } from '../../types';

interface HeaderProps {
  onOpenSidebar: () => void;
  onOpenTelemetry: () => void;
  onOpenMySpace: () => void;
  onOpenQuickPay?: () => void;
  onOpenQuickChanda?: () => void;
  onOpenAssistant?: () => void;
  onOpenSahayata?: () => void;
  onOpenGodMode?: () => void;
  activeModule: string;
  onSelectModule?: (module: string) => void;
  onNavigate?: (module: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSidebar,
  onOpenTelemetry,
  onOpenMySpace,
  onOpenQuickPay,
  onOpenQuickChanda,
  onOpenAssistant,
  onOpenSahayata,
  activeModule,
}) => {
  const handleQuickPay = onOpenQuickChanda || onOpenQuickPay || (() => {});
  const {
    activeWorkspace,
    currentRole,
    switchRole,
    setViewMode,
    logout,
    checkPermission,
  } = useAuthWorkspace();

  const { language, setLanguage, t } = useLanguage();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const panchang = calculatePanchang();
  const taxonomy = useWorkspaceTaxonomy();

  const getRoleLabel = (r: UserRole) => {
    switch (r) {
      case 'master_admin': return 'God Mode';
      case 'superadmin': return 'God Mode (Super Admin)';
      case 'head_admin': return 'Head Admin (Trustee)';
      case 'manager': return 'Staff Manager';
      case 'devotee': return `Personal Mode (${taxonomy.memberNoun})`;
    }
  };

  return (
    <header className="h-16 lg:h-20 bg-gradient-to-b from-stone-900 to-stone-800 border-b border-stone-700 flex items-center justify-between px-3 sm:px-6 shrink-0 z-50 shadow-md">
      <div className="flex items-center gap-3 sm:gap-5">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="lg:hidden p-2 -ml-2 rounded-xl text-stone-400 hover:text-white hover:bg-white/10 transition-all"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-3">
          {activeWorkspace.logoBase64 ? (
            <img 
              src={activeWorkspace.logoBase64} 
              alt={activeWorkspace.name} 
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl object-cover border border-[#FF9933]/50 shadow-[0_0_10px_rgba(255,153,51,0.2)] shrink-0 bg-white" 
            />
          ) : (
            <img 
              src="/logo.svg" 
              alt="Sanatani Bandhan" 
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl object-contain shadow-[0_0_12px_rgba(255,153,51,0.35)] shrink-0 transition-transform hover:scale-105" 
              onError={(e) => { e.currentTarget.src = '/icon-192x192.png'; }}
            />
          )}

          <div className="flex flex-col text-left justify-center">
            <h1 className="text-base sm:text-lg font-bold text-white leading-tight tracking-tight line-clamp-2 max-w-[180px] sm:max-w-md">
              {activeWorkspace.name}
            </h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-[#FF9933] uppercase">
                {activeWorkspace.type}
              </span>
              {activeWorkspace.city && (
                <>
                  <span className="w-1 h-1 rounded-full bg-stone-500 hidden sm:inline-block"></span>
                  <span className="hidden sm:inline text-[11px] font-medium text-stone-400">
                    {activeWorkspace.city}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Center/Right side controls */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Live Panjika (Hidden on mobile) */}
        <div className="hidden xl:flex flex-col items-end border-r border-stone-700 pr-5 mr-1">
          <span className="text-[10px] uppercase font-bold text-stone-400 tracking-widest">Vikram 2083 / San 1433</span>
          <span className="text-sm font-medium text-[#FF9933] italic">
            {panchang.tithi} • {panchang.nakshatra}
          </span>
        </div>

        {/* Quick Chanda Button - Visible on all sizes but icon only on tiny screens */}
        <button
          type="button"
          onClick={handleQuickPay}
          className="flex items-center gap-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-[#FF9933] to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-orange-500/20"
        >
          <Coins className="w-4 h-4" />
          <span className="hidden sm:inline">{t('quickPay')}</span>
          <span className="sm:hidden">Pay</span>
        </button>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center gap-2">
          {/* Trilingual Language Selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowLangDropdown(!showLangDropdown)}
              className="flex items-center gap-1 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-stone-300 transition-colors border border-white/5"
            >
              <Globe2 className="w-4 h-4 text-indigo-400" />
              <span>{language.toUpperCase()}</span>
            </button>
            {showLangDropdown && (
              <div className="absolute right-0 mt-2 w-32 rounded-xl bg-stone-800 border border-stone-700 shadow-xl p-1.5 z-50">
                {['en', 'hi', 'bn', 'sa'].map((lang) => (
                  <button key={lang} onClick={() => { setLanguage(lang as any); setShowLangDropdown(false); }} className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-colors ${language === lang ? 'bg-[#FF9933]/20 text-[#FF9933]' : 'hover:bg-white/5 text-stone-300'}`}>
                    {lang === 'en' ? 'English' : lang === 'hi' ? 'हिन्दी' : lang === 'bn' ? 'বাংলা' : 'संस्कृतम्'}
                  </button>
                ))}
              </div>
            )}
          </div>

          {onOpenAssistant && (
            <button
              type="button"
              onClick={onOpenAssistant}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-500 text-xs font-bold transition-all"
            >
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>Dharmic AI</span>
            </button>
          )}

          {onOpenSahayata && (
            <button
              type="button"
              onClick={onOpenSahayata}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 text-xs font-bold transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Community</span>
            </button>
          )}

          <button
          onClick={() => setViewMode('MEMBER')}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white rounded-lg transition-colors border border-stone-700"
          title="Switch to Personal/Member View"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          <span className="text-xs font-semibold">Personal View</span>
        </button>
        {checkPermission(['head_admin', 'master_admin', 'superadmin']) && (
          <button onClick={onOpenTelemetry} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-stone-400 hover:text-emerald-400 transition-colors border border-white/5">
            <Activity className="w-4 h-4" />
          </button>
        )}
          <button onClick={onOpenMySpace} className="px-3 py-2 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 transition-colors border border-indigo-500/20 flex items-center gap-2 shadow-inner">
            <QrCode className="w-4 h-4" />
            <span className="text-xs font-bold hidden lg:block">Smart Pass</span>
          </button>
          
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(true)}
              className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-white/10 transition-colors relative border border-transparent hover:border-white/5"
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-red-500 rounded-full border border-stone-900"></span>
              )}
            </button>
            <NotificationPanel 
              isOpen={showNotifications} 
              onClose={() => setShowNotifications(false)} 
              theme="dark" 
            />
          </div>
        </div>

        {/* Unified Profile & Settings (Always Visible) */}
        <div className="relative border-l border-stone-700 pl-3 sm:pl-4 ml-1 sm:ml-2">
          <button
            type="button"
            onClick={() => setShowRoleDropdown(!showRoleDropdown)}
            className="flex items-center gap-2 sm:gap-3 text-left cursor-pointer group"
          >
            <div className="hidden md:block text-right">
              <p className="text-sm font-bold text-white group-hover:text-[#FF9933] transition-colors">{getRoleLabel(currentRole)}</p>
              <p className="text-[10px] uppercase text-stone-400 font-bold tracking-wider">Settings & Profile</p>
            </div>
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-stone-800 border-2 border-stone-600 shadow-sm overflow-hidden shrink-0 transition-transform group-hover:scale-105 group-hover:border-[#FF9933]">
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#FF9933]/20 to-orange-500/20 text-[#FF9933] font-bold text-sm">
                {currentRole.substring(0,2).toUpperCase()}
              </div>
            </div>
          </button>

          {showRoleDropdown && (
            <div className="absolute right-0 mt-3 w-64 sm:w-60 rounded-2xl bg-stone-800 border border-stone-700 shadow-2xl p-2 z-50 animate-in slide-in-from-top-2 duration-200">
              
              {/* Mobile Only: App Utilities */}
              <div className="md:hidden flex flex-col gap-1 mb-2">
                <button onClick={() => { setShowRoleDropdown(false); onOpenMySpace(); }} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5 text-stone-300 text-xs font-bold transition-colors">
                  <QrCode className="w-4 h-4 text-indigo-400" /> My Smart Pass
                </button>
                {onOpenAssistant && (
                  <button onClick={() => { setShowRoleDropdown(false); onOpenAssistant(); }} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5 text-stone-300 text-xs font-bold transition-colors">
                    <Sparkles className="w-4 h-4 text-amber-500" /> Dharmic AI Assistant
                  </button>
                )}
                {checkPermission(['head_admin', 'master_admin', 'superadmin']) && (
                  <button onClick={() => { setShowRoleDropdown(false); onOpenTelemetry(); }} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5 text-stone-300 text-xs font-bold transition-colors">
                    <Activity className="w-4 h-4 text-emerald-400" /> Live Telemetry
                  </button>
                )}
                
                <div className="px-2.5 py-1.5 mt-1">
                  <p className="text-[10px] uppercase font-bold text-stone-500 mb-1.5">Language</p>
                  <div className="flex gap-2">
                    {['en', 'hi', 'bn', 'sa'].map((lang) => (
                      <button key={lang} onClick={() => { setLanguage(lang as any); setShowRoleDropdown(false); }} className={`flex-1 py-1 rounded-lg text-[10px] font-bold text-center border transition-colors ${language === lang ? 'bg-[#FF9933]/20 border-[#FF9933]/50 text-[#FF9933]' : 'border-stone-600 text-stone-400 hover:bg-white/5'}`}>
                        {lang.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="h-px bg-stone-700 my-1 mx-2"></div>
              </div>

              {/* Role Switcher */}
              <div className="px-3 py-2 border-b border-stone-700 mb-2">
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                  Role-Based Access
                </p>
              </div>
              {(['head_admin', 'manager', 'devotee'] as UserRole[]).map((r) => (
                <button
                  key={r}
                  onClick={() => { switchRole(r); setShowRoleDropdown(false); }}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-colors ${
                    currentRole === r
                      ? 'bg-indigo-500/20 text-indigo-400'
                      : 'hover:bg-white/5 text-stone-300'
                  }`}
                >
                  <span>{getRoleLabel(r)}</span>
                  {currentRole === r && <span>✓</span>}
                </button>
              ))}
              
              {/* Logout */}
              <div className="border-t border-stone-700 mt-2 pt-2">
                <button
                  onClick={() => { logout(); setShowRoleDropdown(false); }}
                  className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-rose-500/10 text-rose-500 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

