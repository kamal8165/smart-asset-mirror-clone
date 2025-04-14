
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-smartasset-blue-dark to-smartasset-blue py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          {/* Hero Content */}
          <div className="md:w-1/2 text-white mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Make Smart Financial Decisions
            </h1>
            <p className="text-xl mb-8 md:pr-10 text-white/90">
              Access free, personalized money management tools, tax calculators, and financial insights for better financial decisions.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button className="bg-white text-smartasset-blue-dark hover:bg-gray-100 text-lg px-6 py-6 h-auto">
                Find a Financial Advisor
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-6 py-6 h-auto">
                Compare Tax Professionals
              </Button>
            </div>
          </div>
          
          {/* Calculator Card Preview */}
          <div className="md:w-1/2">
            <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Income Tax Calculator</h2>
              <p className="text-gray-600 mb-6">
                Estimate your tax burden based on your income, filing status, deductions, and more.
              </p>
              <div className="bg-gray-50 p-4 rounded-md mb-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium text-gray-700">Filing Status</span>
                  <span className="text-smartasset-blue font-medium">Single</span>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium text-gray-700">Income</span>
                  <span className="text-smartasset-blue font-medium">$75,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Estimated Tax</span>
                  <span className="text-smartasset-blue font-medium">$12,453</span>
                </div>
              </div>
              <Link 
                to="/taxes/income" 
                className="flex items-center justify-center text-white bg-smartasset-blue hover:bg-smartasset-blue-dark rounded-md px-4 py-3 font-medium transition-colors"
              >
                Calculate Your Taxes <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
