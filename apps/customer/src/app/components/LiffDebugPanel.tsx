'use client';

import React, { useState, useEffect } from 'react';
import { useTenant } from '@/app/contexts/TenantContext';
import { useAuth } from '@/app/contexts/AuthContext';

interface LiffDebugPanelProps {
  className?: string;
}

const LiffDebugPanel: React.FC<LiffDebugPanelProps> = ({ className = '' }) => {
  const { tenant, tenantId } = useTenant();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [liffStatus, setLiffStatus] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkLiffStatus = () => {
      if (typeof window !== 'undefined' && window.liff) {
        setLiffStatus({
          isReady: window.liff.isReady ? window.liff.isReady() : false,
          isLoggedIn: window.liff.isLoggedIn ? window.liff.isLoggedIn() : false,
          isInClient: window.liff.isInClient ? window.liff.isInClient() : false,
        });
      } else {
        setLiffStatus({
          isReady: false,
          isLoggedIn: false,
          isInClient: false,
          error: 'LIFF SDK not loaded'
        });
      }
    };

    checkLiffStatus();
    const interval = setInterval(checkLiffStatus, 2000);

    return () => clearInterval(interval);
  }, []);

  const debugData = {
    tenant: {
      id: tenantId,
      name: tenant?.name,
      liffId: tenant?.liffId,
      domain: tenant?.domain,
    },
    auth: {
      isAuthenticated,
      isLoading,
      userId: user?.id,
      displayName: user?.displayName,
      lineId: user?.lineId,
    },
    liff: liffStatus,
    environment: {
      hostname: typeof window !== 'undefined' ? window.location.hostname : 'N/A',
      pathname: typeof window !== 'undefined' ? window.location.pathname : 'N/A',
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : 'N/A',
    }
  };

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className={`
          fixed bottom-4 right-4 z-50
          bg-gray-800 text-white px-3 py-2 rounded-lg
          text-xs font-mono
          hover:bg-gray-700 transition-colors
          ${className}
        `}
      >
        🔍 Debug
      </button>
    );
  }

  return (
    <div className={`
      fixed bottom-4 right-4 z-50
      bg-gray-900 text-green-400 p-4 rounded-lg
      max-w-sm w-full max-h-96 overflow-auto
      font-mono text-xs
      border border-gray-700
      shadow-2xl
      ${className}
    `}>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-white font-bold">🔍 LIFF Debug Panel</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>

      <div className="space-y-3">
        {/* Tenant Info */}
        <div>
          <h4 className="text-yellow-400 font-semibold mb-1">🏪 Tenant</h4>
          <div className="pl-2 space-y-1">
            <div>ID: <span className="text-white">{debugData.tenant.id || 'N/A'}</span></div>
            <div>Name: <span className="text-white">{debugData.tenant.name || 'N/A'}</span></div>
            <div>LIFF ID: <span className="text-white">{debugData.tenant.liffId || 'N/A'}</span></div>
            <div>Domain: <span className="text-white">{debugData.tenant.domain || 'N/A'}</span></div>
          </div>
        </div>

        {/* Auth Info */}
        <div>
          <h4 className="text-blue-400 font-semibold mb-1">🔐 Authentication</h4>
          <div className="pl-2 space-y-1">
            <div>Status: 
              <span className={`ml-1 ${debugData.auth.isAuthenticated ? 'text-green-400' : 'text-red-400'}`}>
                {debugData.auth.isAuthenticated ? '✅ Logged In' : '❌ Not Logged In'}
              </span>
            </div>
            <div>Loading: 
              <span className={`ml-1 ${debugData.auth.isLoading ? 'text-yellow-400' : 'text-gray-400'}`}>
                {debugData.auth.isLoading ? '⏳ Loading...' : '✅ Ready'}
              </span>
            </div>
            {debugData.auth.isAuthenticated && (
              <>
                <div>User ID: <span className="text-white">{debugData.auth.userId || 'N/A'}</span></div>
                <div>Name: <span className="text-white">{debugData.auth.displayName || 'N/A'}</span></div>
                <div>LINE ID: <span className="text-white">{debugData.auth.lineId || 'N/A'}</span></div>
              </>
            )}
          </div>
        </div>

        {/* LIFF Status */}
        <div>
          <h4 className="text-purple-400 font-semibold mb-1">📱 LIFF Status</h4>
          <div className="pl-2 space-y-1">
            {debugData.liff?.error ? (
              <div className="text-red-400">❌ {debugData.liff.error}</div>
            ) : (
              <>
                <div>Ready: 
                  <span className={`ml-1 ${debugData.liff?.isReady ? 'text-green-400' : 'text-red-400'}`}>
                    {debugData.liff?.isReady ? '✅ Yes' : '❌ No'}
                  </span>
                </div>
                <div>Logged In: 
                  <span className={`ml-1 ${debugData.liff?.isLoggedIn ? 'text-green-400' : 'text-red-400'}`}>
                    {debugData.liff?.isLoggedIn ? '✅ Yes' : '❌ No'}
                  </span>
                </div>
                <div>In Client: 
                  <span className={`ml-1 ${debugData.liff?.isInClient ? 'text-green-400' : 'text-orange-400'}`}>
                    {debugData.liff?.isInClient ? '✅ Yes' : '⚠️ No (Browser)'}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Environment */}
        <div>
          <h4 className="text-gray-400 font-semibold mb-1">🌍 Environment</h4>
          <div className="pl-2 space-y-1">
            <div>Host: <span className="text-white">{debugData.environment.hostname}</span></div>
            <div>Path: <span className="text-white">{debugData.environment.pathname}</span></div>
            <div>Platform: 
              <span className="text-white ml-1">
                {debugData.environment.userAgent.includes('Line') ? '📱 LINE App' : '🌐 Browser'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-700">
        <button
          onClick={() => {
            console.log('🔍 LIFF Debug Data:', debugData);
            alert('Debug data logged to console');
          }}
          className="w-full bg-gray-700 hover:bg-gray-600 text-white py-1 px-2 rounded text-xs"
        >
          📋 Log to Console
        </button>
      </div>
    </div>
  );
};

export default LiffDebugPanel; 