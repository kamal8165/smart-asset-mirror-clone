
import React from 'react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import TaxCalculator from '@/components/Calculators/TaxCalculator';

const TaxIncomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-smartasset-blue-dark to-smartasset-blue py-12">
          <div className="container mx-auto px-4 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Income Tax Calculator</h1>
            <p className="text-xl max-w-3xl">
              Estimate your federal and state income taxes with our simple tax calculator. Plan your finances better with accurate tax estimates.
            </p>
          </div>
        </div>
        
        <TaxCalculator />
        
        {/* Additional Info */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">How to Use the Income Tax Calculator</h2>
            <p className="mb-4">
              Our Income Tax Calculator estimates your federal income tax liability and state taxes for the current tax year. Follow these steps to use the calculator effectively:
            </p>
            
            <ol className="list-decimal pl-5 space-y-2 mb-6">
              <li><strong>Enter your annual income:</strong> Input your total gross income for the year.</li>
              <li><strong>Select your filing status:</strong> Choose from Single, Married Filing Jointly, or Head of Household.</li>
              <li><strong>Choose your state:</strong> Select your state of residence for state tax calculations.</li>
              <li><strong>Calculate:</strong> Click the Calculate button to see your estimated tax burden.</li>
            </ol>
            
            <h2 className="text-2xl font-bold mb-4">Understanding Your Tax Results</h2>
            <p className="mb-4">
              The calculator provides estimates for the following:
            </p>
            
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li><strong>Federal Income Tax:</strong> Your estimated federal income tax based on current tax brackets.</li>
              <li><strong>State Income Tax:</strong> Your estimated state income tax based on your selected state.</li>
              <li><strong>Total Income Tax:</strong> The combined federal and state tax burden.</li>
              <li><strong>Effective Tax Rate:</strong> Your total tax as a percentage of your income.</li>
              <li><strong>Take-home Pay:</strong> Your annual and monthly income after taxes.</li>
            </ul>
            
            <div className="bg-blue-50 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-semibold mb-2 text-smartasset-blue-dark">Important Note</h3>
              <p>
                This calculator provides estimates based on basic information. Actual tax calculations may be affected by 
                deductions, credits, and other factors. For the most accurate calculations, consult with a tax professional 
                or use the official IRS tax forms.
              </p>
            </div>
            
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="font-semibold mb-2">Are these tax calculations guaranteed to be accurate?</h3>
                <p className="text-gray-700">
                  The calculator provides estimates based on current tax rates. Actual tax calculations may differ based on your specific situation, deductions, and credits. 
                  For accurate tax advice, consult a tax professional.
                </p>
              </div>
              
              <div className="border-b pb-4">
                <h3 className="font-semibold mb-2">How often are the tax rates updated?</h3>
                <p className="text-gray-700">
                  We update our tax calculators annually to reflect the latest federal and state tax rates and brackets.
                </p>
              </div>
              
              <div className="border-b pb-4">
                <h3 className="font-semibold mb-2">Can I calculate taxes for previous years?</h3>
                <p className="text-gray-700">
                  Currently, this calculator is designed for estimating taxes for the current tax year only.
                </p>
              </div>
              
              <div className="border-b pb-4">
                <h3 className="font-semibold mb-2">How do I reduce my tax burden?</h3>
                <p className="text-gray-700">
                  There are several legal ways to reduce your taxes, including maximizing deductions, contributing to tax-advantaged accounts like 401(k)s and IRAs, and taking advantage of available tax credits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TaxIncomePage;
