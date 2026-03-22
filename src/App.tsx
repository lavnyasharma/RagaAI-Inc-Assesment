import { useEffect } from 'react';
import { AppRouter } from './app/AppRouter';
import { useAuthStore } from './features/auth/store/authStore';
import { ToastProvider } from './components/ui/Toast';
import { useNotifications } from './hooks/useNotifications';

function AppContent() {
  useNotifications();
  return <AppRouter />;
}

export default function App() {
  const initAuth = useAuthStore((state) => state.initAuth);

  useEffect(() => {
    const unsubscribe = initAuth();
    return unsubscribe;
  }, [initAuth]);

  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}
