import React, { useState } from 'react';
import WelcomePage from './components/WelcomePage';
import QuestionnaireForm from './components/QuestionnaireForm';
import Results from './components/Results';

function App() {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'questionnaire' | 'results'>('welcome');
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleStart = () => {
    setCurrentStep('questionnaire');
  };

  const handleSubmit = (submittedAnswers: Record<string, string>) => {
    setAnswers(submittedAnswers);
    setCurrentStep('results');
  };

  return (
      <div className="min-h-screen bg-gray-50">
        {currentStep === 'welcome' && <WelcomePage onStart={handleStart} />}
        {currentStep === 'questionnaire' && <QuestionnaireForm onSubmit={handleSubmit} />}
        {currentStep === 'results' && <Results answers={answers} />}
      </div>
  );
}

export default App;