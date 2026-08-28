import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as authApi from '../api/auth';
import { TOKEN_STORAGE_KEY } from '../api/client';

const AuthContext = createContext(null);

const USER_STORAGE_KEY = 'sih_auth_user';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(USER_STORAGE_KEY);
      const token = window.sessionStorage.getItem(TOKEN_STORAGE_KEY);
      if (raw && token) setUser(JSON.parse(raw));
    } catch {
      // ignore corrupted storage
    }
    setIsLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const { token, user: apiUser } = await authApi.login(username, password);
      window.sessionStorage.setItem(TOKEN_STORAGE_KEY, token);
      window.sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(apiUser));
      setUser(apiUser);
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.error || 'Nom d\'utilisateur ou mot de passe incorrect.';
      return { success: false, message };
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch {
      // le token est peut-être déjà invalide côté serveur, on nettoie quand même localement
    }
    setUser(null);
    try {
      window.sessionStorage.removeItem(USER_STORAGE_KEY);
      window.sessionStorage.removeItem(TOKEN_STORAGE_KEY);
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

