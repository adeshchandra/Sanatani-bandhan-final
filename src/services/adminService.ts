import { db, auth } from './firebaseClient';
import { collection, getDocs } from 'firebase/firestore';

export interface TenantRecord {
  id: string;
  name: string;
  code: string;
  location: string;
  state: string;
  tier: 'Enterprise' | 'Heritage' | 'Standard' | 'Starter';
  custodian: string;
  devoteeCount: string;
  onboardedDate: string;
  status: 'Active' | 'Pending Verification' | 'Trial Mode';
  [key: string]: any;
}

/**
 * Fetches and returns all documents from the root `tenants` collection in Firestore.
 */
export const getTenants = async (): Promise<TenantRecord[]> => {
  try {
    const colRef = collection(db, 'tenants');
    const snapshot = await getDocs(colRef);
    const tenants: TenantRecord[] = snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        name: data.name || docSnap.id,
        code: data.code || docSnap.id.toUpperCase(),
        location: data.location || data.city || 'India',
        state: data.state || 'Dharmic Kshetra',
        tier: (data.tier as any) || 'Enterprise',
        custodian: data.custodian || 'Chief Trustee',
        devoteeCount: data.devoteeCount || (data.devoteesCount ? data.devoteesCount.toLocaleString('en-IN') : '10,000+'),
        onboardedDate: data.onboardedDate || (data.createdAt?.toDate ? data.createdAt.toDate().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Jan 2025'),
        status: (data.status as any) || 'Active',
        ...data,
      };
    });
    return tenants;
  } catch (error) {
    console.error('Error fetching tenants from Firestore:', error);
    throw error;
  }
};

export const fetchTenants = getTenants;

/**
 * Provisions a new Mandir tenant partition via Node.js Express backend
 */
export const provisionTenant = async (tenantData: any): Promise<any> => {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error('User not authenticated. Please log in as Super Admin.');
  }

  const token = await currentUser.getIdToken();
  if (!token) {
    throw new Error('Failed to retrieve authentication token.');
  }

  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
  const response = await fetch(`${backendUrl}/api/admin/tenants`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(tenantData),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(errorBody?.message || errorBody?.error || `Failed to provision tenant: Status ${response.status}`);
  }

  return await response.json();
};

