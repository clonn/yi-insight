import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function Profile() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/');
  }

  // Get user email and name
  const email = session.user.email;
  const name = email?.split('@')[0] || '用戶';

  // 這裡之後可以從數據庫獲取用戶的生辰八字信息
  const birthInfo = {
    birthDate: '1985年5月12日',
    birthTime: '子時 (23:00-01:00)',
    zodiac: '金牛座'
  };

  return (
    <div className="flex flex-col h-screen max-w-[390px] mx-auto bg-[#f8f7ff]">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 pt-12">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <Link href="/dashboard" className="mr-4 text-white">
              <i className="fas fa-arrow-left"></i>
            </Link>
            <h1 className="text-xl font-bold">個人資料</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-6 overflow-y-auto">
        {/* Profile Info */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">基本信息</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="text-gray-600">郵箱</div>
              <div className="font-medium">{email}</div>
            </div>
            <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
              <div className="text-gray-600">姓名</div>
              <div className="font-medium">{name}</div>
            </div>
            <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
              <div className="text-gray-600">出生日期</div>
              <div className="font-medium">{birthInfo.birthDate}</div>
            </div>
            <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
              <div className="text-gray-600">出生時辰</div>
              <div className="font-medium">{birthInfo.birthTime}</div>
            </div>
            <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
              <div className="text-gray-600">星座</div>
              <div className="font-medium">{birthInfo.zodiac}</div>
            </div>
          </div>
          <Link href="/dashboard/profile/edit" className="block w-full">
            <button className="w-full mt-6 border border-indigo-600 text-indigo-600 py-3 rounded-lg font-medium">
              編輯資料
            </button>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold">歷史資料</h3>
            <Link href="/dashboard/history" className="block w-full">
              <button className="w-full mt-6 border border-indigo-600 text-indigo-600 py-3 rounded-lg font-medium">
                查看歷史資料
              </button>
            </Link>
        </div>

        {/* Account Security */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">帳號安全</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <i className="fas fa-envelope text-gray-400 mr-3"></i>
                <div>
                  <div className="font-medium">郵箱</div>
                  <div className="text-sm text-gray-500">{email}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <form action="/auth/signout" method="post">
          <button type="submit" className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-medium mb-6">
            退出登入
          </button>
        </form>
      </main>
    </div>
  );
} 