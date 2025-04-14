
import React from 'react';
import { Calculator, TrendingUp, Shield, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const Features = () => {
  const features = [
    {
      icon: <Calculator size={36} className="text-smartasset-blue" />,
      title: 'Accurate Calculators',
      description: 'Our calculators are regularly updated with the latest tax rates and financial information.',
    },
    {
      icon: <TrendingUp size={36} className="text-smartasset-blue" />,
      title: 'Investment Insights',
      description: 'Get personalized recommendations based on your financial situation and goals.',
    },
    {
      icon: <Shield size={36} className="text-smartasset-blue" />,
      title: 'Secure & Private',
      description: 'Your financial information is encrypted and never shared with third parties.',
    },
    {
      icon: <Award size={36} className="text-smartasset-blue" />,
      title: 'Expert Advice',
      description: 'Connect with qualified financial advisors who can help you make better decisions.',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose SmartAssetClone</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
