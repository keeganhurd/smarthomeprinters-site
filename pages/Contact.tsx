import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { COMPANY_INFO } from '../types';

const Contact: React.FC = () => {
  return (
    <div className="py-16 bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">Contact Us</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Info Card */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Business Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-blue-800 dark:text-blue-400 mt-1 mr-4" />
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">Mailing Address</p>
                  <p className="text-slate-600 dark:text-slate-300">{COMPANY_INFO.address}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="w-6 h-6 text-blue-800 dark:text-blue-400 mt-1 mr-4" />
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">Phone</p>
                  <p className="text-slate-600 dark:text-slate-300">
                    <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-blue-800 dark:hover:text-blue-300 hover:underline">
                      {COMPANY_INFO.phone}
                    </a>
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">Sales inquiries only. No tech support.</p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="w-6 h-6 text-blue-800 dark:text-blue-400 mt-1 mr-4" />
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">Email</p>
                  <p className="text-slate-600 dark:text-slate-300">
                    <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-blue-800 dark:hover:text-blue-300 hover:underline">
                      {COMPANY_INFO.email}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="w-6 h-6 text-blue-800 dark:text-blue-400 mt-1 mr-4" />
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">Hours of Operation</p>
                  <p className="text-slate-600 dark:text-slate-300">Mon - Fri: 9:00 AM - 5:00 PM EST</p>
                  <p className="text-slate-600 dark:text-slate-300">Sat - Sun: Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col shadow-sm overflow-hidden">
             <div className="w-full h-full min-h-[300px] bg-slate-300 dark:bg-slate-700 rounded relative">
               <iframe 
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3301.0211679012004!2d-81.02318012469999!3d29.211905675353346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e6da2880cd9e51%3A0xb1ca886d4ec773a7!2s134%20W%20International%20Speedway%20Blvd%2C%20Daytona%20Beach%2C%20FL%2032114!5e1!3m2!1sen!2sus!4v1763782555178!5m2!1sen!2sus" 
                 width="100%" 
                 height="100%" 
                 style={{ border: 0, minHeight: '350px' }} 
                 allowFullScreen={true} 
                 loading="lazy" 
                 referrerPolicy="no-referrer-when-downgrade"
                 title="SmartHomePrinters Location"
               ></iframe>
             </div>
             <div className="p-4 text-center">
                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">Visit Our Location</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">134 W International Speedway Blvd #44</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;