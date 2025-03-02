// context/AuthProvider.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import api from '../api/axios' 
import { User, AuthContextType } from '../types/auth';


const AuthContext = createContext<AuthContextType>(null!)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<null | any>(null)
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  const login = (token: string, userData: User) => {
    localStorage.setItem('token', token);
    setToken(token);
    setUser(userData);
    // Set default authorization header
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };
  

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    delete api.defaults.headers.common['Authorization'];
  };
  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/users/${user?.id}`); // Change to your auth endpoint
        setUser(response.data);
      } catch (error) {
        console.error('Authentication check failed:', error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    if (token && !user) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, [token]);
  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)