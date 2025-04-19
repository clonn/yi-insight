'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
}

export default function LoginModal({ isOpen, onClose, message = '請登入後查看完整內容' }: LoginModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const supabase = createClientComponentClient();

  if (!isOpen) return null;

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      // 登入成功後關閉彈窗，頁面會自動重新導向
      onClose();
    } catch (error) {
      console.error('Error logging in:', error);
      alert('登入失敗，請檢查您的帳號密碼');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-6 mx-6 relative max-w-sm w-full">
        <button 
          className="absolute top-4 right-4 text-gray-500"
          onClick={onClose}
        >
          <i className="fas fa-times"></i>
        </button>
        
        <div className="text-center mb-4">
          <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-user-lock text-indigo-600 text-2xl"></i>
          </div>
          <h3 className="text-xl font-bold mb-2">需要登入</h3>
          <p className="text-gray-600">{message}</p>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <input
              type="email"
              placeholder="電子郵件"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="密碼"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="flex space-x-4">
          <button 
            className="bg-indigo-600 text-white py-3 rounded-lg font-medium w-1/2 disabled:opacity-50"
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? '登入中...' : '登入'}
          </button>
          <button 
            className="border border-indigo-600 text-indigo-600 py-3 rounded-lg font-medium w-1/2"
            onClick={onClose}
          >
            取消
          </button>
        </div>

        <button 
          className="w-full text-gray-500 mt-4 text-sm"
          onClick={onClose}
        >
          稍後再說
        </button>
      </div>
    </div>
  );
} 