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
    <div className="flex justify-between items-center mb-8">
      {steps.map((step) => (
        <div
          key={step.number}
          className={`flex flex-col items-center ${
            currentStep === step.number ? 'text-blue-600' : 'text-gray-400'
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
              currentStep === step.number ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            {step.number}
          </div>
          <span className="text-sm">{step.name}</span>
        </div>
      ))}
    </div>
  );
} 