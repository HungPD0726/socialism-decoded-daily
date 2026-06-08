import { useState, useCallback } from "react";
import { createLazyFileRoute, getRouteApi, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { AppShell } from "@/components/AppShell";

import { QuizCard } from "@/features/quiz/components/QuizCard";
import { QuizProgress } from "@/features/quiz/components/QuizProgress";
import { QuizSummary } from "@/features/quiz/components/QuizSummary";
import {
  generateQuizQuestions,
  saveBestScore,
  type QuizQuestion,
  type QuizResult,
} from "@/features/quiz/data/quizQuestions";

const routeApi = getRouteApi("/quiz/$chapter");
const QUESTIONS_PER_QUIZ = 10;

export const Route = createLazyFileRoute("/quiz/$chapter")({
  component: QuizChapterPage,
});

type QuizState =
  | { phase: "playing"; questions: QuizQuestion[]; currentIndex: number; results: QuizResult[]; selectedIndex: number | null }
  | { phase: "done"; results: QuizResult[] };

function buildInitialState(questions: QuizQuestion[]): QuizState {
  return {
    phase: "playing",
    questions,
    currentIndex: 0,
    results: [],
    selectedIndex: null,
  };
}

function QuizChapterPage() {
  const { chapter, quotes } = routeApi.useLoaderData();

  const [seedOffset, setSeedOffset] = useState(0);
  const [quizState, setQuizState] = useState<QuizState>(() =>
    buildInitialState(generateQuizQuestions(quotes, QUESTIONS_PER_QUIZ, 0)),
  );

  const handleSelect = useCallback(
    (selectedIndex: number) => {
      if (quizState.phase !== "playing") return;
      if (quizState.selectedIndex !== null) return; // already answered

      setQuizState((prev) => {
        if (prev.phase !== "playing") return prev;
        return { ...prev, selectedIndex };
      });
    },
    [quizState],
  );

  const handleNext = useCallback(() => {
    if (quizState.phase !== "playing") return;
    const { questions, currentIndex, results, selectedIndex } = quizState;
    const q = questions[currentIndex];

    const newResult: QuizResult = {
      question: q,
      selectedIndex,
      isCorrect: selectedIndex === q.correctIndex,
    };
    const newResults = [...results, newResult];

    if (currentIndex + 1 >= questions.length) {
      // Done
      const correctCount = newResults.filter((r) => r.isCorrect).length;
      saveBestScore(chapter.n, correctCount);
      setQuizState({ phase: "done", results: newResults });
    } else {
      setQuizState({
        phase: "playing",
        questions,
        currentIndex: currentIndex + 1,
        results: newResults,
        selectedIndex: null,
      });
    }
  }, [quizState, chapter.n]);

  const handleRetry = useCallback(() => {
    const nextSeed = seedOffset + 1;
    setSeedOffset(nextSeed);
    setQuizState(buildInitialState(generateQuizQuestions(quotes, QUESTIONS_PER_QUIZ, nextSeed)));
  }, [quotes, seedOffset]);

  const handleRetryWrong = useCallback(() => {
    if (quizState.phase !== "done") return;
    const wrongQuestions = quizState.results
      .filter((r) => !r.isCorrect)
      .map((r) => r.question);
    if (wrongQuestions.length === 0) return;
    setQuizState(buildInitialState(wrongQuestions));
  }, [quizState]);

  return (
    <div className="min-h-screen bg-background text-foreground paper-grain">
      <AppShell
        extra={
          <Link
            to="/chuong/$chapter"
            params={{ chapter: String(chapter.n) }}
            className="text-sm font-medium text-muted-foreground underline-offset-4 transition hover:text-primary hover:underline"
          >
            Đọc nội dung chương
          </Link>
        }
      />

      <div className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-16">

        {/* Header */}
        <div className="mb-10">
          <div className="mb-2 text-xs font-medium uppercase tracking-[0.3em] text-primary">
            Quiz — Chủ đề {String(chapter.n).padStart(2, "0")}
          </div>
          <h1 className="font-display text-4xl leading-tight md:text-5xl">{chapter.title}</h1>
          <p className="mt-3 text-base text-muted-foreground">{chapter.sub}</p>
        </div>

        {/* Quiz content */}
        {quizState.phase === "playing" ? (
          <>
            <QuizProgress
              current={quizState.currentIndex + 1}
              total={quizState.questions.length}
              correct={quizState.results.filter((r) => r.isCorrect).length}
            />

            <QuizCard
              key={`${quizState.currentIndex}-${seedOffset}`}
              question={quizState.questions[quizState.currentIndex]}
              questionNumber={quizState.currentIndex + 1}
              total={quizState.questions.length}
              selectedIndex={quizState.selectedIndex}
              onSelect={handleSelect}
            />

            {/* Next button — shown after answer */}
            {quizState.selectedIndex !== null && (
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 animate-fade-in"
                >
                  {quizState.currentIndex + 1 >= quizState.questions.length
                    ? "Xem kết quả"
                    : "Câu tiếp theo"}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </button>
              </div>
            )}
          </>
        ) : (
          <QuizSummary
            results={quizState.results}
            chapter={chapter.n}
            chapterTitle={chapter.title}
            onRetry={handleRetry}
            onRetryWrong={handleRetryWrong}
          />
        )}
      </div>

      {/* Bottom padding for mobile bottom bar */}
      <div className="h-20 md:hidden" aria-hidden />
    </div>
  );
}
