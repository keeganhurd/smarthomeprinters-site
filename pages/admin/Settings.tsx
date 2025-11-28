import React, { useState, useEffect } from 'react';
import { Save, MessageSquare, AlertTriangle } from 'lucide-react';
import AdminLayout from './AdminLayout';

const Settings: React.FC = () => {
  const [chatCode, setChatCode] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // CHANGED KEY to 'helojet_settings'
    const savedSettings = localStorage.getItem('helojet_settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setChatCode(parsed.chatWidgetCode || '');
      } catch (e) {
        console.error('Failed to parse settings', e);
      }
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const settings = {
      chatWidgetCode: chatCode
    };
    // CHANGED KEY to 'helojet_settings'
    localStorage.setItem('helojet_settings', JSON.stringify(settings));
    
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
          <div className="border-b border-slate-200 dark:border-slate-700 pb-4 mb-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <MessageSquare className="text-blue-600 dark:text-blue-400" />
              Site Settings & Integrations
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Manage global scripts and widgets.
            </p>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/30 p-4 rounded-md flex gap-3">
              <AlertTriangle className="text-amber-600 dark:text-amber-400 flex-shrink-0" size={20} />
              <div className="text-sm text-amber-800 dark:text-amber-200">
                <p className="font-bold mb-1">Advanced Configuration</p>
                <p>The code pasted below will be injected directly into the website footer. Ensure you trust the source of the code (e.g., Vapi, Intercom, Tawk.to). Incorrect code may break the site layout.</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Chat Widget / Embed Code
              </label>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                Paste your full script tag here (e.g. &lt;script&gt;...&lt;/script&gt;). It will replace the default "Coming Soon" badge.
              </p>
              <textarea
                value={chatCode}
                onChange={(e) => setChatCode(e.target.value)}
                rows={12}
                className="w-full p-4 rounded border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="<!-- Paste your widget code here -->"
              />
            </div>

            <div className="flex items-center justify-end gap-4">
              {showSuccess && (
                <span className="text-green-600 dark:text-green-400 text-sm font-medium animate-pulse">
                  Settings Saved Successfully!
                </span>
              )}
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 flex items-center gap-2 font-medium"
              >
                <Save size={18} />
                Save Changes
              </button>
            </div>

          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Settings;