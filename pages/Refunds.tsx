import React from 'react';

const Refunds: React.FC = () => {
  return (
    <div className="py-12 bg-white dark:bg-slate-950 transition-colors duration-200">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate dark:prose-invert">
        <h1>Refund Policy</h1>
        
        <h2>Direct Service Refunds</h2>
        <p>If you book a paid consultation service directly with SmartHomePrinters.com, you may request a full refund up to 24 hours before the scheduled appointment time. Completed consultations are non-refundable.</p>

        <h2>Product Returns (Amazon)</h2>
        <p>Because we link to Amazon for product purchases, <strong>all returns and refunds for hardware are handled directly by Amazon.com</strong> in accordance with their policies.</p>
        <p>We cannot process returns, issue refunds, or accept shipments for products bought via Amazon links on our site. Please check your Amazon order history to initiate a return.</p>

        <h2>Contact Info</h2>
        <p>If you have billing questions regarding a direct service charge from us, please contact info@smarthomeprinters.com.</p>
      </div>
    </div>
  );
};

export default Refunds;