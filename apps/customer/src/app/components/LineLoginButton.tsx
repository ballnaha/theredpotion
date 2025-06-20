'use client';

import React from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import { useTenant } from '@/app/contexts/TenantContext';

interface LineLoginButtonProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';
  showIcon?: boolean;
}

const LineLoginButton: React.FC<LineLoginButtonProps> = ({
  className = '',
  size = 'md',
  variant = 'primary',
  showIcon = true,
}) => {
  const { login, isLoading } = useAuth();
  const { tenant } = useTenant();

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variantClasses = {
    primary: 'bg-[#00B900] hover:bg-[#009900] text-white',
    secondary: 'bg-white hover:bg-gray-50 text-[#00B900] border border-[#00B900]',
  };

  const handleLogin = async () => {
    try {
      await login();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <button
      onClick={handleLogin}
      disabled={isLoading}
      className={`
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        inline-flex items-center justify-center
        font-medium rounded-lg
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        hover:shadow-lg
        ${className}
      `}
    >
      {showIcon && (
        <svg
          className="w-5 h-5 mr-2"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .346-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.628-.629.628M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
        </svg>
      )}
      
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          กำลังเข้าสู่ระบบ...
        </>
      ) : (
        <>
          เข้าสู่ระบบด้วย LINE
          {tenant && (
            <span className="ml-1 text-xs opacity-75">
              ({tenant.name})
            </span>
          )}
        </>
      )}
    </button>
  );
};

export default LineLoginButton; 