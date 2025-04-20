'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface EditProfileFormProps {
  email: string;
  initialData: {
    name: string;
    birthDate: string;
    birthTime: string;
    zodiac: string;
  };
}

export default function EditProfileForm({ email, initialData }: EditProfileFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClientComponentClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: 將數據保存到 Supabase
      // const { error } = await supabase
      //   .from('profiles')
      //   .upsert({
      //     user_id: session.user.id,
      //     ...formData,
      //     updated_at: new Date().toISOString(),
      //   });

      // if (error) throw error;

      router.push('/dashboard/profile');
      router.refresh();
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('更新資料時發生錯誤，請稍後再試。');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 生成時辰選項
  const timeOptions = [
    { value: '吉時', label: '吉時 (不確定出生時辰)' },
    { value: '子時 (23:00-01:00)', label: '子時 (23:00-01:00)' },
    { value: '丑時 (01:00-03:00)', label: '丑時 (01:00-03:00)' },
    { value: '寅時 (03:00-05:00)', label: '寅時 (03:00-05:00)' },
    { value: '卯時 (05:00-07:00)', label: '卯時 (05:00-07:00)' },
    { value: '辰時 (07:00-09:00)', label: '辰時 (07:00-09:00)' },
    { value: '巳時 (09:00-11:00)', label: '巳時 (09:00-11:00)' },
    { value: '午時 (11:00-13:00)', label: '午時 (11:00-13:00)' },
    { value: '未時 (13:00-15:00)', label: '未時 (13:00-15:00)' },
    { value: '申時 (15:00-17:00)', label: '申時 (15:00-17:00)' },
    { value: '酉時 (17:00-19:00)', label: '酉時 (17:00-19:00)' },
    { value: '戌時 (19:00-21:00)', label: '戌時 (19:00-21:00)' },
    { value: '亥時 (21:00-23:00)', label: '亥時 (21:00-23:00)' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email (唯讀) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          電子郵件
        </label>
        <input
          type="email"
          value={email}
          disabled
          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
        />
      </div>

      {/* 姓名 */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          姓名
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* 出生日期 */}
      <div>
        <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-2">
          出生日期
        </label>
        <input
          type="date"
          id="birthDate"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* 出生時辰 */}
      <div>
        <label htmlFor="birthTime" className="block text-sm font-medium text-gray-700 mb-2">
          出生時辰
        </label>
        <select
          id="birthTime"
          name="birthTime"
          value={formData.birthTime}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {timeOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <p className="mt-1 text-sm text-gray-500">如果不確定出生時辰，請選擇"吉時"</p>
      </div>

      {/* 星座 */}
      <div>
        <label htmlFor="zodiac" className="block text-sm font-medium text-gray-700 mb-2">
          星座
        </label>
        <select
          id="zodiac"
          name="zodiac"
          value={formData.zodiac}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="白羊座">白羊座 (3/21-4/19)</option>
          <option value="金牛座">金牛座 (4/20-5/20)</option>
          <option value="雙子座">雙子座 (5/21-6/21)</option>
          <option value="巨蟹座">巨蟹座 (6/22-7/22)</option>
          <option value="獅子座">獅子座 (7/23-8/22)</option>
          <option value="處女座">處女座 (8/23-9/22)</option>
          <option value="天秤座">天秤座 (9/23-10/23)</option>
          <option value="天蠍座">天蠍座 (10/24-11/22)</option>
          <option value="射手座">射手座 (11/23-12/21)</option>
          <option value="摩羯座">摩羯座 (12/22-1/19)</option>
          <option value="水瓶座">水瓶座 (1/20-2/18)</option>
          <option value="雙魚座">雙魚座 (2/19-3/20)</option>
        </select>
      </div>

      {/* 提交按鈕 */}
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
        >
          取消
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
        >
          {isLoading ? '保存中...' : '保存'}
        </button>
      </div>
    </form>
  );
} 