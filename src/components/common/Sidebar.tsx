import React, { useState, useMemo, useEffect } from 'react';
import {
  LayoutDashboard,
  Users,
  Home,
  GitFork,
  UserPlus,
  FileSpreadsheet,
  Landmark,
  Receipt,
  Target,
  Sparkles,
  Layers,
  Package,
  Flame,
  Clock,
  BookOpen,
  Globe,
  HeartHandshake,
  Calendar,
  Utensils,
  Moon,
  GraduationCap,
  Award,
  BookMarked,
  Radio,
  Swords,
  Cross,
  Library,
  Heart,
  HeartPulse,
  CalendarCheck2, Wifi, WifiOff, CloudOff, RefreshCcw,
  Vote,
  MessageSquare,
  Image as ImageIcon,
  Scroll,
  Bot,
  Scale,
  Lock,
  UserCheck,
  Settings,
  Compass,
  Megaphone,
  Search,
  X,
  ChevronRight,
  ChevronDown,
  ShieldAlert,
  PanelLeftClose,
  PanelLeftOpen,
  UserCircle,
  ArrowLeftRight,
  Filter,
  Check
} from 'lucide-react';
import { useAuthWorkspace } from '../../context/AuthWorkspaceContext';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '../../context/ToastContext';
import { useWorkspaceTaxonomy } from '../../hooks/useWorkspaceTaxonomy';
import { isModuleAllowed } from '../../lib/workspaceRegistry';
import { OfflineSyncManager } from '../../services/OfflineSyncManager';

export interface NavItem {
  id: string;
  name: string;
  domain: number;
  domainTitle: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export const MODULE_CATALOG: NavItem[] = [
  // Domain 1: Core Command & CRM
  { id: 'dashboard', name: 'Command Center', domain: 1, domainTitle: 'Core Command & CRM', icon: LayoutDashboard },
  { id: 'devotees', name: 'Devotee & Member Directory', domain: 1, domainTitle: 'Core Command & CRM', icon: Users, badge: 'Dynamic' },
  { id: 'family', name: 'Household & Kul Parivar', domain: 1, domainTitle: 'Core Command & CRM', icon: Home },
  { id: 'vanshavali', name: 'Ancestral Lineage (Vanshavali)', domain: 1, domainTitle: 'Core Command & CRM', icon: GitFork },
  { id: 'guests', name: 'Guest & Visitor CRM', domain: 1, domainTitle: 'Core Command & CRM', icon: UserPlus },
  { id: 'bulkImport', name: 'Bulk CSV Ingestion', domain: 1, domainTitle: 'Core Command & CRM', icon: FileSpreadsheet },

  // Domain 2: Financials & Assets
  { id: 'treasury', name: 'Treasury & Expense Ledger', domain: 2, domainTitle: 'Financials & Assets', icon: Landmark, badge: 'Auto-Audit' },
  { id: 'taxReceipts', name: 'Tax Certificates (80G/12A)', domain: 2, domainTitle: 'Financials & Assets', icon: Receipt },
  { id: 'campaigns', name: 'Crowdfunding & Mandir Nirman', domain: 2, domainTitle: 'Financials & Assets', icon: Target },
  { id: 'karmaLedger', name: 'Karma Merit & Volunteer Ledger', domain: 2, domainTitle: 'Financials & Assets', icon: Sparkles },
  { id: 'assets', name: 'Fixed Assets & Deity Ornaments', domain: 2, domainTitle: 'Financials & Assets', icon: Layers },
  { id: 'inventory', name: 'Store & Consumables (Bhandara)', domain: 2, domainTitle: 'Financials & Assets', icon: Package },

  // Domain 3: Vedic Rituals & Ephemeris
  { id: 'poojaBooking', name: 'Rituals & Sankalp Hub', domain: 3, domainTitle: 'Vedic Rituals & Ephemeris', icon: Flame, badge: 'Purohit Sync' },
  { id: 'mandirPuja', name: 'Daily Aarti & Pujas', domain: 3, domainTitle: 'Vedic Rituals & Ephemeris', icon: Clock },
  { id: 'purohitDesk', name: 'Purohit Diary & Dakshina', domain: 3, domainTitle: 'Vedic Rituals & Ephemeris', icon: BookOpen },
  { id: 'purohitMarket', name: 'Global Scholar Marketplace', domain: 3, domainTitle: 'Vedic Rituals & Ephemeris', icon: Globe, badge: 'KYC Verified' },
  { id: 'pitruShradh', name: 'Pitru Paksha & Shradh Alerts', domain: 3, domainTitle: 'Vedic Rituals & Ephemeris', icon: HeartHandshake },
  { id: 'panchang', name: 'Vedic Panjika & Muhurat', domain: 3, domainTitle: 'Vedic Rituals & Ephemeris', icon: Calendar },

  // Domain 4: Specialized Desks
  { id: 'rakthaSeva', name: 'Raktha Seva (Blood Registry)', domain: 4, domainTitle: 'Specialized Desks', icon: HeartPulse, badge: 'Life Saver' },
  { id: 'goshala', name: 'Goshala Sanctuary & Gomata Records', domain: 4, domainTitle: 'Specialized Desks', icon: Heart, badge: 'Gau Seva' },
  { id: 'annadanam', name: 'Annadanam & Prasad Seva', domain: 4, domainTitle: 'Specialized Desks', icon: Utensils },
  { id: 'ashramKutir', name: 'Ashram Kutir & Sadhana Stays', domain: 4, domainTitle: 'Specialized Desks', icon: Moon },
  { id: 'dharamshala', name: 'Dharamshala Yatri Bhavan', domain: 4, domainTitle: 'Specialized Desks', icon: Home },
  { id: 'gurukul', name: 'Gurukul Residential Monitoring', domain: 4, domainTitle: 'Specialized Desks', icon: GraduationCap },
  { id: 'gurukulAcademy', name: 'Shastric Academy & Grading', domain: 4, domainTitle: 'Specialized Desks', icon: Award },
  { id: 'vidyalaya', name: 'Weekend Heritage School', domain: 4, domainTitle: 'Specialized Desks', icon: BookMarked },
  { id: 'satsang', name: 'Satsang, Kirtan & Discourse', domain: 4, domainTitle: 'Specialized Desks', icon: Radio },
  { id: 'sanghaDrills', name: 'Sangha & Shakha Mobilization', domain: 4, domainTitle: 'Specialized Desks', icon: Swords },
  { id: 'sevaTrust', name: 'Humanitarian Seva Trust', domain: 4, domainTitle: 'Specialized Desks', icon: Cross },
  { id: 'granthLibrary', name: 'Sacred Granth & Manuscript Library', domain: 4, domainTitle: 'Specialized Desks', icon: Library },

  // Domain 5: Matrimony & Outreach
  { id: 'matrimony', name: 'Vivah Bandhan (Dharmic Match)', domain: 5, domainTitle: 'Matrimony & Outreach', icon: Heart, badge: 'Gotra Match' },
  { id: 'utsavPanjika', name: 'Festival Calendar & Gate Passes', domain: 5, domainTitle: 'Matrimony & Outreach', icon: CalendarCheck2 },
  { id: 'panchayatPolls', name: 'Panchayat Voting & Quorum', domain: 5, domainTitle: 'Matrimony & Outreach', icon: Vote },
  { id: 'sandeshBroadcast', name: 'Sandesh WhatsApp/SMS Broadcast', domain: 5, domainTitle: 'Matrimony & Outreach', icon: MessageSquare },
  { id: 'socialWall', name: 'Temple Darshan Wall & Notices', domain: 5, domainTitle: 'Matrimony & Outreach', icon: ImageIcon },
  { id: 'shlokaFeed', name: 'Shloka Wisdom Stream', domain: 5, domainTitle: 'Matrimony & Outreach', icon: Scroll },
  { id: 'dharmicAssistant', name: 'Dharmic AI Query Desk', domain: 5, domainTitle: 'Matrimony & Outreach', icon: Sparkles, badge: 'Gemini 3.7' },
  { id: 'dharmaMarketing', name: 'Dharma Marketing AI', domain: 5, domainTitle: 'Matrimony & Outreach', icon: Bot, badge: 'Gemini AI' },

  // Domain 6: Governance & Security
  { id: 'trusteeGovernance', name: 'Trustee Board & Governance', domain: 6, domainTitle: 'Governance & Security', icon: Scale },
  { id: 'legalVault', name: 'Encrypted Legal Vault (80G/Deeds)', domain: 6, domainTitle: 'Governance & Security', icon: Lock },
  { id: 'sevadarRoster', name: 'Sevadar Shift Roster', domain: 6, domainTitle: 'Governance & Security', icon: UserCheck },
  { id: 'masterSettings', name: 'Organization Settings & Logos', domain: 6, domainTitle: 'Governance & Security', icon: Settings },
  { id: 'spiritualSettings', name: 'Sampradaya & Kuladevata Config', domain: 6, domainTitle: 'Governance & Security', icon: Compass },
  { id: 'crisis-command', name: 'Crisis Command Center', domain: 6, domainTitle: 'Governance & Security', icon: ShieldAlert },

  // Domain 7: Individual Life & Connect
  { id: 'sadhana-karma', name: 'Sadhana & Japa Counters', domain: 7, domainTitle: 'Sanatani Life & Connect', icon: Flame },
  { id: 'sanatani-vivah', name: 'Sanatani Vivah Portal', domain: 7, domainTitle: 'Sanatani Life & Connect', icon: Heart },
  { id: 'yatraNet', name: 'YatraNet Offline Mesh (P2P)', domain: 7, domainTitle: 'Sanatani Life & Connect', icon: Radio, badge: 'Offline P2P' },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  activeModule: string;
  onSelectModule: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  isCollapsed = false,
  onToggleCollapse,
  activeModule,
  onSelectModule,
}) => {

  const [pendingSyncCount, setPendingSyncCount] = useState(0);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const checkQueue = () => {
      const q = OfflineSyncManager.getQueue();
      const pending = q.filter(item => item.status === 'PENDING' || item.status === 'FAILED');
      setPendingSyncCount(pending.length);
    };

    checkQueue();
    window.addEventListener('offline_queue_updated', checkQueue);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('offline_queue_updated', checkQueue);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const { activeWorkspace, currentRole, checkPermission, setViewMode } = useAuthWorkspace();
  const taxonomy = useWorkspaceTaxonomy();
  const { t } = useLanguage();
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomainFilter, setSelectedDomainFilter] = useState<number | null>(null);
  const [collapsedDomains, setCollapsedDomains] = useState<Record<number, boolean>>({});

  const toggleDomain = (domainNum: number) => {
    setCollapsedDomains(prev => ({ ...prev, [domainNum]: !prev[domainNum] }));
  };

  const handleSwitchToPersonal = () => {
    setViewMode('MEMBER');
    showToast('Switched to Personal Devotee View 🙏', 'success', 'Mode Changed');
    if (window.innerWidth < 1024) onClose();
  };

  const filteredModules = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return MODULE_CATALOG.filter((m) => {
      // 1. Check workspace taxonomy
      const allowedForWorkspace = isModuleAllowed(activeWorkspace?.type || 'Mandir', m.id);
      if (!allowedForWorkspace) return false;
      
      // 2. Check RBAC permissions
      let hasRole = true;
      if (m.id === 'bulkImport') hasRole = checkPermission(['manager', 'trustee']);
      else if (['treasury', 'taxReceipts'].includes(m.id)) hasRole = checkPermission(['accountant', 'manager', 'trustee']);
      else if (['campaigns', 'assets'].includes(m.id)) hasRole = checkPermission(['manager', 'trustee']);
      else if (m.id === 'inventory') hasRole = checkPermission(['accountant', 'manager', 'trustee', 'volunteer']);
      else if (['poojaBooking', 'mandirPuja', 'purohitDesk', 'purohitMarket', 'pitruShradh'].includes(m.id)) {
        hasRole = checkPermission(['purohit', 'manager', 'trustee']);
      }
      else if (['sandeshBroadcast'].includes(m.id)) {
        hasRole = checkPermission(['manager', 'trustee']);
      }
      else if (['workspace-hub', 'masterSettings', 'spiritualSettings', 'panchayatPolls'].includes(m.id)) {
        hasRole = checkPermission(['trustee']);
      }
      else if (['user-roles-rbac', 'trusteeGovernance', 'sevadarRoster', 'auditLog', 'legalVault', 'crisis-command', 'socialWall'].includes(m.id)) {
        hasRole = checkPermission(['trustee', 'manager']);
      }
      else if (['devotees', 'family', 'vanshavali', 'guests', 'karmaLedger', 'rakthaSeva', 'goshala', 'annadanam', 'ashramKutir', 'dharamshala', 'gurukul', 'gurukulAcademy', 'vidyalaya', 'satsang', 'sanghaDrills', 'sevaTrust', 'granthLibrary', 'matrimony', 'utsavPanjika', 'shlokaFeed', 'dharmicAssistant', 'dharmaMarketing', 'sadhana-karma', 'sanatani-vivah', 'yatraNet'].includes(m.id)) {
        // These are open to all logged-in users in the organization view (devotee, volunteer, purohit, accountant, manager, trustee, superadmin)
        // No explicit restriction means `hasRole` stays true, but we list them for explicit 'perfect' RBAC mapping documentation.
        hasRole = true;
      }
      
      if (!hasRole) return false;

      // 3. Domain filter pill
      if (selectedDomainFilter !== null && m.domain !== selectedDomainFilter) {
        return false;
      }

      // 4. Search term filter
      if (!term) return true;
      return (
        m.name?.toLowerCase().includes(term) || 
        m.domainTitle?.toLowerCase().includes(term) || 
        m.id?.toLowerCase().includes(term)
      );
    });
  }, [searchTerm, selectedDomainFilter, activeWorkspace, currentRole, checkPermission]);

  const domainGroups = useMemo(() => {
    const groups: { domain: number; title: string; items: NavItem[] }[] = [];
    for (let d = 1; d <= 7; d++) {
      const items = filteredModules.filter((m) => m.domain === d);
      if (items.length > 0) {
        groups.push({
          domain: d,
          title: items[0].domainTitle,
          items,
        });
      }
    }
    return groups;
  }, [filteredModules]);

  const domainFilterPills = [
    { label: 'All (46)', domain: null },
    { label: 'CRM', domain: 1 },
    { label: 'Finance', domain: 2 },
    { label: 'Rituals', domain: 3 },
    { label: 'Desks', domain: 4 },
    { label: 'Outreach', domain: 5 },
    { label: 'Gov', domain: 6 },
    { label: 'Life', domain: 7 },
  ];

  return (
    <>
      {/* Mobile Overlay Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-stone-950/70 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Main Sidebar Component */}
      <aside
        id="main-sidebar"
        className={`fixed lg:static top-0 bottom-0 left-0 z-40 bg-stone-900 text-stone-300 flex flex-col shrink-0 transition-all duration-300 ease-in-out border-r border-stone-800 shadow-xl lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${isCollapsed ? 'lg:w-[72px]' : 'w-72 sm:w-80 lg:w-72'}`}
      >
        {/* Top Header Bar for Sidebar */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-stone-800 shrink-0 bg-stone-950/50">
          <div className="flex items-center gap-3 min-w-0 overflow-hidden">
            <img 
              src={activeWorkspace?.logoBase64 || '/logo.svg'} 
              alt={activeWorkspace?.name || 'Sanatani Bandhan'} 
              className="w-8 h-8 rounded-lg object-contain bg-white/10 p-0.5 border border-amber-500/30 shrink-0"
              onError={(e) => { e.currentTarget.src = '/icon-192x192.png'; }}
            />
            {!isCollapsed && (
              <div className="min-w-0">
                <span className="text-xs font-black uppercase tracking-wider text-amber-400 truncate block">
                  {activeWorkspace?.name || 'Organisation'}
                </span>
                <span className="text-[10px] text-stone-500 font-bold uppercase tracking-widest block">
                  46 Desks Console
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1">
            {/* Desktop Collapse Toggle */}
            {onToggleCollapse && (
              <button
                type="button"
                onClick={onToggleCollapse}
                className="hidden lg:flex p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
                title={isCollapsed ? 'Expand Sidebar (280px)' : 'Collapse Sidebar to Icon Rail (72px)'}
              >
                {isCollapsed ? <PanelLeftOpen className="w-4 h-4 text-amber-400" /> : <PanelLeftClose className="w-4 h-4" />}
              </button>
            )}

            {/* Mobile Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
              title="Close Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Switch to Personal View Banner / Button */}
        {!isCollapsed && (
          <div className="p-3 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-transparent border-b border-stone-800">
            <button
              id="sidebar-btn-switch-personal"
              onClick={handleSwitchToPersonal}
              className="w-full flex items-center justify-between px-3 py-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-stone-950 rounded-xl font-bold text-xs shadow-md transition-all border border-amber-400 cursor-pointer group"
            >
              <div className="flex items-center gap-2">
                <UserCircle className="w-4 h-4 text-stone-950" />
                <span className="font-extrabold">Switch to Personal View</span>
              </div>
              <ArrowLeftRight className="w-3.5 h-3.5 text-stone-950 group-hover:rotate-180 transition-transform duration-300" />
            </button>
          </div>
        )}

        {/* Collapsed Rail Quick Switch Icon */}
        {isCollapsed && (
          <div className="p-2 border-b border-stone-800 flex justify-center">
            <button
              onClick={handleSwitchToPersonal}
              className="w-10 h-10 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 flex items-center justify-center shadow-md transition-transform hover:scale-105 cursor-pointer"
              title="Switch to Personal Devotee View"
            >
              <UserCircle className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Search & Domain Filter Pills (Expanded Mode Only) */}
        {!isCollapsed && (
          <div className="p-3 border-b border-stone-800 space-y-2 shrink-0 bg-stone-900/60">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
              <input
                type="text"
                id="sidebar-module-search"
                placeholder="Search desks (e.g. 80G, Pooja, Goshala)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-stone-800/80 border border-stone-700 rounded-xl pl-9 pr-8 py-1.5 text-xs text-stone-100 placeholder-stone-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2.5 top-2.5 text-stone-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Domain Filter Chips */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pt-1 pb-0.5">
              {domainFilterPills.map((pill, idx) => {
                const isSelected = selectedDomainFilter === pill.domain;
                return (
                  <button
                    key={pill.label}
                    onClick={() => setSelectedDomainFilter(pill.domain)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wide shrink-0 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500 text-stone-950 font-black shadow-xs'
                        : 'bg-stone-800 text-stone-400 hover:bg-stone-700 hover:text-stone-200'
                    }`}
                  >
                    {pill.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Desks Navigation List */}
        <div className="flex-1 overflow-y-auto py-3 space-y-4 custom-scrollbar">
          {domainGroups.map((group, idx) => {
            const isDomainCollapsed = !searchTerm && collapsedDomains[group.domain];

            return (
              <div key={group.domain} className={isCollapsed ? 'px-1.5' : 'px-3'}>
                {/* Domain Header Accordion (Expanded Mode) */}
                {!isCollapsed ? (
                  <button
                    type="button"
                    onClick={() => toggleDomain(group.domain)}
                    className="w-full flex items-center justify-between text-[11px] font-bold text-stone-400 hover:text-amber-400 uppercase tracking-wider px-2 py-1 mb-1 rounded-lg transition-colors cursor-pointer"
                  >
                    <span className="truncate flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                      {group.title}
                    </span>
                    <div className="flex items-center gap-1 shrink-0">
                      <span className="text-[10px] bg-stone-800 text-stone-400 px-1.5 py-0.2 rounded-md font-mono">
                        {group.items.length}
                      </span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isDomainCollapsed ? '-rotate-90' : 'rotate-0'}`} />
                    </div>
                  </button>
                ) : (
                  <div className="my-2 border-t border-stone-800/80 mx-2" />
                )}

                {/* Items in Domain */}
                {!isDomainCollapsed && (
                  <ul className="space-y-1">
                    {group.items.map((item, idx) => {
                      const Icon = item.icon;
                      const isActive = activeModule === item.id;
                      let displayLabel = t(item.id) !== item.id ? t(item.id) : item.name;

                      if (item.id === 'devotees') {
                        displayLabel = taxonomy.directoryName;
                      }

                      return (
                        <li key={`${item.id}-${idx}`}>
                          <button
                            type="button"
                            id={`nav-desk-${item.id}`}
                            onClick={() => {
                              onSelectModule(item.id);
                              if (window.innerWidth < 1024) onClose();
                            }}
                            title={isCollapsed ? `${displayLabel} (${group.title})` : undefined}
                            className={`w-full flex items-center rounded-xl transition-all cursor-pointer min-h-[44px] ${
                              isCollapsed ? 'justify-center p-2.5' : 'justify-between px-3 py-2'
                            } ${
                              isActive
                                ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/10 text-amber-400 border border-amber-500/40 font-bold shadow-xs'
                                : 'text-stone-300 hover:bg-stone-800/70 hover:text-white border border-transparent'
                            }`}
                          >
                            <div className={`flex items-center gap-3 truncate ${isCollapsed ? 'justify-center' : ''}`}>
                              <Icon
                                className={`w-4 h-4 shrink-0 transition-colors ${
                                  isActive ? 'text-amber-400 stroke-[2.2]' : 'text-stone-400'
                                }`}
                              />
                              {!isCollapsed && (
                                <span className="text-xs truncate font-medium">{displayLabel}</span>
                              )}
                            </div>

                            {!isCollapsed && item.badge && (
                              <span className={`ml-2 text-[9px] font-black px-1.5 py-0.5 rounded-md shrink-0 ${
                                isActive
                                  ? 'bg-amber-500 text-stone-950'
                                  : 'bg-stone-800 text-stone-400 border border-stone-700'
                              }`}>
                                {item.badge}
                              </span>
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </div>


        {/* Bottom Status / Vedic Note Footer */}
        {!isCollapsed && (
          <div className="p-3 border-t border-stone-800 bg-stone-950/60 shrink-0 text-center flex flex-col gap-2">
            <div className={`p-2 rounded-xl border shadow-inner flex items-center justify-between transition-colors ${
              !isOnline ? 'bg-red-950/30 border-red-900/50' :
              pendingSyncCount > 0 ? 'bg-amber-950/30 border-amber-900/50' :
              'bg-emerald-950/20 border-emerald-900/30'
            }`}>
              <div className="flex items-center gap-2">
                {!isOnline ? (
                  <CloudOff className="w-3.5 h-3.5 text-red-500" />
                ) : pendingSyncCount > 0 ? (
                  <RefreshCcw className="w-3.5 h-3.5 text-amber-500 animate-spin" />
                ) : (
                  <Wifi className="w-3.5 h-3.5 text-emerald-500" />
                )}
                <span className={`text-[10px] font-bold ${
                  !isOnline ? 'text-red-400' :
                  pendingSyncCount > 0 ? 'text-amber-400' :
                  'text-emerald-500'
                }`}>
                  {!isOnline ? 'OFFLINE' : pendingSyncCount > 0 ? 'SYNCING...' : 'ONLINE'}
                </span>
              </div>
              {pendingSyncCount > 0 && (
                <span className="bg-stone-950 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold text-amber-500">
                  {pendingSyncCount} pending
                </span>
              )}
            </div>

            <div className="p-2.5 bg-stone-900/90 rounded-xl border border-stone-800 shadow-inner">

              <p className="text-[10px] uppercase font-bold text-amber-500 tracking-wider mb-0.5">
                Vedic Workspace v2.4
              </p>
              <p className="text-[11px] font-serif text-stone-400 italic truncate">
                "Dharmo Rakshati Rakshitah"
              </p>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

