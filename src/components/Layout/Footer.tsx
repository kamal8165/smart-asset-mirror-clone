
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerSections = [
    {
      title: 'Tax',
      links: [
        { label: 'Income Tax Calculator', url: '/taxes/income' },
        { label: 'Capital Gains Calculator', url: '/taxes/capital-gains' },
        { label: 'Property Tax', url: '/taxes/property' },
        { label: 'Tax Return Calculator', url: '/taxes/return' },
      ]
    },
    {
      title: 'Retirement',
      links: [
        { label: '401(k) Calculator', url: '/retirement/401k' },
        { label: 'Retirement Calculator', url: '/retirement/calculator' },
        { label: 'Social Security', url: '/retirement/social-security' },
        { label: 'Roth IRA', url: '/retirement/roth-ira' },
      ]
    },
    {
      title: 'Mortgage',
      links: [
        { label: 'Mortgage Calculator', url: '/mortgage/calculator' },
        { label: 'Refinance Calculator', url: '/mortgage/refinance' },
        { label: 'Mortgage Rates', url: '/mortgage/rates' },
        { label: 'House Affordability', url: '/mortgage/affordability' },
      ]
    },
    {
      title: 'Banking',
      links: [
        { label: 'High-Yield Savings', url: '/banking/high-yield' },
        { label: 'CD Rates', url: '/banking/cd-rates' },
        { label: 'Checking Accounts', url: '/banking/checking' },
        { label: 'Banking Reviews', url: '/banking/reviews' },
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', url: '/about' },
        { label: 'Contact Us', url: '/contact' },
        { label: 'Careers', url: '/careers' },
        { label: 'Press', url: '/press' },
      ]
    },
  ];

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        {/* Footer links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link 
                      to={link.url} 
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Bottom footer */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-2xl font-bold text-white">SmartAssetClone</span>
            </div>
            <div className="text-sm text-gray-400">
              <p>© {currentYear} SmartAssetClone. All rights reserved.</p>
              <div className="flex space-x-4 mt-2">
                <Link to="/terms" className="hover:text-white">Terms of Service</Link>
                <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
                <Link to="/sitemap" className="hover:text-white">Sitemap</Link>
              </div>
            </div>
          </div>
          <div className="mt-6 text-xs text-gray-500 text-center">
            <p>This is a demonstration clone with no real financial advice. Do not use for actual financial planning.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
