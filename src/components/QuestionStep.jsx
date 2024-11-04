import { motion } from 'framer-motion';

export const QuestionStep = ({ question, setQuestion, onNext }) => (
  <motion.div
    key="step1"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="mb-6"
  >
    <div className="mb-4 p-4 bg-gray-50 rounded-lg text-sm">
      <h3 className="font-medium mb-2">事情需知：</h3>
      <ol className="list-decimal pl-5 space-y-1">
        <li>誠心默念所占之事，越完整越好，遵循不誠不占、不義不占、不疑不占</li>
        <li>每個步驟，誠心默念所想之事，輸入三個數字，或按下擲卦，直到最後計算結果</li>
        <li>如需專人解卦，請儲存結果或截圖提供，進行專人詳細描述解說</li>
        <li>一事一占，切勿重複占卜</li>
      </ol>
    </div>
    
    <label className="block mb-2 font-medium">請輸入您的問題：</label>
    <textarea 
      value={question} 
      onChange={(e) => setQuestion(e.target.value)} 
      placeholder="在此輸入您的問題（可使用鍵盤或語音輸入）"
      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
    <div className="flex justify-end mt-4">
      <button 
        onClick={onNext}
        disabled={!question.trim()}
        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        下一步
      </button>
    </div>
  </motion.div>
); 