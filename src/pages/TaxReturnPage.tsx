
import React from 'react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import TaxReturnCalculator from '@/components/Calculators/TaxReturnCalculator';

const TaxReturnPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-smartasset-blue-dark to-smartasset-blue py-12">
          <div className="container mx-auto px-4 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Tax Return Calculator</h1>
            <p className="text-xl max-w-3xl">
              Estimate your tax refund or amount owed with our comprehensive tax return calculator. Plan ahead and understand your tax situation better.
            </p>
          </div>
        </div>
        
        <TaxReturnCalculator />
        
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">How to Use the Tax Return Calculator</h2>
            <p className="mb-4">
              Our Tax Return Calculator helps you estimate whether you'll receive a tax refund or owe money to the IRS. Follow these steps:
            </p>
            
            <ol className="list-decimal pl-5 space-y-2 mb-6">
              <li><strong>Enter your income details:</strong> Include your wages, self-employment income, and other sources.</li>
              <li><strong>Add your tax withholdings:</strong> Enter the amount already withheld from your paychecks.</li>
              <li><strong>Include deductions:</strong> Add your eligible tax deductions and credits.</li>
              <li><strong>Review your results:</strong> See your estimated refund or amount owed.</li>
            </ol>
            
            <div className="bg-blue-50 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-semibold mb-2 text-smartasset-blue-dark">Important Note</h3>
              <p>
                This calculator provides estimates based on current tax rates and basic information. Your actual tax situation may vary based on specific circumstances and changes in tax laws.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TaxReturnPage;
