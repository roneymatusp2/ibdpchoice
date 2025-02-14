import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, Circle, CheckCircle2 } from 'lucide-react';
import { questionnaire } from '../data/questions';

interface QuestionnaireFormProps {
  onSubmit: (answers: Record<string, string>) => void;
}

function QuestionnaireForm({ onSubmit }: QuestionnaireFormProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isAnimating, setIsAnimating] = useState(false);

  const currentQuestion = questionnaire[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questionnaire.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    setIsAnimating(true);
    setTimeout(() => {
      if (isLastQuestion) {
        onSubmit(answers);
      } else {
        setCurrentQuestionIndex(prev => prev + 1);
      }
      setIsAnimating(false);
    }, 300);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevious = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentQuestionIndex(prev => prev - 1);
      setIsAnimating(false);
    }, 300);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const progress = ((currentQuestionIndex + 1) / questionnaire.length) * 100;

  return (
      <div className="max-w-3xl mx-auto p-4">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-school-navy to-school-red bg-clip-text text-transparent animate-pulse">
              Question {currentQuestionIndex + 1} of {questionnaire.length}
            </h2>
            <div className="text-right">
            <span className="text-2xl font-bold text-school-navy">
              {Math.round(progress)}%
            </span>
              <div className="text-sm text-school-navy/70">Complete</div>
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
            <div
                className="bg-gradient-to-r from-school-navy via-purple-500 to-school-red h-3 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div
            className={`transform transition-all duration-300 ${
                isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}
        >
          <div className="bg-white/90 rounded-xl shadow-lg overflow-hidden backdrop-blur-md hover:shadow-2xl transition-shadow duration-300">
            <div className="h-2 bg-gradient-to-r from-school-navy via-purple-500 to-school-red" />
            <div className="p-8">
              <p className="text-2xl font-semibold text-school-navy mb-6 leading-relaxed">
                {currentQuestion.prompt}
              </p>
              <div className="space-y-4">
                {currentQuestion.options.map((option) => (
                    <label
                        key={option.value}
                        className={`flex items-center p-5 border-2 rounded-xl cursor-pointer transition-all duration-300
                    transform hover:scale-102 hover:shadow-md
                    ${answers[currentQuestion.id] === option.value
                            ? 'border-school-red bg-gradient-to-r from-school-red/10 to-purple-500/10'
                            : 'border-gray-200 hover:border-purple-400'}`}
                    >
                      <div className="flex items-center justify-center w-6 h-6 mr-4">
                        {answers[currentQuestion.id] === option.value ? (
                            <CheckCircle2 className="w-6 h-6 text-school-red animate-scale" />
                        ) : (
                            <Circle className="w-6 h-6 text-gray-400" />
                        )}
                      </div>
                      <input
                          type="radio"
                          name={currentQuestion.id}
                          value={option.value}
                          checked={answers[currentQuestion.id] === option.value}
                          onChange={() => handleAnswer(currentQuestion.id, option.value)}
                          className="hidden"
                      />
                      <span className="text-lg text-school-navy/90 font-medium">{option.label}</span>
                    </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-between items-center">
          {!isFirstQuestion ? (
              <button
                  onClick={handlePrevious}
                  className="inline-flex items-center px-8 py-4 border-2 border-school-navy text-lg font-medium rounded-xl
              text-school-navy hover:bg-school-navy hover:text-white transition-all duration-300
              transform hover:scale-105 active:scale-95"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Previous
              </button>
          ) : <div />}

          <button
              onClick={handleNext}
              disabled={!answers[currentQuestion.id]}
              className={`inline-flex items-center px-8 py-4 border-2 text-lg font-medium rounded-xl
            transition-all duration-300 transform hover:scale-105 active:scale-95
            ${answers[currentQuestion.id]
                  ? 'border-school-red bg-gradient-to-r from-school-red to-purple-500 text-white hover:from-purple-500 hover:to-school-red'
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