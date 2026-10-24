import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { session, authorized, loading } = useAuth();
  const location = useLocation();
  if (loading) return <div className="flex min-h-screen items-center justify-center bg-[#2a020b] text-sm uppercase tracking-[.2em] text-white/70">Loading admin…</div>;
  if (!session) return <Navigate to="/admin/login" replace state={{ from: location }} />;
  if (!authorized) return <Navigate to="/admin/login?error=unauthorized" replace />;
  return children;
}

