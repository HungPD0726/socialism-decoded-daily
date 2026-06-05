import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { chapters, getChapter } from "@/data/chapters";
import { getQuotesForMonth } from "@/data/dailyQuotes";

export const Route = createFileRoute("/chuong/$chapter")({
  loader: ({ params }) => {
    const chapterNumber = Number(params.chapter);
    const chapter = getChapter(chapterNumber);

    if (!chapter || !chapter.isPublished) {
      throw notFound();
    }

    return {
      chapter,
      quotes: getQuotesForMonth(chapterNumber),
    };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `Chương ${loaderData.chapter.n}: ${loaderData.chapter.title} | 365 Ngày`
          : "365 Ngày cùng Chủ nghĩa Xã hội Khoa học",
      },
      {
        name: "description",
        content: loaderData?.chapter.sub ?? "Hành trình 365 ngày giải mã Chủ nghĩa Xã hội Khoa học.",
      },
    ],
  }),
  component: ChapterPage,
});

function ChapterPage() {
  const { chapter, quotes } = Route.useLoaderData();
  const publishedChapters = chapters.filter((item) => item.isPublished).sort((a, b) => a.n - b.n);
  const chapterIndex = publishedChapters.findIndex((item) => item.n === chapter.n);
  const previousChapter = publishedChapters[chapterIndex - 1]?.n ?? null;
  const nextChapter = publishedChapters[chapterIndex + 1]?.n ?? null;

  return (
    <main className="min-h-screen bg-background text-foreground paper-grain">
      <div className="banner-stripes h-1.5" />

      <section className="mx-auto max-w-7xl px-6 py-10 md:py-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 transition hover:underline"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Về trang chủ
        </Link>

        <div className="mt-12 grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <div className="mb-5 text-xs font-medium uppercase tracking-[0.3em] text-primary">
              Chương {String(chapter.n).padStart(2, "0")}
            </div>
            <h1 className="font-display text-5xl leading-none md:text-7xl">{chapter.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {chapter.sub}. Chương này gom các bài đọc theo ngày để bạn có thể học liền mạch, từ
              khái niệm nền tảng đến các trích dẫn tiêu biểu.
            </p>
          </div>

          <div className="border-l-2 border-primary pl-6 md:col-span-4">
            <div className="font-display text-5xl text-primary">{quotes.length}</div>
            <div className="mt-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              bài học trong chương
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/35">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex flex-col gap-3 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
            <span>Đọc theo thứ tự ngày để giữ nhịp học đều.</span>
            <div className="flex flex-wrap gap-3">
              {previousChapter && (
                <Link
                  to="/chuong/$chapter"
                  params={{ chapter: String(previousChapter) }}
                  className="inline-flex items-center gap-2 border-b-2 border-primary pb-1 font-medium text-primary"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden />
                  Chương trước
                </Link>
              )}
              {nextChapter && (
                <Link
                  to="/chuong/$chapter"
                  params={{ chapter: String(nextChapter) }}
                  className="inline-flex items-center gap-2 border-b-2 border-primary pb-1 font-medium text-primary"
                >
                  Chương sau
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-2">
          {quotes.map((quote) => (
            <article key={`${quote.month}-${quote.day}`} className="bg-card p-6 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div className="font-display text-4xl text-primary">
                  {String(quote.day).padStart(2, "0")}
                </div>
                <div className="text-right text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  Ngày {String(quote.day).padStart(2, "0")}
                </div>
              </div>
              <blockquote className="mt-6 font-display text-2xl leading-tight">
                “{quote.quote}”
              </blockquote>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                {quote.author} · {quote.context}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
