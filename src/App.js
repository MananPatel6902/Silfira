import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Properties from './pages/Properties';
import About from './pages/About';
import Agents from './pages/Agents';
import Contact from './pages/Contact';
import Valuation from './pages/Valuation';
import PropertyDetail from './pages/PropertyDetail';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import { Toaster } from './components/ui/toaster';
import SmoothScroll from './components/SmoothScroll';
import Preloader from './components/Preloader';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { SiteDataProvider } from './context/SiteDataContext';

function App() {
  return (
    <div className="App">
      <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <AuthProvider>
          <SiteDataProvider>
            <SmoothScroll />
            <Routes>
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
              <Route path="*" element={<PublicRoutes />} />
            </Routes>
          </SiteDataProvider>
        </AuthProvider>
        <Toaster />
      </BrowserRouter>
      </MotionConfig>
    </div>
  );
}

function PublicRoutes() {
  return <><Preloader /><div className="grain" aria-hidden="true" style={{ backgroundImage: "url(/images/v2/ui/grain.webp)" }} /><Header /><Routes>
    <Route path="/" element={<Home />} />
    <Route path="/properties" element={<Properties />} />
    <Route path="/properties/:id" element={<PropertyDetail />} />
    <Route path="/about" element={<About />} />
    <Route path="/agents" element={<Agents />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/valuation" element={<Valuation />} />
  </Routes><Footer /></>;
}

export default App;
