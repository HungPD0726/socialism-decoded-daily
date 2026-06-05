import { useEffect, useMemo, useState, type MouseEvent } from "react";
import { ChevronDown, Info } from "lucide-react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { MarxLinePortrait } from "@/components/MarxLinePortrait";
import { MonthCalendar } from "@/components/MonthCalendar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { chapters as months } from "@/data/chapters";
import {
  dailyQuotes,
  getAdjacentDailyQuotes,
  getDailyQuoteForDate,
  type DailyQuote,
} from "@/data/dailyQuotes";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "365 Ngày cùng Chủ nghĩa Xã hội Khoa học" },
      {
        name: "description",
        content:
          "Hành trình 365 ngày giải mã Chủ nghĩa Xã hội Khoa học — từ Tuyên ngôn của Đảng Cộng sản đến đời sống hôm nay.",
      },
      { property: "og:title", content: "365 Ngày cùng Chủ nghĩa Xã hội Khoa học" },
      {
        property: "og:description",
        content:
          "Mỗi ngày một bài học, mỗi tháng một chủ đề. Hành trình một năm cùng tư tưởng đã thay đổi thế giới.",
      },
    ],
  }),
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

function getDayOfYear(date: Date) {
  const start = Date.UTC(date.getFullYear(), 0, 0);
  const current = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.floor((current - start) / 86_400_000);
}

function Home() {
  const today = useMemo(() => new Date(), []);
  const todaysQuote = getDailyQuoteForDate(today);
  const dailyLessons = getAdjacentDailyQuotes(today, 3);
  const currentMonth = months[today.getMonth()];
  const remainingLessons = Math.max(0, dailyQuotes.length - getDayOfYear(today));
  const [chapterMenuOpen, setChapterMenuOpen] = useState(false);
  const [activeChapter, setActiveChapter] = useState<number | null>(null);
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);

  useEffect(() => {
    // Delay dialog so it doesn't compete with the initial page paint
    const timer = window.setTimeout(() => {
      setProjectDialogOpen(true);
    }, 800);
    return () => window.clearTimeout(timer);
  }, []);

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
    <div className="min-h-screen bg-background text-foreground paper-grain">
      <ProjectIntroDialog open={projectDialogOpen} onOpenChange={setProjectDialogOpen} />

      {/* Top banner */}
      <header className="sticky top-0 z-50 border-b-2 border-primary/80 bg-background/95 backdrop-blur">
        <div className="banner-stripes h-1.5" />
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-3 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <StarIcon />
            </div>
            <div className="font-display text-lg leading-none">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Hành trình
              </div>
              <div className="font-semibold">365 Ngày</div>
            </div>
          </div>
          <nav className="order-3 flex w-full items-center gap-5 overflow-x-auto border-t border-border pt-3 text-xs font-medium md:order-2 md:w-auto md:gap-8 md:border-t-0 md:pt-0 md:text-sm">
            <button
              type="button"
              onClick={() => setChapterMenuOpen((isOpen) => !isOpen)}
              className={[
                "inline-flex shrink-0 items-center gap-1.5 rounded-sm py-1 transition hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
                chapterMenuOpen && "text-primary",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-expanded={chapterMenuOpen}
              aria-controls="chapter-menu"
            >
              Chương
              <ChevronDown
                className={["h-4 w-4 transition-transform", chapterMenuOpen && "rotate-180"]
                  .filter(Boolean)
                  .join(" ")}
                aria-hidden
              />
            </button>
            <a
              href="#ngay"
              onClick={(event) => handleSectionLink(event, "ngay")}
              className="shrink-0 py-1 transition hover:text-primary"
            >
              Bài học hôm nay
            </a>
            <a
              href="#suyngam"
              onClick={(event) => handleSectionLink(event, "suyngam")}
              className="shrink-0 py-1 transition hover:text-primary"
            >
              Suy ngẫm
            </a>
            <a
              href="#vesach"
              onClick={(event) => handleSectionLink(event, "vesach")}
              className="shrink-0 py-1 transition hover:text-primary"
            >
              Về dự án
            </a>
          </nav>
          <a
            href="#ngay"
            onClick={(event) => handleSectionLink(event, "ngay")}
            className="order-2 shrink-0 rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 md:order-3"
          >
            Bắt đầu đọc
          </a>
        </div>
        <div
          id="chapter-menu"
          className={[
            "chapter-menu-shell border-t border-border bg-card/95 shadow-lg backdrop-blur",
            chapterMenuOpen ? "chapter-menu-open" : "chapter-menu-closed",
          ].join(" ")}
          aria-hidden={!chapterMenuOpen}
        >
          <div className="mx-auto max-w-7xl px-6 py-5">
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
      </header>

      {/* Hero */}
      <section className="hero-shell relative isolate overflow-hidden">
        <figure className="marx-hero-portrait" aria-hidden>
          <MarxLinePortrait />
        </figure>

        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-12 md:py-32">
          <div className="md:col-span-7">
            <div className="mb-6 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-primary">
              <span className="h-px w-10 bg-primary" />
              Niên giám 2026
            </div>
            <h1 className="font-display text-5xl leading-[0.95] md:text-7xl lg:text-8xl">
              365 ngày cùng
              <br />
              <span className="italic text-primary">Chủ nghĩa</span>
              <br />
              Xã hội Khoa học
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Mỗi ngày một bài học. Mỗi tháng một chủ đề. Một năm để hiểu thấu tư tưởng đã định hình
              thế kỷ XX — và còn vang vọng đến hôm nay.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#thang"
                onClick={(event) => handleSectionLink(event, "thang")}
                className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:bg-foreground/85"
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

          <aside className="md:col-span-5">
            <MonthCalendar />
          </aside>
        </div>
      </section>

      {/* Star divider */}
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 text-primary star-divider">
        <StarIcon className="h-5 w-5" />
      </div>

      {/* 12 months */}
      <section id="thang" className="mx-auto max-w-7xl scroll-mt-28 px-6 py-24">
        <div className="mb-14 flex items-end justify-between">
          <div>
            <div className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-primary">
              Bản đồ một năm
            </div>
            <h2 className="font-display text-4xl md:text-5xl">12 chương, 12 chủ đề</h2>
          </div>
          <div className="hidden text-sm text-muted-foreground md:block">
            Mỗi tháng dẫn dắt qua một trụ cột lý luận
          </div>
        </div>

        <div className="grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {months.map((m) => (
            <article
              key={m.n}
              id={`chuong-${m.n}`}
              className={[
                "group relative scroll-mt-32 bg-card p-8 transition hover:bg-primary hover:text-primary-foreground",
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
                  Đọc chương →
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

      {/* Daily series */}
      <section id="ngay" className="scroll-mt-28 bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="mb-14 max-w-2xl">
            <div className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-accent">
              Chuỗi {monthNames[today.getMonth()]}
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
            {dailyLessons.map((quote, index) => (
              <article
                key={`${quote.month}-${quote.day}`}
                className="relative flex flex-col border border-background/15 bg-background/[0.03] p-8 backdrop-blur transition hover:bg-background/[0.06]"
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
                  <p className="font-display text-xl leading-snug">“{quote.quote}”</p>
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

      {/* Quote section */}
      <section id="suyngam" className="mx-auto max-w-5xl scroll-mt-28 px-6 py-32 text-center">
        <StarIcon className="mx-auto h-6 w-6 text-primary" />
        {todaysQuote ? (
          <>
            <blockquote className="mt-8 font-display text-3xl leading-tight md:text-5xl">
              “{todaysQuote.quote}”
            </blockquote>
            <div className="mt-8 text-sm uppercase tracking-[0.3em] text-muted-foreground">
              {todaysQuote.author} · {todaysQuote.context}
            </div>
          </>
        ) : (
          <p className="mt-8 text-lg text-muted-foreground">Nội dung hôm nay đang được cập nhật.</p>
        )}
      </section>

      {/* About */}
      <section id="vesach" className="scroll-mt-28 border-t border-border bg-secondary/40">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-2">
          <div>
            <div className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-primary">
              Về dự án
            </div>
            <h2 className="font-display text-4xl md:text-5xl">
              Một năm. Một tư tưởng. Một thói quen mới mỗi sáng.
            </h2>
          </div>
          <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>
              <strong className="text-foreground">365 Ngày</strong> là dự án đọc & suy ngẫm về Chủ
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
              <Button
                type="button"
                variant="outline"
                onClick={() => setProjectDialogOpen(true)}
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Info aria-hidden />
                Xem giới thiệu dự án
              </Button>
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

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-xs uppercase tracking-[0.25em] text-muted-foreground md:flex-row">
          <div>© 2026 · 365 Ngày cùng CNXHKH</div>
          <div>Biên soạn cho cộng đồng học thuật Việt Nam</div>
        </div>
        <div className="banner-stripes h-1.5" />
      </footer>
    </div>
  );
}

function ProjectIntroDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto border-2 border-primary/30 p-0">
        <div className="banner-stripes h-1.5" />
        <div className="space-y-6 px-6 pb-6 pt-8 sm:px-8">
          <DialogHeader className="text-left">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Group 4
            </div>
            <DialogTitle className="font-display text-3xl leading-tight md:text-4xl">
              Giới thiệu dự án 365 Ngày
            </DialogTitle>
            <DialogDescription className="text-base leading-relaxed">
              365 Ngày là dự án đọc và suy ngẫm về Chủ nghĩa Xã hội Khoa học, giúp người học tiếp
              cận từng chủ đề bằng những nội dung ngắn gọn, đều đặn và gần với đời sống.
            </DialogDescription>
          </DialogHeader>

          <div className="border-l-2 border-primary pl-5">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Thành viên
            </div>
            <ul className="mt-3 grid gap-2 text-sm text-foreground sm:grid-cols-2">
              {groupMembers.map((member) => (
                <li key={member}>{member}</li>
              ))}
            </ul>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button">Đóng</Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function StarIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2l2.39 7.36H22l-6.18 4.49L18.21 22 12 17.27 5.79 22l2.39-8.15L2 9.36h7.61L12 2z" />
    </svg>
  );
}
