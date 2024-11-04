import { useState } from 'react';
// import { calculateResult } from '../utils/ichingCalculations';
import html2canvas from 'html2canvas';

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
      const link = document.createElement('a');
      link.download = `易經結果_${new Date().toLocaleDateString()}.png`;
      link.href = image;
      link.click();
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