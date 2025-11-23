import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone, Home as HomeIcon, Sun, Moon, Lock } from 'lucide-react';
import { COMPANY_INFO } from '../types';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Default to dark mode as requested
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [hasCustomChat, setHasCustomChat] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Load and inject Custom Chat Widget Code from LocalStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('shp_site_settings');
    if (savedSettings) {
      try {
        const { chatWidgetCode } = JSON.parse(savedSettings);
        if (chatWidgetCode && chatWidgetCode.trim() !== '') {
          setHasCustomChat(true);
          
          const container = document.getElementById('vapi-voice-widget');
          if (container) {
            container.innerHTML = ''; // Clear existing content

            // Create a temporary container to parse HTML
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = chatWidgetCode;

            // Iterate over children and append them. 
            // Crucial: Re-create scripts to force execution.
            Array.from(tempDiv.childNodes).forEach((node) => {
              if (node.nodeName === 'SCRIPT') {
                const oldScript = node as HTMLScriptElement;
                const newScript = document.createElement('script');
                
                // Copy attributes
                Array.from(oldScript.attributes).forEach(attr => {
                  newScript.setAttribute(attr.name, attr.value);
                });
                
                // Copy content
                newScript.text = oldScript.text;
                
                // Append to body (usually better for widgets) or container
                document.body.appendChild(newScript);
              } else {
                // Clone other nodes (divs, styles) directly
                container.appendChild(node.cloneNode(true));
              }
            });
          }
        }
      } catch (e) {
        console.error("Error loading chat widget", e);
      }
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Featured Printer', path: '/product/hp-deskjet-4255e' },
    { label: 'Smart Home Plans', path: '/smart-home' },
    { label: 'Book Consultation', path: '/book-appointment' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo Area */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center gap-2">
                <div className="bg-blue-800 text-white p-2 rounded-md">
                  <HomeIcon size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-xl text-slate-900 dark:text-white leading-tight">SmartHomePrinters</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 tracking-wide uppercase">Sales & Planning Only</span>
                </div>
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-8 items-center">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-slate-600 dark:text-slate-300 hover:text-blue-800 dark:hover:text-blue-400 font-medium transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Theme Toggle */}
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle Dark Mode"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </nav>

            {/* Call to Action (Phone) - UPDATED TO PINK */}
            <div className="hidden md:flex items-center">
              <a
                href={`tel:${COMPANY_INFO.phone.replace(/-/g, '')}`}
                className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-full font-semibold transition-colors shadow-md"
              >
                <Phone size={18} />
                <span>{COMPANY_INFO.phone}</span>
              </a>
            </div>

            {/* Mobile Menu Button & Theme Toggle */}
            <div className="md:hidden flex items-center gap-4">
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-500 dark:text-slate-300 hover:text-slate-700 dark:hover:text-white p-2"
              >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shadow-lg absolute w-full">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-3 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:text-blue-800 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={`tel:${COMPANY_INFO.phone.replace(/-/g, '')}`}
                className="block px-3 py-3 text-base font-bold text-pink-600 dark:text-pink-400"
              >
                Call: {COMPANY_INFO.phone}
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-slate-50 dark:bg-slate-950">
        {children}
      </main>

      {/* Amazon Disclosure Banner */}
      <div className="bg-amber-50 dark:bg-amber-950 border-t border-amber-200 dark:border-amber-900 p-3 text-center text-xs text-amber-900 dark:text-amber-200">
        <p><strong>Disclosure:</strong> As an Amazon Associate, we earn from qualifying purchases. SmartHomePrinters.com is an independent retailer and planner.</p>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-black text-slate-300 pt-12 pb-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Contact */}
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Contact Us</h3>
              <p className="mb-2">{COMPANY_INFO.legalName}</p>
              <p className="mb-2">{COMPANY_INFO.address}</p>
              <p className="mb-2"><a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-white">{COMPANY_INFO.phone}</a></p>
              <p className="mb-2"><a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white">{COMPANY_INFO.email}</a></p>
            </div>

            {/* Links */}
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/refunds" className="hover:text-white">Refund Policy</Link></li>
                <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>

            {/* Compliance/Disclaimer */}
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Important Disclaimer</h3>
              <p className="text-sm leading-relaxed mb-4">
                SmartHomePrinters.com is an independent retailer and consultancy. We are <strong>NOT</strong> affiliated with HP, Microsoft, Apple, or any other manufacturer.
              </p>
              <div className="bg-slate-800 dark:bg-slate-900 p-3 rounded border border-slate-700">
                <p className="text-xs font-medium text-slate-400 uppercase mb-1">Service Notice</p>
                <p className="text-sm text-white">We DO NOT provide technical support, repair services, or remote device access. We sell hardware and provide purchase planning consultations only.</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-start items-center gap-4">
            <span className="text-sm text-slate-500 order-2 md:order-1">&copy; {new Date().getFullYear()} {COMPANY_INFO.legalName}. All rights reserved.</span>
            <Link to="/login" className="text-slate-600 hover:text-slate-400 flex items-center gap-1 text-xs transition-colors order-1 md:order-2">
              <Lock size={10} /> Admin
            </Link>
          </div>
        </div>
      </footer>

      {/* Vapi/Chat Widget Container */}
      <div id="vapi-voice-widget">
        {/* Custom scripts will be injected here via useEffect */}
      </div>

      {/* Fallback Sticky Chat Badge - Only shows if no custom chat is detected */}
      {!hasCustomChat && (
        <div className="fixed bottom-4 right-4 z-40">
          <div className="bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg font-semibold flex items-center gap-2 opacity-75 hover:opacity-100 cursor-not-allowed">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Chat (Coming Soon)
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;