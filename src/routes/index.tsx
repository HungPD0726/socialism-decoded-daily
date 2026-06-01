import { createFileRoute, Link } from "@tanstack/react-router";
import { MonthCalendar } from "@/components/MonthCalendar";

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

const months = [
  { n: 1, title: "Sự ra đời", sub: "Bối cảnh lịch sử, vai trò của Mác và Ăng-ghen" },
  { n: 2, title: "Tuyên ngôn", sub: "Cuốn sách đã thay đổi thế giới" },
  { n: 3, title: "Sứ mệnh Công nhân", sub: "Truyền thống & Hiện đại 4.0" },
  { n: 4, title: "Sứ mệnh Công nhân II", sub: "Giai cấp tiên tiến trong thời đại số" },
  { n: 5, title: "Quá độ lên CNXH", sub: "Lý luận nền tảng" },
  { n: 6, title: "Mô hình Việt Nam", sub: "Con đường đặc thù của một dân tộc" },
  { n: 7, title: "Dân chủ XHCN", sub: "Nhà nước pháp quyền của nhân dân" },
  { n: 8, title: "Cơ cấu xã hội", sub: "Giai cấp trong thời kỳ quá độ" },
  { n: 9, title: "Vấn đề Dân tộc", sub: "Đoàn kết trong đa dạng" },
  { n: 10, title: "Tôn giáo", sub: "Tự do tín ngưỡng & đời sống tinh thần" },
  { n: 11, title: "Gia đình", sub: "Bình đẳng giới trong xã hội hiện đại" },
  { n: 12, title: "Nhìn về tương lai", sub: "Dự báo kinh điển & thực tế hôm nay" },
];

const dailyLessons = [
  {
    date: "01 / 03",
    lesson:
      "Giai cấp công nhân không chỉ là người làm việc trong nhà máy — họ là đại diện cho lực lượng sản xuất tiên tiến nhất của thời đại.",
    reflect:
      "Hôm nay, các lập trình viên, kỹ sư công nghệ cao chính là một bộ phận tiên tiến của giai cấp công nhân hiện đại. Bạn có đang dùng công nghệ để tạo ra giá trị cho xã hội?",
  },
  {
    date: "02 / 03",
    lesson:
      "Sứ mệnh của công nhân không phải là thay thế một kẻ bóc lột này bằng một kẻ bóc lột khác, mà là xóa bỏ hoàn toàn chế độ bóc lột.",
    reflect:
      "Mục tiêu cuối cùng của sự phát triển là một xã hội công bằng, nơi mọi lao động đều được tôn trọng giá trị đích thực.",
  },
  {
    date: "03 / 03",
    lesson:
      "Lao động là nguồn gốc của mọi của cải và mọi văn hoá — không có lao động, không có lịch sử loài người.",
    reflect:
      "Mỗi dòng code, mỗi đường cày, mỗi giờ giảng dạy đều đang viết tiếp lịch sử ấy. Hôm nay bạn đã góp gì?",
  },
];

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground paper-grain">
      {/* Top banner */}
      <header className="border-b-2 border-primary/80">
        <div className="banner-stripes h-1.5" />
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <StarIcon />
            </div>
            <div className="font-display text-lg leading-none">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Hành trình</div>
              <div className="font-semibold">365 Ngày</div>
            </div>
          </div>
          <nav className="hidden gap-8 text-sm font-medium md:flex">
            <a href="#thang" className="hover:text-primary">12 Tháng</a>
            <a href="#ngay" className="hover:text-primary">Bài học hôm nay</a>
            <a href="#suyngam" className="hover:text-primary">Suy ngẫm</a>
            <a href="#vesach" className="hover:text-primary">Về dự án</a>
          </nav>
          <a
            href="#ngay"
            className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
          >
            Bắt đầu đọc
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-12 md:py-32">
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
              Mỗi ngày một bài học. Mỗi tháng một chủ đề. Một năm để hiểu thấu
              tư tưởng đã định hình thế kỷ XX — và còn vang vọng đến hôm nay.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#thang"
                className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:bg-foreground/85"
              >
                Khám phá 12 tháng →
              </a>
              <a
                href="#ngay"
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
      <section id="thang" className="mx-auto max-w-7xl px-6 py-24">
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
              className="group relative bg-card p-8 transition hover:bg-primary hover:text-primary-foreground"
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
              <div className="mt-8 text-xs font-medium uppercase tracking-[0.25em] opacity-0 transition group-hover:opacity-100">
                Đọc chương →
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Daily series */}
      <section id="ngay" className="bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="mb-14 max-w-2xl">
            <div className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-accent">
              Chuỗi tháng 3
            </div>
            <h2 className="font-display text-4xl md:text-5xl">
              Sứ mệnh của <span className="italic text-accent">Giai cấp công nhân</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-background/70">
              Từ những nhà máy thế kỷ XIX đến phòng lab công nghệ thế kỷ XXI —
              ai đang gánh vác sứ mệnh lịch sử ấy?
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {dailyLessons.map((d, i) => (
              <article
                key={d.date}
                className="relative flex flex-col border border-background/15 bg-background/[0.03] p-8 backdrop-blur transition hover:bg-background/[0.06]"
              >
                <div className="flex items-center justify-between">
                  <div className="font-display text-3xl text-accent">{d.date}</div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-background/50">
                    Ngày {String(i + 1).padStart(2, "0")}
                  </div>
                </div>
                <div className="my-6 h-px bg-background/15" />
                <div>
                  <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-accent">
                    Bài học
                  </div>
                  <p className="font-display text-xl leading-snug">{d.lesson}</p>
                </div>
                <div className="mt-6">
                  <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-accent">
                    Suy ngẫm
                  </div>
                  <p className="text-sm leading-relaxed text-background/75">{d.reflect}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 flex items-center justify-between border-t border-background/15 pt-8 text-sm text-background/60">
            <span>Còn 362 bài học đang chờ bạn trong năm nay.</span>
            <a href="#thang" className="text-accent underline-offset-4 hover:underline">
              Xem toàn bộ chuỗi →
            </a>
          </div>
        </div>
      </section>

      {/* Quote section */}
      <section id="suyngam" className="mx-auto max-w-5xl px-6 py-32 text-center">
        <StarIcon className="mx-auto h-6 w-6 text-primary" />
        <blockquote className="mt-8 font-display text-3xl leading-tight md:text-5xl">
          “Các nhà triết học đã chỉ <em>giải thích</em> thế giới bằng nhiều cách
          khác nhau. Vấn đề là <span className="text-primary">cải tạo</span> thế giới.”
        </blockquote>
        <div className="mt-8 text-sm uppercase tracking-[0.3em] text-muted-foreground">
          Karl Marx · Luận cương về Feuerbach, 1845
        </div>
      </section>

      {/* About */}
      <section id="vesach" className="border-t border-border bg-secondary/40">
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
              <strong className="text-foreground">365 Ngày</strong> là dự án đọc
              & suy ngẫm về Chủ nghĩa Xã hội Khoa học, được biên soạn cho
              độc giả Việt Nam đương đại — sinh viên, người lao động, người làm
              chính sách, và bất kỳ ai quan tâm tới câu hỏi: <em>xã hội này
              đang đi về đâu?</em>
            </p>
            <p>
              Mỗi ngày một bài học ngắn (3 phút đọc), một dòng suy ngẫm để
              mang theo. Không giáo điều, không khẩu hiệu — chỉ là lý luận
              gặp đời sống.
            </p>
            <a
              href="#ngay"
              className="inline-block border-b-2 border-primary pb-1 text-sm font-medium text-primary"
            >
              Bắt đầu từ Ngày 01 →
            </a>
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

function StarIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2l2.39 7.36H22l-6.18 4.49L18.21 22 12 17.27 5.79 22l2.39-8.15L2 9.36h7.61L12 2z" />
    </svg>
  );
}
