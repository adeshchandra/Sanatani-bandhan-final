import React, { useState } from 'react';
import { 
  Home, UserCircle, Heart, Flame, Sparkles, SwitchCamera, BookOpen, 
  MessageCircle, Shield, Building2, ChevronRight, LogOut, ArrowLeftRight, Check,
  Bell, Radio
} from 'lucide-react';
import { useAuthWorkspace } from '../../context/AuthWorkspaceContext';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '../../context/ToastContext';
import { useNotifications } from '../../context/NotificationContext';
import { NotificationPanel } from '../common/NotificationPanel';
import PersonalSadhanaDesk from '../domain5/PersonalSadhanaDesk';
import SanataniVivahDesk from '../domain4/SanataniVivahDesk';
import { PurohitMarketDesk } from '../domain3/PurohitMarketDesk';
import SanataniSocialFeed from './SanataniSocialFeed';
import { PersonalAccountDesk } from '../account/PersonalAccountDesk';
import YatraNetDesk from '../domain7/YatraNetDesk';

export default function MemberAppShell() {
  const { 
    activeWorkspace, 
    currentUser, 
    currentRole, 
    viewMode, 
    setViewMode, 
    workspaces, 
    switchWorkspace,
    logout 
  } = useAuthWorkspace();
  const { safeTranslate } = useLanguage();
  const { showToast } = useToast();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const [activeTab, setActiveTab] = useState('HOME');
  const [showNotifications, setShowNotifications] = useState(false);

  // Check if current user has admin / manager permissions to switch back
  const canSwitchToAdmin = 
    currentRole === 'head_admin' || 
    currentRole === 'manager' || 
    currentRole === 'trustee' || 
    currentRole === 'master_admin' ||
    currentRole === 'superadmin' ||
    currentRole === 'admin' ||
    currentUser?.role === 'trustee' ||
    currentUser?.role === 'manager' ||
    currentUser?.role === 'admin' ||
    currentUser?.role === 'superadmin';

  React.useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'view_member_tab',
        member_tab: activeTab,
        workspace_id: activeWorkspace?.id
      });
    }
  }, [activeTab, activeWorkspace]);

  const handleSwitchToAdmin = () => {
    setViewMode('ADMIN');
    showToast(`Switched back to ${currentRole.toUpperCase()} Console safely 🙏`, 'success');
  };

  const handleNavigateFromAccount = (deskId: string) => {
    if (deskId.includes('purohit') || deskId.includes('pooja')) {
      setActiveTab('PUROHIT');
    } else if (deskId.includes('sadhana')) {
      setActiveTab('SADHANA');
    } else if (deskId.includes('vivah')) {
      setActiveTab('VIVAH');
    } else if (deskId.includes('yatra')) {
      setActiveTab('YATRA_NET');
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'HOME': return <SanataniSocialFeed />;
      case 'PUROHIT': return <div className="h-full overflow-hidden"><PurohitMarketDesk /></div>;
      case 'SADHANA': return <div className="h-full overflow-hidden"><PersonalSadhanaDesk /></div>;
      case 'VIVAH': return <div className="h-full overflow-hidden"><SanataniVivahDesk /></div>;
      case 'YATRA_NET': return <div className="h-full overflow-y-auto p-4 custom-scrollbar"><YatraNetDesk /></div>;
      case 'PROFILE': return <PersonalAccountDesk onNavigateDesk={handleNavigateFromAccount} />;
      default: return <SanataniSocialFeed />;
    }
  };

  return (
    <div className="h-screen w-full bg-white flex flex-col font-sans overflow-hidden">
      {/* Top Banner for Admin/Manager in Devotee Mode */}
      {canSwitchToAdmin && (
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white px-3 py-1.5 flex items-center justify-between text-xs font-bold shrink-0 shadow-xs z-30">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Viewing as Devotee</span>
            <span className="opacity-80 hidden sm:inline">• Organization: {activeWorkspace?.name}</span>
          </div>
          <button
            onClick={handleSwitchToAdmin}
            className="flex items-center gap-1.5 px-3 py-0.5 bg-white/20 hover:bg-white/30 active:scale-95 rounded-lg text-white font-black text-[11px] backdrop-blur-xs transition-all border border-white/30"
          >
            <Shield className="w-3.5 h-3.5 text-amber-200" />
            <span>Manage Organisation (Admin Portal) ↗</span>
          </button>
        </div>
      )}

      {/* Mobile-first Header */}
      <header className="bg-white border-b border-stone-200 px-4 py-2.5 flex items-center justify-between shrink-0 z-20 shadow-xs relative">
        <div className="flex items-center gap-3">
          <img 
            src={activeWorkspace?.logoBase64 || '/logo.svg'} 
            alt={activeWorkspace?.name || 'Sanatani Bandhan'} 
            className="w-10 h-10 rounded-xl object-contain shadow-xs border border-stone-200"
            onError={(e) => { e.currentTarget.src = '/icon-192x192.png'; }}
          />
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-sm font-black text-stone-900">{activeWorkspace?.name}</h1>
            </div>
            <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest flex items-center gap-1">
              <span>{activeWorkspace?.city || 'Varanasi'}</span>
              <span>•</span>
              <span className="text-amber-700 font-black">{activeWorkspace?.type || 'TEMPLE'}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {canSwitchToAdmin && (
            <button
              onClick={handleSwitchToAdmin}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-black text-amber-400 rounded-xl text-xs font-black transition-all shadow-xs"
              title="Return to Admin / Manager Portal"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Console</span>
            </button>
          )}

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(true)}
              className="p-2 rounded-xl text-stone-600 hover:bg-stone-100 transition-colors relative"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
              )}
            </button>
            <NotificationPanel 
              isOpen={showNotifications} 
              onClose={() => setShowNotifications(false)} 
              theme="light" 
            />
          </div>

          <div 
            className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 text-white font-black flex items-center justify-center text-sm cursor-pointer shadow-xs hover:scale-105 active:scale-95 transition-all" 
            onClick={() => setActiveTab('PROFILE')}
            title="Open Personal Profile & Assistants"
          >
             {currentUser?.name?.charAt(0) || 'D'}
          </div>
        </div>


      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden relative bg-stone-50">
        {renderContent()}
      </main>

      {/* Bottom Navigation (Mobile) / Top Tab Bar Equivalent */}
      <nav className="bg-white border-t border-stone-200 shrink-0 z-20 shadow-xs">
        <div className="flex items-center justify-around px-2 py-2.5 max-w-lg mx-auto overflow-x-auto scrollbar-hide">
          <button onClick={() => setActiveTab('HOME')} className={`flex flex-col items-center gap-1 min-w-[56px] ${activeTab === 'HOME' ? 'text-amber-600 font-black' : 'text-stone-400 font-bold'}`}>
            <Home size={22} className={activeTab === 'HOME' ? 'fill-amber-100 text-amber-600' : ''} />
            <span className="text-[9px] uppercase tracking-widest">{safeTranslate('nav_feed', 'Feed', 'ফিড', 'फीड')}</span>
          </button>
          <button onClick={() => setActiveTab('PUROHIT')} className={`flex flex-col items-center gap-1 min-w-[56px] ${activeTab === 'PUROHIT' ? 'text-amber-600 font-black' : 'text-stone-400 font-bold'}`}>
            <BookOpen size={22} className={activeTab === 'PUROHIT' ? 'fill-amber-100 text-amber-600' : ''} />
            <span className="text-[9px] uppercase tracking-widest">{safeTranslate('nav_purohit', 'Purohit', 'পুরোহিত', 'पुरोहित')}</span>
          </button>
          <button onClick={() => setActiveTab('SADHANA')} className={`flex flex-col items-center gap-1 min-w-[56px] ${activeTab === 'SADHANA' ? 'text-amber-600 font-black' : 'text-stone-400 font-bold'}`}>
            <Flame size={22} className={activeTab === 'SADHANA' ? 'fill-amber-100 text-amber-600' : ''} />
            <span className="text-[9px] uppercase tracking-widest">{safeTranslate('nav_sadhana', 'Sadhana', 'সাধনা', 'साधना')}</span>
          </button>
          <button onClick={() => setActiveTab('YATRA_NET')} className={`flex flex-col items-center gap-1 min-w-[56px] ${activeTab === 'YATRA_NET' ? 'text-emerald-600 font-black' : 'text-stone-400 font-bold'}`}>
            <Radio size={22} className={activeTab === 'YATRA_NET' ? 'fill-emerald-100 text-emerald-600' : ''} />
            <span className="text-[9px] uppercase tracking-widest">Mesh</span>
          </button>
          <button onClick={() => setActiveTab('VIVAH')} className={`flex flex-col items-center gap-1 min-w-[56px] ${activeTab === 'VIVAH' ? 'text-amber-600 font-black' : 'text-stone-400 font-bold'}`}>
            <Heart size={22} className={activeTab === 'VIVAH' ? 'fill-amber-100 text-amber-600' : ''} />
            <span className="text-[9px] uppercase tracking-widest">{safeTranslate('nav_vivah', 'Vivah', 'বিবাহ', 'विवाह')}</span>
          </button>
          <button onClick={() => setActiveTab('PROFILE')} className={`flex flex-col items-center gap-1 min-w-[56px] ${activeTab === 'PROFILE' ? 'text-amber-600 font-black' : 'text-stone-400 font-bold'}`}>
            <UserCircle size={22} className={activeTab === 'PROFILE' ? 'fill-amber-100 text-amber-600' : ''} />
            <span className="text-[9px] uppercase tracking-widest">{safeTranslate('nav_profile', 'Profile', 'প্রোফাইল', 'प्रोफ़ाइल')}</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
