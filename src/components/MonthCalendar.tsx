import { useEffect, useMemo, useState } from "react";
import { getDailyQuote, getQuotesForMonth } from "@/data/dailyQuotes";

const WEEKDAYS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
const MONTH_NAMES = [
  "Tháng Một",
  "Tháng Hai",
  "Tháng Ba",
  "Tháng Tư",
  "Tháng Năm",
  "Tháng Sáu",
  "Tháng Bảy",
  "Tháng Tám",
  "Tháng Chín",
  "Tháng Mười",
  "Tháng Mười Một",
  "Tháng Mười Hai",
];

const FAVORITES_KEY = "365-favorite-quotes";
const LEGACY_STORAGE_KEY = "365-favorites-thang-3";

function getFavoriteKey(month: number, day: number) {
  return `${month}-${day}`;
}

function parseFavoriteKey(key: string) {
  const [month, day] = key.split("-").map(Number);
  if (!Number.isInteger(month) || !Number.isInteger(day)) return null;
  return { month, day };
}

export function MonthCalendar() {
  const today = useMemo(() => new Date(), []);
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();
  const todayDay = today.getDate();

  const [favorites, setFavorites] = useState<string[]>([]);
  const [active, setActive] = useState(todayDay);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(FAVORITES_KEY);
      if (raw) {
        setFavorites(JSON.parse(raw));
        return;
      }

      const legacyRaw = localStorage.getItem(LEGACY_STORAGE_KEY);
      if (!legacyRaw) return;

      const legacyDays = JSON.parse(legacyRaw);
      if (!Array.isArray(legacyDays)) return;

      const migrated = legacyDays
        .filter((day) => Number.isInteger(day))
        .map((day) => getFavoriteKey(3, day));

      setFavorites(migrated);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(migrated));
    } catch (error) {
      console.warn("Could not load favorite quotes", error);
    }
  }, []);

  const monthQuotes = useMemo(() => getQuotesForMonth(currentMonth), [currentMonth]);
  const quotesByDay = useMemo(
    () => new Map(monthQuotes.map((quote) => [quote.day, quote])),
    [monthQuotes],
  );

  const daysInMonth = useMemo(
    () => new Date(currentYear, currentMonth, 0).getDate(),
    [currentMonth, currentYear],
  );

  const cells = useMemo(() => {
    const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1);
    const firstDayOffset = (firstDayOfMonth.getDay() + 6) % 7;
    const days: (number | null)[] = [];

    for (let i = 0; i < firstDayOffset; i += 1) days.push(null);
    for (let day = 1; day <= daysInMonth; day += 1) days.push(day);
    while (days.length % 7 !== 0) days.push(null);

    return days;
  }, [currentMonth, currentYear, daysInMonth]);

  const activeQuote = getDailyQuote(currentMonth, active);
  const currentMonthFavorites = favorites
    .map(parseFavoriteKey)
    .filter((favorite): favorite is { month: number; day: number } => {
      return Boolean(favorite) && favorite.month === currentMonth;
    })
    .sort((a, b) => a.day - b.day);

  const toggleFavorite = (month: number, day: number) => {
    const key = getFavoriteKey(month, day);

    setFavorites((prev) => {
      const next = prev.includes(key)
        ? prev.filter((favorite) => favorite !== key)
        : [...prev, key];
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
      } catch (error) {
        console.warn("Could not save favorite quotes", error);
      }
      return next;
    });
  };

  return (
    <div className="group/cal relative rounded-sm border border-border bg-card p-6 shadow-[8px_8px_0_0_oklch(0.46_0.19_27)] transition">
      <div className="absolute -top-3 left-6 bg-card px-3 text-xs uppercase tracking-[0.25em] text-primary">
        Lịch {MONTH_NAMES[currentMonth - 1].toLowerCase()}
      </div>

      <div className="flex items-baseline justify-between gap-4">
        <div>
          <div className="font-display text-5xl leading-none text-primary">
            {String(active).padStart(2, "0")}
          </div>
          <div className="mt-1 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            {MONTH_NAMES[currentMonth - 1]} · {currentYear}
          </div>
        </div>
        <div className="text-right text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          365 ngày
          <br />
          <span className="text-primary">Một ý tưởng</span>
        </div>
      </div>

      <div className="my-5 h-px bg-border" />

      <div className="transition-all duration-300 group-hover/cal:hidden">
        {activeQuote ? (
          <>
            <blockquote className="font-display text-xl leading-snug">
              “{activeQuote.quote}”
            </blockquote>
            <p className="mt-4 text-sm text-muted-foreground">
              {activeQuote.author} · {activeQuote.context}
            </p>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">Nội dung ngày này đang được cập nhật.</p>
        )}
        <div className="mt-5 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {monthQuotes.length} nội dung trong tháng này
        </div>
      </div>

      <div className="hidden animate-fade-in group-hover/cal:block">
        <div className="mb-2 grid grid-cols-7 gap-1 text-center text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          {WEEKDAYS.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {cells.map((day, index) => {
            if (day === null) return <div key={index} className="aspect-square" />;

            const quote = quotesByDay.get(day) ?? getDailyQuote(currentMonth, day);
            const isFav = quote
              ? favorites.includes(getFavoriteKey(quote.month, quote.day))
              : false;
            const isToday = day === todayDay;
            const isActive = day === active;

            return (
              <button
                key={index}
                type="button"
                onMouseEnter={() => quote && setActive(day)}
                onFocus={() => quote && setActive(day)}
                onClick={() => quote && setActive(day)}
                onDoubleClick={(event) => {
                  event.preventDefault();
                  if (quote) toggleFavorite(quote.month, quote.day);
                }}
                className={[
                  "group/day relative aspect-square rounded-sm border text-xs font-medium transition",
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background hover:border-primary",
                  !quote && "opacity-40",
                  isToday && !isActive && "ring-1 ring-primary/60",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-label={`Ngày ${day}/${currentMonth}${quote ? "" : " chưa có nội dung"}`}
                title={quote ? `${quote.author}: ${quote.context}` : "Chưa có nội dung"}
              >
                <span>{day}</span>
                {quote && (
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
            Ngày {String(active).padStart(2, "0")} / {String(currentMonth).padStart(2, "0")}
          </div>
          {activeQuote ? (
            <>
              <p className="font-display text-base leading-snug">“{activeQuote.quote}”</p>
              <p className="mt-2 text-xs text-muted-foreground">
                {activeQuote.author} · {activeQuote.context}
              </p>
            </>
          ) : (
            <p className="text-xs text-muted-foreground">Nội dung ngày này đang được cập nhật.</p>
          )}
        </div>
      </div>

      <div className="mt-5 border-t border-border pt-4">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          <span>Tâm đắc đã lưu</span>
          <span className="text-primary">{currentMonthFavorites.length} bài</span>
        </div>
        {currentMonthFavorites.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {currentMonthFavorites.map(({ month, day }) => {
              const quote = getDailyQuote(month, day);
              if (!quote) return null;

              return (
                <button
                  key={getFavoriteKey(month, day)}
                  type="button"
                  onClick={() => setActive(day)}
                  onDoubleClick={(event) => {
                    event.preventDefault();
                    toggleFavorite(quote.month, quote.day);
                  }}
                  className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary transition hover:bg-primary hover:text-primary-foreground"
                  title={`${quote.author}: ${quote.context}`}
                >
                  <Star className="h-2.5 w-2.5" />
                  {String(day).padStart(2, "0")}/{String(month).padStart(2, "0")}
                </button>
              );
            })}
          </div>
        ) : (
          <p className="mt-2 text-xs italic text-muted-foreground">
            Chưa có nội dung tâm đắc trong tháng này.
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
