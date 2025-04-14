
import React from 'react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';

const ProfilePage = () => {
  const { isAuthenticated, isLoading, user, logout } = useAuth();

  // If not authenticated, redirect to signin
  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  // Format currency function
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Get file status text
  const getFilingStatusText = (status: string) => {
    switch(status) {
      case 'single': return 'Single';
      case 'married': return 'Married Filing Jointly';
      case 'head': return 'Head of Household';
      default: return status;
    }
  };

  // Get state name
  const getStateName = (stateCode: string) => {
    const states: {[key: string]: string} = {
      ca: 'California',
      ny: 'New York',
      tx: 'Texas',
      fl: 'Florida',
      il: 'Illinois'
    };
    return states[stateCode] || stateCode.toUpperCase();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-smartasset-blue"></div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h1 className="text-2xl font-bold mb-2">{user?.name}</h1>
                    <p className="text-gray-600">{user?.email}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    className="mt-4 md:mt-0"
                    onClick={() => logout()}
                  >
                    Sign Out
                  </Button>
                </div>
              </div>

              <h2 className="text-xl font-bold mb-4">Saved Calculations</h2>
              
              {user?.savedCalculations.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
                  <p className="text-gray-600 mb-4">You don't have any saved calculations yet.</p>
                  <Link to="/taxes/income">
                    <Button>Try the Tax Calculator</Button>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {user?.savedCalculations.map((calc: any) => (
                    <Card key={calc.id} className="overflow-hidden">
                      <CardHeader className="bg-gray-50 pb-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>
                              {calc.type === 'income-tax' ? 'Income Tax Calculation' : 'Tax Calculation'}
                            </CardTitle>
                            <CardDescription>
                              Saved on {new Date(calc.date).toLocaleDateString()}
                            </CardDescription>
                          </div>
                          <Link to={`/taxes/income`}>
                            <Button variant="outline" size="sm">Recalculate</Button>
                          </Link>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Income</p>
                            <p className="font-medium">{formatCurrency(calc.income)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Filing Status</p>
                            <p className="font-medium">{getFilingStatusText(calc.filingStatus)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">State</p>
                            <p className="font-medium">{getStateName(calc.state)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Total Tax</p>
                            <p className="font-medium">{formatCurrency(calc.federalTax + calc.stateTax)}</p>
                          </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Federal Tax</p>
                            <p className="font-medium">{formatCurrency(calc.federalTax)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">State Tax</p>
                            <p className="font-medium">{formatCurrency(calc.stateTax)}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
