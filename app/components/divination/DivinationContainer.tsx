'use client';

import { AnimatePresence } from 'framer-motion';
import { StepIndicator } from './StepIndicator';
import { QuestionStep } from './QuestionStep';
import { LowerTrigramStep } from './LowerTrigramStep';
import { UpperTrigramStep } from './UpperTrigramStep';
import { ResultStep } from './ResultStep';
import { ChangingLineStep } from './ChangingLineStep';
import { useIching } from '@/app/hooks/useIching';
import { calculateResult } from '@/app/utils/ichingCalculations';
import { scrollToTop } from '@/app/utils/scrollUtils';

export function DivinationContainer() {
  const { state, actions } = useIching();

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
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('An unknown error occurred');
      }
    } finally {
      console.log('Calculation finished');
      actions.setIsCalculating(false);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-[390px] mx-auto bg-[#f8f7ff]">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-b-[25px] p-6 pt-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">數字易經</h1>
          <div className="flex space-x-4">
            <button className="text-white">
              <i className="fas fa-bell"></i>
            </button>
          </div>
        </div>
        <div className="text-sm opacity-90 mb-2">探索古老智慧 · 預見未來</div>
        <h2 className="text-xl font-semibold mb-6">歡迎使用數字易經</h2>
        <StepIndicator currentStep={state.currentStep} />
      </div>

      <main className="flex-grow p-6 -mt-6 overflow-y-auto">
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
      </main>

      <footer className="bg-white border-t border-gray-200 py-3 px-6">
        <div className="flex justify-between">
          <div className="flex flex-col items-center text-indigo-600">
            <i className="fas fa-home text-xl mb-1"></i>
            <span className="text-xs">首頁</span>
          </div>
          <div className="flex flex-col items-center text-gray-500">
            <i className="fas fa-compass text-xl mb-1"></i>
            <span className="text-xs">發現</span>
          </div>
          <div className="flex flex-col items-center text-gray-500">
            <i className="fas fa-history text-xl mb-1"></i>
            <span className="text-xs">歷史</span>
          </div>
          <div className="flex flex-col items-center text-gray-500">
            <i className="fas fa-user text-xl mb-1"></i>
            <span className="text-xs">我的</span>
          </div>
        </div>
      </footer>
    </div>
  );
} 