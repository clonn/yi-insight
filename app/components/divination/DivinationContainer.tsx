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
    <div className="w-full">
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
    </div>
  );
} 