import React, { useEffect, useRef } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { useNotifications } from '../../context/NotificationContext';
import { useAuthWorkspace } from '../../context/AuthWorkspaceContext';

export const GlobalSOSListener: React.FC = () => {
  const { addNotification } = useNotifications();
  const { currentUser } = useAuthWorkspace();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const processedSOS = useRef<Set<string>>(new Set());

  useEffect(() => {
    // Request browser notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    const q = query(
      collection(db, 'yatra_broadcasts'),
      where('type', '==', 'RICH_SOS')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const sos = { id: change.doc.id, ...change.doc.data() } as any;

          // Don't notify if the SOS is already resolved or if we've already processed it locally
          if (sos.sosStatus === 'RESOLVED' || processedSOS.current.has(sos.id)) {
            return;
          }

          // Don't notify the sender themselves
          if (sos.senderId === currentUser?.id) {
            processedSOS.current.add(sos.id);
            return;
          }

          // Mark as processed
          processedSOS.current.add(sos.id);

          // 1. Play intense audio alarm
          if (!audioRef.current) {
            audioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3'); // Intense alert sound
            audioRef.current.loop = false;
          }
          audioRef.current.play().catch(e => console.log('Audio auto-play blocked by browser.'));

          // 2. Trigger In-App Notification Bell
          addNotification({
            title: `🚨 EMERGENCY: ${sos.situation?.replace('_', ' ') || 'SOS'}`,
            message: `${sos.senderName || 'A devotee'} needs urgent help: ${sos.details || sos.text}`,
            type: 'error',
          });

          // 3. Trigger OS Native Push Notification
          if ('Notification' in window && Notification.permission === 'granted') {
            const notification = new Notification(`🚨 GLOBAL SOS: ${sos.senderName}`, {
              body: sos.text || sos.details,
              icon: '/favicon.ico',
              requireInteraction: true, // Persist on screen until user clicks
            });

            notification.onclick = () => {
              window.focus();
              notification.close();
              window.dispatchEvent(new CustomEvent('navigate_module', { detail: 'socialWall' }));
            };
          }
        }
      });
    });

    return () => {
      unsubscribe();
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [addNotification, currentUser?.id]);

  return null;
};
