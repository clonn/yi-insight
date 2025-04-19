'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import LoginModal from './components/LoginModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('請登入後查看完整內容');
  const supabase = createClientComponentClient();
  const router = useRouter();

  // Check session on client side
  const checkSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      router.push('/dashboard');
    }
  };

  // Call checkSession when component mounts
  useEffect(() => {
    checkSession();
  }, []);

  const handleOpenModal = (type: string) => {
    let message = '請登入後查看完整內容';
    switch(type) {
      case 'fortune':
        message = '登入後查看您的專屬今日運勢分析';
        break;
      case 'daily':
        message = '登入後獲取每日運勢詳細解讀';
        break;
      case 'love':
        message = '登入後查看您的姻緣分析和桃花運';
        break;
      case 'career':
        message = '登入後獲取事業財運詳細指導';
        break;
      case 'premium':
        message = '登入後解鎖專業命理解讀服務';
        break;
      case 'history':
        message = '登入後查看您的歷史解讀記錄';
        break;
      case 'profile':
        message = '登入後管理您的個人資料和設置';
        break;
    }
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col h-screen max-w-[390px] mx-auto bg-[#f8f7ff]">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-b-[25px] p-6 pt-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">梅花易數</h1>
          <div className="flex space-x-4">
            <button className="text-white" onClick={() => handleOpenModal('notification')}>
              <i className="fas fa-bell"></i>
            </button>
          </div>
        </div>
        <div className="text-sm opacity-90 mb-2">探索古老智慧 · 預見未來</div>
        <h2 className="text-xl font-semibold">歡迎使用梅花易數</h2>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-6 -mt-6 overflow-y-auto">
        {/* Preview Card */}
        <div className="bg-white rounded-2xl shadow-md p-5 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">今日命理預覽</h3>
            <span className="w-[60px] h-[60px] bg-contain bg-center bg-no-repeat"
                  style={{backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect x="10" y="20" width="80" height="10" fill="%23333"/><rect x="10" y="40" width="80" height="10" fill="%23333"/><rect x="10" y="60" width="35" height="10" fill="%23333"/><rect x="55" y="60" width="35" height="10" fill="%23333"/><rect x="10" y="80" width="80" height="10" fill="%23333"/></svg>')`}}>
            </span>
          </div>
          <p className="text-gray-600 mb-4">梅花易數源於中國古代，是一種獨特的預測方法。每日運勢分析可助您把握機遇，趨吉避凶。</p>
          <div className="grid grid-cols-4 gap-2 mb-4">
            <div className="text-center">
              <div className="text-yellow-500 font-bold">財運</div>
              <div className="text-xs text-gray-500">每日分析</div>
            </div>
            <div className="text-center">
              <div className="text-green-500 font-bold">事業</div>
              <div className="text-xs text-gray-500">發展指引</div>
            </div>
            <div className="text-center">
              <div className="text-red-500 font-bold">感情</div>
              <div className="text-xs text-gray-500">關係解讀</div>
            </div>
            <div className="text-center">
              <div className="text-blue-500 font-bold">健康</div>
              <div className="text-xs text-gray-500">養生建議</div>
            </div>
          </div>
          <button 
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium"
            onClick={() => handleOpenModal('fortune')}
          >
            查看今日運勢
          </button>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="text-center cursor-pointer" onClick={() => handleOpenModal('daily')}>
            <div className="bg-purple-100 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-2">
              <i className="fas fa-calendar-alt text-purple-600 text-xl"></i>
            </div>
            <span className="text-xs">每日運勢</span>
          </div>
          <div className="text-center cursor-pointer" onClick={() => handleOpenModal('love')}>
            <div className="bg-blue-100 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-2">
              <i className="fas fa-heart text-blue-600 text-xl"></i>
            </div>
            <span className="text-xs">姻緣分析</span>
          </div>
          <div className="text-center cursor-pointer" onClick={() => handleOpenModal('career')}>
            <div className="bg-green-100 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-2">
              <i className="fas fa-briefcase text-green-600 text-xl"></i>
            </div>
            <span className="text-xs">事業財運</span>
          </div>
          <div className="text-center cursor-pointer" onClick={() => handleOpenModal('personality')}>
            <div className="bg-yellow-100 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-2">
              <i className="fas fa-user-alt text-yellow-600 text-xl"></i>
            </div>
            <span className="text-xs">個性解析</span>
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-2xl shadow-md p-5 mb-6">
          <h3 className="text-lg font-semibold mb-3">梅花易數簡介</h3>
          <p className="text-gray-600 mb-4">梅花易數是中國古代重要的預測學，源於《易經》，由宋代邵雍創立。它通過時間、數字與卦象的關係，預測事物發展規律。</p>
          <p className="text-gray-600 mb-4">現代梅花易數結合心理學與統計學，為您提供更科學、準確的生活指引。</p>
          <button 
            className="w-full border border-indigo-600 text-indigo-600 py-3 rounded-lg font-medium"
            onClick={() => handleOpenModal('intro')}
          >
            了解更多
          </button>
        </div>

        {/* Popular Readings */}
        <h3 className="text-lg font-semibold mb-4">熱門解讀</h3>
        <div className="space-y-4">
          <div 
            className="bg-white rounded-2xl shadow-md p-4 flex items-center cursor-pointer"
            onClick={() => handleOpenModal('yearly')}
          >
            <div className="bg-indigo-100 rounded-lg w-12 h-12 flex items-center justify-center mr-4">
              <i className="fas fa-star text-indigo-600"></i>
            </div>
            <div className="flex-grow">
              <h4 className="font-medium">2024年運勢大解析</h4>
              <p className="text-sm text-gray-500">全年運勢及關鍵日期提示</p>
            </div>
            <i className="fas fa-chevron-right text-gray-400"></i>
          </div>
          <div 
            className="bg-white rounded-2xl shadow-md p-4 flex items-center cursor-pointer"
            onClick={() => handleOpenModal('love-special')}
          >
            <div className="bg-pink-100 rounded-lg w-12 h-12 flex items-center justify-center mr-4">
              <i className="fas fa-heart text-pink-600"></i>
            </div>
            <div className="flex-grow">
              <h4 className="font-medium">愛情運勢專題解讀</h4>
              <p className="text-sm text-gray-500">深入分析您的感情狀況和發展</p>
            </div>
            <i className="fas fa-chevron-right text-gray-400"></i>
          </div>
        </div>

        {/* Login/Register CTA */}
        <div className="mt-8 mb-4 text-center">
          <p className="text-gray-600 mb-4">登入後獲取完整命理分析和個性化服務</p>
          <div className="flex space-x-4 justify-center">
            <button 
              className="bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium w-1/2"
              onClick={() => handleOpenModal('login')}
            >
              登入
            </button>
            <button 
              className="border border-indigo-600 text-indigo-600 py-3 px-6 rounded-lg font-medium w-1/2"
              onClick={() => handleOpenModal('register')}
            >
              註冊
            </button>
          </div>
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="bg-white border-t border-gray-200 py-3 px-6">
        <div className="flex justify-between">
          <div className="flex flex-col items-center text-indigo-600">
            <i className="fas fa-home text-xl mb-1"></i>
            <span className="text-xs">首頁</span>
          </div>
          <div className="flex flex-col items-center text-gray-500 cursor-pointer" onClick={() => handleOpenModal('discover')}>
            <i className="fas fa-compass text-xl mb-1"></i>
            <span className="text-xs">發現</span>
          </div>
          <div className="flex flex-col items-center text-gray-500 cursor-pointer" onClick={() => handleOpenModal('history')}>
            <i className="fas fa-history text-xl mb-1"></i>
            <span className="text-xs">歷史</span>
          </div>
          <div className="flex flex-col items-center text-gray-500 cursor-pointer" onClick={() => handleOpenModal('profile')}>
            <i className="fas fa-user text-xl mb-1"></i>
            <span className="text-xs">我的</span>
          </div>
        </div>
      </footer>

      <LoginModal isOpen={isModalOpen} onClose={handleCloseModal} message={modalMessage} />
    </div>
  );
} 