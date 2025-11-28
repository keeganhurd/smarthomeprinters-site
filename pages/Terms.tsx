import React from 'react';

const Terms: React.FC = () => {
  return (
    <div className="py-12 bg-white dark:bg-slate-950 transition-colors duration-200">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate dark:prose-invert">
        <h1>Terms of Service</h1>
        
        <h2>1. Agreement to Terms</h2>
        <p>These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and HeloJet.me concerning your access to and use of the website.</p>

        <h2>2. Nature of Business</h2>
        <p>HeloJet.me is the official online store for HeloJet printers and a home technology consulting service. We provide:</p>
        <ul>
          <li>Sales and support for HeloJet-branded hardware.</li>
          <li>Information about printers and smart home devices.</li>
          <li>Links to purchase products via Amazon Associates.</li>
          <li>Consultation appointments for home technology planning.</li>
        </ul>
        <p><strong>Support Limitations:</strong> We provide setup and troubleshooting assistance for HeloJet products. We DO NOT provide technical support, repair services, or remote access for third-party devices (e.g., HP, Canon, Microsoft, Apple products) that are not branded HeloJet.</p>

        <h2>3. Limitation of Liability</h2>
        <p>We are not responsible for any hardware defects, software failures, or data loss associated with third-party products. All warranties for HeloJet products are as stated in the product documentation.</p>

        <h2>4. Amazon Associate Disclosure</h2>
        <p>We are a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for us to earn fees by linking to Amazon.com and affiliated sites.</p>
      </div>
    </div>
  );
};

export default Terms;