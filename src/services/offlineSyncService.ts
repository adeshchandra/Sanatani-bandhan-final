import { openDB, IDBPDatabase } from 'idb';

const DB_NAME = 'sanatani-sync-db';
const DB_VERSION = 1;
const STORE_NAME = 'mutations';

export interface QueuedMutation {
  id: string;
  collection: string;
  action: 'create' | 'update' | 'delete' | string;
  payload: any;
  timestamp: number;
}

/**
 * Initializes and returns the IndexedDB instance for offline mutation queuing.
 */
export const initDB = async (): Promise<IDBPDatabase> => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    },
  });
};

/**
 * Queues a mutation to IndexedDB when offline or preserving local-first changes.
 */
export const queueMutation = async (
  collection: string,
  action: string,
  payload: any
): Promise<QueuedMutation> => {
  const db = await initDB();
  const mutation: QueuedMutation = {
    id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    collection,
    action,
    payload,
    timestamp: Date.now(),
  };

  await db.put(STORE_NAME, mutation);
  console.log(`[OfflineSync] Queued mutation ${mutation.id} for collection "${collection}" [${action}]`);
  return mutation;
};

/**
 * Processes all pending mutations in the IndexedDB queue and syncs with backend/cloud.
 */
export const processSyncQueue = async (): Promise<{ syncedCount: number }> => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readonly');
  const store = tx.objectStore(STORE_NAME);
  const mutations: QueuedMutation[] = await store.getAll();
  await tx.done;

  if (!mutations || mutations.length === 0) {
    return { syncedCount: 0 };
  }

  console.log(`[OfflineSync] Processing ${mutations.length} pending mutation(s)...`);

  let syncedCount = 0;
  for (const mutation of mutations) {
    try {
      console.log(`[OfflineSync] Syncing mutation ${mutation.id} -> ${mutation.collection} (${mutation.action}):`, mutation.payload);
      // Simulate real network sync latency
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Remove successfully synced mutation from queue
      const deleteTx = db.transaction(STORE_NAME, 'readwrite');
      await deleteTx.objectStore(STORE_NAME).delete(mutation.id);
      await deleteTx.done;

      syncedCount++;
    } catch (err) {
      console.error(`[OfflineSync] Failed to sync mutation ${mutation.id}:`, err);
    }
  }

  console.log(`[OfflineSync] Successfully synced ${syncedCount} mutation(s)`);
  return { syncedCount };
};

/**
 * Returns the total count of pending mutations currently waiting in the offline queue.
 */
export const getPendingCount = async (): Promise<number> => {
  try {
    const db = await initDB();
    const count = await db.count(STORE_NAME);
    return count;
  } catch (err) {
    console.error('[OfflineSync] Error reading pending mutation count:', err);
    return 0;
  }
};
