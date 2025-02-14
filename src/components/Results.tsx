// src/components/Results.tsx
import React from 'react';
import { Results as ScoringResults } from '../utils/scoring';

interface ResultsProps {
  answers: Record<string, string>;
  results: ScoringResults;
  onReset: () => void;
}

function Results({ answers, results, onReset }: ResultsProps) {
  const { course, level, confidence, details } = results;

  if (course === 'Uncertain' && level === 'Uncertain') {
    // show a special "No strong recommendation" block
    return (
        <div className="max-w-2xl mx-auto mt-8 px-4">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Inconclusive
            </h2>
            <p className="mb-6 text-gray-700">
              {details.advice}
            </p>
            <button
                onClick={onReset}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Start Over
            </button>
          </div>
        </div>
    );
  }

  // otherwise, same normal approach
  return (
      <div className="max-w-4xl mx-auto mt-8 px-4">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Your Recommended Course
          </h2>
          <p className="mb-6">
            Based on your responses, we suggest:
          </p>

          <div className="p-4 bg-gray-50 border-l-4 border-indigo-600 rounded-r-md mb-6">
            <h3 className="text-xl font-semibold text-indigo-700 mb-2">
              {course === 'AA' ? 'Analysis & Approaches' : 'Applications & Interpretation'} ({level})
            </h3>
            <p className="text-sm text-indigo-800">
              Confidence: <strong>{confidence}%</strong>
            </p>
          </div>

          {/* Course Focus */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Course Focus</h3>
            <p className="text-gray-700">{details.focus}</p>
          </div>

          {/* Learning Style */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Learning Style Match</h3>
            <p className="text-gray-700">{details.style}</p>
          </div>

          {/* Advice */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Advice</h3>
            <p className="text-gray-700 whitespace-pre-line">
              {details.advice}
            </p>
          </div>

          <button
              onClick={onReset}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Start Over
          </button>
        </div>
      </div>
  );
}

export default Results;
