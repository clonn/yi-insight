'use client';

import { motion } from 'framer-motion';
import { CrystalAds } from './CrystalAds';
import { useRouter } from 'next/navigation';

interface ResultStepProps {
  isCalculating: boolean;
  result: string;
  aiInterpretation: string;
  onSave: () => void;
  onReset: () => void;
}

export function ResultStep({
  isCalculating,
  result,
  aiInterpretation,
  onSave,
  onReset
}: ResultStepProps) {
  const router = useRouter();

  if (isCalculating) {
    return (
      <motion.div
        key="calculating"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="bg-white rounded-2xl shadow-lg p-12 text-center border-2 border-indigo-100"
      >
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500 mx-auto mb-6"></div>
        <p className="text-gray-700 font-medium">正在計算卦象，請稍候...</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      key="step5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-indigo-100">
        <div id="result-container" className="mb-6">
          <div className="prose max-w-none text-gray-900" dangerouslySetInnerHTML={{ __html: result }} />
          
          {aiInterpretation && (
            <div className="mt-8 p-6 bg-indigo-50 rounded-xl border-2 border-indigo-200">
              <h3 className="text-xl font-bold mb-4 text-indigo-900">AI 解讀</h3>
              <div className="prose max-w-none text-indigo-900">
                {aiInterpretation.split('\n').map((line, index) => (
                  <p key={index} className="mb-3 text-base">{line}</p>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between gap-4">
            <button 
              onClick={onReset}
              className="flex-1 px-6 py-3 bg-gray-100 text-gray-800 rounded-xl font-bold text-lg hover:bg-gray-200 shadow-md hover:shadow-lg transition-all duration-200"
            >
              重新開始
            </button>
            <button 
              onClick={onSave}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-bold text-lg hover:from-indigo-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              儲存結果
            </button>
          </div>
          <button 
            onClick={() => router.push('/fortune')}
            className="w-full px-6 py-3 bg-white border-2 border-indigo-500 text-indigo-600 rounded-xl font-bold text-lg hover:bg-indigo-50 shadow-md hover:shadow-lg transition-all duration-200"
          >
            查看詳細解析
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-indigo-100">
        <CrystalAds />
      </div>
    </motion.div>
  );
} 