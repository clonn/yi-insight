import { motion } from 'framer-motion';

export const ChangingLineStep = ({ 
  bianyao, 
  setBianyao, 
  handleRandomize, 
  onCalculate, 
  onBack 
}) => (
  <motion.div
    key="step4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="space-y-4 mb-6"
  >
    <div className="flex items-center gap-4">
      <label className="w-20">變爻：</label>
      <input 
        type="number"
        value={bianyao} 
        onChange={(e) => setBianyao(e.target.value)}
        className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500"
      />
      <button 
        onClick={() => handleRandomize(setBianyao)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        擲出變爻
      </button>
    </div>

    <div className="flex justify-between mt-4">
      <button 
        onClick={onBack}
        className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        上一步
      </button>
      <button 
        onClick={onCalculate}
        disabled={!bianyao}
        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        計算結果
      </button>
    </div>
  </motion.div>
); 