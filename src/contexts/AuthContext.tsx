'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  loginTime: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (credentials: { username: string; password: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: () => boolean;
  getAuthToken: () => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Simple demo credentials - In production, this would be handled by a backend
const DEMO_CREDENTIALS = {
  username: 'demo',
  password: 'demo123',
  email: 'demo@manusic.app'
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const storedUser = localStorage.getItem('manusic_user');
        const storedToken = localStorage.getItem('manusic_token');
        const tokenExpiry = localStorage.getItem('manusic_token_expiry');

        if (storedUser && storedToken && tokenExpiry) {
          const now = new Date().getTime();
          const expiry = parseInt(tokenExpiry);

          if (now < expiry) {
            // Token is still valid
            setUser(JSON.parse(storedUser));
          } else {
            // Token expired, clear storage
            logout();
          }
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (credentials: { username: string; password: string }) => {
    try {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simple credential validation
      if (
        credentials.username === DEMO_CREDENTIALS.username &&
        credentials.password === DEMO_CREDENTIALS.password
      ) {
        // Create user object
        const userData: User = {
          id: '1',
          username: DEMO_CREDENTIALS.username,
          email: DEMO_CREDENTIALS.email,
          name: 'Demo User',
          loginTime: new Date().toISOString()
        };

        // Create a simple token (in production, this would be a proper JWT from backend)
        const token = btoa(JSON.stringify({
          userId: userData.id,
          username: userData.username,
          timestamp: new Date().getTime()
        }));

        // Set token expiry (24 hours)
        const expiry = new Date().getTime() + (24 * 60 * 60 * 1000);

        // Store in localStorage
        localStorage.setItem('manusic_user', JSON.stringify(userData));
        localStorage.setItem('manusic_token', token);
        localStorage.setItem('manusic_token_expiry', expiry.toString());

        setUser(userData);
        return { success: true };
      } else {
        return { 
          success: false, 
          error: 'Invalid username or password' 
        };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: 'An error occurred during login' 
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Clear all auth data
    localStorage.removeItem('manusic_user');
    localStorage.removeItem('manusic_token');
    localStorage.removeItem('manusic_token_expiry');
    setUser(null);
  };

  const isAuthenticated = () => {
    return !!user;
  };

  const getAuthToken = () => {
    return localStorage.getItem('manusic_token');
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated,
    getAuthToken
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

