'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, pass: string, remember: boolean) => Promise<boolean>;
  logout: () => void;
  updateCredentials: (email: string, pass: string) => Promise<void>;
  adminEmail: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize directly from storage to prevent redirect loop on refresh
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState('admin@luxe.com');

  useEffect(() => {
    const authLocal = localStorage.getItem('admin_auth');
    const authSession = sessionStorage.getItem('admin_auth');
    if (authLocal === 'true' || authSession === 'true') {
      setIsAuthenticated(true);
    }
    // Fetch current admin email for display purposes
    fetchAdminEmail();
  }, []);

  const fetchAdminEmail = async () => {
    try {
      const { data } = await supabase
        .from('app_settings')
        .select('value')
        .eq('key', 'admin_email')
        .single();

      if (data) {
        setAdminEmail(data.value);
      }
    } catch (error) {
      console.error("Error fetching admin email:", error);
    }
  };

  const login = async (email: string, pass: string, remember: boolean) => {
    try {
      // Fetch credentials from DB
      const { data: emailData } = await supabase
        .from('app_settings')
        .select('value')
        .eq('key', 'admin_email')
        .single();

      const { data: passData } = await supabase
        .from('app_settings')
        .select('value')
        .eq('key', 'admin_password')
        .single();

      const dbEmail = emailData?.value || 'admin@luxe.com';
      const dbPass = passData?.value || 'admin123';

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
      // Fallback to hardcoded if DB fails (safety net)
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
      // Update Email
      const { error: emailError } = await supabase
        .from('app_settings')
        .upsert({ key: 'admin_email', value: email });

      // Update Password
      const { error: passError } = await supabase
        .from('app_settings')
        .upsert({ key: 'admin_password', value: pass });

      if (emailError || passError) throw new Error("Failed to update credentials");

      setAdminEmail(email);
    } catch (error) {
      console.error("Error updating credentials:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, updateCredentials, adminEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within a AuthProvider');
  return context;
};
