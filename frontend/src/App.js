import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import { getAdminSession, signOutAdmin } from './lib/adminAuth';
import { Toaster } from './components/ui/sonner';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<AdminPortal />} />
          <Route path="/admin/login" element={<AdminPortal />} />
          <Route path="*" element={<PublicRoutes />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

function AdminPortal() {
  const [session, setSession] = useState(() => getAdminSession());
  if (!session) return <AdminLogin onAuthenticated={setSession} />;
  return <AdminDashboard onLogout={() => { signOutAdmin(); setSession(null); }} />;
}

function PublicRoutes() {
  return <><Header /><Routes>
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
