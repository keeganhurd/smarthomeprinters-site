import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, List, ArrowLeft, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
            <p className="text-slate-500 dark:text-slate-400">Manage your products and listings.</p>
          </div>
          <Link to="/" className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline">
            <ArrowLeft size={16} /> Back to Site
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4 space-y-2">
              <Link 
                to="/admin" 
                className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                  isActive('/admin') 
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400' 
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                <List size={20} />
                All Products
              </Link>
              <Link 
                to="/admin/new" 
                className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                  isActive('/admin/new') 
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400' 
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                <PlusCircle size={20} />
                Add New Product
              </Link>
              <Link 
                to="/admin/settings" 
                className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                  isActive('/admin/settings') 
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400' 
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                <Settings size={20} />
                Site Settings
              </Link>

              <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-700">
                <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2 rounded-md text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                    <LogOut size={20} />
                    Logout
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="md:col-span-3">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;