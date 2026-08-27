import { collection, addDoc, serverTimestamp, doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase';

export interface QueuedAction {
  id: string;
  type: 'SOS' | 'MESSAGE' | 'LOCATION' | 'RICH_SOS' | 'DIRECT_MESSAGE' | 'RESPOND_SOS' | 'FORWARD_SOS';
  payload: any;
  timestamp: number;
  status: 'PENDING' | 'SYNCED' | 'FAILED';
  retryCount: number;
}

const QUEUE_KEY = 'yatra_offline_queue';

export const OfflineSyncManager = {
  getQueue: (): QueuedAction[] => {
    try {
      const q = localStorage.getItem(QUEUE_KEY);
      return q ? JSON.parse(q) : [];
    } catch (e) {
      return [];
    }
  },

  setQueue: (queue: QueuedAction[]) => {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
    // Dispatch a custom event so UI can update instantly
    window.dispatchEvent(new CustomEvent('offline_queue_updated'));
  },

  addToQueue: (type: QueuedAction['type'], payload: any) => {
    const queue = OfflineSyncManager.getQueue();
    const newAction: QueuedAction = {
      id: `task_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      type,
      payload,
      timestamp: Date.now(),
      status: 'PENDING',
      retryCount: 0
    };
    queue.push(newAction);
    OfflineSyncManager.setQueue(queue);
    
    // Attempt immediate sync if online
    if (navigator.onLine) {
      OfflineSyncManager.flushQueue();
    }
  },

  flushQueue: async () => {
    if (!navigator.onLine) return; // Still offline

    const queue = OfflineSyncManager.getQueue();
    const pending = queue.filter(item => item.status === 'PENDING' || item.status === 'FAILED');
    
    if (pending.length === 0) return;

    let hasUpdates = false;

    for (let i = 0; i < queue.length; i++) {
      const item = queue[i];
      if (item.status === 'SYNCED') continue;

      try {
        // Here we map the queued actions to actual Firebase calls
        if (item.type === 'SOS' || item.type === 'MESSAGE' || item.type === 'LOCATION' || item.type === 'RICH_SOS' || item.type === 'DIRECT_MESSAGE') {
          // General broadcast collection
          await addDoc(collection(db, `yatra_broadcasts`), {
            ...item.payload,
            syncedAt: serverTimestamp(),
            originalTimestamp: item.timestamp,
            type: item.type
          });
        } else if (item.type === 'RESPOND_SOS' && item.payload.sosId) {
          await updateDoc(doc(db, 'yatra_broadcasts', item.payload.sosId), {
            sosStatus: 'RESPONDED',
            responderId: item.payload.responderId,
            responderName: item.payload.responderName,
            respondedAt: serverTimestamp()
          });
        } else if (item.type === 'FORWARD_SOS' && item.payload.sosId) {
          await updateDoc(doc(db, 'yatra_broadcasts', item.payload.sosId), {
            forwardCount: increment(1)
          });
          // Note: In native implementation, this would also push to the BLE queue for rebroadcast
        }
        
        item.status = 'SYNCED';
        hasUpdates = true;
      } catch (err) {
        console.error('Failed to sync item', item.id, err);
        item.retryCount += 1;
        item.status = 'FAILED';
        hasUpdates = true;
      }
    }

    if (hasUpdates) {
      // Clean up synced items
      const newQueue = queue.filter(item => item.status !== 'SYNCED');
      OfflineSyncManager.setQueue(newQueue);
    }
  },

  initListener: () => {
    window.addEventListener('online', () => {
      console.log('🌐 Network connected! Flushing offline queue...');
      OfflineSyncManager.flushQueue();
    });
  }
};
