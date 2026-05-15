import { useEffect, useMemo, useState, type ReactNode } from 'react';
import type { AuthUser } from '../types/auth';
import { AuthContext, type AuthContextValue } from './auth-context';

const readSavedUser = (): AuthUser | null => {
  const savedUser = localStorage.getItem('user');

  if (!savedUser) {
    return null;
  }

  try {
    return JSON.parse(savedUser) as AuthUser;
  } catch {
    localStorage.removeItem('user');
    return null;
  }
};

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(readSavedUser);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));

  useEffect(() => {
    if (!token) {
      localStorage.removeItem('token');
      return;
    }

    localStorage.setItem('token', token);
  }, [token]);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    token,
    login: (userData, jwt) => {
      setUser(userData);
      setToken(jwt);
      localStorage.setItem('user', JSON.stringify(userData));
    },
    logout: () => {
      setUser(null);
      setToken(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  }), [token, user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
