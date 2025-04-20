import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import EditProfileForm from './EditProfileForm';

export default async function EditProfile() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/');
  }

  // Get user email and name
  const email = session.user.email;
  const name = email?.split('@')[0] || '用戶';

  // 這裡之後會從數據庫獲取用戶的生辰八字信息
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
            <Link href="/dashboard/profile" className="mr-4 text-white">
              <i className="fas fa-arrow-left"></i>
            </Link>
            <h1 className="text-xl font-bold">編輯個人資料</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-6 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <EditProfileForm 
            email={email}
            initialData={{
              name,
              ...birthInfo
            }}
          />
        </div>
      </main>
    </div>
  );
} 