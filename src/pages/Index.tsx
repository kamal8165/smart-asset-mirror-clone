
import React from 'react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import Hero from '@/components/Home/Hero';
import Features from '@/components/Home/Features';
import CalculatorHighlights from '@/components/Home/CalculatorHighlights';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <CalculatorHighlights />
        
        {/* Testimonials Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Trusted by Millions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-smartasset-blue-light flex items-center justify-center text-white font-bold text-xl">
                    JD
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">John Doe</h4>
                    <p className="text-sm text-gray-600">Retired</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  "The retirement calculator helped me understand exactly how much I need to save each month. I finally feel confident about my financial future."
                </p>
              </div>
              
              {/* Testimonial 2 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-xl">
                    SM
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">Sarah Miller</h4>
                    <p className="text-sm text-gray-600">Small Business Owner</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  "I use the tax calculator every quarter to estimate my payments. It's incredibly accurate and has saved me from penalties."
                </p>
              </div>
              
              {/* Testimonial 3 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-xl">
                    RJ
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">Robert Johnson</h4>
                    <p className="text-sm text-gray-600">Software Engineer</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  "The mortgage calculator helped me understand exactly what I could afford. I was able to buy my dream house thanks to these tools."
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-smartasset-blue text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Start Making Smarter Financial Decisions Today</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join thousands of users who use our calculators to plan their finances better.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-white text-smartasset-blue-dark hover:bg-gray-100 px-8 py-3 rounded-md font-semibold">
                Try Our Calculators
              </button>
              <button className="bg-transparent border border-white hover:bg-white/10 px-8 py-3 rounded-md font-semibold">
                Learn More
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
