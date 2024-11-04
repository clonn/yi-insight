import { motion } from 'framer-motion';

export const UpperTrigramStep = ({ 
  shanggua, 
  setShanggua, 
  handleRandomize, 
  onNext,
  onBack 
}) => (
  <motion.div
    key="step3"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="space-y-4 mb-6"
  >
    <div className="flex items-center gap-4">
      <label className="w-20">上卦：</label>
      <input 
        type="number"
        value={shanggua} 
        onChange={(e) => setShanggua(e.target.value)}
        className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500"
      />
      <button 
        onClick={() => handleRandomize(setShanggua)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        擲出上卦
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
        onClick={onNext}
        disabled={!shanggua}
        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        下一步
      </button>
    </div>
  </motion.div>
); 