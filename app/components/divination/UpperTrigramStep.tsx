'use client';

import { motion } from 'framer-motion';
import { CrystalAds } from './CrystalAds';

interface UpperTrigramStepProps {
  shanggua: string;
  setShanggua: (value: string) => void;
  handleRandomize: (setter: (value: string) => void) => void;
  onNext: () => void;
  onBack: () => void;
}

export function UpperTrigramStep({
  shanggua,
  setShanggua,
  handleRandomize,
  onNext,
  onBack
}: UpperTrigramStepProps) {
  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-indigo-100">
        <div className="flex items-center gap-3 mb-6">
          <label className="text-gray-900 font-bold text-lg whitespace-nowrap">上卦：</label>
          <div className="relative flex-1">
            <input 
              type="number"
              value={shanggua} 
              onChange={(e) => setShanggua(e.target.value)}
              style={{
                border: '1px solid rgb(162, 28, 175)',
                outline: 'none'
              }}
              className="w-full p-4 rounded-xl text-gray-900 placeholder-gray-500 text-base shadow-sm bg-white focus:ring-2 focus:ring-fuchsia-700 focus:border-fuchsia-700"
              placeholder="輸入數字或擲卦"
            />
          </div>
          <button 
            onClick={() => handleRandomize(setShanggua)}
            className="px-4 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-bold text-base hover:from-indigo-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200 whitespace-nowrap min-w-[100px]"
          >
            擲出上卦
          </button>
        </div>
        <div className="flex justify-between">
          <button 
            onClick={onBack}
            className="px-8 py-3 bg-gray-100 text-gray-800 rounded-xl font-bold text-lg hover:bg-gray-200 shadow-md hover:shadow-lg transition-all duration-200"
          >
            上一步
          </button>
          <button 
            onClick={onNext}
            disabled={!shanggua}
            className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-bold text-lg hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-200"
          >
            下一步
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-indigo-100">
        <CrystalAds />
      </div>
    </motion.div>
  );
} 