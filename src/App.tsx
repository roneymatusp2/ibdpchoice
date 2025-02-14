import React, { useState } from 'react';
import WelcomePage from './components/WelcomePage';
import QuestionnaireForm from './components/QuestionnaireForm';
import Results from './components/Results';
import { calculateResults, Results as ScoringResults } from './utils/scoring';

function App() {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'questionnaire' | 'results'>('welcome');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<ScoringResults | null>(null);

  const handleStart = () => {
    setCurrentStep('questionnaire');
  };

  const handleSubmit = (submittedAnswers: Record<string, string>) => {
    setAnswers(submittedAnswers);

    // 1) Call the scoring function with all final answers
    const final = calculateResults(submittedAnswers);

    // 2) Store in state
    setResults(final);

    // 3) Move to results screen
    setCurrentStep('results');
  };

  const handleReset = () => {
    setAnswers({});
    setResults(null);
    setCurrentStep('welcome');
  };

  return (
      <div className="min-h-screen bg-gray-50">
        {currentStep === 'welcome' && <WelcomePage onStart={handleStart} />}
        {currentStep === 'questionnaire' && <QuestionnaireForm onSubmit={handleSubmit} />}
        {currentStep === 'results' && results && (
            <Results answers={answers} results={results} onReset={handleReset} />
        )}
      </div>
  );
}

export default App;
