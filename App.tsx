import React from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import SmartHome from './pages/SmartHome';
import Booking from './pages/Booking';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Refunds from './pages/Refunds';
import ProductList from './pages/admin/ProductList';
import ProductEditor from './pages/admin/ProductEditor';
import Settings from './pages/admin/Settings';
import Login from './pages/admin/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { ProductProvider } from './context/ProductContext';
import { AuthProvider } from './context/AuthContext';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/product/:slug" element={<Layout><ProductPage /></Layout>} />
      <Route path="/smart-home" element={<Layout><SmartHome /></Layout>} />
      <Route path="/book-appointment" element={<Layout><Booking /></Layout>} />
      <Route path="/contact" element={<Layout><Contact /></Layout>} />
      <Route path="/privacy" element={<Layout><Privacy /></Layout>} />
      <Route path="/terms" element={<Layout><Terms /></Layout>} />
      <Route path="/refunds" element={<Layout><Refunds /></Layout>} />
      
      {/* Admin Login */}
      <Route path="/login" element={<Login />} />

      {/* Protected Admin Routes */}
      <Route path="/admin" element={
        <ProtectedRoute>
          <ProductList />
        </ProtectedRoute>
      } />
      <Route path="/admin/new" element={
        <ProtectedRoute>
          <ProductEditor />
        </ProtectedRoute>
      } />
      <Route path="/admin/edit/:id" element={
        <ProtectedRoute>
          <ProductEditor />
        </ProtectedRoute>
      } />
      <Route path="/admin/settings" element={
        <ProtectedRoute>
          <Settings />
        </ProtectedRoute>
      } />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ProductProvider>
        <HashRouter>
          <ScrollToTop />
          <AppRoutes />
        </HashRouter>
      </ProductProvider>
    </AuthProvider>
  );
};

export default App;