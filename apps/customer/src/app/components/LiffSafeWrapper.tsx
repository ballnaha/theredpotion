'use client';

import { useState, useEffect, ReactNode } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { isInLiffEnvironment, waitForLiffReady } from '../utils/liff';

interface LiffSafeWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export default function LiffSafeWrapper({ children, fallback }: LiffSafeWrapperProps) {
  const [isLiffReady, setIsLiffReady] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Check if we're in client-side
    setIsClient(true);

    const initLiff = async () => {
      if (isInLiffEnvironment()) {
        console.log('LIFF environment detected, waiting for LIFF ready...');
        // LIFF environment - wait for LIFF to be ready with shorter timeout
        const isReady = await waitForLiffReady(2000); // 2 second timeout
        console.log('LIFF ready status:', isReady);
        setIsLiffReady(true); // Always set to true regardless of LIFF status
      } else {
        // Normal browser - ready immediately after client mount
        setIsLiffReady(true);
      }
    };

    // Add a fallback timer to ensure we never get stuck
    const fallbackTimer = setTimeout(() => {
      console.log('Fallback timer triggered, proceeding anyway');
      setIsClient(true);
      setIsLiffReady(true);
    }, 3000); // 3 second absolute maximum

    initLiff().finally(() => {
      clearTimeout(fallbackTimer);
    });

    return () => {
      clearTimeout(fallbackTimer);
    };
  }, []);

  // Show loading while waiting for client-side hydration or LIFF ready
  if (!isClient || !isLiffReady) {
    return (
      fallback || (
        <Box sx={{ 
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `
            linear-gradient(135deg, 
              rgba(16, 185, 129, 0.08) 0%, 
              rgba(5, 150, 105, 0.05) 25%,
              rgba(52, 211, 153, 0.03) 50%,
              rgba(255, 255, 255, 0.95) 75%,
              rgba(248, 250, 252, 1) 100%
            )
          `
        }}>
          <CircularProgress size={60} sx={{ color: '#10b981' }} />
        </Box>
      )
    );
  }

  return <>{children}</>;
}

 