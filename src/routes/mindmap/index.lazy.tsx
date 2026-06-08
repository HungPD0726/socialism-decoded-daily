import { createLazyFileRoute, getRouteApi, Link } from "@tanstack/react-router";
import { Network } from "lucide-react";
import type { Chapter } from "@/features/learning/data/chapters";
import { AppShell } from "@/components/AppShell";

const routeApi = getRouteApi("/mindmap/");

export const Route = createLazyFileRoute("/mindmap/")({
  component: MindmapIndexPage,
});

function MindmapIndexPage() {
  const { chapters } = routeApi.useLoaderData();

  return (
    <div className="min-h-screen bg-background text-foreground paper-grain">
      <AppShell />

      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-16">
        <div className="mt-4 mb-14">
          <div className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-primary">
            Trực quan hóa
          </div>
          <h1 className="font-display text-5xl leading-none md:text-7xl">Sơ đồ tư duy</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Xem cấu trúc nội dung từng chủ đề dưới dạng sơ đồ tỏa tròn — từ khái niệm trung tâm
            đến các nhánh ý tưởng cụ thể.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {chapters.map((ch: Chapter) => (
            <Link
              key={ch.n}
              to="/mindmap/$chapter"
              params={{ chapter: String(ch.n) }}
              className="group flex flex-col bg-card p-8 transition hover:bg-primary hover:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-display text-5xl text-primary transition group-hover:text-primary-foreground">
                  {String(ch.n).padStart(2, "0")}
                </span>
              </div>
              <h2 className="mt-6 font-display text-xl leading-tight">{ch.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground transition group-hover:text-primary-foreground/80">
                {ch.sub}
              </p>
              <div className="mt-6 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] opacity-0 transition group-hover:opacity-100">
                <Network className="h-3.5 w-3.5" aria-hidden />
                Xem sơ đồ
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom padding for mobile bottom bar */}
      <div className="h-20 md:hidden" aria-hidden />
    </div>
  );
}
