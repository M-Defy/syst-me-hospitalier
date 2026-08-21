import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { IconCheck, IconAlertTriangle, IconInfo, IconX } from './icons';

const ToastContext = createContext(null);

const ICONS = {
  success: IconCheck,
  error: IconX,
  warning: IconAlertTriangle,
  info: IconInfo,
};

const ACCENTS = {
  success: 'var(--green-600)',
  error: 'var(--red-600)',
  warning: 'var(--orange-600)',
  info: 'var(--blue-600)',
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const notify = useCallback((message, type = 'info', duration = 4000) => {
    const id = ++idRef.current;
    setToasts((prev) => [...prev, { id, message, type }]);
    if (duration) {
      window.setTimeout(() => dismiss(id), duration);
    }
    return id;
  }, [dismiss]);

  return (
    <ToastContext.Provider value={{ notify, dismiss }}>
      {children}
      <div className="toast-stack" role="status" aria-live="polite">
        {toasts.map((t) => {
          const Icon = ICONS[t.type] || IconInfo;
          return (
            <div key={t.id} className="toast" style={{ '--accent': ACCENTS[t.type] }}>
              <span className="toast-icon"><Icon size={17} /></span>
              <span className="toast-msg">{t.message}</span>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast doit être utilisé à l\'intérieur de <ToastProvider>');
  return ctx;
}
