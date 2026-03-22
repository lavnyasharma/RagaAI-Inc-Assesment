import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { createPortal } from 'react-dom';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

interface ToastContextType {
  toast: (type: ToastType, title: string, message?: string) => void;
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((type: ToastType, title: string, message?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => removeToast(id), 5000);
  }, [removeToast]);

  const success = (title: string, message?: string) => toast('success', title, message);
  const error = (title: string, message?: string) => toast('error', title, message);

  return (
    <ToastContext.Provider value={{ toast, success, error }}>
      {children}
      {createPortal(
        <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3 pointer-events-none w-full max-w-sm">
          {toasts.map((t) => (
            <div
              key={t.id}
              className={`
                pointer-events-auto w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 shadow-lg flex items-start gap-3 transition-all
                ${t.type === 'success' ? 'border-success/30' : ''}
                ${t.type === 'error' ? 'border-danger/30' : ''}
              `}
            >
              <div className={`mt-0.5 flex-shrink-0`}>
                {t.type === 'success' && <CheckCircle className="w-5 h-5 text-success" />}
                {t.type === 'error' && <AlertCircle className="w-5 h-5 text-danger" />}
                {t.type === 'info' && <Info className="w-5 h-5 text-info" />}
                {t.type === 'warning' && <AlertTriangle className="w-5 h-5 text-warning" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-zinc-100">{t.title}</p>
                {t.message && <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{t.message}</p>}
              </div>
              <button
                onClick={() => removeToast(t.id)}
                className="flex-shrink-0 text-zinc-600 hover:text-zinc-300 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};
