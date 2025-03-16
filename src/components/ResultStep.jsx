import { motion } from 'framer-motion';
import { CrystalAds } from './CrystalAds';

export const ResultStep = ({ 
  isCalculating, 
  result, 
  aiInterpretation, 
  onSave, 
  onReset 
}) => (
  <motion.div
    key="step5"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="space-y-8"
  >
    {isCalculating ? (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    ) : (
      <>
        <div 
          id="result-container"
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          {result && (
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: result }} />
          )}
          {aiInterpretation && (
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">AI 解讀參考</h3>
              <div className="whitespace-pre-line">{aiInterpretation}</div>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center gap-4 mt-8">
          <div className="flex justify-center gap-4">
            <button 
              onClick={onSave}
              className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
              </svg>
              儲存為圖片
            </button>
            <button 
              onClick={onReset}
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              重新開始
            </button>
          </div>
          <div className="text-center mt-8">
            <p className="text-green-600 text-sm mb-3">
              如果需要專人進行解析，請先將上面解析結果儲存，再傳至 LINE@ 官方帳號，我們將進行專人解惑服務。
            </p>
            <a href="https://lin.ee/wolgX7K" target="_blank" rel="noopener noreferrer">
              <img 
                src="https://scdn.line-apps.com/n/line_add_friends/btn/zh-Hant.png" 
                alt="加入好友" 
                height="36" 
                className="inline-block"
              />
            </a>
          </div>
        </div>
        <CrystalAds />
      </>
    )}
  </motion.div>
);