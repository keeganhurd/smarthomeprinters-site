import React, { useState } from 'react';
import { LeadForm } from '../types';
import { CheckCircle } from 'lucide-react';

const Booking: React.FC = () => {
  const [formData, setFormData] = useState<LeadForm>({
    name: '',
    email: '',
    phone: '',
    interest: 'consultation'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Save to localStorage (Simulating CRM)
    const leads = JSON.parse(localStorage.getItem('leads') || '[]');
    leads.push({ ...formData, date: new Date().toISOString() });
    localStorage.setItem('leads', JSON.stringify(leads));

    // Console log fake fetch to GoHighLevel
    console.log('Sending data to GoHighLevel Endpoint:', {
      endpoint: 'https://api.gohighlevel.com/v1/contacts/',
      method: 'POST',
      body: formData
    });

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 transition-colors duration-200">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Request Received</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            Thank you, {formData.name}. One of our planning specialists will contact you at {formData.phone} shortly to confirm your appointment details.
          </p>
          <button 
            onClick={() => setIsSuccess(false)} 
            className="text-blue-800 dark:text-blue-400 font-medium hover:underline"
          >
            Submit another request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Book a Consultation</h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Fill out the form below to schedule a call regarding hardware purchases or smart home planning.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                id="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="block w-full rounded-md border-slate-300 dark:border-slate-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border p-3"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="block w-full rounded-md border-slate-300 dark:border-slate-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border p-3"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="block w-full rounded-md border-slate-300 dark:border-slate-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border p-3"
                placeholder="(555) 123-4567"
              />
            </div>

            <div>
              <label htmlFor="interest" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">I am interested in:</label>
              <select
                name="interest"
                id="interest"
                value={formData.interest}
                onChange={handleChange}
                className="block w-full rounded-md border-slate-300 dark:border-slate-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border p-3"
              >
                <option value="consultation">General Consultation</option>
                <option value="printer">Buying a Printer</option>
                <option value="smarthome">Smart Home Planning</option>
                <option value="other">Other Inquiry</option>
              </select>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-900 dark:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isSubmitting ? 'Processing...' : 'Request Appointment'}
              </button>
            </div>

            <p className="text-xs text-slate-400 text-center mt-4">
              By submitting this form, you agree to be contacted by SmartHomePrinters.com regarding your inquiry. We do not sell your data.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;