import { useState } from 'react';
// import { calculateResult } from '../utils/ichingCalculations';
import html2canvas from 'html2canvas';
import { scrollToTop } from '../utils/scrollUtils';

export const useIching = () => {
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
      scrollToTop();
    }
  };

  const handleSaveResult = async () => {
    try {
      const resultElement = document.getElementById('result-container');
      if (!resultElement) {
        console.error('Result container not found');
        return;
      }

      // 使用 html2canvas 將結果轉換為圖片
      const canvas = await html2canvas(resultElement, {
        backgroundColor: '#ffffff',
        scale: 2, // 提高圖片品質
        useCORS: true, // 允許跨域圖片
        logging: false, // 關閉除錯日誌
      });

      // 轉換為 PNG 格式
      const image = canvas.toDataURL('image/png', 1.0);

      // 根據日期和問題生成唯一檔案名稱
      const date = new Date().toISOString().slice(0,10).replace(/-/g,'');
      const hashInput = `${question}_${date}`;
      const hash = Array.from(hashInput).reduce((acc, char) => {
        return ((acc << 5) - acc) + char.charCodeAt(0) | 0;
      }, 0);
      const hashString = Math.abs(hash).toString(16).substring(0, 8);
      const filename = `易經結果_${date}_${hashString}.png`;

      // 嘗試使用 Web Share API（主要用於行動裝置）
      try {
        const blob = await fetch(image).then(res => res.blob());
        const file = new File([blob], filename, { type: 'image/png' });
        
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: '易經結果',
            text: filename,
          });
          console.log('分享成功');
          return;
        }
      } catch (err) {
        console.log('Web Share API 不可用，切換至下載模式');
      }

      // 如果 Web Share API 不可用或失敗，則使用下載方式
      const link = document.createElement('a');
      link.download = filename;
      link.href = image;
      link.click();
      console.log('圖片已下載');

    } catch (error) {
      console.error('儲存失敗:', error);
      alert('截圖儲存失敗，請稍後再試');
    }
  };

  return {
    state: {
      question,
      xiagua,
      shanggua,
      bianyao,
      result,
      aiInterpretation,
      currentStep,
      isCalculating
    },
    actions: {
      setQuestion,
      setXiagua,
      setShanggua,
      setBianyao,
      setResult,
      setAiInterpretation,
      setCurrentStep,
      setIsCalculating,
      handleRandomize,
      handleReset,
      handleSaveResult
    }
  };
};