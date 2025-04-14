
import React from 'react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import SignInForm from '@/components/Auth/SignInForm';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const SignInPage = () => {
  const { isAuthenticated, isLoading, user } = useAuth();

  // If already authenticated, redirect to home
  if (isAuthenticated && !isLoading) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8">Welcome to SmartAssetClone</h1>
            <SignInForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignInPage;
