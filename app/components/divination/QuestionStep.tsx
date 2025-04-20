'use client';

import { motion } from 'framer-motion';

interface QuestionStepProps {
  question: string;
  setQuestion: (question: string) => void;
  onNext: () => void;
}

export function QuestionStep({ question, setQuestion, onNext }: QuestionStepProps) {
  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="mb-6"
    >
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-2 border-indigo-100">
        <div className="mb-6 bg-indigo-50 rounded-xl p-5 text-sm border-2 border-indigo-200">
          <h3 className="font-bold text-indigo-900 mb-4 text-base">事情需知：</h3>
          <ol className="list-decimal pl-5 space-y-3 text-indigo-900">
            <li>誠心默念所占之事，越完整越好，遵循不誠不占、不義不占、不疑不占</li>
            <li>每個步驟，誠心默念所想之事，輸入三個數字，或按下擲卦，直到最後計算結果</li>
            <li>如需專人解卦，請儲存結果或截圖提供，進行專人詳細描述解說</li>
            <li>一事一占，切勿重複占卜</li>
          </ol>
        </div>
        
        <label className="block mb-3 font-bold text-gray-900 text-lg">請輸入您的問題：</label>
        <div className="relative">
          <textarea 
            value={question} 
            onChange={(e) => setQuestion(e.target.value)} 
            placeholder="在此輸入您的問題，請誠心默念，越完整越好"
            style={{
              border: '1px solid rgb(162, 28, 175)',
              outline: 'none'
            }}
            className="w-full p-4 rounded-xl min-h-[120px] text-gray-900 placeholder-gray-500 text-base shadow-sm bg-white resize-none hover:border-fuchsia-600 focus:border-fuchsia-700 focus:ring-2 focus:ring-fuchsia-700 transition-colors duration-200"
          />
        </div>
        <div className="flex justify-end mt-6">
          <button 
            onClick={onNext}
            disabled={!question.trim()}
            className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-bold text-lg hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-200"
          >
            下一步
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 text-center border-2 border-indigo-100">
        <p className="text-emerald-600 text-sm font-medium mb-4">
          如占卜進行遇到任何問題，歡迎加入LINE@ 官方帳號，我們將會盡快處理。
        </p>
        <a 
          href="https://lin.ee/wolgX7K" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block hover:opacity-90 transition-opacity"
        >
          <img 
            src="https://scdn.line-apps.com/n/line_add_friends/btn/zh-Hant.png" 
            alt="加入好友" 
            height="24"
            width="40%"
            className="inline-block"
          />
        </a>
      </div>
    </motion.div>
  );
} 