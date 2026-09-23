import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { User, onAuthStateChanged, signOut, signInAnonymously } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { DevoteeMember, UserRole, WorkspaceConfig, WorkspaceType, ROLE_MIGRATION_MAP } from '../types';
import { useInitialData } from './AppInitializer';
import { set } from 'idb-keyval';

export const INITIAL_WORKSPACES: WorkspaceConfig[] = [
  {
    id: 'DEMO_ws-mandir',
    name: 'Sri Sanatan Dharma Mandir',
    type: 'Mandir',
    tagline: 'Preserving Sanatan Samskriti & Sacred Darshan',
    address: 'Mandir Marg, Sector 4',
    city: 'Varanasi',
    state: 'Uttar Pradesh',
    country: 'Bharat (India)',
    currency: 'INR',
    currencySymbol: '₹',
    phone: '+91 98765 43210',
    email: 'seva@sanatanmandir.org',
    sampradaya: 'Smartha / Advaita Vedanta',
    kuladevata: 'Sri Kashi Vishwanath & Mata Annapurna',
    taxExemptionNumber: 'CIT(E)/80G/VAR-2024-991',
    trustRegNumber: 'TR/VNS/7762/2012',
    pinRequired: true,
    adminPin: '1008',
  },
  {
    id: 'DEMO_ws-goshala',
    name: 'Surabhi Gau Seva Dham',
    type: 'Goshala',
    tagline: 'Sanctuary for 500+ Indigenous Desi Gir & Sahiwal Gomata',
    address: 'Govardhan Parikrama Marg',
    city: 'Vrindavan',
    state: 'Uttar Pradesh',
    country: 'Bharat (India)',
    currency: 'INR',
    currencySymbol: '₹',
    phone: '+91 98111 22334',
    email: 'gauseva@surabhidham.org',
    sampradaya: 'Gaudiya Vaishnava',
    kuladevata: 'Sri Radha Damodar & Kamadhenu',
    taxExemptionNumber: 'CIT(E)/80G/VRN-8821',
    trustRegNumber: 'TR/VRN/1109/2015',
    pinRequired: true,
    adminPin: '1008',
  },
  {
    id: 'DEMO_ws-sangha',
    name: 'Bharat Dharma Raksha Sangha',
    type: 'Sangha',
    tagline: 'Youth Character Building, Shakha Discipline & Dharma Seva',
    address: 'Shivaji Marg, Keshav Kunj',
    city: 'Nagpur',
    state: 'Maharashtra',
    country: 'Bharat (India)',
    currency: 'INR',
    currencySymbol: '₹',
    phone: '+91 94220 55667',
    email: 'karyalaya@dharmasangha.in',
    sampradaya: 'Sanatan Rashtra Dharma',
    kuladevata: 'Bhagwan Sri Ramachandra',
    taxExemptionNumber: 'CIT(E)/80G/NGP-4402',
    trustRegNumber: 'TR/NGP/5501/2008',
    pinRequired: true,
    adminPin: '1008',
  },
  {
    id: 'DEMO_ws-ashram',
    name: 'Ananda Kutir Spiritual Ashram',
    type: 'Ashram',
    tagline: 'Silent Meditation, Sadhana Retreats & Vedanta Study',
    address: 'Tapovan, Muni Ki Reti',
    city: 'Rishikesh',
    state: 'Uttarakhand',
    country: 'Bharat (India)',
    currency: 'INR',
    currencySymbol: '₹',
    phone: '+91 97566 88990',
    email: 'sadhana@anandakutir.org',
    sampradaya: 'Dashanami Sannyasa',
    kuladevata: 'Mata Ganga & Lord Shiva',
    taxExemptionNumber: 'CIT(E)/80G/RSH-3312',
    trustRegNumber: 'TR/UK/9921/2001',
    pinRequired: true,
    adminPin: '1008',
  },
  {
    id: 'DEMO_ws-gurukul',
    name: 'Sandipani Veda Vidyapeeth',
    type: 'Gurukul',
    tagline: 'Reviving Vedic Recitation, Grammar, Nyaya & Shastras',
    address: 'Narmada Ghat Road',
    city: 'Ujjain',
    state: 'Madhya Pradesh',
    country: 'Bharat (India)',
    currency: 'INR',
    currencySymbol: '₹',
    phone: '+91 94066 11223',
    email: 'acharya@sandipanigurukul.edu.in',
    sampradaya: 'Rigveda & Yajurveda Shakha',
    kuladevata: 'Bhagwan Sri Krishna & Sandipani Muni',
    taxExemptionNumber: 'CIT(E)/80G/UJN-5519',
    trustRegNumber: 'TR/MP/3381/1998',
    pinRequired: true,
    adminPin: '1008',
  },
  {
    id: 'DEMO_ws-trust',
    name: 'Shree Somnath Dharmada Trust',
    type: 'Trust',
    tagline: 'Preserving Sacred Tirthas & Vedic Heritage',
    address: 'Prabhas Patan',
    city: 'Veraval',
    state: 'Gujarat',
    country: 'Bharat (India)',
    currency: 'INR',
    currencySymbol: '₹',
    phone: '+91 98250 44556',
    email: 'trustee@somnathtrust.org',
    sampradaya: 'Pashupata Shaivism',
    kuladevata: 'Shree Somnath Jyotirlinga',
    taxExemptionNumber: 'CIT(E)/80G/GUJ-1102',
    trustRegNumber: 'TR/GJ/1004/1951',
    pinRequired: true,
    adminPin: '1008',
  },
  {
    id: 'DEMO_ws-samaj',
    name: 'Sarvajanik Gaur Brahman Samaj',
    type: 'Samaj',
    tagline: 'Sanskrit Vidyapeeth, Matrimonial & Community Welfare',
    address: 'Brahman Mahasabha Bhawan',
    city: 'Jaipur',
    state: 'Rajasthan',
    country: 'Bharat (India)',
    currency: 'INR',
    currencySymbol: '₹',
    phone: '+91 94140 88991',
    email: 'samaj@gaurbrahman.org',
    sampradaya: 'Vaidika Sanatan',
    kuladevata: 'Bhagwan Parashuram',
    taxExemptionNumber: 'CIT(E)/80G/RAJ-2291',
    trustRegNumber: 'TR/RJ/4412/1985',
    pinRequired: true,
    adminPin: '1008',
  }
];

export interface AuthWorkspaceContextType {
  // Required core state properties
  user: User | null;
  workspaceId: string | null;
  role: UserRole | null;
  isLoading: boolean;
  switchWorkspace: (newWorkspaceId: string) => Promise<boolean>;

  // Backward-compatible and platform RBAC properties
  firebaseUser: User | null;
  activeWorkspaceId: string;
  activeWorkspace: WorkspaceConfig;
  workspaces: WorkspaceConfig[];
  currentRole: UserRole;
  currentDevotee: DevoteeMember | null;
  setCurrentDevotee: (devotee: DevoteeMember | null) => void;
  currentUser?: { id: string; name: string; role: UserRole };
  isAuthenticated: boolean;
  viewMode: 'MANAGER' | 'MEMBER';
  setViewMode: (mode: 'MANAGER' | 'MEMBER') => void;
  updateWorkspaceType: (newType: WorkspaceType) => void;
  switchRole: (role: UserRole) => void;
  updateCurrentUserRole?: (role: UserRole) => void;
  checkPermission: (allowedRoles: (UserRole | string)[]) => boolean;
  loginWithPin: (pin: string, devoteeList: DevoteeMember[]) => boolean;
  loginAsRole: (role: UserRole, customName?: string) => void;
  logout: () => Promise<void>;
  saveCustomLogo: (base64: string) => void;
  updateWorkspaceDetails: (updates: Partial<WorkspaceConfig>) => void;
  addWorkspace: (workspace: WorkspaceConfig) => void;
  generateSecureQRToken: (member: DevoteeMember) => string;
}

const AuthWorkspaceContext = createContext<AuthWorkspaceContextType | undefined>(undefined);

export const AuthWorkspaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initialData = useInitialData();

  // Core Authentication & Tenant State
  const [user, setUser] = useState<User | null>(null);
  const [workspaceId, setWorkspaceId] = useState<string | null>(() => {
    return initialData.sanatani_active_workspace_id || 'DEMO_ws-mandir';
  });
  const [role, setRole] = useState<UserRole | null>(() => {
    return (initialData.sanatani_user_role as UserRole) || null;
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Cached User Profile Document from Firestore
  const [userDocData, setUserDocData] = useState<any>(null);

  // Application Workspaces & View States
  const [workspaces, setWorkspaces] = useState<WorkspaceConfig[]>(() => {
    return initialData.sanatani_workspaces || INITIAL_WORKSPACES;
  });
  const [viewMode, setViewMode] = useState<'MANAGER' | 'MEMBER'>('MEMBER');
  const [activeWorkspaceId, setActiveWorkspaceId] = useState<string>(() => {
    return initialData.sanatani_active_workspace_id || 'DEMO_ws-mandir';
  });
  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    return (initialData.sanatani_user_role as UserRole) || 'Devotee';
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentDevotee, setCurrentDevotee] = useState<DevoteeMember | null>(() => {
    return initialData.sanatani_current_devotee || null;
  });

  // Keep workspaceId and activeWorkspaceId synchronized
  useEffect(() => {
    if (workspaceId && workspaceId !== activeWorkspaceId) {
      setActiveWorkspaceId(workspaceId);
    }
  }, [workspaceId, activeWorkspaceId]);

  // Sync state to IndexedDB / Local Storage for persistence
  useEffect(() => {
    set('sanatani_workspaces', workspaces);
  }, [workspaces]);

  useEffect(() => {
    set('sanatani_active_workspace_id', activeWorkspaceId);
    if (isAuthenticated) {
      localStorage.setItem(
        'sanatani_web_session',
        JSON.stringify({
          communityId: activeWorkspaceId,
          role: role || currentRole,
          devoteeId: currentDevotee?.id || null,
        })
      );
    } else {
      localStorage.removeItem('sanatani_web_session');
    }
  }, [activeWorkspaceId, role, currentRole, currentDevotee, isAuthenticated]);

  /**
   * 1. State Management & 2. Firestore Binding
   * Detect logins via onAuthStateChanged and fetch doc(db, 'users', user.uid)
   */
  useEffect(() => {
    setIsLoading(true);

    const unsubscribe = onAuthStateChanged(auth, async (firebaseAuthUser) => {
      setUser(firebaseAuthUser);

      if (firebaseAuthUser) {
        // Handle anonymous sandboxed demo sessions
        if (firebaseAuthUser.isAnonymous) {
          setIsAuthenticated(true);
          const fallbackRole: UserRole = currentRole || 'Devotee';
          setRole(fallbackRole);
          setCurrentRole(fallbackRole);
          setIsLoading(false);
          return;
        }

        try {
          // Fetch authoritative user profile from Firestore 'users' collection
          const userDocRef = doc(db, 'users', firebaseAuthUser.uid);
          const userSnap = await getDoc(userDocRef);

          if (userSnap.exists()) {
            const data = userSnap.data();
            setUserDocData(data);

            // Extract role and cast to UserRole with legacy normalizer
            const rawRole = data.role || 'Devotee';
            const normalizedRole: UserRole = (ROLE_MIGRATION_MAP[rawRole] || rawRole) as UserRole;
            setRole(normalizedRole);
            setCurrentRole(normalizedRole);

            // Extract default workspace ID
            const targetWorkspaceId: string =
              data.defaultWorkspaceId || data.workspaceId || activeWorkspaceId || 'DEMO_ws-mandir';

            setWorkspaceId(targetWorkspaceId);
            setActiveWorkspaceId(targetWorkspaceId);
            setIsAuthenticated(true);
            setViewMode('MANAGER');
          } else {
            // New user registration or document pending creation
            const defaultRole: UserRole = 'Devotee';
            setRole(defaultRole);
            setCurrentRole(defaultRole);
            setIsAuthenticated(true);
          }
        } catch (err) {
          console.error('Error fetching user document from Firestore:', err);
          setIsAuthenticated(true);
        } finally {
          setIsLoading(false);
        }
      } else {
        // Signed out state
        setUser(null);
        setRole(null);
        setCurrentRole('Devotee');
        setUserDocData(null);
        setCurrentDevotee(null);
        setIsAuthenticated(false);
        setWorkspaceId('DEMO_ws-mandir');
        setActiveWorkspaceId('DEMO_ws-mandir');
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  /**
   * 3. Tenant Switching Logic
   * - SuperAdmin can switch to ANY workspace without restriction.
   * - Other admins (Trustees) verify multi-branch / workspace membership access before switching.
   */
  const switchWorkspace = useCallback(
    async (newWorkspaceId: string): Promise<boolean> => {
      if (!newWorkspaceId) return false;

      // Sandbox Demo workspaces are always switchable for preview & QA
      if (newWorkspaceId.startsWith('DEMO_')) {
        setWorkspaceId(newWorkspaceId);
        setActiveWorkspaceId(newWorkspaceId);
        set('sanatani_active_workspace_id', newWorkspaceId);
        return true;
      }

      // Check SuperAdmin unrestricted privileges
      const effectiveRole = role || currentRole;
      const isSuperAdmin =
        effectiveRole === 'SuperAdmin' ||
        userDocData?.role === 'SuperAdmin' ||
        userDocData?.role === 'SUPER_ADMIN' ||
        userDocData?.isGlobalAdmin === true;

      if (isSuperAdmin) {
        setWorkspaceId(newWorkspaceId);
        setActiveWorkspaceId(newWorkspaceId);
        set('sanatani_active_workspace_id', newWorkspaceId);
        return true;
      }

      // Non-SuperAdmin tenant access verification via Firestore
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const freshSnap = await getDoc(userDocRef);
          const uData = freshSnap.exists() ? freshSnap.data() : userDocData || {};

          // Verify access via assigned memberships, branches, or default workspace
          const accessibleList: string[] = [
            uData.workspaceId,
            uData.defaultWorkspaceId,
            ...(Array.isArray(uData.accessibleWorkspaces) ? uData.accessibleWorkspaces : []),
            ...(Array.isArray(uData.memberships) ? uData.memberships : []),
            ...(Array.isArray(uData.branches) ? uData.branches : []),
          ].filter(Boolean);

          const hasAccess =
            uData.role === 'SuperAdmin' ||
            uData.role === 'SUPER_ADMIN' ||
            uData.isGlobalAdmin === true ||
            accessibleList.includes(newWorkspaceId);

          if (hasAccess) {
            setWorkspaceId(newWorkspaceId);
            setActiveWorkspaceId(newWorkspaceId);
            set('sanatani_active_workspace_id', newWorkspaceId);
            return true;
          } else {
            console.warn(`Production workspace switch denied for ${newWorkspaceId}: Insufficient tenant clearance.`);
            return false;
          }
        } catch (error) {
          console.error('Error verifying tenant switch authorization:', error);
          return false;
        }
      }

      // If user is not authenticated for production workspace
      console.warn('Production workspace switch denied: User is not authenticated.');
      return false;
    },
    [user, role, currentRole, userDocData]
  );

  const activeWorkspace = useMemo(() => {
    return (
      workspaces.find((w) => w.id === activeWorkspaceId) ||
      workspaces[0] ||
      INITIAL_WORKSPACES[0]
    );
  }, [workspaces, activeWorkspaceId]);

  const updateWorkspaceType = (newType: WorkspaceType) => {
    setWorkspaces((prev) =>
      prev.map((w) => (w.id === activeWorkspaceId ? { ...w, type: newType } : w))
    );
  };

  const updateWorkspaceDetails = (updates: Partial<WorkspaceConfig>) => {
    setWorkspaces((prev) =>
      prev.map((w) => (w.id === activeWorkspaceId ? { ...w, ...updates } : w))
    );
  };

  const switchRole = (newRole: UserRole) => {
    // Client-side role switching is allowed for DEMO / development environments
    if (!activeWorkspaceId.startsWith('DEMO_')) {
      console.warn('Role switching is disabled for production tenant workspaces.');
      return;
    }
    const normalized: UserRole = (ROLE_MIGRATION_MAP[newRole] || newRole) as UserRole;
    setRole(normalized);
    setCurrentRole(normalized);
    set('sanatani_user_role', normalized);
  };

  const checkPermission = useCallback(
    (allowedRoles: (UserRole | string)[]): boolean => {
      const effectiveRole: UserRole = (role ? ROLE_MIGRATION_MAP[role] || role : currentRole) as UserRole;
      if (effectiveRole === 'SuperAdmin') return true;

      return allowedRoles.some((allowed) => {
        const normalizedAllowed = ROLE_MIGRATION_MAP[allowed] || allowed;
        if (normalizedAllowed === effectiveRole || allowed === effectiveRole) return true;
        // Trustee hierarchy grants operational leadership clearance
        if (effectiveRole === 'Trustee' && ['Priest', 'Accountant', 'Sevadar', 'Devotee'].includes(normalizedAllowed)) {
          return true;
        }
        return false;
      });
    },
    [role, currentRole]
  );

  const loginWithPin = (pin: string, devoteeList: DevoteeMember[]): boolean => {
    if (!activeWorkspaceId.startsWith('DEMO_')) {
      setActiveWorkspaceId('DEMO_ws-mandir');
      setWorkspaceId('DEMO_ws-mandir');
    }

    // Admin Master Override PIN
    if (pin === '1008' || pin === activeWorkspace.adminPin) {
      setRole('SuperAdmin');
      setCurrentRole('SuperAdmin');
      setIsAuthenticated(true);
      signInAnonymously(auth).catch(console.error);
      return true;
    }

    const match = devoteeList.find((d) => d.pin === pin || d.phone.endsWith(pin));
    if (match) {
      setCurrentDevotee(match);
      const matchedRole = (ROLE_MIGRATION_MAP[match.role] || match.role || 'Devotee') as UserRole;
      setRole(matchedRole);
      setCurrentRole(matchedRole);
      setIsAuthenticated(true);
      signInAnonymously(auth).catch(console.error);
      set('sanatani_current_devotee', match);
      return true;
    }

    return false;
  };

  const loginAsRole = (asRole: UserRole, customName?: string) => {
    if (!activeWorkspaceId.startsWith('DEMO_')) {
      setActiveWorkspaceId('DEMO_ws-mandir');
      setWorkspaceId('DEMO_ws-mandir');
    }
    const normalized: UserRole = (ROLE_MIGRATION_MAP[asRole] || asRole) as UserRole;
    setRole(normalized);
    setCurrentRole(normalized);
    setIsAuthenticated(true);
    setViewMode('MANAGER');
    signInAnonymously(auth).catch(console.error);

    if (normalized === 'Devotee') {
      setCurrentDevotee({
        id: 'dev-demo-self',
        workspaceId: activeWorkspaceId,
        fullName: customName || 'Sri Anand Acharya',
        spiritualName: 'Ananda Das',
        phone: '+91 98765 00108',
        email: 'anand@sanatan.org',
        pin: '1008',
        role: 'Devotee',
        sevaIndex: 780,
        sevaTier: 'Vishesh',
        gotra: 'Kashyapa',
        pravara: 'Kashyapa, Avatsara, Naidhruva',
        varnaKul: 'Suryavanshi',
        address: 'Bhadra Ghat, Varanasi',
        activeStatus: 'Active',
        totalDonated: 45000,
        volunteerHours: 120,
        qrCodeRef: 'QR-SB-DEV108',
        joinedDate: '2023-01-15',
      });
    } else {
      setCurrentDevotee(null);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error('Error signing out:', e);
    }
    setUser(null);
    setRole(null);
    setCurrentRole('Devotee');
    setCurrentDevotee(null);
    setUserDocData(null);
    setIsAuthenticated(false);
    set('sanatani_current_devotee', null);
    localStorage.removeItem('sanatani_web_session');
    setWorkspaceId('DEMO_ws-mandir');
    setActiveWorkspaceId('DEMO_ws-mandir');
  };

  const saveCustomLogo = (base64: string) => {
    set(`sb_logo_${activeWorkspaceId}`, base64);
    updateWorkspaceDetails({ logoUrl: base64 });
  };

  const addWorkspace = (newWorkspace: WorkspaceConfig) => {
    setWorkspaces((prev) => {
      const existing = prev.find((w) => w.id === newWorkspace.id);
      if (existing) {
        return prev.map((w) => (w.id === newWorkspace.id ? newWorkspace : w));
      }
      const updated = [...prev, newWorkspace];
      set('sanatani_workspaces', updated);
      return updated;
    });
    setWorkspaceId(newWorkspace.id);
    setActiveWorkspaceId(newWorkspace.id);
  };

  const generateSecureQRToken = (member: DevoteeMember): string => {
    const vaultToken = member.qrSecretVaultToken || btoa(`${member.id}-vault-${Date.now()}`);
    return JSON.stringify({ id: member.id, pin: member.pin, token: vaultToken });
  };

  const currentUser = useMemo(() => {
    return {
      id: currentDevotee?.id || user?.uid || 'admin-root',
      name: currentDevotee?.fullName || user?.displayName || 'Acharya / Trustee Administrator',
      role: role || currentRole,
    };
  }, [currentDevotee, user, role, currentRole]);

  return (
    <AuthWorkspaceContext.Provider
      value={{
        user,
        workspaceId,
        role,
        isLoading,
        switchWorkspace,
        firebaseUser: user,
        activeWorkspaceId,
        activeWorkspace,
        workspaces,
        currentRole: role || currentRole,
        currentDevotee,
        setCurrentDevotee,
        currentUser,
        isAuthenticated,
        viewMode,
        setViewMode,
        updateWorkspaceType,
        switchRole,
        updateCurrentUserRole: switchRole,
        checkPermission,
        loginWithPin,
        loginAsRole,
        logout,
        saveCustomLogo,
        updateWorkspaceDetails,
        addWorkspace,
        generateSecureQRToken,
      }}
    >
      {isLoading ? (
        <div className="min-h-screen flex flex-col items-center justify-center bg-stone-900 text-amber-100 selection:bg-amber-500">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-4" />
          <div className="flex items-center gap-2 mb-1">
            <span className="text-amber-500 text-xl font-bold">🕉️</span>
            <span className="text-lg font-serif font-semibold tracking-wider text-amber-200">
              सनातन बन्धन (SANATANI BANDHAN)
            </span>
          </div>
          <p className="text-xs text-stone-400 font-sans tracking-wide">
            Initializing Sacred Workspace & Verifying RBAC Session...
          </p>
        </div>
      ) : (
        children
      )}
    </AuthWorkspaceContext.Provider>
  );
};

export const useAuthWorkspace = () => {
  const context = useContext(AuthWorkspaceContext);
  if (!context) {
    throw new Error('useAuthWorkspace must be used within an AuthWorkspaceProvider');
  }
  return context;
};
