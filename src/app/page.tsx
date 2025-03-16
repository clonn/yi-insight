'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { QuestionStep } from '@/components/QuestionStep';
import { LowerTrigramStep } from '@/components/LowerTrigramStep';
import { UpperTrigramStep } from '@/components/UpperTrigramStep';
import { ChangingLineStep } from '@/components/ChangingLineStep';
import { ResultStep } from '@/components/ResultStep';
import { StepIndicator } from '@/components/StepIndicator';
import { Footer } from '@/components/Footer';


import { useIching } from '@/hooks/useIching';
import { calculateResult } from '@/utils/ichingCalculations';
import { scrollToTop } from '@/utils/scrollUtils';

export default function Home(): React.JSX.Element {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const { state, actions } = useIching();

  const handleRandomize = (setValue: (value: number) => void) => {
    const randomNumber = Math.floor(Math.random() * 8) + 1;
    setValue(randomNumber);
  };

  const handleCalculate = async () => {
    try {
      actions.setIsCalculating(true);
      actions.setCurrentStep(5);
      scrollToTop();
      await calculateResult({
        question: state.question,
        xiagua: state.xiagua,
        shanggua: state.shanggua,
        bianyao: state.bianyao,
        setResult: actions.setResult,
        setAiInterpretation: actions.setAiInterpretation
      });
      
    } catch (error: unknown) {
      console.error('Calculation error:', error);
      alert(error instanceof Error ? error.message : '計算過程發生錯誤');
    } finally {
      console.log('Calculation finished');
      actions.setIsCalculating(false);
    }
  };

  interface Step {
    title: string;
    description: string;
  }

  const steps: Step[] = [
    { title: '詢問', description: '設定你的問題' },
    { title: '下卦', description: '選擇下卦' },
    { title: '上卦', description: '選擇上卦' },
    { title: '動爻', description: '選擇動爻' },
    { title: '結果', description: '查看解卦結果' },
  ];

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-center mb-2">數字易經威力加強版</h1>
      <div className="text-sm text-gray-500 text-center mb-2">v1.1.0-betav1111</div>

      <StepIndicator currentStep={state.currentStep} />

      <AnimatePresence mode="wait" initial={false}>
        {state.currentStep === 1 && (
          <QuestionStep 
            question={state.question}
            setQuestion={actions.setQuestion}
            onNext={() => {
              actions.setCurrentStep(2);
              scrollToTop();
            }}
          />
        )}

        {state.currentStep === 2 && (
          <LowerTrigramStep 
            xiagua={state.xiagua}
            setXiagua={actions.setXiagua}
            handleRandomize={actions.handleRandomize}
            onNext={() => {
              actions.setCurrentStep(3);
              scrollToTop();
            }}
            onBack={() => {
              actions.setCurrentStep(1);
              scrollToTop();
            }}
          />
        )}

        {state.currentStep === 3 && (
          <UpperTrigramStep 
            shanggua={state.shanggua}
            setShanggua={actions.setShanggua}
            handleRandomize={actions.handleRandomize}
            onNext={() => {
              actions.setCurrentStep(4);
              scrollToTop();
            }}
            onBack={() => {
              actions.setCurrentStep(2);
              scrollToTop();
            }}
          />
        )}

        {state.currentStep === 4 && (
          <ChangingLineStep 
            bianyao={state.bianyao}
            setBianyao={actions.setBianyao}
            handleRandomize={actions.handleRandomize}
            onCalculate={handleCalculate}
            onBack={() => {
              actions.setCurrentStep(3);
              scrollToTop();
            }}
          />
        )}

        {state.currentStep === 5 && (
          <ResultStep 
            isCalculating={state.isCalculating}
            result={state.result}
            aiInterpretation={state.aiInterpretation}
            onSave={actions.handleSaveResult}
            onReset={() => {
              actions.handleReset();
              scrollToTop();
            }}
          />
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}