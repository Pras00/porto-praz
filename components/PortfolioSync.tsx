'use client';

import { useEffect } from 'react';
import { usePortfolioStore } from '@/store/usePortfolioStore';

export default function PortfolioSync() {
  const fetchData = usePortfolioStore((state) => state.fetchData);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return null;
}
