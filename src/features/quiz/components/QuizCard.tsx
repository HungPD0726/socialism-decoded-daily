import { CheckCircle2, XCircle } from "lucide-react";
import type { QuizQuestion } from "@/features/quiz/data/quizQuestions";

const optionLabels = ["A", "B", "C", "D"];

type Props = {
  question: QuizQuestion;
  questionNumber: number;
  total: number;
  selectedIndex: number | null;
  onSelect: (index: number) => void;
};

export function QuizCard({ question, questionNumber, total, selectedIndex, onSelect }: Props) {
  const isAnswered = selectedIndex !== null;

  return (
    <div className="animate-fade-in">
      {/* Question header */}
      <div className="mb-2 flex items-center gap-3">
        <span className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
          Câu {questionNumber}/{total}
        </span>
      </div>

      <div className="mb-6 rounded-sm border border-primary/20 bg-primary/5 p-5">
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
          {question.context}
        </div>
        <p className="font-display text-lg leading-snug text-foreground">
          Đâu là nội dung chính xác thuộc chủ đề trên?
        </p>
      </div>

      {/* Options */}
      <div className="grid gap-3">
        {question.options.map((option, index) => {
          const isSelected = selectedIndex === index;
          const isCorrect = index === question.correctIndex;

          let stateClass = "";
          if (isAnswered) {
            if (isCorrect) {
              stateClass =
                "border-green-500/60 bg-green-50 text-green-900 dark:bg-green-900/20 dark:text-green-200";
            } else if (isSelected && !isCorrect) {
              stateClass =
                "border-destructive/60 bg-destructive/10 text-destructive dark:bg-red-900/20";
            } else {
              stateClass = "border-border bg-card opacity-60";
            }
          } else {
            stateClass =
              "border-border bg-card hover:border-primary/50 hover:bg-primary/5 cursor-pointer";
          }

          return (
            <button
              key={index}
              type="button"
              disabled={isAnswered}
              onClick={() => onSelect(index)}
              className={[
                "flex items-start gap-4 rounded-sm border p-4 text-left transition-all duration-200",
                stateClass,
              ].join(" ")}
            >
              {/* Label */}
              <span
                className={[
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-sm font-display text-sm font-bold transition-colors",
                  isAnswered && isCorrect
                    ? "bg-green-500 text-white"
                    : isAnswered && isSelected
                      ? "bg-destructive text-white"
                      : "bg-secondary text-secondary-foreground",
                ].join(" ")}
              >
                {optionLabels[index]}
              </span>

              <span className="flex-1 text-sm leading-relaxed">{option}</span>

              {/* Icon */}
              {isAnswered && isCorrect && (
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-500" aria-hidden />
              )}
              {isAnswered && isSelected && !isCorrect && (
                <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" aria-hidden />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
