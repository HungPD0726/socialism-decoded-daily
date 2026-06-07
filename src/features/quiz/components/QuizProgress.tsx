type Props = {
  current: number;
  total: number;
  correct: number;
};

export function QuizProgress({ current, total, correct }: Props) {
  const pct = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="mb-8">
      <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
        <span>
          {current} / {total} câu
        </span>
        <span className="font-medium text-primary">
          ✓ {correct} đúng
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
