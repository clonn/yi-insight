'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useToast } from "@/hooks/use-toast"

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const supabase = createClientComponentClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "登入失敗",
          description: "發送登入連結時發生錯誤，請確認您的電子郵件地址是否正確，然後再試一次。",
        });
      } else {
        toast({
          title: "登入連結已發送 ✨",
          description: "我們已將登入連結發送到您的電子郵件信箱。請檢查您的收件匣（或垃圾郵件匣）並點擊連結完成登入。連結將在 24 小時後失效。",
        });
        onClose();
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "系統錯誤",
        description: "抱歉，系統發生意外錯誤。請稍後再試，或聯繫客服尋求協助。",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setEmail('');
  };

  return (
    <div 
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={handleClose}
    >
      <div 
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md"
        onClick={e => e.stopPropagation()}
      >
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="text-center mb-6">
            <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-envelope text-indigo-600 text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold mb-2">
              使用魔法連結登入
            </h3>
            <p className="text-gray-600">
              輸入您的電子郵件，我們會發送一個登入連結給您
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                電子郵件
              </label>
              <input
                type="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="請輸入您的電子郵件"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              {loading ? '發送中...' : '發送登入連結'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              我們會發送一個安全的登入連結到您的郵箱，
              <br />
              點擊連結即可完成登入，無需記住密碼。
            </p>
          </div>

          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>
    </div>
  );
} 