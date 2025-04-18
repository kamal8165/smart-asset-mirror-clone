
import React from 'react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import InvestmentCalculator from '@/components/Calculators/InvestmentCalculator';

const InvestmentCalculatorPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-smartasset-blue-dark to-smartasset-blue py-12">
          <div className="container mx-auto px-4 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Investment Calculator</h1>
            <p className="text-xl max-w-3xl">
              Calculate your potential investment returns and plan your financial future with our comprehensive investment calculator.
            </p>
          </div>
        </div>
        
        <InvestmentCalculator />
        
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">How to Use the Investment Calculator</h2>
            <p className="mb-4">
              Our Investment Calculator helps you estimate potential returns on your investments. Follow these steps:
            </p>
            
            <ol className="list-decimal pl-5 space-y-2 mb-6">
              <li><strong>Initial investment:</strong> Enter the amount you plan to start with.</li>
              <li><strong>Monthly contribution:</strong> Add how much you'll contribute each month.</li>
              <li><strong>Time period:</strong> Select how long you plan to invest.</li>
              <li><strong>Expected return rate:</strong> Enter your expected annual return rate.</li>
            </ol>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-smartasset-blue-dark">Important Note</h3>
              <p>
                This calculator provides estimates based on the information you provide. Actual investment returns may vary due to market conditions, fees, and other factors.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default InvestmentCalculatorPage;
