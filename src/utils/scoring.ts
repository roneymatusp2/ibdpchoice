// src/utils/scoring.ts

/**
 * This interface represents the final result of the questionnaire scoring.
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

export function calculateResults(answers: Record<string, string>): Results {
  let aaScore = 0; // Analysis & Approaches
  let aiScore = 0; // Applications & Interpretation
  let hlScore = 0; // Higher Level
  let slScore = 0; // Standard Level

  // 1) Score the 30 career questions (Q1..Q30):
  for (let q = 1; q <= 30; q++) {
    const questionId = `Q${q}`;
    const answer = answers[questionId] || '';

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
        // E/F => skip
      default:
        break;
    }
  }

  // 2) Score sample IB math problems (Q31..Q34) => correct => +1 HL
  const sampleAnswersMap: Record<string, string> = {
    Q31: 'A', // mean = 82
    Q32: 'B', // f(5)=13
    Q33: 'B', // max at n=20
    Q34: 'A', // factor => (x-1)(x^2-5x+6)
  };
  for (let q = 31; q <= 34; q++) {
    const questionId = `Q${q}`;
    if (sampleAnswersMap[questionId] && answers[questionId] === sampleAnswersMap[questionId]) {
      hlScore += 1;
    }
  }

  // 3) Score basic math questions (Q35..Q36) => correct => +1 HL
  // Q35 => "B" (40 cm²), Q36 => "B" (12.5%)
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

  // 4) Determine final course & level
  const course = aaScore >= aiScore ? 'AA' : 'AI';
  const level = hlScore >= slScore ? 'HL' : 'SL';

  // 5) Confidence: measure difference in dimension preference
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

  // 6) Construct feedback
  const details = {
    focus: getFocusDescription(course, level),
    style: getLearningStyleDescription(course, level),
    advice: getAdvice(confidence, course, level, courseConfidence, levelConfidence),
  };

  return { course, level, confidence, details };
}

//---------------- HELPER FUNCTIONS ----------------//

function getFocusDescription(course: 'AA' | 'AI', level: 'HL' | 'SL'): string {
  if (course === 'AA') {
    return level === 'HL'
        ? "Strong emphasis on pure mathematics, proofs, and abstract thinking. Ideal for engineering, physics, or math-heavy fields needing deep theory."
        : "A balanced theoretical approach at a moderate depth. Good for those who enjoy concepts without the intensity of HL.";
  } else {
    // AI
    return level === 'HL'
        ? "Emphasizes real-world modeling, data analysis, and technology at a higher depth. Great for future economists, data scientists, or social scientists."
        : "Practical math focusing on modeling and stats with a lighter load, suitable for broader fields that need math literacy without heavy abstraction.";
  }
}

function getLearningStyleDescription(course: 'AA' | 'AI', level: 'HL' | 'SL'): string {
  if (course === 'AA') {
    if (level === 'HL') {
      return "Your responses suggest a preference for rigorous, theoretical challenges and enjoyment of underlying structures and proofs.";
    } else {
      return "You show interest in conceptual math but likely prefer a more balanced pace than HL demands. AA SL can offer solid theory without overload.";
    }
  } else {
    // AI
    if (level === 'HL') {
      return "You indicated a strong inclination for applied math and real-world contexts, enjoying data-driven or tech-driven solutions at a deeper level.";
    } else {
      return "You appreciate math when it’s concrete and integrated with technology, but prefer a lighter workload. AI SL fits that practical, moderate approach.";
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
    advice = `Your results strongly point to ${course} ${level} with a confidence of ${confidence}%. This indicates a strong match for your interests and aptitudes. Still, consult a teacher or counselor if you have specific university requirements.`;
  } else if (confidence >= 60) {
    advice = `You lean toward ${course} ${level}, at a moderate confidence of ${confidence}%. Consider a discussion with educators to confirm this choice. `;
    if (courseConfidence > levelConfidence) {
      advice += `You show a clearer preference for ${course} than for the chosen level (HL vs SL). Double-check if HL or SL is right for your schedule and ambition.`;
    } else {
      advice += `You show a clearer preference for ${level} level but the course dimension is less certain. Ensure AA vs AI truly aligns with your future goals.`;
    }
  } else {
    advice = `Your preference isn't very strong (confidence ${confidence}%). We suggest further reflection or discussion with a counselor/teacher. Evaluate your comfort with abstract vs. applied math, your available study time, and any university prerequisites. Exploring both AA and AI (HL or SL) sample content might clarify your direction.`;
  }

  return advice;
}
