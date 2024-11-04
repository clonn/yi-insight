import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";
import html2canvas from 'html2canvas';

const hexagrams8 = require('./hexagram/hexagram_8.json');
const hexagrams64 = require('./hexagram/hexagram_64.json');

// 功能函數
const getTrigram = (num) => {
  const remainder = num % 8;
  const trigramMapping = ["乾", "兌", "離", "震", "巽", "坎", "艮", "坤"];
  return trigramMapping[(remainder || 8) - 1];
};

const getHexagram = (lower, upper) => {
  console.log(lower, upper);
  const result =  hexagrams64.find(h => h.lowerTrigram === lower && h.upperTrigram === upper);
  console.log(result);
  return result;
};

const getBinaryFromTrigram = (trigram) => {
  return hexagrams8[trigram].binary;
};

// 主組件
const App = () => {
  const [question, setQuestion] = useState("");
  const [xiagua, setXiagua] = useState("");
  const [shanggua, setShanggua] = useState("");
  const [bianyao, setBianyao] = useState("");
  const [result, setResult] = useState("");
  const [aiInterpretation, setAiInterpretation] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleRandomize = (setter) => {
    setter(String(Math.floor(Math.random() * 1000)).padStart(3, "0"));
  };

  const handleReset = () => {
    if (window.confirm("確定要重新開始嗎？所有已輸入的資料將會清除。")) {
      setQuestion("");
      setXiagua("");
      setShanggua("");
      setBianyao("");
      setResult("");
      setAiInterpretation("");
      setIsCalculating(false);
      setCurrentStep(1);
    }
  };

  const getGeminiInterpretation = async (question, originalHexagram, changedHexagram) => {
    try {
      if (!window.gemini) {
        throw new Error("Gemini API not available");
      }

      const prompt = `作為易經專家，請針對以下問題和卦象提供正面且具有建設性的解讀與建議：

問題：${question}

本卦：${originalHexagram.name}
本卦含義：${originalHexagram.meaning}

變卦：${changedHexagram.name}
變卦含義：${changedHexagram.meaning}

請提供：
1. 現況分析（基於本卦）
2. 發展趨勢（基於變卦）
3. 具體建議（請給予正面、建設性的建議）

請用溫和積極的語氣，給予實用的參考建議。內容要避免過於具體或限制性的斷言，而是提供啟發性的思考方向。`;

      const result = await window.gemini.generateText({
        prompt: prompt,
        max_output_tokens: 800,
      });

      setAiInterpretation(result.response.text());
    } catch (error) {
      console.error("Gemini interpretation error:", error);
      setAiInterpretation("無法使用 AI 解讀功能，請參考卦象本身的意義作為參考。");
    }
  };

  const calculate = async () => {
    const lowerTrigram = getTrigram(parseInt(xiagua));
    const upperTrigram = getTrigram(parseInt(shanggua));
    const originalHexagram = getHexagram(lowerTrigram, upperTrigram);
    const binaryString = getBinaryFromTrigram(lowerTrigram) + getBinaryFromTrigram(upperTrigram);

    const changedPosition = bianyao % 6 || 6;
    let changedBinary = binaryString.split("");
    changedBinary[changedPosition - 1] = changedBinary[changedPosition - 1] === "1" ? "0" : "1";
    changedBinary = changedBinary.join("");

    const changedLowerTrigram = Object.keys(hexagrams8).find(key => hexagrams8[key].binary === changedBinary.slice(0, 3));
    const changedUpperTrigram = Object.keys(hexagrams8).find(key => hexagrams8[key].binary === changedBinary.slice(3));
    const changedHexagram = getHexagram(changedLowerTrigram, changedUpperTrigram);

    // Build original hexagram details
    const originalHexagramDetails = {
      question: `<h3>問題：${question}</h3>`,
      name: `<h4>本卦：${originalHexagram ? originalHexagram.name : "未知"}</h4>`,
      trigrams: [
        `<p>${hexagrams8[upperTrigram].icon}（上卦：${upperTrigram}）</p>`,
        `<p>${hexagrams8[lowerTrigram].icon}（下卦：${lowerTrigram}）</p>`
      ],
      attributes: [
        `<p>屬性：${hexagrams8[upperTrigram].property}/${hexagrams8[lowerTrigram].property}</p>`,
        `<p>顏色：${hexagrams8[upperTrigram].color}/${hexagrams8[lowerTrigram].color}</p>`,
        `<p>角色：${hexagrams8[upperTrigram].role}/${hexagrams8[lowerTrigram].role}</p>`,
        `<p>本卦含義：${originalHexagram ? originalHexagram.meaning : "未知"}</p>`
      ]
    };

    // Build changed hexagram details
    const changedHexagramDetails = {
      position: `<h4>變爻：第 ${changedPosition} 爻</h4>`,
      name: `<h4>變卦：${changedHexagram ? changedHexagram.name : "未知"}</h4>`,
      trigrams: [
        `<p>${hexagrams8[changedUpperTrigram].icon}（上卦：${changedUpperTrigram}）</p>`,
        `<p>${hexagrams8[changedLowerTrigram].icon}（下卦：${changedLowerTrigram}）</p>`
      ],
      attributes: [
        `<p>屬性：${hexagrams8[changedUpperTrigram].property}/${hexagrams8[changedLowerTrigram].property}</p>`,
        `<p>顏色：${hexagrams8[changedUpperTrigram].color}/${hexagrams8[changedLowerTrigram].color}</p>`,
        `<p>角色：${hexagrams8[changedUpperTrigram].role}/${hexagrams8[changedLowerTrigram].role}</p>`,
        `<p>變卦含義：${changedHexagram ? changedHexagram.meaning : "未知"}</p>`
      ]
    };

    // Combine all sections
    const resultHTML = [
      originalHexagramDetails.question,
      originalHexagramDetails.name,
      ...originalHexagramDetails.trigrams,
      ...originalHexagramDetails.attributes,
      changedHexagramDetails.position,
      changedHexagramDetails.name,
      ...changedHexagramDetails.trigrams,
      ...changedHexagramDetails.attributes
    ].join('');
    
    setResult(resultHTML);
    await getGeminiInterpretation(question, originalHexagram, changedHexagram);
  };

  const StepIndicator = () => (
    <div className="flex justify-center mb-8">
      {[1, 2, 3, 4].map((step) => (
        <div key={step} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step === currentStep ? 'bg-blue-500 text-white' : 
            step < currentStep ? 'bg-green-500 text-white' : 
            'bg-gray-200 text-gray-600'
          }`}>
            {step < currentStep ? '✓' : step}
          </div>
          {step < 4 && (
            <div className={`w-12 h-1 ${
              step < currentStep ? 'bg-green-500' : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleCalculate = async () => {
    setIsCalculating(true);
    await calculate();
    setCurrentStep(4);
    setIsCalculating(false);
  };

  const handleSaveResult = async () => {
    try {
      // Create reference for the result div
      const resultElement = document.getElementById('result-container');
      
      if (!resultElement) return;

      // Create canvas from the element
      const canvas = await html2canvas(resultElement, {
        backgroundColor: '#ffffff',
        scale: 2, // Better quality for retina displays
      });

      // Convert to image and download
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `易經結果_${new Date().toLocaleDateString()}.png`;
      link.href = image;
      link.click();
    } catch (error) {
      console.error('Screenshot failed:', error);
      alert('截圖儲存失敗，請稍後再試');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-center mb-2">數字易經威力加強版</h1>
      <div className="text-sm text-gray-500 text-center mb-8">v0.1.0</div>

      <StepIndicator />

      <AnimatePresence mode="wait" initial={false}>
        {currentStep === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <label className="block mb-2 font-medium">請輸入您的問題：</label>
            <textarea 
              value={question} 
              onChange={(e) => setQuestion(e.target.value)} 
              placeholder="在此輸入您的問題（可使用鍵盤或語音輸入）"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="flex justify-end mt-4">
              <button 
                onClick={handleNext}
                disabled={!question.trim()}
                className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                下一步
              </button>
            </div>
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 mb-6"
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
                下卦偶然
              </button>
            </div>
            <div className="flex justify-between mt-4">
              <button 
                onClick={handleBack}
                className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                上一步
              </button>
              <button 
                onClick={handleNext}
                disabled={!xiagua}
                className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                下一步
              </button>
            </div>
          </motion.div>
        )}

        {currentStep === 3 && (
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
                上卦偶然
              </button>
            </div>
            
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
                變爻偶然
              </button>
            </div>

            <div className="flex justify-between mt-4">
              <button 
                onClick={handleBack}
                className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                上一步
              </button>
              <button 
                onClick={handleCalculate}
                disabled={!shanggua || !bianyao}
                className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                計算結果
              </button>
            </div>
          </motion.div>
        )}

        {currentStep === 4 && (
          <motion.div
            key="step4"
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
                  <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: result }} />
                  {aiInterpretation && (
                    <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                      <h3 className="text-xl font-semibold mb-4">AI 解讀參考</h3>
                      <div className="whitespace-pre-line">{aiInterpretation}</div>
                    </div>
                  )}
                </div>

                <div className="flex justify-center gap-4 mt-8">
                  <button 
                    onClick={handleSaveResult}
                    className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200 flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                    </svg>
                    儲存結果
                  </button>
                  <button 
                    onClick={handleReset}
                    className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200 flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                    </svg>
                    重新開始
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="mt-16 pt-8 border-t border-gray-200">
        <div className="text-center text-gray-600 text-sm">
          <p>© {new Date().getFullYear()} 易經卜卦系統 版權所有</p>
          <p className="mt-2">
            如有問題請聯繫: {' '}
            <a href="https://exma-square.co/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">EXMA-Square</a>,{' '}
            <a href="https://facebook.com/clonncd" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Facebook</a> 或{' '}
            <a href="https://github.com/clonn" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">GitHub</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
