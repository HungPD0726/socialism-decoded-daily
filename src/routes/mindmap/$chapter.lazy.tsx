import { createLazyFileRoute, getRouteApi, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Printer, BookOpen, Brain } from "lucide-react";
import { MindmapRenderer } from "@/features/mindmap/MindmapRenderer";
import { AppShell } from "@/components/AppShell";

const routeApi = getRouteApi("/mindmap/$chapter");

export const Route = createLazyFileRoute("/mindmap/$chapter")({
  component: MindmapChapterPage,
});

function MindmapChapterPage() {
  const { chapter, navigation, quotes } = routeApi.useLoaderData();
  const { previousChapter, nextChapter } = navigation;

  return (
    <div className="min-h-screen bg-background text-foreground paper-grain">
      <AppShell
        extra={
          <div className="flex items-center gap-2">
            <Link
              to="/quiz/$chapter"
              params={{ chapter: String(chapter.n) }}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium transition hover:border-primary hover:text-primary"
            >
              <Brain className="h-3.5 w-3.5" aria-hidden />
              Quiz
            </Link>
            <Link
              to="/chuong/$chapter"
              params={{ chapter: String(chapter.n) }}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium transition hover:border-primary hover:text-primary"
            >
              <BookOpen className="h-3.5 w-3.5" aria-hidden />
              Đọc nội dung
            </Link>
          </div>
        }
      />

      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-16">

        {/* Header */}
        <div className="mb-10 grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <div className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-primary">
              Sơ đồ tư duy · Chủ đề {String(chapter.n).padStart(2, "0")}
            </div>
            <h1 className="font-display text-5xl leading-none md:text-6xl">{chapter.title}</h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              {chapter.sub}
            </p>
          </div>

          {/* Quick action links */}
          <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
            <Link
              to="/quiz/$chapter"
              params={{ chapter: String(chapter.n) }}
              className="inline-flex items-center gap-2 rounded-sm border border-border bg-card px-4 py-2 text-sm font-medium transition hover:border-primary hover:text-primary"
            >
              <Brain className="h-4 w-4" aria-hidden />
              Quiz chủ đề này
            </Link>
            <Link
              to="/chuong/$chapter"
              params={{ chapter: String(chapter.n) }}
              className="inline-flex items-center gap-2 rounded-sm border border-border bg-card px-4 py-2 text-sm font-medium transition hover:border-primary hover:text-primary"
            >
              <BookOpen className="h-4 w-4" aria-hidden />
              Đọc nội dung
            </Link>
            <Link
              to="/print/$chapter"
              params={{ chapter: String(chapter.n) }}
              className="inline-flex items-center gap-2 rounded-sm border border-border bg-card px-4 py-2 text-sm font-medium transition hover:border-primary hover:text-primary"
            >
              <Printer className="h-4 w-4" aria-hidden />
              In chương
            </Link>
          </div>
        </div>

        {/* Mindmap */}
        <MindmapRenderer
          quotes={quotes}
          chapterTitle={chapter.title}
          chapterNumber={chapter.n}
        />

        {/* Chapter nav */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8 text-sm">
          <span className="text-muted-foreground">Chuyển sang chủ đề khác</span>
          <div className="flex flex-wrap gap-4">
            {previousChapter && (
              <Link
                to="/mindmap/$chapter"
                params={{ chapter: String(previousChapter) }}
                className="inline-flex items-center gap-2 border-b-2 border-primary pb-1 font-medium text-primary"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden />
                Chủ đề trước
              </Link>
            )}
            {nextChapter && (
              <Link
                to="/mindmap/$chapter"
                params={{ chapter: String(nextChapter) }}
                className="inline-flex items-center gap-2 border-b-2 border-primary pb-1 font-medium text-primary"
              >
                Chủ đề sau
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Bottom padding for mobile bottom bar */}
      <div className="h-20 md:hidden" aria-hidden />
    </div>
  );
}
