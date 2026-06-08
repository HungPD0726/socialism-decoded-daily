import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MarxLinePortrait } from "@/components/brand/MarxLinePortrait";
import { chapters, type Chapter } from "@/features/learning/data/chapters";
import { getQuotesForMonth, type DailyQuote } from "@/features/learning/data/dailyQuotes";

const PRINT_YEAR = 2026;

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

const MONTH_FILE_NAMES = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

const WEEKDAYS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
const QR_IMAGE_LOCAL_SRC = "/calendar-web-qr.png";
const QR_IMAGE_DEPLOYED_SRC = `${import.meta.env.BASE_URL}calendar-web-qr.png`;

const GROUP_MEMBERS = [
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

const PRINT_CALENDAR_CSS = String.raw`
@page {
  size: 206mm 156mm;
  margin: 0;
}

.print-calendar-root {
  --font-display-print: "Playfair Display", "Cormorant Garamond", Georgia, serif;
  --font-title-print: Georgia, "Times New Roman", serif;
  --font-sans-print: "Inter", system-ui, sans-serif;
  --cal-cream: oklch(0.965 0.012 75);
  --cal-paper: oklch(0.98 0.008 75);
  --cal-ink: oklch(0.18 0.02 30);
  --cal-muted: oklch(0.45 0.02 30);
  --cal-red: oklch(0.46 0.19 27);
  --cal-red-dark: oklch(0.42 0.18 27);
  --cal-gold: oklch(0.72 0.13 75);
  --cal-border: oklch(0.85 0.02 60);
  min-height: 100vh;
  padding: 12mm 0;
  background: oklch(0.92 0.015 75);
  color: var(--cal-ink);
  font-family: var(--font-sans-print);
}

.print-calendar-root *,
.print-calendar-root *::before,
.print-calendar-root *::after {
  box-sizing: border-box;
}

.calendar-sheet {
  position: relative;
  width: 206mm;
  height: 156mm;
  margin: 0 auto 12mm;
  overflow: hidden;
  break-after: page;
  page-break-after: always;
  background:
    radial-gradient(circle at 21% 22%, oklch(0.46 0.19 27 / 0.035) 0, transparent 48%),
    radial-gradient(circle at 76% 72%, oklch(0.72 0.13 75 / 0.05) 0, transparent 52%),
    repeating-linear-gradient(0deg, oklch(0.18 0.02 30 / 0.018) 0 0.18mm, transparent 0.18mm 2.6mm),
    linear-gradient(135deg, var(--cal-paper), var(--cal-cream));
  box-shadow: 0 8mm 22mm oklch(0.18 0.02 30 / 0.18);
}

.calendar-sheet::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    repeating-linear-gradient(90deg, oklch(0.46 0.19 27 / 0.055) 0 0.35mm, transparent 0.35mm 7mm),
    repeating-linear-gradient(0deg, oklch(1 0 0 / 0.18) 0 0.3mm, transparent 0.3mm 5mm);
  pointer-events: none;
}

.calendar-trim {
  position: absolute;
  inset: 3mm;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 19mm 12mm 6mm;
  border: 0.32mm solid oklch(0.42 0.18 27 / 0.28);
  background: oklch(0.98 0.008 75 / 0.44);
}

.calendar-trim::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 3.2mm;
  background: repeating-linear-gradient(
    90deg,
    var(--cal-red) 0 12mm,
    var(--cal-red-dark) 12mm 24mm
  );
}

.calendar-binding-dots {
  position: absolute;
  top: 6.5mm;
  left: 50%;
  z-index: 4;
  display: flex;
  gap: 4.4mm;
  transform: translateX(-50%);
}

.calendar-binding-dots span {
  width: 2.2mm;
  height: 2.2mm;
  border: 0.35mm solid oklch(0.18 0.02 30 / 0.35);
  border-radius: 999px;
  background: var(--cal-paper);
  box-shadow: inset 0 0.35mm 0.8mm oklch(0.18 0.02 30 / 0.16);
}

.calendar-kicker {
  margin: 0;
  color: var(--cal-red);
  font-size: 3mm;
  font-weight: 700;
  letter-spacing: 0.9mm;
  line-height: 1.2;
  text-transform: uppercase;
}

.calendar-cover-content,
.calendar-cover-map,
.calendar-month-header,
.calendar-month-body,
.calendar-final-layout,
.calendar-page-footer {
  position: relative;
  z-index: 2;
}

.calendar-cover-content {
  max-width: 170mm;
}

.calendar-cover-title {
  margin: 2.4mm 0 0;
  font-family: var(--font-display-print);
  font-weight: 700;
  letter-spacing: 0;
  line-height: 0.76;
}

.calendar-cover-title span {
  display: block;
}

.calendar-cover-title-main {
  color: var(--cal-ink);
  font-size: 20.6mm;
}

.calendar-cover-title-red {
  color: var(--cal-red);
  margin-top: -1mm;
  font-size: 19.4mm;
  font-style: italic;
}

.calendar-cover-title-ink {
  color: var(--cal-ink);
  margin-top: -0.8mm;
  font-size: 16.6mm;
}

.calendar-cover-lead {
  width: 96mm;
  margin: 5.2mm 0 0;
  color: var(--cal-muted);
  font-size: 3.6mm;
  line-height: 1.45;
}

.calendar-cover-map {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1mm;
  margin-top: auto;
  padding-top: 4mm;
}

.calendar-cover-map-item {
  min-height: 10.2mm;
  padding: 1.4mm 1.6mm;
  border-top: 0.28mm solid oklch(0.42 0.18 27 / 0.34);
  background: oklch(1 0 0 / 0.18);
}

.calendar-cover-map-item span {
  display: block;
  color: var(--cal-red);
  font-family: var(--font-display-print);
  font-size: 4.3mm;
  font-weight: 700;
  letter-spacing: 0;
  line-height: 1;
}

.calendar-cover-map-item strong {
  display: block;
  margin-top: 0.9mm;
  font-size: 2.1mm;
  font-weight: 700;
  letter-spacing: 0;
  line-height: 1.15;
}

.calendar-cover-portrait {
  position: absolute;
  top: -1mm;
  right: -24mm;
  z-index: 1;
  width: 137mm;
  color: var(--cal-red);
  opacity: 0.22;
  transform: rotate(-2deg);
}

.calendar-cover-star {
  position: absolute;
  right: 24mm;
  bottom: 26mm;
  z-index: 1;
  width: 23mm;
  color: var(--cal-gold);
  opacity: 0.34;
}

.calendar-cover-star svg,
.calendar-quote-panel svg {
  width: 100%;
  height: auto;
}

.calendar-month-header {
  display: grid;
  grid-template-columns: 36mm 1fr;
  gap: 5.5mm;
  align-items: center;
}

.calendar-month-number {
  color: var(--cal-red);
  font-family: var(--font-display-print);
  font-size: 26mm;
  font-weight: 700;
  letter-spacing: 0;
  line-height: 0.8;
}

.calendar-month-title {
  max-width: 106mm;
  margin: 2mm 0 0;
  font-family: var(--font-sans-print);
  font-size: 8.2mm;
  font-weight: 800;
  letter-spacing: -0.16mm;
  line-height: 1;
  text-wrap: balance;
  word-spacing: 0;
}

.calendar-month-title-tight {
  max-width: 94mm;
  letter-spacing: -0.2mm;
  word-spacing: -0.25mm;
}

.calendar-month-header p:last-child {
  max-width: 96mm;
  margin: 3mm 0 0;
  color: var(--cal-muted);
  font-size: 3.2mm;
  line-height: 1.35;
}

.calendar-month-body {
  display: grid;
  flex: 1;
  grid-template-columns: 100mm 1fr;
  gap: 6mm;
  min-height: 0;
  margin-top: 6mm;
}

.calendar-grid-panel {
  padding: 4mm;
  border: 0.35mm solid oklch(0.42 0.18 27 / 0.28);
  background: oklch(1 0 0 / 0.22);
}

.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1.2mm;
  margin-bottom: 2mm;
  color: var(--cal-red);
  font-size: 2.45mm;
  font-weight: 700;
  letter-spacing: 0.45mm;
  line-height: 1;
  text-align: center;
}

.calendar-date-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
  gap: 1.2mm;
  height: 61mm;
}

.calendar-date-cell {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  min-width: 0;
  min-height: 0;
  padding: 1.2mm;
  border: 0.25mm solid oklch(0.18 0.02 30 / 0.13);
  background: oklch(0.98 0.008 75 / 0.64);
  color: var(--cal-ink);
  font-family: var(--font-display-print);
  font-size: 4.2mm;
  font-weight: 700;
  letter-spacing: 0;
  line-height: 1;
}

.calendar-date-cell-weekend {
  color: var(--cal-red);
  background: oklch(0.46 0.19 27 / 0.075);
}

.calendar-date-cell-highlight {
  border-color: var(--cal-red);
  background: var(--cal-red);
  color: var(--cal-paper);
}

.calendar-date-cell-empty {
  border-color: transparent;
  background: transparent;
}

.calendar-quote-panel {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 5.4mm;
  background: var(--cal-ink);
  color: var(--cal-paper);
}

.calendar-quote-panel svg {
  width: 7mm;
  margin-bottom: auto;
  color: var(--cal-gold);
}

.calendar-quote-date {
  margin: 0 0 3mm;
  color: var(--cal-gold);
  font-size: 2.7mm;
  font-weight: 700;
  letter-spacing: 0.65mm;
  line-height: 1.2;
  text-transform: uppercase;
}

.calendar-quote-panel blockquote {
  margin: 0;
  font-family: var(--font-sans-print);
  font-size: 4.15mm;
  font-weight: 700;
  letter-spacing: 0;
  line-height: 1.28;
  word-break: keep-all;
  overflow-wrap: normal;
  hyphens: none;
}

.calendar-quote-panel blockquote.calendar-quote-medium {
  font-size: 3.85mm;
}

.calendar-quote-panel blockquote.calendar-quote-long {
  font-size: 3.55mm;
  line-height: 1.3;
}

.calendar-quote-source {
  margin: 4mm 0 0;
  color: oklch(0.965 0.012 75 / 0.72);
  font-size: 3mm;
  line-height: 1.35;
}

.calendar-month-portrait {
  position: absolute;
  right: -15mm;
  bottom: -24mm;
  z-index: 1;
  width: 78mm;
  color: var(--cal-red);
  opacity: 0.07;
  transform: rotate(-2deg);
}

.calendar-final-layout {
  display: grid;
  flex: 1;
  grid-template-columns: 74mm 1fr;
  gap: 10mm;
  align-items: center;
  min-height: 0;
}

.calendar-final-qr-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6mm;
  border: 0.35mm solid oklch(0.42 0.18 27 / 0.28);
  background: oklch(1 0 0 / 0.72);
}

.calendar-final-qr-panel img {
  width: 61mm;
  height: 61mm;
  object-fit: contain;
  image-rendering: pixelated;
}

.calendar-final-qr-caption {
  margin: 4mm 0 0;
  color: var(--cal-red);
  font-size: 2.8mm;
  font-weight: 800;
  letter-spacing: 0.65mm;
  line-height: 1.25;
  text-align: center;
  text-transform: uppercase;
}

.calendar-final-content {
  align-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.calendar-final-content h2 {
  max-width: 92mm;
  margin: 3mm 0 0;
  color: var(--cal-ink);
  font-family: var(--font-display-print);
  font-size: 11mm;
  font-weight: 700;
  letter-spacing: 0;
  line-height: 0.95;
}

.calendar-final-content h2 span {
  color: var(--cal-red);
  font-style: italic;
}

.calendar-final-copy {
  max-width: 78mm;
  margin: 4mm 0 0;
  color: var(--cal-muted);
  font-size: 3.25mm;
  line-height: 1.45;
}

.calendar-member-panel {
  margin-top: 7mm;
  padding-left: 5mm;
  border-left: 0.7mm solid var(--cal-red);
}

.calendar-member-panel h3 {
  margin: 0;
  color: var(--cal-red);
  font-size: 2.8mm;
  font-weight: 800;
  letter-spacing: 0.75mm;
  line-height: 1.2;
  text-transform: uppercase;
}

.calendar-member-panel ul {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2mm 5mm;
  margin: 3.5mm 0 0;
  padding: 0;
  list-style: none;
  color: var(--cal-ink);
  font-size: 3.05mm;
  font-weight: 700;
  line-height: 1.2;
}

.calendar-final-portrait {
  position: absolute;
  right: -21mm;
  bottom: -32mm;
  z-index: 1;
  width: 91mm;
  color: var(--cal-red);
  opacity: 0.1;
  transform: rotate(-2deg);
}

.calendar-page-footer {
  display: flex;
  justify-content: space-between;
  gap: 8mm;
  margin-top: 3.5mm;
  padding-top: 2.4mm;
  border-top: 0.3mm solid oklch(0.42 0.18 27 / 0.22);
  color: var(--cal-muted);
  font-size: 2.6mm;
  font-weight: 700;
  letter-spacing: 0.65mm;
  line-height: 1.2;
  text-transform: uppercase;
}

.calendar-sheet:last-child {
  break-after: auto;
  page-break-after: auto;
}

@media print {
  html,
  body,
  #root {
    width: 206mm;
    min-width: 206mm;
    margin: 0;
    background: var(--cal-cream);
  }

  .print-calendar-root {
    min-height: 0;
    padding: 0;
    background: transparent;
  }

  .calendar-sheet {
    margin: 0;
    box-shadow: none;
  }
}
`;

type CalendarMonth = {
  chapter: Chapter;
  fileName: string;
  highlight: DailyQuote | null;
  quotes: DailyQuote[];
};

type CalendarCell = {
  day: number | null;
  isWeekend: boolean;
};

export const Route = createFileRoute("/print/calendar-2026")({
  loader: async () => {
    const quoteGroups = await Promise.all(chapters.map((chapter) => getQuotesForMonth(chapter.n)));

    return {
      year: PRINT_YEAR,
      months: chapters.map((chapter, index): CalendarMonth => {
        const quotes = quoteGroups[index] ?? [];

        return {
          chapter,
          fileName: MONTH_FILE_NAMES[index] ?? `month-${String(chapter.n).padStart(2, "0")}`,
          highlight: selectHighlightQuote(quotes),
          quotes,
        };
      }),
    };
  },
  head: () => ({
    meta: [
      { title: "Lịch để bàn 2026 | 365 Ngày cùng Chủ nghĩa Xã hội Khoa học" },
      {
        name: "description",
        content: "Bộ lịch để bàn in ấn theo chủ đề 365 Ngày cùng Chủ nghĩa Xã hội Khoa học.",
      },
    ],
  }),
  component: CalendarPrintPage,
});

function CalendarPrintPage() {
  const { months, year } = Route.useLoaderData();

  return (
    <main className="print-calendar-root" aria-label="Lịch để bàn 2026">
      <style>{PRINT_CALENDAR_CSS}</style>
      <CoverPage months={months} year={year} />
      {months.map((month: CalendarMonth) => (
        <MonthPage key={month.chapter.n} month={month} year={year} />
      ))}
      <FinalPage year={year} />
    </main>
  );
}

function CoverPage({ months, year }: { months: CalendarMonth[]; year: number }) {
  return (
    <section className="calendar-sheet calendar-cover-sheet" data-page-name="cover">
      <div className="calendar-trim">
        <BindingDots />
        <div className="calendar-cover-portrait" aria-hidden>
          <MarxLinePortrait />
        </div>
        <div className="calendar-cover-star" aria-hidden>
          <StarMark />
        </div>

        <div className="calendar-cover-content">
          <p className="calendar-kicker">Niên giám {year}</p>
          <h1 className="calendar-cover-title">
            <span className="calendar-cover-title-main">365 ngày cùng</span>
            <span className="calendar-cover-title-red">Chủ nghĩa</span>
            <span className="calendar-cover-title-ink">Xã hội Khoa học</span>
          </h1>
          <p className="calendar-cover-lead">
            Mỗi ngày một bài học. Mỗi tháng một chủ đề. Một năm để đọc, ghi nhớ và suy ngẫm.
          </p>
        </div>

        <div className="calendar-cover-map" aria-label="Bản đồ 12 chủ đề">
          {months.map((month) => (
            <div key={month.chapter.n} className="calendar-cover-map-item">
              <span>{String(month.chapter.n).padStart(2, "0")}</span>
              <strong>{month.chapter.title}</strong>
            </div>
          ))}
        </div>

        <footer className="calendar-page-footer">
          <span>365 ngày, một ý tưởng</span>
          <span>MLN131 · Group 4</span>
        </footer>
      </div>
    </section>
  );
}

function MonthPage({ month, year }: { month: CalendarMonth; year: number }) {
  const cells = getCalendarCells(year, month.chapter.n);
  const monthName = MONTH_NAMES[month.chapter.n - 1];

  return (
    <section
      className="calendar-sheet calendar-month-sheet"
      data-page-name={month.fileName}
      aria-label={`${monthName} ${year}`}
    >
      <div className="calendar-trim">
        <BindingDots />
        <div className="calendar-month-portrait" aria-hidden>
          <MarxLinePortrait />
        </div>

        <header className="calendar-month-header">
          <div className="calendar-month-number">{String(month.chapter.n).padStart(2, "0")}</div>
          <div>
            <p className="calendar-kicker">
              {monthName} · Chủ đề {String(month.chapter.n).padStart(2, "0")}
            </p>
            <h2 className={`calendar-month-title ${getMonthTitleClass(month.chapter.n)}`}>
              {month.chapter.title}
            </h2>
            <p>{month.chapter.sub}</p>
          </div>
        </header>

        <div className="calendar-month-body">
          <div className="calendar-grid-panel">
            <div className="calendar-weekdays" aria-hidden>
              {WEEKDAYS.map((weekday) => (
                <span key={weekday}>{weekday}</span>
              ))}
            </div>
            <div className="calendar-date-grid">
              {cells.map((cell, index) => (
                <div
                  key={`${month.chapter.n}-${index}`}
                  className={[
                    "calendar-date-cell",
                    cell.day === null && "calendar-date-cell-empty",
                    cell.isWeekend && "calendar-date-cell-weekend",
                    cell.day === month.highlight?.day && "calendar-date-cell-highlight",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {cell.day && <span>{cell.day}</span>}
                </div>
              ))}
            </div>
          </div>

          <aside className="calendar-quote-panel">
            <StarMark />
            {month.highlight ? (
              <>
                <p className="calendar-quote-date">
                  Ngày {String(month.highlight.day).padStart(2, "0")} /{" "}
                  {String(month.highlight.month).padStart(2, "0")}
                </p>
                <blockquote className={getQuoteLengthClass(month.highlight.quote)}>
                  “{month.highlight.quote}”
                </blockquote>
                <p className="calendar-quote-source">
                  {month.highlight.author} · {month.highlight.context}
                </p>
              </>
            ) : (
              <>
                <p className="calendar-quote-date">Nội dung</p>
                <blockquote>“Nội dung tháng này đang được cập nhật.”</blockquote>
                <p className="calendar-quote-source">{month.quotes.length} bài học</p>
              </>
            )}
          </aside>
        </div>

        <footer className="calendar-page-footer">
          <span>365 ngày, một ý tưởng</span>
          <span>{year}</span>
        </footer>
      </div>
    </section>
  );
}

function FinalPage({ year }: { year: number }) {
  return (
    <section className="calendar-sheet calendar-final-sheet" data-page-name="qr-members">
      <div className="calendar-trim">
        <BindingDots />
        <div className="calendar-final-portrait" aria-hidden>
          <MarxLinePortrait />
        </div>

        <div className="calendar-final-layout">
          <div className="calendar-final-qr-panel">
            <QrImage />
            <p className="calendar-final-qr-caption">Quét QR để đọc online</p>
          </div>

          <div className="calendar-final-content">
            <p className="calendar-kicker">Website dự án</p>
            <h2>
              365 ngày cùng <span>Chủ nghĩa</span> Xã hội Khoa học
            </h2>
            <p className="calendar-final-copy">
              Cảm ơn bạn đã đồng hành cùng niên giám {year}. Quét mã để mở phiên bản web, đọc các
              chủ đề và tiếp tục hành trình mỗi ngày một ý tưởng.
            </p>

            <div className="calendar-member-panel">
              <h3>Thành viên Group 4</h3>
              <ul>
                {GROUP_MEMBERS.map((member) => (
                  <li key={member}>{member}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <footer className="calendar-page-footer">
          <span>365 ngày, một ý tưởng</span>
          <span>MLN131 · Group 4</span>
        </footer>
      </div>
    </section>
  );
}

function QrImage() {
  const [src, setSrc] = useState(QR_IMAGE_LOCAL_SRC);

  useEffect(() => {
    setSrc(getQrImageSrc());
  }, []);

  return (
    <img
      src={src}
      alt="QR dẫn đến website 365 Ngày cùng Chủ nghĩa Xã hội Khoa học"
      onError={() => {
        setSrc((currentSrc) =>
          currentSrc.endsWith(QR_IMAGE_LOCAL_SRC) ? QR_IMAGE_DEPLOYED_SRC : QR_IMAGE_LOCAL_SRC,
        );
      }}
    />
  );
}

function getQrImageSrc() {
  if (typeof window === "undefined") return QR_IMAGE_LOCAL_SRC;

  return ["localhost", "127.0.0.1", "::1"].includes(window.location.hostname)
    ? QR_IMAGE_LOCAL_SRC
    : QR_IMAGE_DEPLOYED_SRC;
}

function getCalendarCells(year: number, month: number): CalendarCell[] {
  const firstDay = new Date(year, month - 1, 1);
  const firstDayOffset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month, 0).getDate();
  const cells: CalendarCell[] = [];

  for (let index = 0; index < firstDayOffset; index += 1) {
    cells.push({ day: null, isWeekend: false });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const weekday = new Date(year, month - 1, day).getDay();
    cells.push({ day, isWeekend: weekday === 0 || weekday === 6 });
  }

  while (cells.length < 42) {
    cells.push({ day: null, isWeekend: false });
  }

  return cells;
}

function getQuoteLengthClass(quote: string) {
  if (quote.length >= 105) return "calendar-quote-long";
  if (quote.length >= 78) return "calendar-quote-medium";
  return undefined;
}

function getMonthTitleClass(month: number) {
  return month === 8 || month === 9 ? "calendar-month-title-tight" : "";
}

function selectHighlightQuote(quotes: DailyQuote[]) {
  if (quotes.length === 0) return null;

  return (
    quotes
      .filter((quote) => quote.quote.length <= 82)
      .sort((a, b) => b.quote.length - a.quote.length)[0] ??
    [...quotes].sort((a, b) => a.quote.length - b.quote.length)[0] ??
    null
  );
}

function BindingDots() {
  return (
    <div className="calendar-binding-dots" aria-hidden>
      {Array.from({ length: 14 }, (_, index) => (
        <span key={index} />
      ))}
    </div>
  );
}

function StarMark() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2l2.39 7.36H22l-6.18 4.49L18.21 22 12 17.27 5.79 22l2.39-8.15L2 9.36h7.61L12 2z" />
    </svg>
  );
}
