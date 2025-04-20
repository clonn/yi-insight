'use client';

import { motion } from 'framer-motion';
import { CrystalAds } from './CrystalAds';

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
  if (isCalculating) {
    return (
      <motion.div
        key="calculating"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="text-center py-12"
      >
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-600">正在計算卦象，請稍候...</p>
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
      <div id="result-container">
        <div dangerouslySetInnerHTML={{ __html: result }} />
        
        {aiInterpretation && (
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">AI 解讀</h3>
            <div className="prose max-w-none">
              {aiInterpretation.split('\n').map((line, index) => (
                <p key={index} className="mb-2">{line}</p>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-8">
        <button 
          onClick={onReset}
          className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          重新開始
        </button>
        <button 
          onClick={onSave}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          儲存結果
        </button>
      </div>
      
      <CrystalAds />
    </motion.div>
  );
} 