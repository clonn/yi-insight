import { motion } from 'framer-motion';
import { CrystalAds } from './CrystalAds';

export const LowerTrigramStep = ({ 
  xiagua, 
  setXiagua, 
  handleRandomize, 
  onNext, 
  onBack 
}) => (
  <motion.div
    key="step2"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="space-y-4"
  >
    <div className="flex items-center gap-4">
      <label className="w-20">下卦：</label>
      <input 
        type="number"
        value={xiagua} 
        onChange={(e) => setXiagua(e.target.value)}
        className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500"
      />
      <button 
        onClick={() => handleRandomize(setXiagua)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        擲出下卦
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
        disabled={!xiagua}
        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        下一步
      </button>
    </div>
    <CrystalAds />
  </motion.div>
); 