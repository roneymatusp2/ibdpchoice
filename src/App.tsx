import React, { useState } from 'react';
import { calculateResults, Results as ResultsType } from '../utils/scoring';
import Results from './Results';

function App() {
  const [answers, setAnswers] = useState<Record<string,string>>({});
  const [step, setStep] = useState<'questionnaire'|'results'>('questionnaire');
  const [finalResults, setFinalResults] = useState<ResultsType|null>(null);

  const handleQuestionnaireSubmit = (userAnswers: Record<string, string>) => {
    setAnswers(userAnswers);
    const res = calculateResults(userAnswers);
    setFinalResults(res);
    setStep('results');
  };

  const handleReset = () => {
    setAnswers({});
    setFinalResults(null);
    setStep('questionnaire');
  };

  return (
      <div>
        {step === 'questionnaire' && (
            // Your questionnaire form here, e.g.
            // <QuestionnaireForm onSubmit={handleQuestionnaireSubmit} />
            <p>Replace with your form</p>
        )}
        {step === 'results' && finalResults && (
            <Results answers={answers} results={finalResults} onReset={handleReset} />
        )}
      </div>
  );
}

export default App;
