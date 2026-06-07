import { Link } from "@tanstack/react-router";
import { RotateCcw, ChevronRight, Trophy, Target, Frown, Smile } from "lucide-react";
import type { QuizResult } from "@/features/quiz/data/quizQuestions";
import { getScoreGrade } from "@/features/quiz/data/quizQuestions";

const optionLabels = ["A", "B", "C", "D"];

type Props = {
  results: QuizResult[];
  chapter: number;
  chapterTitle: string;
  onRetry: () => void;
  onRetryWrong: () => void;
};

export function QuizSummary({ results, chapter, chapterTitle, onRetry, onRetryWrong }: Props) {
  const correct = results.filter((r) => r.isCorrect).length;
  const total = results.length;
  const grade = getScoreGrade(correct, total);
  const wrongResults = results.filter((r) => !r.isCorrect);

  const gradeConfig = {
    perfect: {
      icon: <Trophy className="h-10 w-10 text-amber-500" aria-hidden />,
      label: "Hoàn hảo!",
      sub: "Bạn đã nắm vững toàn bộ nội dung chương này.",
      color: "text-amber-500",
    },
    great: {
      icon: <Smile className="h-10 w-10 text-green-500" aria-hidden />,
      label: "Xuất sắc!",
      sub: "Bạn đã hiểu phần lớn nội dung. Hãy ôn lại các câu sai.",
      color: "text-green-500",
    },
    ok: {
      icon: <Target className="h-10 w-10 text-primary" aria-hidden />,
      label: "Khá tốt!",
      sub: "Hãy đọc lại bài và thử lại để củng cố kiến thức.",
      color: "text-primary",
    },
    low: {
      icon: <Frown className="h-10 w-10 text-muted-foreground" aria-hidden />,
      label: "Cần cố gắng thêm",
      sub: "Hãy đọc lại nội dung chương rồi thử quiz lần nữa nhé.",
      color: "text-muted-foreground",
    },
  };

  const g = gradeConfig[grade];

  return (
    <div className="animate-fade-in">
      {/* Score card */}
      <div className="mb-8 rounded-sm border border-border bg-card p-8 text-center">
        <div className="flex justify-center">{g.icon}</div>
        <div className={["mt-4 font-display text-5xl font-bold", g.color].join(" ")}>
          {correct}/{total}
        </div>
        <div className="mt-1 font-display text-2xl">{g.label}</div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{g.sub}</p>
        <div className="mt-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Chủ đề {String(chapter).padStart(2, "0")} — {chapterTitle}
        </div>
      </div>

      {/* Action buttons */}
      <div className="mb-10 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 rounded-sm border border-border bg-card px-4 py-2.5 text-sm font-medium transition hover:border-primary hover:text-primary"
        >
          <RotateCcw className="h-4 w-4" aria-hidden />
          Làm lại từ đầu
        </button>

        {wrongResults.length > 0 && (
          <button
            type="button"
            onClick={onRetryWrong}
            className="inline-flex items-center gap-2 rounded-sm bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
          >
            <Target className="h-4 w-4" aria-hidden />
            Ôn lại {wrongResults.length} câu sai
          </button>
        )}

        <Link
          to="/chuong/$chapter"
          params={{ chapter: String(chapter) }}
          className="inline-flex items-center gap-2 rounded-sm border border-border bg-card px-4 py-2.5 text-sm font-medium transition hover:border-primary hover:text-primary"
        >
          Đọc lại nội dung
          <ChevronRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>

      {/* Wrong answers review */}
      {wrongResults.length > 0 && (
        <div>
          <h3 className="mb-4 font-display text-xl">Các câu trả lời sai</h3>
          <div className="grid gap-4">
            {wrongResults.map((result, i) => (
              <div
                key={result.question.id}
                className="rounded-sm border border-border bg-card p-5"
              >
                <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
                  {result.question.context}
                </div>
                <p className="mb-3 text-xs text-muted-foreground">Câu {i + 1}</p>

                {/* Your wrong answer */}
                {result.selectedIndex !== null && (
                  <div className="mb-2 flex items-start gap-2">
                    <span className="shrink-0 rounded-sm bg-destructive/15 px-1.5 py-0.5 text-[10px] font-bold uppercase text-destructive">
                      {optionLabels[result.selectedIndex]} — Sai
                    </span>
                    <span className="text-sm text-muted-foreground line-through">
                      {result.question.options[result.selectedIndex]}
                    </span>
                  </div>
                )}

                {/* Correct answer */}
                <div className="flex items-start gap-2">
                  <span className="shrink-0 rounded-sm bg-green-100 px-1.5 py-0.5 text-[10px] font-bold uppercase text-green-700 dark:bg-green-900/40 dark:text-green-300">
                    {optionLabels[result.question.correctIndex]} — Đúng
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {result.question.correctAnswer}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
