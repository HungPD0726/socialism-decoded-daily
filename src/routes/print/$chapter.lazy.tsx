import { createLazyFileRoute, getRouteApi, Link } from "@tanstack/react-router";
import { Printer, ArrowLeft } from "lucide-react";
import type { DailyQuote } from "@/features/learning/data/dailyQuotes";

const routeApi = getRouteApi("/print/$chapter");

export const Route = createLazyFileRoute("/print/$chapter")({
  component: PrintChapterPage,
});

function PrintChapterPage() {
  const { chapter, quotes } = routeApi.useLoaderData();
  const typedQuotes = quotes as DailyQuote[];

  // Group quotes by context section
  const sections = typedQuotes.reduce<{ context: string; items: DailyQuote[] }[]>((acc, q) => {
    const last = acc[acc.length - 1];
    if (last && last.context === q.context) {
      last.items.push(q);
    } else {
      acc.push({ context: q.context, items: [q] });
    }
    return acc;
  }, []);

  return (
    <div className="min-h-screen bg-white text-foreground print:bg-white">
      {/* Screen-only controls */}
      <div className="print:hidden">
        <div className="banner-stripes h-1.5" />
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link
            to="/chuong/$chapter"
            params={{ chapter: String(chapter.n) }}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 transition hover:underline"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Về chương {chapter.n}
          </Link>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
          >
            <Printer className="h-4 w-4" aria-hidden />
            In trang này
          </button>
        </div>
      </div>

      {/* Printable content */}
      <main className="mx-auto max-w-4xl px-6 py-10 print:px-0 print:py-0">
        {/* Cover */}
        <header className="mb-10 border-b-2 border-primary pb-8 print:mb-8">
          <div className="mb-3 text-xs font-medium uppercase tracking-[0.4em] text-primary print:text-black">
            365 Ngày cùng Chủ nghĩa Xã hội Khoa học · Chủ đề{" "}
            {String(chapter.n).padStart(2, "0")}
          </div>
          <h1 className="font-display text-4xl leading-tight print:text-3xl">{chapter.title}</h1>
          <p className="mt-3 text-base text-muted-foreground print:text-gray-600">{chapter.sub}</p>
          <div className="mt-4 text-xs text-muted-foreground print:text-gray-500">
            {quotes.length} bài học · Nhóm 4 · MLN131
          </div>
        </header>

        {/* Sections */}
        {sections.map((section) => (
          <section key={section.context} className="mb-10 print:mb-8 print:break-inside-avoid-page">
            <h2 className="mb-4 font-display text-xl font-semibold text-primary print:text-black print:border-b print:border-gray-300 print:pb-2">
              {section.context}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 print:grid-cols-2 print:gap-2">
              {section.items.map((quote) => (
                <div
                  key={`${quote.month}-${quote.day}`}
                  className="rounded-sm border border-border bg-card p-4 print:border-gray-200 print:bg-white print:break-inside-avoid"
                >
                  <div className="mb-1.5 flex items-center gap-2">
                    <span className="font-display text-lg font-bold text-primary print:text-gray-800">
                      {String(quote.day).padStart(2, "0")}
                    </span>
                    <span className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground print:text-gray-400">
                      Ngày
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed print:text-[11px]">{quote.quote}</p>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Print footer */}
        <footer className="mt-12 border-t border-border pt-6 text-xs text-muted-foreground print:text-gray-400">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span>365 Ngày cùng CNXHKH · Nhóm 4 · MLN131 · 2026</span>
            <span>
              Chủ đề {String(chapter.n).padStart(2, "0")}: {chapter.title}
            </span>
          </div>
        </footer>
      </main>
    </div>
  );
}
