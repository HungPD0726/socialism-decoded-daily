import { lazy, Suspense, useEffect, useRef, useState, type MouseEvent } from "react";
import { ChevronDown, Info, Brain, Network } from "lucide-react";
import { createLazyFileRoute, getRouteApi, Link } from "@tanstack/react-router";
import { MarxLinePortrait } from "@/components/brand/MarxLinePortrait";
import { MonthCalendar } from "@/features/home/components/MonthCalendar";
import { chapters as months } from "@/features/learning/data/chapters";
import type { DailyQuote } from "@/features/learning/data/dailyQuotes";
import { AppShell } from "@/components/AppShell";

const ProjectIntroDialog = lazy(() =>
  import("@/features/home/components/ProjectIntroDialog").then((module) => ({
    default: module.ProjectIntroDialog,
  })),
);

const routeApi = getRouteApi("/");

export const Route = createLazyFileRoute("/")({
  component: Home,
});


const monthNames = [
  "tháng 1",
  "tháng 2",
  "tháng 3",
  "tháng 4",
  "tháng 5",
  "tháng 6",
  "tháng 7",
  "tháng 8",
  "tháng 9",
  "tháng 10",
  "tháng 11",
  "tháng 12",
];

const dayLabels = ["Hôm nay", "Ngày mai", "Ngày kế tiếp"];

const groupMembers = [
  "Trịnh Gia Phúc",
  "Nguyễn Hoàng Long",
  "Vũ Quốc Khánh",
  "Phạm Vũ Anh Hưng",
  "Đinh Duy Trọng",
  "Lê Ánh Ngọc",
  "Nguyễn Việt Anh",
  "Ngô Yến Dương",
  "Phạm Duy Hưng",
];

function formatQuoteDate(quote: DailyQuote) {
  return `${String(quote.day).padStart(2, "0")} / ${String(quote.month).padStart(2, "0")}`;
}

/** Hook: adds `.visible` to all `.reveal` elements inside a ref when they enter viewport */
function useScrollReveal(containerRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll<HTMLElement>(".reveal");
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [containerRef]);
}

function Home() {
  const { today, todaysQuote, dailyLessons, monthQuotes, remainingLessons } =
    routeApi.useLoaderData();
  const currentMonth = months[today.month - 1];
  const [chapterMenuOpen, setChapterMenuOpen] = useState(false);
  const [activeChapter, setActiveChapter] = useState<number | null>(null);
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);
  const [projectDialogMounted, setProjectDialogMounted] = useState(false);

  const pageRef = useRef<HTMLDivElement>(null);
  useScrollReveal(pageRef);

  useEffect(() => {
    // Chỉ hiện popup 1 lần mỗi session (không hiện lại khi navigate)
    const alreadyShown = sessionStorage.getItem("intro-dialog-shown");
    if (alreadyShown) return;

    // Delay dialog so it doesn't compete with the initial page paint
    const timer = window.setTimeout(() => {
      setProjectDialogMounted(true);
      setProjectDialogOpen(true);
      sessionStorage.setItem("intro-dialog-shown", "1");
    }, 800);
    return () => window.clearTimeout(timer);
  }, []);

  const openProjectDialog = () => {
    setProjectDialogMounted(true);
    setProjectDialogOpen(true);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSectionLink = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    setChapterMenuOpen(false);
    scrollToSection(id);
  };

  const handleChapterSelect = (chapter: number) => {
    setChapterMenuOpen(false);
    setActiveChapter(chapter);
    scrollToSection(`chuong-${chapter}`);

    window.setTimeout(() => {
      setActiveChapter((currentChapter) => (currentChapter === chapter ? null : currentChapter));
    }, 1_400);
  };

  return (
    <div className="min-h-screen bg-background text-foreground paper-grain" ref={pageRef}>
      {projectDialogMounted && (
        <Suspense fallback={null}>
          <ProjectIntroDialog
            members={groupMembers}
            open={projectDialogOpen}
            onOpenChange={setProjectDialogOpen}
          />
        </Suspense>
      )}

      {/* ── Shared App Navigation ── */}
      <AppShell
        showProgress
        extra={
          <div className="flex items-center gap-1">
            <a
              href="#ngay"
              onClick={(event: MouseEvent<HTMLAnchorElement>) => handleSectionLink(event, "ngay")}
              className="btn-shimmer rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
            >
              Bắt đầu đọc
            </a>
          </div>
        }
      />

      {/* ── Home page section sub-nav ── */}
      <div
        className="sticky top-[53px] z-40 border-b border-border/50 bg-background/95 backdrop-blur"
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2 md:px-6">
          {/* Chapter sub-nav */}
          <button
            type="button"
            onClick={() => setChapterMenuOpen((isOpen) => !isOpen)}
            className={[
              "inline-flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              chapterMenuOpen && "bg-secondary text-primary",
            ]
              .filter(Boolean)
              .join(" ")}
            aria-expanded={chapterMenuOpen}
            aria-controls="chapter-menu"
          >
            <span className="text-xs uppercase tracking-wider">Chủ đề</span>
            <ChevronDown
              className={["h-3.5 w-3.5 transition-transform", chapterMenuOpen && "rotate-180"]
                .filter(Boolean)
                .join(" ")}
              aria-hidden
            />
          </button>
          <a
            href="#ngay"
            onClick={(event) => handleSectionLink(event, "ngay")}
            className="shrink-0 py-1.5 px-3 rounded-md text-sm transition hover:bg-secondary hover:text-primary"
          >
            Bài học hôm nay
          </a>
          <a
            href="#suyngam"
            onClick={(event) => handleSectionLink(event, "suyngam")}
            className="shrink-0 py-1.5 px-3 rounded-md text-sm transition hover:bg-secondary hover:text-primary"
          >
            Suy ngẫm
          </a>
          <a
            href="#vesach"
            onClick={(event) => handleSectionLink(event, "vesach")}
            className="shrink-0 py-1.5 px-3 rounded-md text-sm transition hover:bg-secondary hover:text-primary"
          >
            Về dự án
          </a>
          <Link
            to="/quiz/"
            className="inline-flex shrink-0 items-center gap-1.5 py-1.5 px-3 rounded-md text-sm transition hover:bg-secondary hover:text-primary"
          >
            <Brain className="h-3.5 w-3.5" aria-hidden />
            Quiz
          </Link>
          <Link
            to="/mindmap/"
            className="inline-flex shrink-0 items-center gap-1.5 py-1.5 px-3 rounded-md text-sm transition hover:bg-secondary hover:text-primary"
          >
            <Network className="h-3.5 w-3.5" aria-hidden />
            Sơ đồ
          </Link>
        </div>

        {/* Chapter dropdown */}
        <div
          id="chapter-menu"
          className={[
            "chapter-menu-shell border-t border-border bg-card/95 shadow-lg backdrop-blur",
            chapterMenuOpen ? "chapter-menu-open" : "chapter-menu-closed",
          ].join(" ")}
          aria-hidden={!chapterMenuOpen}
        >
          <div className="mx-auto max-w-7xl px-4 py-5 md:px-6">
            <div className="grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
              {months.map((m) => {
                const menuItemClass =
                  "group/menu flex min-h-28 flex-col items-start bg-background p-4 text-left transition hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-card";
                const menuItemContent = (
                  <>
                    <span className="font-display text-2xl leading-none text-primary transition group-hover/menu:text-primary-foreground group-focus/menu:text-primary-foreground">
                      {String(m.n).padStart(2, "0")}
                    </span>
                    <span className="mt-3 font-display text-lg leading-tight">{m.title}</span>
                    <span className="mt-1 text-xs leading-relaxed text-muted-foreground transition group-hover/menu:text-primary-foreground/75 group-focus/menu:text-primary-foreground/75">
                      {m.sub}
                    </span>
                  </>
                );

                return m.isPublished ? (
                  <Link
                    key={`chapter-menu-${m.n}`}
                    to="/chuong/$chapter"
                    params={{ chapter: String(m.n) }}
                    tabIndex={chapterMenuOpen ? 0 : -1}
                    onClick={() => setChapterMenuOpen(false)}
                    className={menuItemClass}
                  >
                    {menuItemContent}
                  </Link>
                ) : (
                  <button
                    key={`chapter-menu-${m.n}`}
                    type="button"
                    tabIndex={chapterMenuOpen ? 0 : -1}
                    onClick={() => handleChapterSelect(m.n)}
                    className={menuItemClass}
                  >
                    {menuItemContent}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="hero-shell relative isolate overflow-hidden">
        <figure className="marx-hero-portrait" aria-hidden>
          <MarxLinePortrait />
        </figure>

        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-4 py-16 md:grid-cols-12 md:py-28 md:px-6">
          <div className="md:col-span-7">
            <div className="reveal mb-6 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-primary">
              <span className="h-px w-10 bg-primary" />
              Niên giám 2026
            </div>
            <h1 className="reveal reveal-delay-1 font-display text-5xl leading-[0.95] md:text-7xl lg:text-8xl">
              365 ngày cùng
              <br />
              <span className="italic text-primary">Chủ nghĩa</span>
              <br />
              Xã hội Khoa học
            </h1>
            <p className="reveal reveal-delay-2 mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Mỗi ngày một bài học. Mỗi tháng một chủ đề. Một năm để hiểu thấu tư tưởng đã định hình
              thế kỷ XX — và còn vang vọng đến hôm nay.
            </p>
            <div className="reveal reveal-delay-3 mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#thang"
                onClick={(event) => handleSectionLink(event, "thang")}
                className="btn-shimmer rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:bg-foreground/85"
              >
                Khám phá 12 tháng →
              </a>
              <a
                href="#ngay"
                onClick={(event) => handleSectionLink(event, "ngay")}
                className="text-sm font-medium underline-offset-4 hover:underline"
              >
                Đọc bài học hôm nay
              </a>
            </div>
          </div>

          <aside className="reveal reveal-delay-2 md:col-span-5">
            <MonthCalendar initialQuotes={monthQuotes} today={today} />
          </aside>
        </div>
      </section>

      {/* Star divider */}
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 text-primary star-divider">
        <StarIcon className="h-5 w-5" />
      </div>

      {/* ── 12 months grid ── */}
      <section id="thang" className="mx-auto max-w-7xl scroll-mt-28 px-4 py-24 md:px-6">
        <div className="reveal mb-14 flex items-end justify-between">
          <div>
            <div className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-primary">
              Bản đồ một năm
            </div>
            <h2 className="font-display text-4xl md:text-5xl">12 tháng, 12 chủ đề</h2>
          </div>
          <div className="hidden text-sm text-muted-foreground md:block">
            Mỗi tháng dẫn dắt qua một trụ cột lý luận
          </div>
        </div>

        <div className="grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {months.map((m, i) => (
            <article
              key={m.n}
              id={`chuong-${m.n}`}
              className={[
                `reveal reveal-delay-${Math.min(i + 1, 12)} group relative scroll-mt-32 bg-card p-8 transition-all duration-200 hover:bg-primary hover:text-primary-foreground card-scale`,
                activeChapter === m.n && "chapter-card-selected",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <div className="flex items-baseline justify-between">
                <span className="font-display text-5xl text-primary transition group-hover:text-primary-foreground">
                  {String(m.n).padStart(2, "0")}
                </span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground transition group-hover:text-primary-foreground/70">
                  Tháng
                </span>
              </div>
              <h3 className="mt-6 font-display text-2xl leading-tight">{m.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground transition group-hover:text-primary-foreground/80">
                {m.sub}
              </p>
              {m.isPublished ? (
                <Link
                  to="/chuong/$chapter"
                  params={{ chapter: String(m.n) }}
                  className="mt-8 inline-flex text-xs font-medium uppercase tracking-[0.25em] opacity-0 transition group-hover:opacity-100"
                >
                  Đọc chủ đề →
                </Link>
              ) : (
                <div className="mt-8 text-xs font-medium uppercase tracking-[0.25em] opacity-0 transition group-hover:opacity-100">
                  Sắp có
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* ── Daily series ── */}
      <section id="ngay" className="scroll-mt-28 bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-4 py-24 md:px-6">
          <div className="reveal mb-14 max-w-2xl">
            <div className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-accent">
              Chuỗi {monthNames[today.month - 1]}
            </div>
            <h2 className="font-display text-4xl md:text-5xl">
              Bài học <span className="italic text-accent">hôm nay</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-background/70">
              {currentMonth.title}: {currentMonth.sub}. Mỗi ngày một trích đoạn ngắn để giữ mạch học
              tập đi đều qua cả năm.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {dailyLessons.map((quote: DailyQuote, index: number) => (
              <article
                key={`${quote.month}-${quote.day}`}
                className={`reveal reveal-delay-${index + 1} relative flex flex-col border border-background/15 bg-background/[0.03] p-8 backdrop-blur transition-all duration-200 hover:bg-background/[0.08] hover:border-background/30`}
              >
                <div className="flex items-center justify-between">
                  <div className="font-display text-3xl text-accent">{formatQuoteDate(quote)}</div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-background/50">
                    {dayLabels[index] ?? "Tiếp nối"}
                  </div>
                </div>
                <div className="my-6 h-px bg-background/15" />
                <div>
                  <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-accent">
                    Nội dung
                  </div>
                  <p className="font-display text-xl leading-snug">"{quote.quote}"</p>
                </div>
                <div className="mt-6">
                  <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-accent">
                    Nguồn
                  </div>
                  <p className="text-sm leading-relaxed text-background/75">
                    {quote.author} · {quote.context}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 flex items-center justify-between border-t border-background/15 pt-8 text-sm text-background/60">
            <span>Còn {remainingLessons} nội dung đang chờ bạn trong năm nay.</span>
            <a
              href="#thang"
              onClick={(event) => handleSectionLink(event, "thang")}
              className="text-accent underline-offset-4 hover:underline"
            >
              Xem toàn bộ chuỗi →
            </a>
          </div>
        </div>
      </section>

      {/* ── Quote section ── */}
      <section id="suyngam" className="mx-auto max-w-5xl scroll-mt-28 px-4 py-32 text-center md:px-6">
        <div className="reveal">
          <StarIcon className="mx-auto h-6 w-6 text-primary" />
          {todaysQuote ? (
            <>
              <blockquote className="mt-8 font-display text-3xl leading-tight md:text-5xl">
                "{todaysQuote.quote}"
              </blockquote>
              <div className="mt-8 text-sm uppercase tracking-[0.3em] text-muted-foreground">
                {todaysQuote.author} · {todaysQuote.context}
              </div>
            </>
          ) : (
            <p className="mt-8 text-lg text-muted-foreground">Nội dung hôm nay đang được cập nhật.</p>
          )}
        </div>
      </section>

      {/* ── About ── */}
      <section id="vesach" className="scroll-mt-28 border-t border-border bg-secondary/40">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-24 md:grid-cols-2 md:px-6">
          <div className="reveal">
            <div className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-primary">
              Về dự án
            </div>
            <h2 className="font-display text-4xl md:text-5xl">
              Một năm. Một tư tưởng. Một thói quen mới mỗi sáng.
            </h2>
          </div>
          <div className="reveal reveal-delay-2 space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>
              <strong className="text-foreground">365 Ngày</strong> là dự án đọc &amp; suy ngẫm về Chủ
              nghĩa Xã hội Khoa học, được biên soạn cho độc giả Việt Nam đương đại — sinh viên,
              người lao động, người làm chính sách, và bất kỳ ai quan tâm tới câu hỏi:{" "}
              <em>xã hội này đang đi về đâu?</em>
            </p>
            <p>
              Mỗi ngày một bài học ngắn (3 phút đọc), một dòng suy ngẫm để mang theo. Không giáo
              điều, không khẩu hiệu — chỉ là lý luận gặp đời sống.
            </p>
            <div className="border-l-2 border-primary pl-5">
              <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                Group 4
              </div>
              <ul className="mt-3 grid gap-2 text-sm text-foreground sm:grid-cols-2">
                {groupMembers.map((member) => (
                  <li key={member}>{member}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={openProjectDialog}
                className="inline-flex items-center gap-2 rounded-md border border-primary bg-background px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary hover:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <Info aria-hidden />
                Xem giới thiệu dự án
              </button>
              <a
                href="#ngay"
                onClick={(event) => handleSectionLink(event, "ngay")}
                className="inline-block border-b-2 border-primary pb-1 text-sm font-medium text-primary"
              >
                Bắt đầu từ Ngày 01 →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border pb-20 md:pb-0">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-xs uppercase tracking-[0.25em] text-muted-foreground md:flex-row md:px-6">
          <div>© 2026 · 365 Ngày cùng CNXHKH</div>
          <div>Biên soạn cho cộng đồng học thuật Việt Nam</div>
        </div>
        <div className="banner-stripes h-1.5" />
      </footer>
    </div>
  );
}

function StarIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2l2.39 7.36H22l-6.18 4.49L18.21 22 12 17.27 5.79 22l2.39-8.15L2 9.36h7.61L12 2z" />
    </svg>
  );
}
