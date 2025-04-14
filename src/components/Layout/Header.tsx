
import React, { useState } from 'react';
import { Menu, X, ChevronDown, UserCircle, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };
  
  const handleSignIn = () => {
    navigate('/signin');
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    {
      title: 'Tax',
      hasDropdown: true,
      dropdownItems: [
        { label: 'Income Tax Calculator', link: '/taxes/income' },
        { label: 'Capital Gains Tax Calculator', link: '/taxes/capital-gains' },
        { label: 'Property Tax Calculator', link: '/taxes/property' },
      ]
    },
    {
      title: 'Retirement',
      hasDropdown: true,
      dropdownItems: [
        { label: '401(k) Calculator', link: '/retirement/401k' },
        { label: 'Retirement Calculator', link: '/retirement/calculator' },
        { label: 'Social Security Calculator', link: '/retirement/social-security' },
      ]
    },
    {
      title: 'Mortgage',
      hasDropdown: true,
      dropdownItems: [
        { label: 'Mortgage Calculator', link: '/mortgage/calculator' },
        { label: 'Refinance Calculator', link: '/mortgage/refinance' },
        { label: 'Affordability Calculator', link: '/mortgage/affordability' },
      ]
    },
    {
      title: 'Banking',
      hasDropdown: true,
      dropdownItems: [
        { label: 'Savings Calculator', link: '/banking/savings' },
        { label: 'CD Calculator', link: '/banking/cd' },
        { label: 'High-Yield Accounts', link: '/banking/high-yield' },
      ]
    },
  ];

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-smartasset-blue">SmartAssetClone</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-10">
            {navItems.map((item) => (
              <div key={item.title} className="relative group">
                <button
                  className="flex items-center text-gray-600 hover:text-smartasset-blue-dark focus:outline-none"
                  onClick={() => toggleDropdown(item.title)}
                >
                  {item.title}
                  <ChevronDown size={18} className="ml-1" />
                </button>

                {/* Dropdown menu */}
                {activeDropdown === item.title && item.hasDropdown && (
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      {item.dropdownItems.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.label}
                          to={dropdownItem.link}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {dropdownItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center mr-4">
                  <UserCircle className="h-5 w-5 mr-2 text-smartasset-blue" />
                  <span className="text-gray-700">{user?.name}</span>
                </div>
                <Button variant="outline" onClick={handleLogout} className="flex items-center">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={handleSignIn}>Sign In</Button>
                <Button 
                  className="bg-smartasset-blue hover:bg-smartasset-blue-dark"
                  onClick={handleSignIn}
                >
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-smartasset-blue hover:bg-gray-100 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <div key={item.title} className="py-1">
                <button
                  className="flex items-center w-full justify-between text-gray-600 px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
                  onClick={() => toggleDropdown(item.title)}
                >
                  {item.title}
                  <ChevronDown size={18} />
                </button>
                
                {activeDropdown === item.title && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.dropdownItems.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.label}
                        to={dropdownItem.link}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                      >
                        {dropdownItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {isAuthenticated ? (
              <>
                <div className="flex items-center px-5 mb-3">
                  <UserCircle className="h-6 w-6 text-smartasset-blue mr-2" />
                  <span className="text-gray-700 font-medium">{user?.name}</span>
                </div>
                <div className="px-5">
                  <Button 
                    onClick={handleLogout} 
                    variant="outline" 
                    className="w-full flex items-center justify-center"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center px-5 space-x-3">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handleSignIn}
                  >
                    Sign In
                  </Button>
                </div>
                <div className="mt-3 px-5">
                  <Button 
                    className="w-full bg-smartasset-blue hover:bg-smartasset-blue-dark"
                    onClick={handleSignIn}
                  >
                    Get Started
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
