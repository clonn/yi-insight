import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function History() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/');
  }

  return (
    <div className="flex flex-col h-screen max-w-[390px] mx-auto bg-[#f8f7ff]">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 pt-12">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <Link href="/dashboard/profile" className="mr-4 text-white">
              <i className="fas fa-arrow-left"></i>
            </Link>
           <h1 className="text-xl font-bold">歷史記錄</h1>
          </div>
          {/* <button className="text-white">
            <i className="fas fa-search"></i>
          </button> */}
        </div>
      </header>

      {/* 標籤切換 */}
      <div className="bg-white px-6 py-3 flex justify-around border-b border-gray-200">
        <button className="text-indigo-600 font-medium py-2 px-4 border-b-2 border-indigo-600">全部</button>
        <button className="text-gray-500 font-medium py-2 px-4">本月</button>
        <button className="text-gray-500 font-medium py-2 px-4">上月</button>
        <button className="text-gray-500 font-medium py-2 px-4">更早</button>
      </div>

      {/* 主要內容區 */}
      <main className="flex-grow p-6 overflow-y-auto">
        {/* 今天 */}
        <div className="mb-6">
          <div className="text-sm text-gray-500 mb-3">今天</div>
          <div className="bg-white rounded-2xl shadow-md p-4 mb-4 flex items-center">
            <div className="w-10 h-10 mr-4 bg-gray-100 rounded-lg flex items-center justify-center">
              <i className="fas fa-yin-yang text-gray-600"></i>
            </div>
            <div className="flex-grow">
              <h3 className="font-medium">澤火革卦 - 今日運勢</h3>
              <p className="text-sm text-gray-500">{new Date().toLocaleDateString()}</p>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full mb-1">事業 92%</div>
              <button className="text-indigo-600 text-sm">查看</button>
            </div>
          </div>
        </div>

        {/* 昨天 */}
        <div className="mb-6">
          <div className="text-sm text-gray-500 mb-3">昨天</div>
          <div className="bg-white rounded-2xl shadow-md p-4 mb-4 flex items-center">
            <div className="w-10 h-10 mr-4 bg-gray-100 rounded-lg flex items-center justify-center">
              <i className="fas fa-yin-yang text-gray-600"></i>
            </div>
            <div className="flex-grow">
              <h3 className="font-medium">水山蹇卦 - 今日運勢</h3>
              <p className="text-sm text-gray-500">{new Date(Date.now() - 86400000).toLocaleDateString()}</p>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full mb-1">財運 75%</div>
              <button className="text-indigo-600 text-sm">查看</button>
            </div>
          </div>
        </div>

        {/* 加載更多 */}
        <button className="w-full py-3 text-center text-indigo-600 font-medium">
          加載更多記錄
        </button>
      </main>

      {/* 底部導航 */}
      <footer className="bg-white border-t border-gray-200 py-3 px-6">
        <div className="flex justify-between">
          <Link href="/dashboard" className="flex flex-col items-center text-gray-500">
            <i className="text-xl mb-1 fas fa-home"></i>
            <span className="text-xs">首頁</span>
          </Link>
          <Link href="/dashboard/discover" className="flex flex-col items-center text-gray-500">
            <i className="text-xl mb-1 fas fa-compass"></i>
            <span className="text-xs">發現</span>
          </Link>
          <Link href="/dashboard/history" className="flex flex-col items-center text-indigo-600">
            <i className="text-xl mb-1 fas fa-history"></i>
            <span className="text-xs">歷史</span>
          </Link>
          <Link href="/dashboard/profile" className="flex flex-col items-center text-gray-500">
            <i className="text-xl mb-1 fas fa-user"></i>
            <span className="text-xs">我的</span>
          </Link>
        </div>
      </footer>
    </div>
  );
} 