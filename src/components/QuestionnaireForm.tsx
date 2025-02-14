import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { questionnaire } from '../data/questions';

interface QuestionnaireFormProps {
  onSubmit: (answers: Record<string, string>) => void;
}

function QuestionnaireForm({ onSubmit }: QuestionnaireFormProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  // Dividindo as 36 questões em seções
  const sections = [
    { title: 'Career Interests Part 1', questions: questionnaire.slice(0, 6) },
    { title: 'Career Interests Part 2', questions: questionnaire.slice(6, 12) },
    { title: 'Career Interests Part 3', questions: questionnaire.slice(12, 18) },
    { title: 'Career Interests Part 4', questions: questionnaire.slice(18, 24) },
    { title: 'Career Interests Part 5', questions: questionnaire.slice(24, 30) },
    { title: 'IB Math Sample Problems', questions: questionnaire.slice(30, 34) },
    { title: 'Basic Math Assessment', questions: questionnaire.slice(34, 36) }
  ];

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const currentQuestions = sections[currentSection].questions;
  const isCurrentSectionComplete = currentQuestions.every(q => answers[q.id]);
  const isLastSection = currentSection === sections.length - 1;
  const isFirstSection = currentSection === 0;

  const handleNext = () => {
    if (isLastSection) {
      onSubmit(answers);
    } else {
      setCurrentSection(prev => prev + 1);
      // Scroll to top when changing sections
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    setCurrentSection(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calcular progresso geral
  const totalQuestions = questionnaire.length;
  const answeredQuestions = Object.keys(answers).length;
  const progress = (answeredQuestions / totalQuestions) * 100;

  return (
      <div className="max-w-3xl mx-auto p-4">
        {/* Header com progresso */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-school-navy">
              {sections[currentSection].title}
            </h2>
            <div className="text-right">
            <span className="text-school-navy/70 block">
              Section {currentSection + 1} of {sections.length}
            </span>
              <span className="text-school-navy/70 block text-sm">
              {answeredQuestions} of {totalQuestions} questions answered
            </span>
            </div>
          </div>

          {/* Barra de progresso */}
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
                className="bg-gradient-to-r from-school-navy to-school-red h-2 transition-all duration-300"
                style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Questões */}
        <div className="space-y-6">
          {currentQuestions.map((question) => (
              <div key={question.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-school-navy to-school-red" />
                <div className="p-6">
                  <p className="text-lg font-medium text-school-navy mb-4">{question.prompt}</p>
                  <div className="space-y-3">
                    {question.options.map((option) => (
                        <label
                            key={option.value}
                            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all
                      ${answers[question.id] === option.value
                                ? 'border-school-red bg-school-red/5'
                                : 'border-gray-200 hover:border-school-red/30'}`}
                        >
                          <input
                              type="radio"
                              name={question.id}
                              value={option.value}
                              checked={answers[question.id] === option.value}
                              onChange={() => handleAnswer(question.id, option.value)}
                              className="h-4 w-4 text-school-red focus:ring-school-red"
                          />
                          <span className="ml-3 text-school-navy/80">{option.label}</span>
                        </label>
                    ))}
                  </div>
                </div>
              </div>
          ))}
        </div>

        {/* Botões de navegação */}
        <div className="mt-8 flex justify-between">
          {!isFirstSection && (
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
              disabled={!isCurrentSectionComplete}
              className={`inline-flex items-center px-6 py-3 border-2 text-base font-medium rounded-lg transition-colors
            ${isCurrentSectionComplete
                  ? 'border-school-red bg-school-red text-white hover:bg-school-red/90'
                  : 'border-gray-300 bg-gray-300 text-white cursor-not-allowed'
              }`}
          >
            {isLastSection ? (
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

        {/* Indicador de progresso móvel */}
        <div className="mt-4 text-center text-sm text-school-navy/70 md:hidden">
          {Math.round(progress)}% completed
        </div>
      </div>
  );
}

export default QuestionnaireForm;