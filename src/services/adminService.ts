import { db } from './firebaseClient';
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
