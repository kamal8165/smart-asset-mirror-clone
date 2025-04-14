
import React, { createContext, useContext, useEffect, useState } from 'react';
import * as taxApi from '@/api/taxApi';

// Define the auth context type
type AuthContextType = {
  isAuthenticated: boolean;
  user: {
    name: string;
    email: string;
    savedCalculations: any[];
  } | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  saveTaxCalculation: (calculationData: any) => Promise<{ success: boolean; id?: number }>;
};

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<AuthContextType['user']>(null);
  const [token, setToken] = useState<string | null>(null);

  // Check for existing token on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token');
    if (storedToken) {
      setToken(storedToken);
      fetchUserProfile(storedToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  // Fetch user profile with token
  const fetchUserProfile = async (authToken: string) => {
    setIsLoading(true);
    try {
      const profile = await taxApi.getUserProfile(authToken);
      setUser(profile);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      localStorage.removeItem('auth_token');
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await taxApi.loginUser(email, password);
      
      if (response.success && response.token) {
        localStorage.setItem('auth_token', response.token);
        setToken(response.token);
        await fetchUserProfile(response.token);
        return { success: true };
      }
      
      setIsLoading(false);
      return { success: false, error: response.error || 'Login failed' };
    } catch (error) {
      setIsLoading(false);
      return { success: false, error: 'An error occurred during login' };
    }
  };

  // Register function
  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      const response = await taxApi.registerUser(email, password, name);
      
      if (response.success && response.token) {
        localStorage.setItem('auth_token', response.token);
        setToken(response.token);
        await fetchUserProfile(response.token);
        return { success: true };
      }
      
      setIsLoading(false);
      return { success: false, error: response.error || 'Registration failed' };
    } catch (error) {
      setIsLoading(false);
      return { success: false, error: 'An error occurred during registration' };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('auth_token');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  // Save tax calculation
  const saveTaxCalculation = async (calculationData: any) => {
    if (!token) {
      return { success: false, error: 'Not authenticated' };
    }

    try {
      const result = await taxApi.saveTaxCalculation(token, calculationData);
      
      if (result.success) {
        // Update user's saved calculations
        if (user) {
          setUser({
            ...user,
            savedCalculations: [
              ...user.savedCalculations,
              { ...calculationData, id: result.id, date: new Date().toISOString().split('T')[0] }
            ]
          });
        }
        return { success: true, id: result.id };
      }
      
      return { success: false };
    } catch (error) {
      console.error('Failed to save calculation:', error);
      return { success: false, error: 'Failed to save calculation' };
    }
  };

  // Provide the context value
  const contextValue: AuthContextType = {
    isAuthenticated,
    user,
    isLoading,
    login,
    register,
    logout,
    saveTaxCalculation
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
