// src/utils/scoring.ts

export interface Results {
  course: 'AA' | 'AI' | 'Uncertain';
  level: 'HL' | 'SL' | 'Uncertain';
  confidence: number;
  details: {
    focus: string;  // or an empty string if Uncertain
    style: string;
    advice: string;
  };
}

export function calculateResults(answers: Record<string, string>): Results {
  let aaScore = 0;
  let aiScore = 0;
  let hlScore = 0;
  let slScore = 0;

  // (same scoring logic for Q1..Q30)
  for (let q = 1; q <= 30; q++) {
    const ans = answers[`Q${q}`] || '';
    switch (ans) {
      case 'A':
        aaScore += 2; hlScore += 2; break;
      case 'B':
        aaScore += 2; slScore += 2; break;
      case 'C':
        aiScore += 2; hlScore += 2; break;
      case 'D':
        aiScore += 2; slScore += 2; break;
        // E/F => skip
      default: break;
    }
  }

  // (sample problems bonus => +1 HL if correct)
  const sampleAnswersMap: Record<string, string> = {
    Q31: 'A', Q32: 'B', Q33: 'B', Q34: 'A'
  };
  for (let q = 31; q <= 34; q++) {
    if (answers[`Q${q}`] === sampleAnswersMap[`Q${q}`]) {
      hlScore += 1;
    }
  }

  // (basic math bonus => +1 HL if correct)
  const basicMathMap: Record<string, string> = {
    Q35: 'B', // area=40
    Q36: 'B', // 12.5%
  };
  for (let q = 35; q <= 36; q++) {
    if (answers[`Q${q}`] === basicMathMap[`Q${q}`]) {
      hlScore += 1;
    }
  }

  // Determine course
  let finalCourse: 'AA' | 'AI' | 'Uncertain';
  if (aaScore > aiScore) finalCourse = 'AA';
  else if (aiScore > aaScore) finalCourse = 'AI';
  else finalCourse = 'Uncertain'; // e.g. exact tie

  // Determine level
  let finalLevel: 'HL' | 'SL' | 'Uncertain';
  if (hlScore > slScore) finalLevel = 'HL';
  else if (slScore > hlScore) finalLevel = 'SL';
  else finalLevel = 'Uncertain';

  // Confidence by dimension difference
  const totalCourse = aaScore + aiScore;
  const diffCourse = Math.abs(aaScore - aiScore);
  let courseConfidence = 50;
  if (totalCourse > 0) {
    courseConfidence = Math.round((diffCourse / totalCourse) * 100);
  }

  const totalLevel = hlScore + slScore;
  const diffLevel = Math.abs(hlScore - slScore);
  let levelConfidence = 50;
  if (totalLevel > 0) {
    levelConfidence = Math.round((diffLevel / totalLevel) * 100);
  }

  const finalConfidence = Math.round((courseConfidence + levelConfidence) / 2);

  // If finalConfidence < 40 => no strong recommendation
  if (finalConfidence < 40) {
    return {
      course: 'Uncertain',
      level: 'Uncertain',
      confidence: finalConfidence,
      details: {
        focus: '',
        style: '',
        advice: `Your preference isn't strong (confidence ${finalConfidence}%). We cannot give a definitive recommendation. We suggest deeper reflection or discussion with counselors/teachers. Try exploring both AA/AI at HL/SL to see which resonates with you.`
      }
    };
  }

  // Otherwise, we use the normal approach:
  // (If finalCourse or finalLevel is 'Uncertain' from a tie, you can special-case that too.)
  const c = finalCourse === 'Uncertain' ? (aaScore >= aiScore ? 'AA' : 'AI') : finalCourse;
  const l = finalLevel === 'Uncertain' ? (hlScore >= slScore ? 'HL' : 'SL') : finalLevel;

  const focus = getFocusDescription(c, l);
  const style = getLearningStyleDescription(c, l);
  const advice = getTieredAdvice(finalConfidence, c, l, courseConfidence, levelConfidence);

  return {
    course: c,
    level: l,
    confidence: finalConfidence,
    details: { focus, style, advice }
  };
}

//-- Additional helper fns, possibly the same but changed advice for tiers --//
function getFocusDescription(course: 'AA' | 'AI', level: 'HL' | 'SL'): string {
  if (course === 'AA') {
    return level === 'HL'
        ? "Strong emphasis on pure math, proofs, abstract thinking. Ideal for engineering, physics, or math-heavy fields needing deep theory."
        : "A balanced theoretical approach at moderate depth. Good for conceptual math lovers but not as rigorous as HL.";
  } else {
    // AI
    return level === 'HL'
        ? "Focus on real-world modeling, data analysis, and technology, with higher rigor. Great for economists, data scientists, or social-science fields needing robust applied math."
        : "Practical math with a lighter load, focusing on modeling/statistics. Perfect for broader fields that need math literacy without too much abstraction.";
  }
}

function getLearningStyleDescription(course: 'AA' | 'AI', level: 'HL' | 'SL'): string {
  if (course === 'AA') {
    if (level === 'HL') {
      return "You seem to enjoy rigorous theoretical challenges, underlying structures, and proofs in mathematics.";
    } else {
      return "You like conceptual math but prefer a more manageable pace than HL. AA SL can give you that theoretical foundation without overload.";
    }
  } else {
    if (level === 'HL') {
      return "You indicated a strong inclination for applied math, real-world contexts, and data-driven or tech-driven solutions at a deeper level.";
    } else {
      return "You appreciate math when it's concrete and integrated with technology, but prefer a moderate workload. AI SL fits that practical approach.";
    }
  }
}

function getTieredAdvice(
    finalConfidence: number,
    course: 'AA' | 'AI',
    level: 'HL' | 'SL',
    courseConfidence: number,
    levelConfidence: number
): string {
  if (finalConfidence >= 80) {
    return `Very strong indication of ${course} ${level} (Confidence: ${finalConfidence}%). This suggests an excellent fit. Still, confirm with teachers if you have specific university requirements.`;
  } else if (finalConfidence >= 60) {
    let text = `You have a moderate preference for ${course} ${level} (~${finalConfidence}% confidence).`;
    if (courseConfidence > levelConfidence) {
      text += ` You favor the ${course} dimension more strongly than HL vs SL. Double-check if HL or SL truly suits your schedule and ambitions.`;
    } else {
      text += ` You favor the ${level} dimension more clearly than AA vs AI. Ensure that ${course} is the right path for your future goals.`;
    }
    return text;
  } else {
    // covers 40-59
    let text = `Your preference is relatively weak (~${finalConfidence}% confidence), so proceed with caution. `;
    text += "We suggest talking with an advisor, checking sample materials, or exploring additional practice to be certain.";
    return text;
  }
}
