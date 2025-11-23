import React from 'react';
import { Link } from 'react-router-dom';
import { Wifi, Smartphone, ShieldCheck } from 'lucide-react';

const SmartHome: React.FC = () => {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-16 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Smart Home Planning Services</h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Hardware selection and layout planning for the modern connected home.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 mb-12">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full flex items-center justify-center mb-4">
              <Wifi size={20} />
            </div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Router & Network Planning</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              A strong smart home starts with a strong network. We help you select the right Mesh WiFi systems to ensure coverage in every room, garage, and patio.
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-500 italic">Hardware sales only. We do not configure routers remotely.</p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full flex items-center justify-center mb-4">
              <Smartphone size={20} />
            </div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Smart Plug & Lighting Ecosystems</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Confused by Matter, Zigbee, and Z-Wave? We provide shopping lists for compatible devices so your smart plugs talk to your lights and voice assistants seamlessly.
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-500 italic">Consultation service.</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md overflow-hidden border border-slate-200 dark:border-slate-800">
          <div className="p-8 md:flex md:items-center md:justify-between bg-slate-800 dark:bg-slate-800 text-white">
            <div className="md:w-2/3 mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-2">Need a Hardware Plan?</h3>
              <p className="text-slate-300">
                Book a 15-minute consultation to discuss your home's layout and get a recommended shopping list for printers, routers, and smart devices.
              </p>
            </div>
            <div className="md:w-1/3 text-right">
              <Link 
                to="/book-appointment" 
                className="inline-block px-6 py-3 bg-white text-slate-900 font-bold rounded-md hover:bg-slate-100 transition-colors"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartHome;