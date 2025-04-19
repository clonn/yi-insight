import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';

export default async function Dashboard() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  // 獲取用戶名稱
  const username = session?.user?.email?.split('@')[0] || '用戶';

  return (
    <div className="flex flex-col h-screen max-w-[390px] mx-auto bg-[#f8f7ff]">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-b-[25px] p-6 pt-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">梅花易數</h1>
          <div className="flex space-x-4">
            <button className="text-white">
              <i className="fas fa-bell"></i>
            </button>
            <button className="text-white">
              <i className="fas fa-cog"></i>
            </button>
          </div>
        </div>
        <div className="text-sm opacity-90 mb-2">今日運勢 · {new Date().toLocaleDateString('zh-TW')}</div>
        <h2 className="text-xl font-semibold">{username}，您好！</h2>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-6 -mt-6 overflow-y-auto">
        {/* Today's Fortune Card */}
        <div className="bg-white rounded-2xl shadow-md p-5 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">今日命理分析</h3>
            <span className="w-[60px] h-[60px] bg-contain bg-center bg-no-repeat"
                  style={{backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect x="10" y="20" width="80" height="10" fill="%23333"/><rect x="10" y="40" width="80" height="10" fill="%23333"/><rect x="10" y="60" width="35" height="10" fill="%23333"/><rect x="55" y="60" width="35" height="10" fill="%23333"/><rect x="10" y="80" width="80" height="10" fill="%23333"/></svg>')`}}>
            </span>
          </div>
          <p className="text-gray-600 mb-4">根據梅花易數分析，今日您的事業運勢較好，適合開展新項目或與人合作。感情方面需要多加溝通，避免誤會。</p>
          <div className="grid grid-cols-4 gap-2 mb-4">
            <div className="text-center">
              <div className="text-yellow-500 font-bold">85%</div>
              <div className="text-xs text-gray-500">財運</div>
            </div>
            <div className="text-center">
              <div className="text-green-500 font-bold">92%</div>
              <div className="text-xs text-gray-500">事業</div>
            </div>
            <div className="text-center">
              <div className="text-red-500 font-bold">78%</div>
              <div className="text-xs text-gray-500">感情</div>
            </div>
            <div className="text-center">
              <div className="text-blue-500 font-bold">88%</div>
              <div className="text-xs text-gray-500">健康</div>
            </div>
          </div>
          <Link href="/fortune" className="block w-full">
            <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium">
              查看詳細分析
            </button>
          </Link>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="bg-purple-100 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-2">
              <i className="fas fa-calendar-alt text-purple-600 text-xl"></i>
            </div>
            <span className="text-xs">每日運勢</span>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-2">
              <i className="fas fa-heart text-blue-600 text-xl"></i>
            </div>
            <span className="text-xs">姻緣分析</span>
          </div>
          <div className="text-center">
            <div className="bg-green-100 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-2">
              <i className="fas fa-briefcase text-green-600 text-xl"></i>
            </div>
            <span className="text-xs">事業財運</span>
          </div>
          <div className="text-center">
            <div className="bg-yellow-100 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-2">
              <i className="fas fa-user-alt text-yellow-600 text-xl"></i>
            </div>
            <span className="text-xs">個性解析</span>
          </div>
        </div>

        {/* Recent Readings */}
        <h3 className="text-lg font-semibold mb-4">最近解讀</h3>
        <div className="space-y-4">
          <div className="bg-white rounded-2xl shadow-md p-4 flex items-center">
            <div className="bg-indigo-100 rounded-lg w-12 h-12 flex items-center justify-center mr-4">
              <i className="fas fa-star text-indigo-600"></i>
            </div>
            <div className="flex-grow">
              <h4 className="font-medium">事業發展分析</h4>
              <p className="text-sm text-gray-500">2024年3月15日</p>
            </div>
            <i className="fas fa-chevron-right text-gray-400"></i>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-4 flex items-center">
            <div className="bg-pink-100 rounded-lg w-12 h-12 flex items-center justify-center mr-4">
              <i className="fas fa-heart text-pink-600"></i>
            </div>
            <div className="flex-grow">
              <h4 className="font-medium">感情運勢解讀</h4>
              <p className="text-sm text-gray-500">2024年3月14日</p>
            </div>
            <i className="fas fa-chevron-right text-gray-400"></i>
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
          <div className="flex flex-col items-center text-gray-500">
            <i className="fas fa-compass text-xl mb-1"></i>
            <span className="text-xs">發現</span>
          </div>
          <div className="flex flex-col items-center text-gray-500">
            <i className="fas fa-history text-xl mb-1"></i>
            <span className="text-xs">歷史</span>
          </div>
          <div className="flex flex-col items-center text-gray-500">
            <i className="fas fa-user text-xl mb-1"></i>
            <span className="text-xs">我的</span>
          </div>
        </div>
      </footer>
    </div>
  );
} 