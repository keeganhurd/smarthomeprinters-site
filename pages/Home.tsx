import React from 'react';
import { Link } from 'react-router-dom';
import { Printer, ArrowRight, LayoutTemplate } from 'lucide-react';

const Home: React.FC = () => {
  
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=800&q=80";
    e.currentTarget.onerror = null; 
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
              Meet the <span className="text-blue-800 dark:text-blue-400">HeloJet C200</span> & <br/>Smart Home Planning
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              We simplify technology purchasing. Get the right hardware for your home office without the confusion.
            </p>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 p-4 rounded-lg mb-10 max-w-2xl mx-auto text-sm text-blue-800 dark:text-blue-200">
              <strong>Official Store:</strong> We are the official retailer and support provider for HeloJet printers. Purchase with confidence.
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/product/helojet-c200" 
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900 dark:bg-blue-600 dark:hover:bg-blue-700 shadow-sm"
              >
                <Printer className="mr-2 -ml-1 h-5 w-5" />
                View HeloJet C200
              </Link>
              <Link 
                to="/book-appointment" 
                className="inline-flex items-center justify-center px-6 py-3 border border-slate-300 dark:border-slate-600 text-base font-medium rounded-md text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm"
              >
                <LayoutTemplate className="mr-2 -ml-1 h-5 w-5" />
                Book Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Value Proposition */}
      <div className="py-16 bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-lg flex items-center justify-center mb-6">
                <Printer size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Modern Design</h3>
              <p className="text-slate-600 dark:text-slate-400">The HeloJet C200 is built for the modern home. Sleek, minimalist, and powerful.</p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-lg flex items-center justify-center mb-6">
                <LayoutTemplate size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Smart Home Planning</h3>
              <p className="text-slate-600 dark:text-slate-400">Need better WiFi? Planning a smart office? We provide hardware consultation and purchasing lists for your setup.</p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-lg flex items-center justify-center mb-6">
                <ArrowRight size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Straightforward Sales</h3>
              <p className="text-slate-600 dark:text-slate-400">No subscriptions to support plans. No upsells for repair services. Just honest hardware sales and advice.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Product Preview */}
      <div className="py-16 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">Featured: HeloJet C200</h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
                The perfect all-in-one solution for home offices. Minimalist footprint, wireless connectivity, and high-yield efficiency.
              </p>
              <Link to="/product/helojet-c200" className="text-blue-800 dark:text-blue-400 font-semibold hover:underline inline-flex items-center">
                View Product Details <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8 lg:mt-0 lg:w-1/3">
              <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-8 flex items-center justify-center">
                <img 
                  src="https://m.media-amazon.com/images/I/61gKkYQn6lL._AC_SL1500_.jpg" 
                  alt="HeloJet C200 Printer" 
                  className="rounded shadow-md hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  onError={handleImageError}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;