import React, { useState, Suspense, lazy } from 'react';
import { Loader2 } from 'lucide-react';
import { ToastProvider } from './context/ToastContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthWorkspaceProvider } from './context/AuthWorkspaceContext';
import { DataProvider } from './context/DataContext';
import { GlobalSOSListener } from './components/common/GlobalSOSListener';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { AppInitializer } from './context/AppInitializer';
import { startDemoBackgroundService } from './lib/dbUtils';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { Footer } from './components/common/Footer';
import { QuickChandaModal } from './components/common/QuickChandaModal';
import { MySpaceModal } from './components/common/MySpaceModal';
import { QuickGuideModal } from './components/common/QuickGuideModal';
import { GlobalTelemetryModal } from './components/common/GlobalTelemetryModal';
import { DharmicQueryAssistant } from './components/common/DharmicQueryAssistant';
import { TawkToWidget } from './components/common/TawkToWidget';
import { LandingPage } from './components/public/LandingPage';
import { PortalLogin } from './components/public/PortalLogin';
import { useAuthWorkspace } from './context/AuthWorkspaceContext';
import { isModuleAllowed } from './lib/workspaceRegistry';
import { useToast } from './context/ToastContext';
import { useData } from './context/DataContext';
import { WorkspaceType, WorkspaceConfig } from './types';

import { NotificationProvider } from './context/NotificationContext';

// Dashboard
const DashboardHome = lazy(() => import('./components/dashboard/DashboardHome').then(m => ({ default: m.DashboardHome })));

// Domain 1: CRM & Lineage
const DevoteeGrid = lazy(() => import('./components/domain1/DevoteeGrid').then(m => ({ default: m.DevoteeGrid })));
const FamilyHouseholdDesk = lazy(() => import('./components/domain1/FamilyHouseholdDesk').then(m => ({ default: m.FamilyHouseholdDesk })));
const VanshavaliDesk = lazy(() => import('./components/domain1/VanshavaliDesk').then(m => ({ default: m.VanshavaliDesk })));
const GuestManagerDesk = lazy(() => import('./components/domain1/GuestManagerDesk').then(m => ({ default: m.GuestManagerDesk })));
const BulkImportDesk = lazy(() => import('./components/domain1/BulkImportDesk').then(m => ({ default: m.BulkImportDesk })));
const RakthaSevaDesk = lazy(() => import('./components/domain1/RakthaSevaDesk').then(m => ({ default: m.RakthaSevaDesk })));

// Domain 2: Financials & Assets
const TreasuryLedgerDesk = lazy(() => import('./components/domain2/TreasuryLedgerDesk').then(m => ({ default: m.TreasuryLedgerDesk })));
const TaxReceiptDesk = lazy(() => import('./components/domain2/TaxReceiptDesk').then(m => ({ default: m.TaxReceiptDesk })));
const MandirCampaignsDesk = lazy(() => import('./components/domain2/MandirCampaignsDesk').then(m => ({ default: m.MandirCampaignsDesk })));
const KarmaLedgerDesk = lazy(() => import('./components/domain2/KarmaLedgerDesk').then(m => ({ default: m.KarmaLedgerDesk })));
const AssetInventoryDesk = lazy(() => import('./components/domain2/AssetInventoryDesk').then(m => ({ default: m.AssetInventoryDesk })));
const InventoryDesk = lazy(() => import('./components/domain2/InventoryDesk').then(m => ({ default: m.InventoryDesk })));

// Domain 3: Vedic Rituals & Astrology
const PoojaBookingDesk = lazy(() => import('./components/domain3/PoojaBookingDesk').then(m => ({ default: m.PoojaBookingDesk })));
const MandirPujaDesk = lazy(() => import('./components/domain3/MandirPujaDesk').then(m => ({ default: m.MandirPujaDesk })));
const PurohitMarketDesk = lazy(() => import('./components/domain3/PurohitMarketDesk').then(m => ({ default: m.PurohitMarketDesk })));
const PurohitDesk = lazy(() => import('./components/domain3/PurohitDesk').then(m => ({ default: m.PurohitDesk })));
const PitruShradhDesk = lazy(() => import('./components/domain3/PitruShradhDesk').then(m => ({ default: m.PitruShradhDesk })));
const PanchangMuhuratDesk = lazy(() => import('./components/domain3/PanchangMuhuratDesk').then(m => ({ default: m.PanchangMuhuratDesk })));

// Domain 4: Gau Seva & Community
const GauSevaDesk = lazy(() => import('./components/domain4/GauSevaDesk').then(m => ({ default: m.GauSevaDesk })));
const AnnadanamKitchenDesk = lazy(() => import('./components/domain4/AnnadanamKitchenDesk').then(m => ({ default: m.AnnadanamKitchenDesk })));
const VedicSevaShikshaDesk = lazy(() => import('./components/domain4/VedicSevaShikshaDesk').then(m => ({ default: m.VedicSevaShikshaDesk })));

// Domain 5: Outreach & Scriptures
const WhatsAppBroadcasterDesk = lazy(() => import('./components/domain5/WhatsAppBroadcasterDesk').then(m => ({ default: m.WhatsAppBroadcasterDesk })));
const VedicCalendarEventsDesk = lazy(() => import('./components/domain5/VedicCalendarEventsDesk').then(m => ({ default: m.VedicCalendarEventsDesk })));
const SanskritLibraryDesk = lazy(() => import('./components/domain5/SanskritLibraryDesk').then(m => ({ default: m.SanskritLibraryDesk })));

// Domain 7: Individual Life & Connect
const PersonalSadhanaDesk = lazy(() => import('./components/domain5/PersonalSadhanaDesk'));
const SanataniVivahDesk = lazy(() => import('./components/domain4/SanataniVivahDesk'));

// Domain 6: Enterprise Control & Multi-Workspace
const WorkspaceSelectorDesk = lazy(() => import('./components/domain6/WorkspaceSelectorDesk').then(m => ({ default: m.WorkspaceSelectorDesk })));
const MasterSettingsDesk = lazy(() => import('./components/domain6/MasterSettingsDesk').then(m => ({ default: m.MasterSettingsDesk })));
const CrisisCommandCenter = lazy(() => import('./components/domain6/CrisisCommandCenter').then(m => ({ default: m.CrisisCommandCenter })));
const UserRolesDesk = lazy(() => import('./components/domain6/UserRolesDesk').then(m => ({ default: m.UserRolesDesk })));
const AuditLogDesk = lazy(() => import('./components/domain6/AuditLogDesk').then(m => ({ default: m.AuditLogDesk })));
const GodModeBackend = lazy(() => import('./components/common/GodModeBackend').then(m => ({ default: m.GodModeBackend })));

// Public / Devotee Portal
const DevoteePortal = lazy(() => import('./components/devotee/DevoteePortal').then(m => ({ default: m.DevoteePortal })));
const MemberAppShell = lazy(() => import('./components/devotee/MemberAppShell').then(m => ({ default: m.default })));

const YatraNetDesk = lazy(() => import('./components/domain7/YatraNetDesk').then(m => ({ default: m.default })));
const DharamshalaDesk = lazy(() => import('./components/domain4/DharamshalaDesk').then(m => ({ default: m.DharamshalaDesk })));
const SevadarRosterDesk = lazy(() => import('./components/domain6/SevadarRosterDesk').then(m => ({ default: m.SevadarRosterDesk })));



const RestrictedAccess: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-slate-50/50">
    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-sm">
      <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
    </div>
    <h2 className="text-2xl font-bold text-slate-800 mb-2 font-serif">Access Restricted</h2>
    <p className="text-slate-500 max-w-md mx-auto mb-8">
      Your current role does not have the clearance to view this secure financial or operational module. Please contact the Mandir Trustee or Head Admin for access.
    </p>
  </div>
);

const AppContent: React.FC = () => {
  const { checkPermission, activeWorkspace, currentRole, viewMode } = useAuthWorkspace();
  const { showToast } = useToast();
  const [activeModule, setActiveModule] = useState<string>('dashboard');

  React.useEffect(() => {
    const handleNavigate = (e: any) => {
      if (e.detail) setActiveModule(e.detail);
    };
    window.addEventListener('navigate_module', handleNavigate);
    return () => window.removeEventListener('navigate_module', handleNavigate);
  }, []);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isQuickChandaOpen, setIsQuickChandaOpen] = useState<boolean>(false);
  const [isMySpaceOpen, setIsMySpaceOpen] = useState<boolean>(false);
  const [isTelemetryOpen, setIsTelemetryOpen] = useState<boolean>(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState<boolean>(false);

  const [isSahayataOpen, setIsSahayataOpen] = useState<boolean>(false);
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);

  if (viewMode === 'MEMBER') {
    return (
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center h-full text-center">
          <Loader2 className="w-8 h-8 text-amber-600 animate-spin mb-4" />
        </div>
      }>
        <MemberAppShell />
      </Suspense>
    );
  }

  const renderActiveDesk = () => {
    switch (activeModule) {
      case 'dashboard':
        return (
          <DashboardHome
            onNavigate={(mod) => setActiveModule(mod)}
            onOpenQuickPay={() => setIsQuickChandaOpen(true)}
          />
        );

      // Domain 1
      case 'devotees':
      case 'devotee-grid':
        return <DevoteeGrid />;
      case 'family':
      case 'household-census':
        return <FamilyHouseholdDesk />;
      case 'vanshavali':
      case 'vanshavali-tree':
        return <VanshavaliDesk />;
      case 'guests':
      case 'guest-pipeline':
        return <GuestManagerDesk />;
      case 'rakthaSeva':
      case 'blood-registry':
        return <RakthaSevaDesk />;
      case 'bulkImport':
      case 'universal-csv':
        return checkPermission(['manager', 'trustee']) ? <BulkImportDesk /> : <RestrictedAccess />;

      // Domain 2
      case 'treasury':
      case 'treasury-ledger':
        return checkPermission(['accountant', 'manager', 'trustee']) ? <TreasuryLedgerDesk onOpenQuickPay={() => setIsQuickChandaOpen(true)} /> : <RestrictedAccess />;
      case 'taxReceipts':
      case 'tax-receipt-80g':
        return checkPermission(['accountant', 'manager', 'trustee']) ? <TaxReceiptDesk /> : <RestrictedAccess />;
      case 'campaigns':
      case 'mandir-campaigns':
        return checkPermission(['manager', 'trustee']) ? <MandirCampaignsDesk /> : <RestrictedAccess />;
      case 'karmaLedger':
      case 'karma-ledger':
        return <KarmaLedgerDesk />;
      case 'assets':
      case 'asset-register':
        return checkPermission(['manager', 'trustee']) ? <AssetInventoryDesk /> : <RestrictedAccess />;
      case 'inventory':
      case 'store-inventory':
        return checkPermission(['accountant', 'manager', 'trustee', 'volunteer']) ? <InventoryDesk /> : <RestrictedAccess />;

      // Domain 3
      case 'poojaBooking':
      case 'pooja-booking':
        return checkPermission(['purohit', 'manager', 'trustee']) ? <PoojaBookingDesk /> : <RestrictedAccess />;
      case 'mandirPuja':
      case 'aarti-roster':
        return checkPermission(['purohit', 'manager', 'trustee']) ? <MandirPujaDesk /> : <RestrictedAccess />;
      case 'purohitDesk':
      case 'purohit-desk':
        return checkPermission(['purohit', 'manager', 'trustee']) ? <PurohitDesk /> : <RestrictedAccess />;
      case 'purohitMarket':
      case 'purohit-marketplace':
        return checkPermission(['purohit', 'manager', 'trustee']) ? <PurohitMarketDesk /> : <RestrictedAccess />;
      case 'pitruShradh':
      case 'pitru-shradh':
        return checkPermission(['purohit', 'manager', 'trustee']) ? <PitruShradhDesk /> : <RestrictedAccess />;
      case 'panchang':
      case 'panchang-muhurat':
        return <PanchangMuhuratDesk />;

      // Domain 4
      case 'goshala':
      case 'gau-seva-goshala':
        return <GauSevaDesk />;
      case 'annadanam':
      case 'annadanam-kitchen':
        return <AnnadanamKitchenDesk />;
      case 'dharamshala':
      case 'dharamshala-yatri-bhavan':
        return <DharamshalaDesk />;
      case 'gurukul':
      case 'gurukul-education':
      case 'gurukulAcademy':
      case 'vidyalaya':
      case 'satsang':
      case 'sanghaDrills':
      case 'sevaTrust':
        return <VedicSevaShikshaDesk />;
      case 'granthLibrary':
      case 'sanskrit-library':
      case 'shlokaFeed':
        return <SanskritLibraryDesk />;

      // Domain 5
      case 'sandeshBroadcast':
      case 'whatsapp-broadcaster':
        return checkPermission(['manager', 'trustee']) ? <WhatsAppBroadcasterDesk /> : <RestrictedAccess />;
      case 'utsavPanjika':
      case 'events-utsav':
        return <VedicCalendarEventsDesk />;
      case 'dharmicAssistant':
      case 'dharmic-assistant':
      case 'dharmaMarketing':
        return (
          <DharmicQueryAssistant
            activeModule={activeModule}
            onNavigate={(mod) => setActiveModule(mod)}
          />
        );

      // Domain 7
      case 'sadhana-karma':
      case 'personal-sadhana':
        return <PersonalSadhanaDesk />;
      case 'sanatani-vivah':
      case 'matrimony':
        return <SanataniVivahDesk />;
      case 'yatraNet':
      case 'yatra-net':
        return <YatraNetDesk />;

      // Domain 6
      case 'workspace-hub':
        return checkPermission(['trustee']) ? <WorkspaceSelectorDesk /> : <RestrictedAccess />;
      case 'user-roles-rbac':
      case 'trusteeGovernance':
        return checkPermission(['trustee', 'manager']) ? <UserRolesDesk /> : <RestrictedAccess />;
      case 'security-audit-log':
      case 'legalVault':
      case 'auditLog':
        return checkPermission(['trustee', 'manager']) ? <AuditLogDesk /> : <RestrictedAccess />;
      case 'sevadarRoster':
        return checkPermission(['trustee', 'manager']) ? <SevadarRosterDesk /> : <RestrictedAccess />;
      case 'masterSettings':
      case 'panchayatPolls':
      case 'socialWall':
        return checkPermission(['trustee']) ? <MasterSettingsDesk /> : <RestrictedAccess />;
      case 'crisis-command':
        return checkPermission(['trustee', 'manager']) ? <CrisisCommandCenter /> : <RestrictedAccess />;

      case 'spiritualSettings':
      case 'platformBroadcast':
        return (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Module Upgrading</h2>
            <p className="text-slate-500 max-w-md">
              This module is currently receiving an over-the-air update and will be available shortly.
            </p>
          </div>
        );

      default:
        return (
          <DashboardHome
            onNavigate={(mod) => setActiveModule(mod)}
            onOpenQuickPay={() => setIsQuickChandaOpen(true)}
          />
        );
    }
  };

  return (
    <div className="h-screen w-full bg-slate-50 text-slate-900 flex flex-col font-sans overflow-hidden">
      {/* Universal Header */}
      <Header
        activeModule={activeModule}
        onNavigate={(mod) => setActiveModule(mod)}
        onOpenSidebar={() => setIsSidebarOpen(true)}
        isSidebarCollapsed={isSidebarCollapsed}
        onToggleSidebarCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        onOpenQuickChanda={() => setIsQuickChandaOpen(true)}
        onOpenMySpace={() => setIsMySpaceOpen(true)}
        onOpenTelemetry={() => setIsTelemetryOpen(true)}
        onOpenAssistant={() => setIsAssistantOpen(true)}
        onOpenSahayata={() => setIsSahayataOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
      />

      <div className="flex grow overflow-hidden">
        {/* Universal 46-Module Sidebar */}
        <Sidebar
          activeModule={activeModule}
          onSelectModule={(mod) => setActiveModule(mod)}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        {/* Main Content Area */}
        <main className="grow p-6 flex flex-col gap-6 overflow-hidden">
          <div className="flex flex-col grow overflow-y-auto custom-scrollbar">
            <Suspense fallback={
              <div className="flex flex-col items-center justify-center h-full text-center">
                <Loader2 className="w-8 h-8 text-amber-600 animate-spin mb-4" />
                <p className="text-slate-500 font-medium">Loading desk module...</p>
              </div>
            }>
              {renderActiveDesk()}
            </Suspense>
          </div>
        </main>
      </div>

      <Footer onOpenTelemetry={() => setIsTelemetryOpen(true)} />

      {/* Global Modals & Widgets */}
      <QuickChandaModal
        isOpen={isQuickChandaOpen}
        onClose={() => setIsQuickChandaOpen(false)}
      />

      <MySpaceModal
        isOpen={isMySpaceOpen}
        onClose={() => setIsMySpaceOpen(false)}
        onNavigate={(mod) => {
          setActiveModule(mod);
          setIsMySpaceOpen(false);
        }}
      />

      <GlobalTelemetryModal
        isOpen={isTelemetryOpen}
        onClose={() => setIsTelemetryOpen(false)}
      />

      {/* Dharmic AI Sliding Intelligence Drawer */}
      <DharmicQueryAssistant
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        activeModule={activeModule}
        onNavigate={(mod) => {
          setActiveModule(mod);
          setIsAssistantOpen(false);
        }}
        isDrawer={true}
      />

      <TawkToWidget />

      {/* Demo Sandbox Watermark */}
      {activeWorkspace?.id?.startsWith('DEMO_') && (
        <div className="fixed bottom-4 left-4 z-[9998] bg-amber-500 text-stone-900 px-3 py-1.5 rounded-lg shadow-lg font-bold text-xs flex items-center gap-2 animate-pulse">
          <span className="w-2 h-2 rounded-full bg-stone-900"></span>
          TESTING MODE (EPHEMERAL DATA)
        </div>
      )}
    </div>
  );
};


const AppRouter: React.FC = () => {
  const { isAuthenticated, loginWithPin, addWorkspace, switchWorkspace, loginAsRole } = useAuthWorkspace();
  const { devotees, seedDemoData } = useData();
  const [view, setView] = useState<'landing' | 'login' | 'signup'>('landing');

  if (window.location.pathname === '/mysecretlogin') {
    return <GodModeBackend isOpen={true} onClose={() => window.location.href = '/'} />;
  }

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const action = params.get('action');
    if (action === 'autologin' && !isAuthenticated) {
      const pin = params.get('pin');
      if (pin) {
        const success = loginWithPin(pin, devotees);
        if (success) {
          // Clear URL params safely
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      }
    }
  }, [isAuthenticated, loginWithPin, devotees]);

  if (isAuthenticated) {
    return <AppContent />;
  }

  if (view === 'login' || view === 'signup') {
    return (
      <PortalLogin 
        initialMode={view} 
        onBack={() => setView('landing')} 
        onSuccess={() => {}} 
      />
    );
  }

  const handleStartDemo = (type: WorkspaceType) => {
    // Generate a temporary demo workspace ID
    const demoId = `DEMO_${type.toUpperCase()}_${Date.now()}`;
    const demoWorkspace: WorkspaceConfig = {
      id: demoId,
      name: `${type} Demo Sandbox`,
      type: type,
      tagline: 'Interactive Test Environment',
      address: 'Virtual Demo Environment',
      city: 'Kashi',
      state: 'Uttar Pradesh',
      country: 'Bharat (India)',
      currency: 'INR',
      currencySymbol: '₹',
      phone: '+91 99999 00000',
      email: `demo@${type.toLowerCase()}.org`,
      sampradaya: 'Demo Mode',
      kuladevata: 'Demo',
      pinRequired: false,
      adminPin: '1008',
    };
    
    // Add to local state (ephemeral if not synced to firestore)
    addWorkspace(demoWorkspace);
    switchWorkspace(demoId);
    
    // Inject test user session
    loginAsRole('head_admin', 'Demo User');
    if (seedDemoData) {
      seedDemoData(demoId, type);
    }
    
    // Fire analytics
    if ((window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'start_trial',
        workspace_type: type
      });
    }
  };

  return (
    <LandingPage 
      onLoginClick={() => setView('login')} 
      onSignupClick={() => setView('signup')} 
      onDemoStart={handleStartDemo}
    />
  );
};


export default function App() {
  return (
    <ErrorBoundary>
      <AppInitializer>
        <ToastProvider>
          <LanguageProvider>
            <AuthWorkspaceProvider>
              <NotificationProvider>
                <DataProvider>
                  <AppRouter />
                  <GlobalSOSListener />
                </DataProvider>
              </NotificationProvider>
            </AuthWorkspaceProvider>
          </LanguageProvider>
        </ToastProvider>
      </AppInitializer>
    </ErrorBoundary>
  );
}
