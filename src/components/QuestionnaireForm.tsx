import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { questionnaire } from '../data/questions';

interface QuestionnaireFormProps {
  onSubmit: (answers: Record<string, string>) => void;
}

function QuestionnaireForm({ onSubmit }: QuestionnaireFormProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const currentQuestion = questionnaire[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questionnaire.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      onSubmit(answers);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calcular progresso
  const progress = ((currentQuestionIndex + 1) / questionnaire.length) * 100;

  return (
      <div className="max-w-3xl mx-auto p-4">
        {/* Header com progresso */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-school-navy">
              Question {currentQuestionIndex + 1} of {questionnaire.length}
            </h2>
            <span className="text-school-navy/70">
            Progress: {Math.round(progress)}%
          </span>
          </div>

          {/* Barra de progresso */}
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
                className="bg-gradient-to-r from-school-navy to-school-red h-2 transition-all duration-300"
                style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Questão atual */}
        <div className="bg-white/80 rounded-xl shadow-md overflow-hidden backdrop-blur-sm">
          <div className="h-1 bg-gradient-to-r from-school-navy to-school-red" />
          <div className="p-6">
            <p className="text-lg font-medium text-school-navy mb-4">{currentQuestion.prompt}</p>
            <div className="space-y-3">
              {currentQuestion.options.map((option) => (
                  <label
                      key={option.value}
                      className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all
                  ${answers[currentQuestion.id] === option.value
                          ? 'border-school-red bg-school-red/5'
                          : 'border-gray-200 hover:border-school-red/30'}`}
                  >
                    <input
                        type="radio"
                        name={currentQuestion.id}
                        value={option.value}
                        checked={answers[currentQuestion.id] === option.value}
                        onChange={() => handleAnswer(currentQuestion.id, option.value)}
                        className="h-4 w-4 text-school-red focus:ring-school-red"
                    />
                    <span className="ml-3 text-school-navy/80">{option.label}</span>
                  </label>
              ))}
            </div>
          </div>
        </div>

        {/* Botões de navegação */}
        <div className="mt-8 flex justify-between">
          {!isFirstQuestion && (
              <button
                  onClick={handlePrevious}
                  className="inline-flex items-center px-6 py-3 border-2 border-school-navy text-base font-medium rounded-lg text-school-navy hover:bg-school-navy/5 transition-colors"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Previous
              </button>
          )}
          <div className="flex-1" />
          <button
              onClick={handleNext}
              disabled={!answers[currentQuestion.id]}
              className={`inline-flex items-center px-6 py-3 border-2 text-base font-medium rounded-lg transition-colors
            ${answers[currentQuestion.id]
                  ? 'border-school-red bg-school-red text-white hover:bg-school-red/90'
                  : 'border-gray-300 bg-gray-300 text-white cursor-not-allowed'
              }`}
          >
            {isLastQuestion ? (
                <>
                  Submit
                  <CheckCircle className="ml-2 h-5 w-5" />
                </>
            ) : (
                <>
                  Next
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
            )}
          </button>
        </div>
      </div>
  );
}

export default QuestionnaireForm;