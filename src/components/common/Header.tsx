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
  Shield,
  HelpCircle,
  PanelLeftClose,
  PanelLeftOpen,
  UserCircle,
  Building2,
  ArrowLeftRight
} from 'lucide-react';
import { useAuthWorkspace } from '../../context/AuthWorkspaceContext';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '../../context/ToastContext';
import { useWorkspaceTaxonomy } from '../../hooks/useWorkspaceTaxonomy';
import { useNotifications } from '../../context/NotificationContext';
import { calculatePanchang } from '../../utils/panchang';
import { UserRole } from '../../types';
import { NotificationPanel } from './NotificationPanel';

interface HeaderProps {
  onOpenSidebar: () => void;
  isSidebarCollapsed?: boolean;
  onToggleSidebarCollapse?: () => void;
  onOpenTelemetry: () => void;
  onOpenMySpace: () => void;
  onOpenQuickPay?: () => void;
  onOpenQuickChanda?: () => void;
  onOpenAssistant?: () => void;
  onOpenSahayata?: () => void;
  onOpenGodMode?: () => void;
  onOpenGuide?: () => void;
  activeModule: string;
  onSelectModule?: (module: string) => void;
  onNavigate?: (module: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSidebar,
  isSidebarCollapsed = false,
  onToggleSidebarCollapse,
  onOpenTelemetry,
  onOpenMySpace,
  onOpenQuickPay,
  onOpenQuickChanda,
  onOpenAssistant,
  onOpenSahayata,
  onOpenGuide,
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
  const { showToast } = useToast();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const panchang = calculatePanchang();
  const taxonomy = useWorkspaceTaxonomy();

  const getRoleLabel = (r: UserRole) => {
    switch (r) {
      case 'SUPER_ADMIN': return 'God Mode';
      
      
      case 'MANAGER': return 'Staff Manager';
      case 'DEVOTEE': return `Personal Mode (${taxonomy.memberNoun})`;
    }
  };

  return (
    <header className="h-16 lg:h-20 bg-gradient-to-b from-temple-900 to-temple-800 border-b border-temple-700 flex items-center justify-between px-3 sm:px-6 shrink-0 z-50 shadow-md">
      <div className="flex items-center gap-3 sm:gap-5">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="lg:hidden p-2 -ml-2 rounded-xl text-temple-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          title="Open Desks Menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        {onToggleSidebarCollapse && (
          <button
            type="button"
            onClick={onToggleSidebarCollapse}
            className="hidden lg:flex p-2 -ml-1 rounded-xl text-temple-400 hover:text-saffron-400 hover:bg-white/10 transition-all cursor-pointer"
            title={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar to Icon Rail'}
          >
            {isSidebarCollapsed ? <PanelLeftOpen className="w-5 h-5 text-saffron-400" /> : <PanelLeftClose className="w-5 h-5" />}
          </button>
        )}

        <div className="flex items-center gap-3">
          {activeWorkspace.logoUrl ? (
            <img 
              src={activeWorkspace.logoUrl || undefined} 
              alt={activeWorkspace.name} 
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl object-cover border border-saffron-500/50 shadow-saffron-500/20 shrink-0 bg-white" 
            />
          ) : (
            <img 
              src="/logo.png" 
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
              <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-saffron-500 uppercase">
                {activeWorkspace.type}
              </span>
              {activeWorkspace.city && (
                <>
                  <span className="w-1 h-1 rounded-full bg-temple-500 hidden sm:inline-block"></span>
                  <span className="hidden sm:inline text-[11px] font-medium text-temple-400">
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
        <div className="hidden xl:flex flex-col items-end border-r border-temple-700 pr-5 mr-1">
          <span className="text-[10px] uppercase font-bold text-temple-400 tracking-widest">Vikram 2083 / San 1433</span>
          <span className="text-sm font-medium text-saffron-500 italic">
            {panchang.tithi} • {panchang.nakshatra}
          </span>
        </div>

        {/* Quick Chanda Button - Visible on all sizes but icon only on tiny screens */}
        <button
          type="button"
          onClick={handleQuickPay}
          className="flex items-center gap-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-saffron-500 to-saffron-500 hover:from-saffron-500 hover:to-saffron-600 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-saffron-500/20"
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
              className="flex items-center gap-1 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-temple-300 transition-colors border border-white/5"
            >
              <Globe2 className="w-4 h-4 text-indigo-400" />
              <span>{language.toUpperCase()}</span>
            </button>
            {showLangDropdown && (
              <div className="absolute right-0 mt-2 w-32 rounded-xl bg-temple-800 border border-temple-700 shadow-xl p-1.5 z-50">
                {['en', 'hi', 'bn', 'sa'].map((lang, idx) => (
                  <button key={lang} onClick={() => { setLanguage(lang as any); setShowLangDropdown(false); }} className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-colors ${language === lang ? 'bg-saffron-500/20 text-saffron-500' : 'hover:bg-white/5 text-temple-300'}`}>
                    {lang === 'en' ? 'English' : lang === 'hi' ? 'हिन्दी' : lang === 'bn' ? 'বাংলা' : 'संस्कृतम्'}
                  </button>
                ))}
              </div>
            )}
          </div>

          {onOpenGuide && (
            <button
              type="button"
              onClick={onOpenGuide}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-bold transition-all"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Guide</span>
            </button>
          )}
          {onOpenAssistant && (
            <button
              type="button"
              onClick={onOpenAssistant}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-saffron-500/10 hover:bg-saffron-500/20 border border-saffron-500/30 text-saffron-500 text-xs font-bold transition-all"
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
            id="header-btn-switch-personal"
            onClick={() => {
              setViewMode('MEMBER');
              showToast('Switched to Personal Devotee Space 🙏', 'success', 'Personal Mode Active');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-saffron-500/20 to-saffron-500/20 hover:from-saffron-500 hover:to-saffron-500 text-saffron-300 hover:text-temple-950 rounded-xl transition-all border border-saffron-500/40 font-bold text-xs shadow-xs cursor-pointer group"
            title="Switch to Personal Devotee View (Darshan, Sadhana Japa, Vivah, e-Pass & 80G Receipts)"
          >
            <UserCircle className="w-4 h-4 text-saffron-400 group-hover:text-temple-950 transition-colors" />
            <span className="font-bold">Personal View</span>
          </button>
        {checkPermission(['SUPER_ADMIN', 'SUPER_ADMIN', 'SUPER_ADMIN']) && (
          <button onClick={onOpenTelemetry} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-temple-400 hover:text-emerald-400 transition-colors border border-white/5">
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
              className="p-2 rounded-xl text-temple-400 hover:text-white hover:bg-white/10 transition-colors relative border border-transparent hover:border-white/5"
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-red-500 rounded-full border border-temple-900"></span>
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
        <div className="relative border-l border-temple-700 pl-3 sm:pl-4 ml-1 sm:ml-2">
          <button
            type="button"
            onClick={() => setShowRoleDropdown(!showRoleDropdown)}
            className="flex items-center gap-2 sm:gap-3 text-left cursor-pointer group"
          >
            <div className="hidden md:block text-right">
              <p className="text-sm font-bold text-white group-hover:text-saffron-500 transition-colors">{getRoleLabel(currentRole)}</p>
              <p className="text-[10px] uppercase text-temple-400 font-bold tracking-wider">Settings & Profile</p>
            </div>
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-temple-800 border-2 border-temple-600 shadow-sm overflow-hidden shrink-0 transition-transform group-hover:scale-105 group-hover:border-saffron-500">
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-saffron-500/20 to-saffron-500/20 text-saffron-500 font-bold text-sm">
                {currentRole.substring(0,2).toUpperCase()}
              </div>
            </div>
          </button>

          {showRoleDropdown && (
            <div className="absolute right-0 mt-3 w-64 sm:w-60 rounded-2xl bg-temple-800 border border-temple-700 shadow-2xl p-2 z-50 animate-in slide-in-from-top-2 duration-200">
              
              {/* Mobile Only: App Utilities */}
              <div className="md:hidden flex flex-col gap-1 mb-2">
                <button onClick={() => { setShowRoleDropdown(false); onOpenMySpace(); }} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5 text-temple-300 text-xs font-bold transition-colors">
                  <QrCode className="w-4 h-4 text-indigo-400" /> My Smart Pass
                </button>
                {onOpenGuide && (
            <button
              type="button"
              onClick={onOpenGuide}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-bold transition-all"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Guide</span>
            </button>
          )}
          {onOpenAssistant && (
                  <button onClick={() => { setShowRoleDropdown(false); onOpenAssistant(); }} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5 text-temple-300 text-xs font-bold transition-colors">
                    <Sparkles className="w-4 h-4 text-saffron-500" /> Dharmic AI Assistant
                  </button>
                )}
                {checkPermission(['SUPER_ADMIN', 'SUPER_ADMIN', 'SUPER_ADMIN']) && (
                  <button onClick={() => { setShowRoleDropdown(false); onOpenTelemetry(); }} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5 text-temple-300 text-xs font-bold transition-colors">
                    <Activity className="w-4 h-4 text-emerald-400" /> Live Telemetry
                  </button>
                )}
                
                <div className="px-2.5 py-1.5 mt-1">
                  <p className="text-[10px] uppercase font-bold text-temple-500 mb-1.5">Language</p>
                  <div className="flex gap-2">
                    {['en', 'hi', 'bn', 'sa'].map((lang, idx) => (
                      <button key={lang} onClick={() => { setLanguage(lang as any); setShowRoleDropdown(false); }} className={`flex-1 py-1 rounded-lg text-[10px] font-bold text-center border transition-colors ${language === lang ? 'bg-saffron-500/20 border-saffron-500/50 text-saffron-500' : 'border-temple-600 text-temple-400 hover:bg-white/5'}`}>
                        {lang.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="h-px bg-temple-700 my-1 mx-2"></div>
              </div>

              {/* Role Switcher */}
              <div className="px-3 py-2 border-b border-temple-700 mb-2">
                <p className="text-[10px] font-bold text-temple-400 uppercase tracking-wider">
                  Role-Based Access
                </p>
              </div>
              {(['SUPER_ADMIN', 'MANAGER', 'DEVOTEE'] as UserRole[]).map((r, idx) => (
                <button
                  key={r}
                  onClick={() => { switchRole(r); setShowRoleDropdown(false); }}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-colors ${
                    currentRole === r
                      ? 'bg-indigo-500/20 text-indigo-400'
                      : 'hover:bg-white/5 text-temple-300'
                  }`}
                >
                  <span>{getRoleLabel(r)}</span>
                  {currentRole === r && <span>✓</span>}
                </button>
              ))}
              
              {/* Logout */}
              <div className="border-t border-temple-700 mt-2 pt-2">
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

