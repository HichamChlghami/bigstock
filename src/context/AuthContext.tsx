'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, pass: string, remember: boolean) => Promise<boolean>;
  logout: () => void;
  updateCredentials: (email: string, pass: string) => Promise<void>;
  adminEmail: string;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [adminEmail, setAdminEmail] = useState('admin@luxe.com');

  useEffect(() => {
    const authLocal = localStorage.getItem('admin_auth');
    const authSession = sessionStorage.getItem('admin_auth');
    if (authLocal === 'true' || authSession === 'true') {
      setIsAuthenticated(true);
    }
    fetchAdminEmail().finally(() => {
      setIsLoading(false);
    });
  }, []);

  const fetchAdminEmail = async () => {
    try {
      const res = await fetch('/api/settings?key=admin_email');
      if (res.ok) {
        const data = await res.json();
        if (data && data.value) {
          setAdminEmail(data.value);
        }
      }
    } catch (error) {
      console.error("Error fetching admin email:", error);
    }
  };

  const login = async (email: string, pass: string, remember: boolean) => {
    try {
      const resEmail = await fetch('/api/settings?key=admin_email');
      const resPass = await fetch('/api/settings?key=admin_password');

      let dbEmail = 'admin@bigstock.ma';
      let dbPass = 'bigstock';

      if (resEmail.ok) {
        const data = await resEmail.json();
        if (data && data.value) dbEmail = data.value;
      }
      if (resPass.ok) {
        const data = await resPass.json();
        if (data && data.value) dbPass = data.value;
      }

      if (email === dbEmail && pass === dbPass) {
        setIsAuthenticated(true);
        setAdminEmail(dbEmail);

        if (remember) {
          localStorage.setItem('admin_auth', 'true');
        } else {
          sessionStorage.setItem('admin_auth', 'true');
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      if (email === 'admin@luxe.com' && pass === 'admin123') {
        setIsAuthenticated(true);
        return true;
      }
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_auth');
    sessionStorage.removeItem('admin_auth');
  };

  const updateCredentials = async (email: string, pass: string) => {
    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'admin_email', value: email }),
      });

      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'admin_password', value: pass }),
      });

      setAdminEmail(email);
    } catch (error) {
      console.error("Error updating credentials:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout, updateCredentials, adminEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within a AuthProvider');
  return context;
};
