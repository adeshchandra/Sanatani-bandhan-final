import { db } from './firebaseClient';
import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';

/**
 * Adds an emergency or crowd alert to the tenant-isolated collection:
 * /tenants/{tenantId}/yatranet_alerts
 */
export const addAlert = async (tenantId: string, alertData: any) => {
  try {
    const colRef = collection(db, 'tenants', tenantId, 'yatranet_alerts');
    const docRef = await addDoc(colRef, {
      ...alertData,
      createdAt: serverTimestamp(),
    });
    return {
      id: docRef.id,
      ...alertData,
    };
  } catch (error) {
    console.error('Error adding YatraNet alert to Firestore:', error);
    throw error;
  }
};

/**
 * Updates an alert's status (e.g. 'Active', 'Dispatched', 'Resolved'):
 * /tenants/{tenantId}/yatranet_alerts/{alertId}
 */
export const updateAlertStatus = async (tenantId: string, alertId: string, status: string) => {
  try {
    const docRef = doc(db, 'tenants', tenantId, 'yatranet_alerts', alertId);
    await updateDoc(docRef, {
      status,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating YatraNet alert status in Firestore:', error);
    throw error;
  }
};

/**
 * Subscribes to real-time alerts from Firestore:
 * /tenants/{tenantId}/yatranet_alerts
 * Returns the unsubscribe function.
 */
export const subscribeToAlerts = (tenantId: string, callback: (alerts: any[]) => void) => {
  try {
    const colRef = collection(db, 'tenants', tenantId, 'yatranet_alerts');
    const unsubscribe = onSnapshot(
      colRef,
      (snapshot) => {
        const alerts = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));
        callback(alerts);
      },
      (error) => {
        console.error('Error subscribing to YatraNet alerts:', error);
        callback([]);
      }
    );
    return unsubscribe;
  } catch (error) {
    console.error('Error setting up YatraNet alerts listener:', error);
    return () => {};
  }
};
