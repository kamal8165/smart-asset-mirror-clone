
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CalculatorHighlights = () => {
  const calculators = [
    {
      title: "Income Tax Calculator",
      description: "Estimate your federal and state income taxes based on your income and deductions.",
      icon: "💰",
      link: "/taxes/income",
      color: "bg-blue-50 text-smartasset-blue-dark"
    },
    {
      title: "Mortgage Calculator",
      description: "Calculate your monthly mortgage payments including principal, interest, taxes, and insurance.",
      icon: "🏠",
      link: "/mortgage/calculator",
      color: "bg-green-50 text-green-700"
    },
    {
      title: "Retirement Calculator",
      description: "See if you're on track for retirement and how much you need to save.",
      icon: "👵",
      link: "/retirement/calculator",
      color: "bg-purple-50 text-purple-700"
    },
    {
      title: "Investment Calculator",
      description: "Project the growth of your investments over time with different contribution amounts.",
      icon: "📈",
      link: "/investment/calculator",
      color: "bg-amber-50 text-amber-700"
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Financial Calculators</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Our suite of calculators helps you understand your finances and make better decisions for your future.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {calculators.map((calculator, index) => (
            <div key={index} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className={`p-4 ${calculator.color}`}>
                <span className="text-3xl">{calculator.icon}</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{calculator.title}</h3>
                <p className="text-gray-600 mb-4">{calculator.description}</p>
                <Link 
                  to={calculator.link}
                  className="inline-flex items-center text-smartasset-blue font-medium hover:text-smartasset-blue-dark"
                >
                  Try Calculator <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CalculatorHighlights;
