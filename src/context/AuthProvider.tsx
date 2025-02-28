// context/AuthProvider.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import api from '../api/axios' 
import { User, AuthContextType } from '../types/auth';


const AuthContext = createContext<AuthContextType>(null!)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<null | any>(null)
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'))

  const login = (token: string, userData: User) => {
    localStorage.setItem('token', token);
    setToken(token);
    setUser(userData);
    // Set default authorization header
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };
  

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
  }

  useEffect(() => {
    if (token) {
      // Use the configured api instance instead of axios directly
      api.get(`/users/${user?.id}`) // Should point to your backend endpoint
        .then(res => setUser(res.data))
        .catch((err) => {
          console.error('User fetch error:', err);
          logout();
        });
    }
  }, [token, user?.id]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)