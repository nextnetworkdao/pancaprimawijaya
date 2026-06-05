import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './store';
import { ScrollToTop } from './components/ScrollToTop';
import { ScriptInjector } from './components/ScriptInjector';

// Layouts
import { PublicLayout } from './layouts/PublicLayout';
import { AdminLayout } from './layouts/AdminLayout';

// Public Pages
import Splash from './pages/public/Splash';
import Home from './pages/public/Home';
import Sensor from './pages/public/Sensor';
import Catalog from './pages/public/Catalog';
import Cart from './pages/public/Cart';
import Blog from './pages/public/Blog';
import PostDetail from './pages/public/PostDetail';
import About from './pages/public/About';
import AdminLogin from './pages/public/AdminLogin';

import ProductDetail from './pages/public/ProductDetail';
import { ProtectedRoute } from './components/ProtectedRoute';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminPosts from './pages/admin/AdminPosts';
import AdminPostForm from './pages/admin/AdminPostForm';
import AdminProducts from './pages/admin/AdminProducts';
import AdminProductForm from './pages/admin/AdminProductForm';
import AdminOrders from './pages/admin/AdminOrders';
import AdminScripts from './pages/admin/AdminScripts';
import AdminPageBuilder from './pages/admin/AdminPageBuilder';
import AdminSettings from './pages/admin/AdminSettings';
import AdminMedia from './pages/admin/AdminMedia';
import AdminPages from './pages/admin/AdminPages';
import AdminPageEdit from './pages/admin/AdminPageEdit';
import PageDetail from './pages/public/PageDetail';
import BmsSensorPage from './pages/public/BmsSensorPage';
import EwsSensorPage from './pages/public/EwsSensorPage';
import RtmsSensorPage from './pages/public/RtmsSensorPage';
import ToyoSensorPage from './pages/public/ToyoSensorPage';
import SparepartLiftPage from './pages/public/SparepartLiftPage';

export default function App() {
  return (
    <HelmetProvider>
      <CartProvider>
        <BrowserRouter>
          <ScriptInjector />
          <ScrollToTop />
          <Routes>
            {/* Splash Route */}
            <Route path="/" element={<Splash />} />

            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="panca" element={<Home />} />
              <Route path="panca/produk" element={<Catalog />} />
              <Route path="sensor" element={<Sensor />} />
              <Route path="sensor/produk" element={<Catalog />} />
              <Route path="katalog" element={<Catalog />} />
              <Route path="cart" element={<Cart />} />
              <Route path="blog" element={<Blog />} />
              <Route path="blog/:slug" element={<PostDetail />} />
              <Route path="produk/:slug" element={<ProductDetail />} />
              <Route path="panca/produk/:slug" element={<ProductDetail />} />
              <Route path="sensor/produk/:slug" element={<ProductDetail />} />
              <Route path="tentang-kami" element={<About />} />
              <Route path=":slug" element={<PageDetail />} />
              <Route path="sensor/building-management-system" element={<BmsSensorPage />} />
              <Route path="sensor/early-warning-system" element={<EwsSensorPage />} />
              <Route path="sensor/real-time-monitoring-system-rtms" element={<RtmsSensorPage />} />
              <Route path="sensor/sensor-gempa" element={<ToyoSensorPage />} />
              <Route path="sensor/sparepart-lift-terlengkap" element={<SparepartLiftPage />} />
              <Route path="layanan" element={<Home />} />
            </Route>

            {/* Admin Login Route */}
            <Route path="/admin-login" element={<AdminLogin />} />

            {/* Admin Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                
                {/* Page Builder & Global SEO */}
                <Route path="builder" element={<AdminPageBuilder />} />

                {/* Posts CMS */}
                <Route path="posts" element={<AdminPosts />} />
                <Route path="posts/new" element={<AdminPostForm />} />
                <Route path="posts/:id/edit" element={<AdminPostForm />} />

                {/* Media Management */}
                <Route path="media" element={<AdminMedia />} />

                {/* Pages CMS */}
                <Route path="pages" element={<AdminPages />} />
                <Route path="pages/new" element={<AdminPageEdit />} />
                <Route path="pages/:id/edit" element={<AdminPageEdit />} />

                {/* Products Management */}
                <Route path="products" element={<AdminProducts />} />
                <Route path="products/new" element={<AdminProductForm />} />
                <Route path="products/:id/edit" element={<AdminProductForm />} />

                <Route path="orders" element={<AdminOrders />} />
                <Route path="scripts" element={<AdminScripts />} />
                
                {/* Settings */}
                <Route path="settings/*" element={<AdminSettings />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </HelmetProvider>
  );
}
