export const StepIndicator = ({ currentStep }) => (
  <div className="flex justify-center mb-8">
    {[1, 2, 3, 4, 5].map((step) => (
      <div key={step} className="flex items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          step === currentStep ? 'bg-blue-500 text-white' : 
          step < currentStep ? 'bg-green-500 text-white' : 
          'bg-gray-200 text-gray-600'
        }`}>
          {step < currentStep ? '✓' : step}
        </div>
        {step < 5 && (
          <div className={`w-12 h-1 ${
            step < currentStep ? 'bg-green-500' : 'bg-gray-200'
          }`} />
        )}
      </div>
    ))}
  </div>
); 