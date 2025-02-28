// src/types/auth.ts
export interface User {
    id: number;
    name: string;
    email: string;
    created_at?: string;
    updated_at?: string;
  }
  
  export interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (token: string, user: User) => void;
    logout: () => void;
  }