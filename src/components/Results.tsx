// src/components/Results.tsx

import React from 'react';
import { Results as ScoringResults } from '../utils/scoring';

interface ResultsProps {
  answers: Record<string, string>;
  // "results" is the final object from the scoring function
  results: ScoringResults;
  onReset: () => void;
}

function Results({ answers, results, onReset }: ResultsProps) {
  const { course, level, confidence, details } = results;
  const { focus, style, advice } = details;

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

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Course Focus</h3>
            <p className="text-gray-700">
              {focus}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Learning Style Match</h3>
            <p className="text-gray-700">
              {style}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Advice</h3>
            <p className="text-gray-700 whitespace-pre-line">
              {advice}
            </p>
          </div>

          <button
              onClick={onReset}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Start Over
          </button>
        </div>
      </div>
  );
}

export default Results;
