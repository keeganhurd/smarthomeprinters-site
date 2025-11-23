import React from 'react';

const Terms: React.FC = () => {
  return (
    <div className="py-12 bg-white dark:bg-slate-950 transition-colors duration-200">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate dark:prose-invert">
        <h1>Terms of Service</h1>
        
        <h2>1. Agreement to Terms</h2>
        <p>These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and SmartHomePrinters.com concerning your access to and use of the website.</p>

        <h2>2. Nature of Business</h2>
        <p>SmartHomePrinters.com is a retailer and consulting service. We provide:</p>
        <ul>
          <li>Information about printers and smart home devices.</li>
          <li>Links to purchase products via Amazon Associates.</li>
          <li>Consultation appointments for home technology planning.</li>
        </ul>
        <p><strong>We DO NOT provide:</strong> Technical support, repair services, virus removal, or remote access to your computer. We are not affiliated with Microsoft, HP, or Apple.</p>

        <h2>3. Limitation of Liability</h2>
        <p>We are not responsible for any hardware defects, software failures, or data loss associated with products purchased through our affiliate links. All warranties are provided solely by the manufacturer.</p>

        <h2>4. Amazon Associate Disclosure</h2>
        <p>We are a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for us to earn fees by linking to Amazon.com and affiliated sites.</p>
      </div>
    </div>
  );
};

export default Terms;