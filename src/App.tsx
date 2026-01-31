import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { DataProvider } from './context/DataContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { Home } from './views/Home';
import { Shop } from './views/Shop';
import { ProductDetails } from './views/ProductDetails';
import { Checkout } from './views/Checkout';
import { OrderSuccess } from './views/OrderSuccess';
import { Wishlist } from './views/Wishlist';
import { About, Contact, Shipping } from './views/StaticPages';
import { NotFound } from './views/NotFound';
import { AdminLogin } from './views/admin/AdminLogin';
import { AdminLayout } from './components/admin/AdminLayout';
import { Dashboard } from './views/admin/Dashboard';
import { Products } from './views/admin/Products';
import { Orders } from './views/admin/Orders';
// Customers page removed
import { Categories } from './views/admin/Categories';
import { Settings } from './views/admin/Settings';
import { analytics } from './utils/analytics';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    analytics.trackPageView(pathname);
  }, [pathname]);
  return null;
};

const AnalyticsInit = () => {
  useEffect(() => {
    analytics.initialize();
  }, []);
  return null;
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  return <AdminLayout>{children}</AdminLayout>;
};

const PublicLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col min-h-screen bg-background text-primary font-sans">
    <Header />
    <CartDrawer />
    <main className="flex-grow">{children}</main>
    <Footer />
    <a
      href="https://wa.me/15551234567"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#128C7E] transition-transform hover:scale-110 flex items-center justify-center"
      aria-label="Contact on WhatsApp"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    </a>
  </div>
);

function App() {
  return (
    <DataProvider>
      <CartProvider>
        <AuthProvider>
          <Router>
            <AnalyticsInit />
            <ScrollToTop />
            <Routes>
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/admin/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
              <Route path="/admin/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
              {/* Customers Route Removed */}
              <Route path="/admin/categories" element={<ProtectedRoute><Categories /></ProtectedRoute>} />
              <Route path="/admin/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

              {/* Public Routes */}
              <Route path="*" element={
                <PublicLayout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/category/:category" element={<Shop />} />
                    <Route path="/products/:slug" element={<ProductDetails />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/order-success" element={<OrderSuccess />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/shipping" element={<Shipping />} />
                    <Route path="/returns" element={<Shipping />} />
                    <Route path="/faq" element={<Contact />} />
                    <Route path="/privacy" element={<About />} />
                    <Route path="/terms" element={<About />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </PublicLayout>
              } />
            </Routes>
          </Router>
        </AuthProvider>
      </CartProvider>
    </DataProvider>
  );
}

export default App;
