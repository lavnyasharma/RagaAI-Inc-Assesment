import { useEffect } from 'react';
import { getToken, onMessage } from 'firebase/messaging';
import { messaging } from '../services/firebase';
import { useToast } from '../components/ui/Toast';

export function useNotifications() {
  const { toast } = useToast();

  const requestPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        const token = await getToken(messaging, {
          vapidKey: import.meta.env.VITE_FCM_VAPID_KEY
        });
        if (token) {
          console.log('FCM Token:', token);
          // In a real app, you'd send this token to your server
        }
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

  useEffect(() => {
    requestPermission();

    // Handle foreground messages
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      if (payload.notification) {
        toast(
          'info',
          payload.notification.title || 'New Notification',
          payload.notification.body || ''
        );
      }
    });

    return () => unsubscribe();
  }, [messaging]);
}
