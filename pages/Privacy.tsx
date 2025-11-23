import React from 'react';
import { COMPANY_INFO } from '../types';

const Privacy: React.FC = () => {
  return (
    <div className="py-12 bg-white dark:bg-slate-950 transition-colors duration-200">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate dark:prose-invert">
        <h1>Privacy Policy</h1>
        <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
        
        <h2>1. Introduction</h2>
        <p>{COMPANY_INFO.legalName} ("we," "our," or "us") operates SmartHomePrinters.com. We respect your privacy and are committed to protecting it.</p>

        <h2>2. Information We Collect</h2>
        <p>We may collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and services, such as:</p>
        <ul>
          <li>Name</li>
          <li>Phone Number</li>
          <li>Email Address</li>
        </ul>

        <h2>3. How We Use Your Information</h2>
        <p>We use personal information collected via our website for a variety of business purposes described below:</p>
        <ul>
          <li>To fulfill and manage your orders or consultation requests.</li>
          <li>To send you administrative information.</li>
          <li>To respond to legal requests and prevent harm.</li>
        </ul>
        <p><strong>We do not sell your data to third parties.</strong></p>

        <h2>4. Third-Party Websites (Amazon)</h2>
        <p>Our website contains links to Amazon.com. If you click these links and make a purchase, you are subject to Amazon's Privacy Policy. We do not have access to your payment information processed by Amazon.</p>

        <h2>5. Contact Us</h2>
        <p>If you have questions or comments about this policy, you may email us at {COMPANY_INFO.email} or by post to:</p>
        <address>
          {COMPANY_INFO.legalName}<br />
          {COMPANY_INFO.address}
        </address>
      </div>
    </div>
  );
};

export default Privacy;