import { useEffect, useMemo, useState } from "react";

type Lesson = { lesson: string; reflect: string };

// Sample lessons – có thể mở rộng cho đủ 31 ngày
const LESSONS: Record<number, Lesson> = {
  1: {
    lesson:
      "Giai cấp công nhân không chỉ là người làm việc trong nhà máy — họ là đại diện cho lực lượng sản xuất tiên tiến nhất của thời đại.",
    reflect:
      "Lập trình viên, kỹ sư công nghệ cao hôm nay chính là một bộ phận tiên tiến của giai cấp công nhân hiện đại.",
  },
  2: {
    lesson:
      "Sứ mệnh của công nhân không phải là thay thế một kẻ bóc lột này bằng một kẻ bóc lột khác, mà là xóa bỏ hoàn toàn chế độ bóc lột.",
    reflect:
      "Mục tiêu cuối cùng là một xã hội công bằng, nơi mọi lao động đều được tôn trọng giá trị đích thực.",
  },
  3: {
    lesson:
      "Lao động là nguồn gốc của mọi của cải và mọi văn hoá — không có lao động, không có lịch sử loài người.",
    reflect: "Mỗi dòng code, mỗi đường cày, mỗi giờ giảng dạy đều đang viết tiếp lịch sử ấy.",
  },
  4: {
    lesson:
      "Sản xuất ra của cải vật chất là cơ sở của sự tồn tại và phát triển của xã hội loài người.",
    reflect: "Hôm nay bạn đã tạo ra giá trị gì — vật chất hay tinh thần?",
  },
  5: {
    lesson: "Tự do của mỗi người là điều kiện cho sự phát triển tự do của tất cả mọi người.",
    reflect: "Tự do không phải là làm điều mình muốn, mà là cùng nhau tạo ra điều kiện cho nhau.",
  },
  7: {
    lesson:
      "Cách mạng công nghiệp lần thứ tư mở rộng nội hàm khái niệm “giai cấp công nhân” chứ không xoá bỏ nó.",
    reflect: "Một kỹ sư AI và một thợ hàn cùng đứng trên một dòng chảy lịch sử.",
  },
  10: {
    lesson:
      "Giai cấp công nhân chỉ hoàn thành sứ mệnh khi tự ý thức được vai trò lịch sử của mình.",
    reflect: "Học – là bước đầu tiên của giải phóng.",
  },
  14: {
    lesson: "Đoàn kết là vũ khí mạnh nhất của những người lao động.",
    reflect: "Một mình đi nhanh, cùng nhau đi xa.",
  },
  20: {
    lesson:
      "Khoa học kỹ thuật càng phát triển, vai trò của tri thức trong giai cấp công nhân càng lớn.",
    reflect: "Đầu tư cho việc học chính là đầu tư cho cách mạng cá nhân.",
  },
  25: {
    lesson:
      "Lợi ích của giai cấp công nhân thống nhất với lợi ích của tuyệt đại đa số nhân dân lao động.",
    reflect: "Khi bạn đứng về phía số đông, bạn đứng về phía lịch sử.",
  },
  31: {
    lesson: "Kết chuỗi: Sứ mệnh không kết thúc — nó được kế thừa qua từng thế hệ.",
    reflect: "Tháng sau ta bước vào chương tiếp theo. Bạn đã sẵn sàng?",
  },
};

const WEEKDAYS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
const DAYS_IN_MONTH = 31;
// 01/03/2026 rơi vào Chủ nhật → offset = 6 (chỉ số CN trong mảng T2..CN)
const FIRST_DAY_OFFSET = 6;
const TODAY = 1; // ngày 01 là "hôm nay" của hành trình

const STORAGE_KEY = "365-favorites-thang-3";

export function MonthCalendar() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [active, setActive] = useState<number>(TODAY);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setFavorites(JSON.parse(raw));
    } catch {}
  }, []);

  const toggleFavorite = (day: number) => {
    setFavorites((prev) => {
      const next = prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const cells = useMemo(() => {
    const arr: (number | null)[] = [];
    for (let i = 0; i < FIRST_DAY_OFFSET; i++) arr.push(null);
    for (let d = 1; d <= DAYS_IN_MONTH; d++) arr.push(d);
    while (arr.length % 7 !== 0) arr.push(null);
    return arr;
  }, []);

  const activeLesson = LESSONS[active];

  return (
    <div className="group/cal relative rounded-sm border border-border bg-card p-6 shadow-[8px_8px_0_0_oklch(0.46_0.19_27)] transition">
      <div className="absolute -top-3 left-6 bg-card px-3 text-xs uppercase tracking-[0.25em] text-primary">
        Lịch tháng 3
      </div>

      <div className="flex items-baseline justify-between">
        <div>
          <div className="font-display text-5xl leading-none text-primary">
            {String(active).padStart(2, "0")}
          </div>
          <div className="mt-1 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Tháng Ba · 2026
          </div>
        </div>
        <div className="text-right text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Di chuột để xem
          <br />
          <span className="text-primary">Nháy đúp ★ để lưu</span>
        </div>
      </div>

      <div className="my-5 h-px bg-border" />

      {/* Compact preview – mặc định khi không hover */}
      <div className="transition-all duration-300 group-hover/cal:hidden">
        {activeLesson ? (
          <>
            <blockquote className="font-display text-xl leading-snug">
              “{activeLesson.lesson}”
            </blockquote>
            <p className="mt-4 text-sm text-muted-foreground">{activeLesson.reflect}</p>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">Chưa có bài học cho ngày này.</p>
        )}
        <div className="mt-5 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          ⌂ Di chuột vào để mở lịch cả tháng →
        </div>
      </div>

      {/* Full calendar – hiện khi hover */}
      <div className="hidden animate-fade-in group-hover/cal:block">
        <div className="mb-2 grid grid-cols-7 gap-1 text-center text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          {WEEKDAYS.map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {cells.map((day, i) => {
            if (day === null) return <div key={i} className="aspect-square" />;
            const hasLesson = !!LESSONS[day];
            const isFav = favorites.includes(day);
            const isToday = day === TODAY;
            const isActive = day === active;
            return (
              <button
                key={i}
                type="button"
                onMouseEnter={() => hasLesson && setActive(day)}
                onFocus={() => hasLesson && setActive(day)}
                onClick={() => hasLesson && setActive(day)}
                onDoubleClick={(e) => {
                  e.preventDefault();
                  if (hasLesson) toggleFavorite(day);
                }}
                className={[
                  "group/day relative aspect-square rounded-sm border text-xs font-medium transition",
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background hover:border-primary",
                  !hasLesson && "opacity-40",
                  isToday && !isActive && "ring-1 ring-primary/60",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-label={`Ngày ${day}${hasLesson ? "" : " — chưa có bài"}`}
              >
                <span>{day}</span>
                {hasLesson && (
                  <Star
                    className={[
                      "absolute right-0.5 top-0.5 h-2.5 w-2.5 transition",
                      isFav
                        ? "text-accent opacity-100"
                        : isActive
                          ? "text-primary-foreground/60"
                          : "text-primary/40 group-hover/day:text-primary",
                    ].join(" ")}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-5 min-h-[110px] border-t border-border pt-4">
          <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-primary">
            Ngày {String(active).padStart(2, "0")} / 03
          </div>
          {activeLesson ? (
            <>
              <p className="font-display text-base leading-snug">“{activeLesson.lesson}”</p>
              <p className="mt-2 text-xs text-muted-foreground">{activeLesson.reflect}</p>
            </>
          ) : (
            <p className="text-xs text-muted-foreground">Bài học sẽ được cập nhật.</p>
          )}
        </div>
      </div>

      {/* Favorites */}
      <div className="mt-5 border-t border-border pt-4">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          <span>Tâm đắc đã lưu</span>
          <span className="text-primary">{favorites.length} bài</span>
        </div>
        {favorites.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {favorites
              .slice()
              .sort((a, b) => a - b)
              .map((d) => (
                <button
                  key={d}
                  onClick={() => setActive(d)}
                  onDoubleClick={(e) => {
                    e.preventDefault();
                    toggleFavorite(d);
                  }}
                  className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary transition hover:bg-primary hover:text-primary-foreground"
                  title="Nháy đúp để bỏ lưu"
                >
                  <Star className="h-2.5 w-2.5" />
                  {String(d).padStart(2, "0")}/03
                </button>
              ))}
          </div>
        ) : (
          <p className="mt-2 text-xs italic text-muted-foreground">
            Mở lịch, nháy đúp ngôi sao ★ trên một ngày để lưu bài học bạn tâm đắc.
          </p>
        )}
      </div>
    </div>
  );
}

function Star({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2l2.39 7.36H22l-6.18 4.49L18.21 22 12 17.27 5.79 22l2.39-8.15L2 9.36h7.61L12 2z" />
    </svg>
  );
}
