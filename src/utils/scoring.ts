// src/utils/scoring.ts

/**
 * This interface represents the final result of the questionnaire scoring.
 *  - course: which math course is recommended ("AA" or "AI")
 *  - level: recommended level ("HL" or "SL")
 *  - confidence: integer from 0 to 100
 *  - details: extra text about focus, style, and final advice
 */
export interface Results {
  course: 'AA' | 'AI';
  level: 'HL' | 'SL';
  confidence: number;
  details: {
    focus: string;
    style: string;
    advice: string;
  };
}

/**
 * This function takes the user's answers and returns a recommended course,
 * recommended level, an overall confidence score, and descriptive text.
 *
 * answers: a record of question IDs ("Q1","Q2",...) mapped to answers ("A","B","C","D", etc.)
 */
export function calculateResults(answers: Record<string, string>): Results {
  let aaScore = 0; // Analysis & Approaches
  let aiScore = 0; // Applications & Interpretation
  let hlScore = 0; // Higher Level
  let slScore = 0; // Standard Level

  // 1) Score the 30 career-focused questions (Q1..Q30):
  //    Each question answer => A/B/C/D/E/F. We'll interpret:
  //    A => +2 to AA, +2 to HL
  //    B => +2 to AA, +2 to SL
  //    C => +2 to AI, +2 to HL
  //    D => +2 to AI, +2 to SL
  //    E or F => skip => no effect
  for (let q = 1; q <= 30; q++) {
    const questionId = `Q${q}`;
    const answer = answers[questionId] || ''; // default to empty if not answered

    switch (answer) {
      case 'A':
        aaScore += 2;
        hlScore += 2;
        break;
      case 'B':
        aaScore += 2;
        slScore += 2;
        break;
      case 'C':
        aiScore += 2;
        hlScore += 2;
        break;
      case 'D':
        aiScore += 2;
        slScore += 2;
        break;
      default:
        // E, F, or missing => no effect
        break;
    }
  }

  // 2) Score the 4 sample IB Math problems (Q31..Q34).
  //    If user picks the correct answer, we give a small +1 HL boost (no effect on AA vs AI).
  //    Q31 correct => "A"  (82)
  //    Q32 correct => "B"  (13)
  //    Q33 correct => "B"  (20)
  //    Q34 correct => "A"  ((x-1)(x^2 -5x +6))
  const sampleAnswersMap: Record<string, string> = {
    Q31: 'A',
    Q32: 'B',
    Q33: 'B',
    Q34: 'A',
  };

  for (let q = 31; q <= 34; q++) {
    const questionId = `Q${q}`;
    if (sampleAnswersMap[questionId] && answers[questionId] === sampleAnswersMap[questionId]) {
      hlScore += 1;
    }
  }

  // 3) Score the 2 basic math questions (Q35..Q36).
  //    If correct => +1 HL as well.
  //    Q35 correct => "B" (40 cm²)
  //    Q36 correct => "B" (12.5%)
  const basicMathMap: Record<string, string> = {
    Q35: 'B',
    Q36: 'B',
  };

  for (let q = 35; q <= 36; q++) {
    const questionId = `Q${q}`;
    if (basicMathMap[questionId] && answers[questionId] === basicMathMap[questionId]) {
      hlScore += 1;
    }
  }

  // 4) Determine final course (AA vs AI)
  const course = aaScore >= aiScore ? 'AA' : 'AI';

  // 5) Determine final level (HL vs SL)
  const level = hlScore >= slScore ? 'HL' : 'SL';

  // 6) Calculate confidence
  //    We'll measure how strongly the user leans course & level by difference in scores.
  const totalCourseScore = aaScore + aiScore;
  const diffCourse = Math.abs(aaScore - aiScore);
  let courseConfidence = 50;
  if (totalCourseScore > 0) {
    courseConfidence = Math.round((diffCourse / totalCourseScore) * 100);
  }

  const totalLevelScore = hlScore + slScore;
  const diffLevel = Math.abs(hlScore - slScore);
  let levelConfidence = 50;
  if (totalLevelScore > 0) {
    levelConfidence = Math.round((diffLevel / totalLevelScore) * 100);
  }

  const confidence = Math.round((courseConfidence + levelConfidence) / 2);

  // 7) Build the details object
  const details = {
    focus: getFocusDescription(course, level),
    style: getLearningStyleDescription(course, level),
    advice: getAdvice(confidence, course, level, courseConfidence, levelConfidence),
  };

  return { course, level, confidence, details };
}

//-------------------------- HELPER FUNCTIONS --------------------------------//

function getFocusDescription(course: 'AA' | 'AI', level: 'HL' | 'SL'): string {
  if (course === 'AA') {
    // Analysis & Approaches
    return level === 'HL'
        ? "Strong emphasis on pure mathematics, proofs, and abstract thinking. Ideal for those pursuing engineering, physics, or mathematics who need a deep theoretical understanding."
        : "Balances theoretical mathematics with moderate depth. Suitable for students who like conceptual understanding but want a more manageable workload than HL.";
  } else {
    // Applications & Interpretation
    return level === 'HL'
        ? "Focuses on real-world modeling, data analysis, and technology use at a challenging level. Great for future economists, data analysts, or social scientists who need robust applied math."
        : "Practical approach to math with a lighter load. Emphasizes modeling, statistics, and technology. Ideal for students who want math skills relevant to broader fields without intense abstraction.";
  }
}

function getLearningStyleDescription(course: 'AA' | 'AI', level: 'HL' | 'SL'): string {
  if (course === 'AA') {
    if (level === 'HL') {
      return "Your answers suggest a preference for in-depth, abstract thinking and comfort with rigorous problem solving. You likely enjoy seeing the underlying structures and proofs in mathematics.";
    } else {
      return "You show interest in conceptual mathematics but may prefer a balanced pace. AA SL provides foundational theory without overwhelming abstraction.";
    }
  } else {
    if (level === 'HL') {
      return "You indicated a strong inclination for applied contexts, data analysis, and real-world models. AI HL lets you explore these practical applications at a deeper complexity.";
    } else {
      return "You appreciate math when it’s concrete, relevant, and integrated with technology. AI SL is a practical choice to gain math literacy while keeping workload balanced.";
    }
  }
}

function getAdvice(
    confidence: number,
    course: 'AA' | 'AI',
    level: 'HL' | 'SL',
    courseConfidence: number,
    levelConfidence: number
): string {
  let advice = "";

  if (confidence >= 80) {
    advice += `Your responses strongly indicate that ${course} ${level} is an excellent match (Confidence: ${confidence}%). `;
    advice += "This suggests your interests align well with that track. Still, confirm with math educators or advisors if you have specific university goals.";
  } else if (confidence >= 60) {
    advice += `You appear to lean towards ${course} ${level}, with moderate confidence (~${confidence}%). `;
    advice += "It's worth discussing with a teacher to ensure it fits your overall plan. ";
    if (courseConfidence > levelConfidence) {
      advice += `You show a clearer preference for ${course} dimension than ${level} dimension. Double-check if HL or SL best fits your schedule and comfort.`;
    } else {
      advice += `You show a clearer preference for ${level} dimension than ${course} dimension. Verify whether AA or AI truly matches your career goals.`;
    }
  } else {
    advice += `Your profile suggests a less decisive preference (Confidence: ${confidence}%). `;
    advice += "We recommend further reflection, possibly discussing with a counselor or teacher. Consider your comfort with abstract vs. applied math, your available study time, and any university requirements. ";
    advice += "Try exploring sample materials for both AA and AI, at HL and SL, before finalizing your choice.";
  }

  return advice;
}
