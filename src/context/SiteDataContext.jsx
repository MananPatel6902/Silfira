import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { fallbackSiteData, fetchPublicSiteData } from '../lib/siteData';

const SiteDataContext = createContext(null);

export function SiteDataProvider({ children }) {
  const [data, setData] = useState(fallbackSiteData);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  const refresh = async () => {
    setLoading(true);
    try {
      const remote = await fetchPublicSiteData();
      setData(remote);
      setUsingFallback(false);
    } catch (error) {
      console.warn('Supabase content is not ready; using bundled seed content.', error.message);
      setData(fallbackSiteData);
      setUsingFallback(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { refresh(); }, []);

  const value = useMemo(() => ({ ...data, loading, usingFallback, refresh }), [data, loading, usingFallback]);
  return <SiteDataContext.Provider value={value}>{children}</SiteDataContext.Provider>;
}

export function useSiteData() {
  const value = useContext(SiteDataContext);
  if (!value) throw new Error('useSiteData must be used inside SiteDataProvider');
  return value;
}

