'use client';

interface StepIndicatorProps {
  currentStep: number;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  const steps = [
    { number: 1, name: '問題' },
    { number: 2, name: '下卦' },
    { number: 3, name: '上卦' },
    { number: 4, name: '變爻' },
    { number: 5, name: '結果' },
  ];

  return (
    <div className="flex justify-between items-center">
      {steps.map((step) => (
        <div
          key={step.number}
          className={`flex flex-col items-center ${
            currentStep === step.number ? 'text-white' : 'text-white/70'
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center mb-1.5 border ${
              currentStep === step.number 
                ? 'bg-white/20 border-white shadow-white/30 shadow-lg' 
                : 'bg-white/10 border-white/40'
            }`}
          >
            <span className="text-base font-bold">{step.number}</span>
          </div>
          <span className="text-sm font-medium">{step.name}</span>
        </div>
      ))}
    </div>
  );
} 