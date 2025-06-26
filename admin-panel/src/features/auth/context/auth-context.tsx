'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import { fakeLogin } from '../services/auth-services';

type User = { email: string; role: 'admin' | 'user' };

type AuthContextType = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = (email: string, password: string) => {
    const result = fakeLogin(email, password);
    if (result) {
      setUser({
        ...result.user,
        role: result.user.role as 'admin' | 'user',
      });
      setToken(result.token);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuthContext must be used inside AuthProvider');
  return context;
};
