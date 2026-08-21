import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);

// Comptes de démonstration (MOCK) — en attendant l'API Django REST.
const MOCK_ACCOUNTS = [
  { email: 'admin@sih.com', password: 'admin123', nom: 'Rasoa', role: 'Administrateur' },
  { email: 'medecin@sih.com', password: 'medecin123', nom: 'Rakoto', role: 'Médecin' },
  { email: 'infirmier@sih.com', password: 'infirmier123', nom: 'Voahangy', role: 'Infirmier' },
];

const STORAGE_KEY = 'sih_auth_user';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      // ignore corrupted storage
    }
    setIsLoading(false);
  }, []);

  const login = (email, password) => {
    const account = MOCK_ACCOUNTS.find(
      (a) => a.email.toLowerCase() === email.trim().toLowerCase() && a.password === password
    );
    if (!account) {
      return { success: false, message: 'Email ou mot de passe incorrect.' };
    }
    const sessionUser = { email: account.email, nom: account.nom, role: account.role };
    setUser(sessionUser);
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(sessionUser));
    } catch {
      // storage may be unavailable — session still works in memory
    }
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    try {
      window.sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const value = useMemo(
    () => ({ user, isAuthenticated: !!user, isLoading, login, logout }),
    [user, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth doit être utilisé à l\'intérieur de <AuthProvider>');
  return ctx;
}
