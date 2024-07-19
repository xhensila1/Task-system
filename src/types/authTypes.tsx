export interface User {
    id: string;
    name: string;
    role: string; 
  }
  
// src/types/authTypes.ts
export interface LoginCredentials {
    username: string;
    password: string;
  }
  
  export interface LoginResponse {
    token: string;
    user: User;
  }
  
  export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    users: User[];
    usersStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  }
  