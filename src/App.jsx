import { StepIndicator } from './components/StepIndicator';
import { QuestionStep } from './components/QuestionStep';
import { LowerTrigramStep } from './components/LowerTrigramStep';
import { UpperTrigramStep } from './components/UpperTrigramStep';
import { ResultStep } from './components/ResultStep';
import { Footer } from './components/Footer';
import { useIching } from './hooks/useIching';
import { AnimatePresence } from 'framer-motion';
import { ChangingLineStep } from './components/ChangingLineStep';
import { calculateResult } from './utils/ichingCalculations';

const App = () => {
  const { state, actions } = useIching();

  const handleCalculate = async () => {
    try {
      actions.setIsCalculating(true);
      actions.setCurrentStep(5);
      await calculateResult({
        question: state.question,
        xiagua: state.xiagua,
        shanggua: state.shanggua,
        bianyao: state.bianyao,
        setResult: actions.setResult,
        setAiInterpretation: actions.setAiInterpretation
      });
      
    } catch (error) {
      console.error('Calculation error:', error);
      alert(error.message);
    } finally {
      console.log('Calculation finished');
      actions.setIsCalculating(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-center mb-2">數字易經威力加強版</h1>
      <div className="text-sm text-gray-500 text-center mb-8">v0.1.0</div>

      <StepIndicator currentStep={state.currentStep} />

      <AnimatePresence mode="wait" initial={false}>
        {state.currentStep === 1 && (
          <QuestionStep 
            question={state.question}
            setQuestion={actions.setQuestion}
            onNext={() => actions.setCurrentStep(2)}
          />
        )}

        {state.currentStep === 2 && (
          <LowerTrigramStep 
            xiagua={state.xiagua}
            setXiagua={actions.setXiagua}
            handleRandomize={actions.handleRandomize}
            onNext={() => actions.setCurrentStep(3)}
            onBack={() => actions.setCurrentStep(1)}
          />
        )}

        {state.currentStep === 3 && (
          <UpperTrigramStep 
            shanggua={state.shanggua}
            setShanggua={actions.setShanggua}
            handleRandomize={actions.handleRandomize}
            onNext={() => actions.setCurrentStep(4)}
            onBack={() => actions.setCurrentStep(2)}
          />
        )}

        {state.currentStep === 4 && (
          <ChangingLineStep 
            bianyao={state.bianyao}
            setBianyao={actions.setBianyao}
            handleRandomize={actions.handleRandomize}
            onCalculate={handleCalculate}
            onBack={() => actions.setCurrentStep(3)}
          />
        )}

        {state.currentStep === 5 && (
          <ResultStep 
            isCalculating={state.isCalculating}
            result={state.result}
            aiInterpretation={state.aiInterpretation}
            onSave={actions.handleSaveResult}
            onReset={actions.handleReset}
          />
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default App; 