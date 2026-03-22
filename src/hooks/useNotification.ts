import { useCallback } from 'react';

export function useNotification() {
  const requestPermission = useCallback(async () => {
    if (!('Notification' in window)) {
      console.warn('This browser does not support notifications');
      return false;
    }

    if (Notification.permission === 'granted') return true;

    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }, []);

  const sendNotification = useCallback(async (title: string, body: string) => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    new Notification(title, {
      body,
      icon: '/vite.svg',
      badge: '/vite.svg',
    });
  }, [requestPermission]);

  return { requestPermission, sendNotification };
}
