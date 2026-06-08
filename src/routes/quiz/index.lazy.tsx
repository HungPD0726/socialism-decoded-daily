import { useEffect, useState } from "react";
import { createLazyFileRoute, getRouteApi, Link } from "@tanstack/react-router";
import { BookOpen, Star } from "lucide-react";
import { getBestScore } from "@/features/quiz/data/quizQuestions";
import type { Chapter } from "@/features/learning/data/chapters";
import { AppShell } from "@/components/AppShell";

const routeApi = getRouteApi("/quiz/");

export const Route = createLazyFileRoute("/quiz/")({
  component: QuizIndexPage,
});

function QuizIndexPage() {
  const { chapters } = routeApi.useLoaderData();
  const [bestScores, setBestScores] = useState<Record<number, number | null>>({});

  useEffect(() => {
    const scores: Record<number, number | null> = {};
    for (const ch of chapters) {
      scores[ch.n] = getBestScore(ch.n);
    }
    setBestScores(scores);
  }, [chapters]);

  return (
    <div className="min-h-screen bg-background text-foreground paper-grain">
      <AppShell />

      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-16">
        <div className="mt-4 mb-14">
          <div className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-primary">
            Ôn tập
          </div>
          <h1 className="font-display text-5xl leading-none md:text-7xl">Quiz trắc nghiệm</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Chọn một chủ đề để kiểm tra kiến thức. Mỗi lượt gồm 10 câu hỏi được tạo ngẫu nhiên
            từ nội dung bài học.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {chapters.map((ch: Chapter) => {
            const best = bestScores[ch.n];
            const hasBest = best !== null && best !== undefined;

            return (
              <Link
                key={ch.n}
                to="/quiz/$chapter"
                params={{ chapter: String(ch.n) }}
                className="group relative flex flex-col bg-card p-8 transition hover:bg-primary hover:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-5xl text-primary transition group-hover:text-primary-foreground">
                    {String(ch.n).padStart(2, "0")}
                  </span>
                  {hasBest && (
                    <span className="flex items-center gap-1 rounded-full border border-amber-400/40 bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-600 transition group-hover:border-white/30 group-hover:bg-white/10 group-hover:text-white dark:bg-amber-900/20">
                      <Star className="h-3 w-3" aria-hidden />
                      {best}/10
                    </span>
                  )}
                </div>
                <h2 className="mt-6 font-display text-xl leading-tight">{ch.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground transition group-hover:text-primary-foreground/80">
                  {ch.sub}
                </p>
                <div className="mt-6 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] opacity-0 transition group-hover:opacity-100">
                  <BookOpen className="h-3.5 w-3.5" aria-hidden />
                  Bắt đầu quiz
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom padding for mobile bottom bar */}
      <div className="h-20 md:hidden" aria-hidden />
    </div>
  );
}
