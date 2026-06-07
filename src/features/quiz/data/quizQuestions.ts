import type { DailyQuote } from "@/features/learning/data/dailyQuotes";

export type QuizQuestion = {
  id: string;
  /** The context label shown as the question prompt */
  context: string;
  /** The full quote text that is the correct answer */
  correctAnswer: string;
  /** All 4 options shuffled (includes correctAnswer) */
  options: string[];
  correctIndex: number;
};

export type QuizResult = {
  question: QuizQuestion;
  selectedIndex: number | null;
  isCorrect: boolean;
};

/** Seeded pseudo-random — deterministic per chapter so "same quiz per day" if desired */
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 4294967296;
  };
}

/** Fisher-Yates shuffle with a provided rng */
function shuffle<T>(arr: T[], rng: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Generates up to `count` quiz questions from the given month's quotes.
 * Each question uses one quote as the correct answer and picks 3 distractors
 * from other quotes in the same month.
 */
export function generateQuizQuestions(
  quotes: DailyQuote[],
  count = 10,
  seedOffset = 0,
): QuizQuestion[] {
  if (quotes.length < 4) return [];

  const rng = seededRandom(
    quotes.reduce((acc, q) => acc + q.month * 31 + q.day, 0) + seedOffset,
  );

  // Pick `count` questions randomly from all available quotes
  const shuffledQuotes = shuffle(quotes, rng).slice(0, Math.min(count, quotes.length));

  return shuffledQuotes.map((correct) => {
    // Pick 3 distractors from other quotes
    const distractors = shuffle(
      quotes.filter((q) => q.day !== correct.day || q.quote !== correct.quote),
      rng,
    )
      .slice(0, 3)
      .map((q) => q.quote);

    const allOptions = shuffle([correct.quote, ...distractors], rng);
    const correctIndex = allOptions.indexOf(correct.quote);

    return {
      id: `q-${correct.month}-${correct.day}`,
      context: correct.context,
      correctAnswer: correct.quote,
      options: allOptions,
      correctIndex,
    };
  });
}

const QUIZ_STORAGE_PREFIX = "quiz-best-score-ch";

export function getBestScore(chapter: number): number | null {
  try {
    const raw = localStorage.getItem(`${QUIZ_STORAGE_PREFIX}${chapter}`);
    return raw !== null ? Number(raw) : null;
  } catch {
    return null;
  }
}

export function saveBestScore(chapter: number, score: number): void {
  try {
    const current = getBestScore(chapter);
    if (current === null || score > current) {
      localStorage.setItem(`${QUIZ_STORAGE_PREFIX}${chapter}`, String(score));
    }
  } catch {
    // localStorage not available
  }
}

export function formatScore(correct: number, total: number): string {
  return `${correct}/${total}`;
}

export function getScoreGrade(correct: number, total: number): "perfect" | "great" | "ok" | "low" {
  const pct = total > 0 ? correct / total : 0;
  if (pct === 1) return "perfect";
  if (pct >= 0.7) return "great";
  if (pct >= 0.4) return "ok";
  return "low";
}
