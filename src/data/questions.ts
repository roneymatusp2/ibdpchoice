// src/questions.ts

export interface QuestionOption {
  label: string;
  value: string;
}

export interface Question {
  id: string;         // e.g. "Q1", "Q2", ...
  prompt: string;     // The question text
  options: QuestionOption[];
}

/**
 * Comprehensive IB Math questionnaire:
 *
 *  - Q1..Q30: Career-focused items referencing engineering, business, humanities, creative fields,
 *    but no explicit calculus mentions.
 *  - Q31..Q34: Sample IB Math problems (light-level examples).
 *  - Q35..Q36: Two extra basic math questions (AASL/AISL) about rectangle area and simple percentage.
 */
export const questionnaire: Question[] = [
  // --------------------- CAREER-FOCUSED (Q1 - Q30) ---------------------
  {
    id: "Q1",
    prompt: "Which group of subjects typically excites you more?",
    options: [
      { label: "Physics, Engineering, Architecture, Mathematics", value: "A" },
      { label: "Journalism, Public Relations, History, Philosophy", value: "B" },
      { label: "Business, Economics, Accounting, Finance", value: "C" },
      { label: "Arts, Design, Literature, Creative Writing", value: "D" },
      { label: "Skip this question.", value: "E" },
    ],
  },
  {
    id: "Q2",
    prompt: "When you think about data analysis (reading charts/reports), how do you feel?",
    options: [
      { label: "I love interpreting data to make decisions or predictions.", value: "A" },
      { label: "I see it as a tool, but I'm more interested in big ideas/theories.", value: "B" },
      { label: "I prefer focusing on people-oriented fields, less on data.", value: "C" },
      { label: "Data can be useful, but I'd rather not dive too deep.", value: "D" },
      { label: "Skip this question.", value: "E" },
    ],
  },
  {
    id: "Q3",
    prompt: "Which type of project do you find more rewarding?",
    options: [
      { label: "A technical blueprint or prototype design (e.g., engineering concept).", value: "A" },
      { label: "A philosophical or historical investigation.", value: "B" },
      { label: "A business case study with economic or financial data.", value: "C" },
      { label: "A creative/artistic exploration or novel concept design.", value: "D" },
      { label: "Skip this question.", value: "E" },
    ],
  },
  {
    id: "Q4",
    prompt: "How do you generally prefer to solve problems?",
    options: [
      { label: "By applying structured, technical methods or models.", value: "A" },
      { label: "By discussing broader perspectives, focusing on conceptual frameworks.", value: "B" },
      { label: "By gathering relevant data and analyzing for practical conclusions.", value: "C" },
      { label: "By brainstorming creative solutions without heavy data/technicalities.", value: "D" },
      { label: "Skip this question.", value: "E" },
    ],
  },
  {
    id: "Q5",
    prompt: "Which future career cluster sounds most appealing?",
    options: [
      { label: "Engineering, Architecture, or Physics-related careers.", value: "A" },
      { label: "Media, Journalism, or Social-Science/Policy fields.", value: "B" },
      { label: "Business, Management, or Accounting/Finance fields.", value: "C" },
      { label: "Creative industries (design, art, film, etc.).", value: "D" },
      { label: "Skip this question.", value: "E" },
    ],
  },
  {
    id: "Q6",
    prompt: "In making decisions, do you prefer a big-picture approach or detailed data?",
    options: [
      { label: "I rely heavily on structured models or advanced concepts.", value: "A" },
      { label: "I like theoretical frameworks or conceptual discussion first.", value: "B" },
      { label: "I appreciate data but also weigh practical business constraints.", value: "C" },
      { label: "I prefer intuitive/creative approaches rather than heavy data usage.", value: "D" },
      { label: "Skip this question.", value: "E" },
    ],
  },
  {
    id: "Q7",
    prompt: "You have to choose a research topic. Which resonates most?",
    options: [
      { label: "Designing or testing a structural or technical system (like an engineering concept).", value: "A" },
      { label: "A philosophical or historical analysis (conceptual or theoretical).", value: "B" },
      { label: "A business or economic case study with real data.", value: "C" },
      { label: "A creative/artistic exploration—film, media, or design.", value: "D" },
      { label: "Skip this question.", value: "E" },
    ],
  },
  {
    id: "Q8",
    prompt: "How do you handle large sets of information?",
    options: [
      { label: "I methodically break them down into smaller technical parts.", value: "A" },
      { label: "I focus on overarching narratives or conceptual insights.", value: "B" },
      { label: "I systematically analyze data points—spreadsheets, tools, etc.", value: "C" },
      { label: "I look for creative or intuitive angles rather than raw data analysis.", value: "D" },
      { label: "Skip this question.", value: "E" },
    ],
  },
  {
    id: "Q9",
    prompt: "If you joined a new club, which type would you gravitate toward?",
    options: [
      { label: "Engineering/robotics club, building prototypes.", value: "A" },
      { label: "Debate, philosophy, or social sciences club for deep discussions.", value: "B" },
      { label: "Entrepreneurship or investment club focusing on business ideas.", value: "C" },
      { label: "Drama, art, or film club exploring creativity.", value: "D" },
      { label: "Skip this question.", value: "E" },
    ],
  },
  {
    id: "Q10",
    prompt: "Regarding technology and innovation, which resonates most?",
    options: [
      { label: "I love advanced tools—envision a technical/engineering role.", value: "A" },
      { label: "I'm into ethics, social impact, or global policy around tech.", value: "B" },
      { label: "I see innovation mainly as a business advantage—market analysis, ROI, etc.", value: "C" },
      { label: "I’m drawn to creative applications—media, design, user experience.", value: "D" },
      { label: "Skip this question.", value: "E" },
    ],
  },
  {
    id: "Q11",
    prompt: "If asked to analyze a real-world challenge, do you prefer numeric or conceptual approaches?",
    options: [
      { label: "Numeric or technical—give me models/structural solutions!", value: "A" },
      { label: "Conceptual or theoretical—discourse, philosophy, or social context.", value: "B" },
      { label: "Mixed—some data analysis plus practical/business angles.", value: "C" },
      { label: "Creative—less raw data, more design or imaginative solutions.", value: "D" },
      { label: "Skip this question.", value: "E" },
    ],
  },
  {
    id: "Q12",
    prompt: "Which statement best fits your dream project in college?",
    options: [
      { label: "Designing a physical system or evaluating structural feasibility (engineering style).", value: "A" },
      { label: "Writing in-depth essays or researching historical/political contexts.", value: "B" },
      { label: "Creating a business plan or analyzing financial/economic trends.", value: "C" },
      { label: "Producing an artistic portfolio, film, or design project.", value: "D" },
      { label: "Skip this question.", value: "E" },
    ],
  },
  {
    id: "Q13",
    prompt: "Which environment do you see yourself thriving in?",
    options: [
      { label: "A lab or workshop, building prototypes or mechanical devices.", value: "A" },
      { label: "A think tank or editorial room, discussing or writing about ideas.", value: "B" },
      { label: "A corporate office or entrepreneurial setting, analyzing data for strategy.", value: "C" },
      { label: "A creative studio, focusing on design, storytelling, or visual artistry.", value: "D" },
      { label: "Skip this question.", value: "E" },
    ],
  },
  {
    id: "Q14",
    prompt: "Imagine working heavily with spreadsheets or large datasets. How do you feel?",
    options: [
      { label: "Excited—I'd enjoy building complex or structural models from it.", value: "A" },
      { label: "Neutral—I'd rather handle conceptual/humanities tasks than big data sets.", value: "B" },
      { label: "Very comfortable—data is essential for business or economic insights.", value: "C" },
      { label: "I'd prefer creative tasks or people-focused efforts over heavy data analysis.", value: "D" },
      { label: "Skip this question.", value: "E" },
    ],
  },
  {
    id: "Q15",
    prompt: "When planning your future university path, which factor do you consider most?",
    options: [
      { label: "Technical/engineering rigor—designing and building solutions.", value: "A" },
      { label: "Intellectual exploration—history, philosophy, or critical analysis of ideas.", value: "B" },
      { label: "Practical outcomes—business prospects, economic stability, finance, etc.", value: "C" },
      { label: "Artistic or creative expression—designer, filmmaker, artist, etc.", value: "D" },
      { label: "Skip this question.", value: "E" },
    ],
  },
  {
    id: "Q16",
    prompt: "You’re assigned to research an unfamiliar topic. How do you approach it?",
    options: [
      { label: "Dive into structural/technical details; maybe build a small model or experiment.", value: "A" },
      { label: "Read extensively for conceptual/historical angles, writing analyses.", value: "B" },
      { label: "Collect data or market info, then assess for strategic or economic patterns.", value: "C" },
      { label: "Look for creative inspiration or unique ways to present it visually.", value: "D" },
      { label: "Skip this question.", value: "E" },
    ],
  },
  {
    id: "Q17",
    prompt: "How do you usually handle group projects?",
    options: [
      { label: "I become the technical/structural lead, ensuring feasibility.", value: "A" },
      { label: "I lead discussions or writing tasks, focusing on theory or big-picture ideas.", value: "B" },
      { label: "I manage data, finances, or logistical planning—crunching numbers if needed.", value: "C" },
      { label: "I handle creative direction, media, or presentation aesthetics.", value: "D" },
      { label: "Skip this question.", value: "E" },
    ],
  },
  {
    id: "Q18",
    prompt: "Which statement resonates most about math in your future studies?",
    options: [
      { label: "Math as a tool for building physical systems or engineering feats intrigues me.", value: "A" },
      { label: "Math is secondary; I'd prefer humanities or social science focus.", value: "B" },
      { label: "Math is crucial for business/economics decisions; I'd rely on it for success.", value: "C" },
      { label: "Math is okay, but I'm primarily drawn to creativity/design or artistic logic.", value: "D" },
      { label: "Skip this question.", value: "E" },
    ],
  },
  {
    id: "Q19",
    prompt: "When tackling real-life problems, is math central or peripheral?",
    options: [
      { label: "Central for technical/engineering pursuits—foundation of solutions.", value: "A" },
      { label: "Peripheral—I see math as supportive, but prefer social/theoretical angles.", value: "B" },
      { label: "Central for business/finance—numbers drive key decisions.", value: "C" },
      { label: "Peripheral for creative fields—maybe budgets or perspective, but not main focus.", value: "D" },
      { label: "Skip this question.", value: "E" },
    ],
  },
  {
    id: "Q20",
    prompt: "Envision your ideal day at university. Which scenario excites you more?",
    options: [
      { label: "Labs, building prototypes, or tinkering with robotics/mechanics.", value: "A" },
      { label: "Seminars on politics, ethics, or philosophical readings.", value: "B" },
      { label: "Case studies in business or analyzing corporate/economic data.", value: "C" },
      { label: "Workshops on visual arts, creative writing, or design principles.", value: "D" },
      { label: "Skip this question.", value: "E" },
    ],
  },
  {
    id: "Q21",
    prompt: "Why choose a specialized math course within IB?",
    options: [
      { label: "I need it to excel in engineering/technical degrees.", value: "A" },
      { label: "I want the minimum math requirement, focusing on humanities.", value: "B" },
      { label: "I want strong applied math for business, finance, or economics fields.", value: "C" },
      { label: "I'm unsure, but I'd pick a moderate course so I have time for creative pursuits.", value: "D" },
      { label: "Skip this question.", value: "E" },
    ],
  },
  {
    id: "Q22",
    prompt: "When friends describe your strengths, do they highlight your...",
    options: [
      { label: "Technical problem-solving or an 'engineering mind'?", value: "A" },
      { label: "Writing ability, discussion leadership, or historical/cultural insight?", value: "B" },
      { label: "Business acumen, planning, or numeric decision-making?", value: "C" },
      { label: "Artistic flair, creative thinking, or unique design ideas?", value: "D" },
      { label: "Skip this question.", value: "E" },
    ],
  },
  {
    id: "Q23",
    prompt: "Which area do you see as a fallback or safety net, if your main plan changes?",
    options: [
      { label: "A stable engineering or tech job—practical, in demand.", value: "A" },
      { label: "Move into education, policy, or writing fields if needed.", value: "B" },
      { label: "Business or accounting—always a demand for financial management.", value: "C" },
      { label: "Creative roles—design or media might be flexible fallback options.", value: "D" },
      { label: "Skip this question.", value: "E" },
    ],
  },
  {
    id: "Q24",
    prompt: "Which approach to learning do you prefer?",
    options: [
      { label: "Hands-on, practical tasks—labs, building solutions, immediate results.", value: "A" },
      { label: "Reading, writing, discussing historical/theoretical contexts.", value: "B" },
      { label: "Real-world data or business strategies for decision-making.", value: "C" },
      { label: "Exploratory, creative tasks—original designs or artistic flair.", value: "D" },
      { label: "Skip this question.", value: "E" },
    ],
  },
  {
    id: "Q25",
    prompt: "When given a complex problem, you typically...",
    options: [
      { label: "Try to systematically prototype or test potential technical solutions.", value: "A" },
      { label: "Write a structured essay or conceptual framework analyzing its roots.", value: "B" },
      { label: "Gather relevant data, weigh costs/benefits, then make a practical plan.", value: "C" },
      { label: "Brainstorm visually or creatively, focusing on novel presentation.", value: "D" },
      { label: "Skip this question.", value: "E" },
    ],
  },
  {
    id: "Q26",
    prompt: "Which statement about 'Applications & Interpretation' (AI) appeals to you more?",
    options: [
      { label: "It's good for engineering contexts—still real-world oriented, right?", value: "A" },
      { label: "Not sure; I'd prefer minimal math if focusing on humanities/theory.", value: "B" },
      { label: "Yes, especially for business/economics—applied math is crucial.", value: "C" },
      { label: "I see creative fields using data, but I'm only partly interested.", value: "D" },
      { label: "Skip this question.", value: "E" },
    ],
  },
  {
    id: "Q27",
    prompt: "Do you see yourself using math regularly in your future career?",
    options: [
      { label: "Yes, for engineering or technology solutions, definitely.", value: "A" },
      { label: "Maybe occasionally, but I'd mostly rely on conceptual or linguistic skills.", value: "B" },
      { label: "Yes, for finance, economics, or accounting tasks—numbers are central.", value: "C" },
      { label: "Somewhat—maybe for budgets or design specs, but not as a main focus.", value: "D" },
      { label: "Skip this question.", value: "E" },
    ],
  },
  {
    id: "Q28",
    prompt: "When discussing a societal issue, do you incorporate data or stay conceptual?",
    options: [
      { label: "Data is vital—I’d bring technical or structural evidence.", value: "A" },
      { label: "Conceptual/historical context is more important than raw data.", value: "B" },
      { label: "I lean heavily on economic or market statistics for real insight.", value: "C" },
      { label: "I might mention data, but prefer a narrative or creative viewpoint.", value: "D" },
      { label: "Skip this question.", value: "E" },
    ],
  },
  {
    id: "Q29",
    prompt: "Thinking about your next steps, which path do you lean toward?",
    options: [
      { label: "A 'technical' path (engineering, architecture, etc.).", value: "A" },
      { label: "A humanities or social-science path (journalism, policy, etc.).", value: "B" },
      { label: "A business or finance path (economics, accounting, etc.).", value: "C" },
      { label: "A creative path (design, art, media).", value: "D" },
      { label: "Skip this question.", value: "E" },
    ],
  },
  {
    id: "Q30",
    prompt: "Finally, how do you see math factoring into your overall IB experience?",
    options: [
      { label: "I might choose AA HL—I'm drawn to the rigor and abstract approach.", value: "A" },
      { label: "Maybe AA SL—some theory, but not as heavy as HL.", value: "B" },
      { label: "AI HL—applied math fits me if I'm aiming for data/business roles.", value: "C" },
      { label: "AI SL—an applied focus but at a lighter load, so I can do other things.", value: "D" },
      { label: "Still not sure—I'm open.", value: "E" },
      { label: "Skip this question.", value: "F" },
    ],
  },

  // --------------------- SAMPLE IB MATH (Q31 - Q34) ---------------------
  {
    id: "Q31",
    prompt: "Sample Problem 1: A survey at a cafe records cups sold over 5 days (80,72,95,88,75). Mean sold per day (nearest integer)?",
    options: [
      { label: "82", value: "A" },
      { label: "85", value: "B" },
      { label: "88", value: "C" },
      { label: "90", value: "D" },
      { label: "Skip (no answer)", value: "E" },
    ],
  },
  {
    id: "Q32",
    prompt: "Sample Problem 2: A function f(x)= x^2 - 2x + 3. Find f(5).",
    options: [
      { label: "18", value: "A" },
      { label: "13", value: "B" },
      { label: "3", value: "C" },
      { label: "8", value: "D" },
      { label: "Skip (no answer)", value: "E" },
    ],
  },
  {
    id: "Q33",
    prompt: "Sample Problem 3: A company’s weekly profit P(n)= 500n - 25n^2 (n in hundreds). For which integer n does the max occur?",
    options: [
      { label: "n=10", value: "A" },
      { label: "n=20", value: "B" },
      { label: "n=25", value: "C" },
      { label: "n=30", value: "D" },
      { label: "Skip (no answer)", value: "E" },
    ],
  },
  {
    id: "Q34",
    prompt: "Sample Problem 4: g(x)= x^3 -6x^2 +11x -6, with factor (x-1). Which factorization is correct?",
    options: [
      { label: "(x-1)(x^2 -5x +6)", value: "A" },
      { label: "(x-1)(x^2 + x +6)", value: "B" },
      { label: "(x+1)(x^2 -7x +6)", value: "C" },
      { label: "(x-1)(x^2 -6x +5)", value: "D" },
      { label: "Skip (no answer)", value: "E" },
    ],
  },

  // --------------------- BASIC MATH (AASL/AISL) (Q35 - Q36) ---------------------
  {
    id: "Q35",
    prompt: "Basic Math #1 (AASL/AISL): A rectangle is 5 cm by 8 cm. What is its area?",
    options: [
      { label: "13 cm²", value: "A" },
      { label: "40 cm²", value: "B" },
      { label: "10 cm²", value: "C" },
      { label: "58 cm²", value: "D" },
      { label: "Skip (no answer)", value: "E" },
    ],
  },
  {
    id: "Q36",
    prompt: "Basic Math #2 (AASL/AISL): In a class of 40, 20 prefer basketball, 15 prefer soccer, 5 prefer tennis. What % prefer tennis?",
    options: [
      { label: "5%", value: "A" },
      { label: "12.5%", value: "B" },
      { label: "25%", value: "C" },
      { label: "50%", value: "D" },
      { label: "Skip (no answer)", value: "E" },
    ],
  },
];
```