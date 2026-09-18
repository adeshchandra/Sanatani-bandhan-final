jest.mock('../src/firebase', () => ({
  db: {},
  auth: { currentUser: { uid: 'user-1' } }
}));

import { OfflineSyncManager, QueuedAction } from '../src/services/OfflineSyncManager';

describe('OfflineSyncManager Tenant Context & Session Isolation', () => {
  let store: Record<string, string> = {};

  beforeAll(() => {
    // Mock localStorage
    Object.defineProperty(global, 'localStorage', {
      value: {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, val: string) => { store[key] = val; },
        removeItem: (key: string) => { delete store[key]; },
        clear: () => { store = {}; }
      },
      writable: true
    });

    // Mock window & CustomEvent
    Object.defineProperty(global, 'window', {
      value: {
        dispatchEvent: () => true,
        addEventListener: () => {}
      },
      writable: true
    });
    (global as any).CustomEvent = class CustomEvent {
      name: string;
      detail: any;
      constructor(name: string, opts?: any) {
        this.name = name;
        this.detail = opts?.detail;
      }
    };
  });

  beforeEach(() => {
    store = {};
  });

  it('1. Captures and retains immutable tenant communityId at queue creation time', () => {
    // Queuing an action in Workspace 1
    OfflineSyncManager.addToQueue('RICH_SOS', {
      senderId: 'user-1',
      senderName: 'Devotee 1',
      communityId: 'ws-1',
      text: 'Emergency SOS'
    });

    const queue = OfflineSyncManager.getQueue();
    expect(queue.length).toBe(1);
    const item = queue[0];
    expect(item.communityId).toBe('ws-1');
    expect(item.payload.communityId).toBe('ws-1');
    expect(item.authorUid).toBe('user-1');
    expect(item.status).toBe('PENDING');
  });

  it('2. Switching active workspace does not alter already queued action tenant context', () => {
    // Queue action in Workspace A
    OfflineSyncManager.addToQueue('MESSAGE', {
      senderId: 'user-1',
      senderName: 'Devotee 1',
      communityId: 'ws-1',
      text: 'Message in ws-1'
    });

    // Simulate switching local workspace to Workspace B by queuing another action for ws-2
    OfflineSyncManager.addToQueue('MESSAGE', {
      senderId: 'user-1',
      senderName: 'Devotee 1',
      communityId: 'ws-2',
      text: 'Message in ws-2'
    });

    const queue = OfflineSyncManager.getQueue();
    expect(queue.length).toBe(2);
    // First action must remain strictly bound to ws-1
    expect(queue[0].communityId).toBe('ws-1');
    expect(queue[0].payload.communityId).toBe('ws-1');
    // Second action must be bound to ws-2
    expect(queue[1].communityId).toBe('ws-2');
    expect(queue[1].payload.communityId).toBe('ws-2');
  });

  it('3. Supports all Yatra action types with tenant context binding', () => {
    const actionTypes: QueuedAction['type'][] = [
      'SOS',
      'MESSAGE',
      'LOCATION',
      'RICH_SOS',
      'DIRECT_MESSAGE',
      'RESPOND_SOS',
      'FORWARD_SOS',
      'RESOLVE_SOS'
    ];

    actionTypes.forEach((type, idx) => {
      OfflineSyncManager.addToQueue(type, {
        senderId: 'user-1',
        communityId: `ws-${idx}`,
        sosId: `sos-${idx}`,
        text: `Action ${type}`
      });
    });

    const queue = OfflineSyncManager.getQueue();
    expect(queue.length).toBe(actionTypes.length);
    actionTypes.forEach((type, idx) => {
      expect(queue[idx].type).toBe(type);
      expect(queue[idx].communityId).toBe(`ws-${idx}`);
      expect(queue[idx].payload.communityId).toBe(`ws-${idx}`);
    });
  });

  it('4. Queued actions retain author UID across offline lifecycle', () => {
    OfflineSyncManager.addToQueue('RESPOND_SOS', {
      sosId: 'sos-123',
      responderId: 'responder-456',
      responderName: 'Responder Devotee',
      communityId: 'ws-1'
    });

    const queue = OfflineSyncManager.getQueue();
    expect(queue.length).toBe(1);
    expect(queue[0].authorUid).toBe('user-1');
    expect(queue[0].communityId).toBe('ws-1');
  });
});
