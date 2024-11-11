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
      if (!resultElement) return;

      const canvas = await html2canvas(resultElement, {
        backgroundColor: '#ffffff',
        scale: 2,
      });

      const image = canvas.toDataURL('image/png');

      // Format date as YYYYMMDD
      const date = new Date().toISOString().slice(0,10).replace(/-/g,'');
      // Generate hash from question and date
      const hashInput = question + date;
      const hash = Array.from(hashInput).reduce((acc, char) => {
        return ((acc << 5) - acc) + char.charCodeAt(0) | 0;
      }, 0);
      const hashString = Math.abs(hash).toString(16).substring(0, 8);
      
      const filename = `易經結果_${date}_${hashString}.png`;

      // For mobile devices, use the Web Share API to save to photos
      if (navigator.share && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        const blob = await (await fetch(image)).blob();
        const file = new File([blob], filename, { type: 'image/png' });
        
        try {
          await navigator.share({
            files: [file],
            title: '易經結果',
          });
        } catch (err) {
          // Fallback to download if share fails
          const link = document.createElement('a');
          link.download = filename;
          link.href = image;
          link.click();
        }
      } else {
        // For desktop, use regular download
        const link = document.createElement('a');
        link.download = filename;
        link.href = image;
        link.click();
      }
    } catch (error) {
      console.error('Screenshot failed:', error);
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