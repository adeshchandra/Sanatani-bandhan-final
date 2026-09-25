import { db } from './firebaseClient';
import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';

/**
 * Adds a new transaction record to the tenant-isolated Firestore collection:
 * /tenants/{tenantId}/treasury
 */
export const addTransaction = async (tenantId: string, transactionData: any) => {
  try {
    const colRef = collection(db, 'tenants', tenantId, 'treasury');
    const docRef = await addDoc(colRef, {
      ...transactionData,
      createdAt: serverTimestamp(),
    });
    return {
      id: docRef.id,
      ...transactionData,
    };
  } catch (error) {
    console.error('Error adding transaction to Firestore:', error);
    throw error;
  }
};

/**
 * Fetches all transaction records for a specific tenant from Firestore:
 * /tenants/{tenantId}/treasury
 */
export const getTransactions = async (tenantId: string) => {
  try {
    const colRef = collection(db, 'tenants', tenantId, 'treasury');
    const snapshot = await getDocs(colRef);
    return snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));
  } catch (error) {
    console.error('Error fetching transactions from Firestore:', error);
    return [];
  }
};
