export type DailyQuote = {
  month: number;
  day: number;
  quote: string;
  author: string;
  context: string;
};

export type CalendarDateParts = {
  year: number;
  month: number;
  day: number;
  dayOfYear: number;
};

export const TOTAL_DAILY_QUOTES = 365;

const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

type QuoteLoader = () => Promise<DailyQuote[]>;

const quoteLoaders: Record<number, QuoteLoader> = {
  1: () => import("./quotes/month01").then((module) => module.month01Quotes),
  2: () => import("./quotes/month02").then((module) => module.month02Quotes),
  3: () => import("./quotes/month03").then((module) => module.month03Quotes),
  4: () => import("./quotes/month04").then((module) => module.month04Quotes),
  5: () => import("./quotes/month05").then((module) => module.month05Quotes),
  6: () => import("./quotes/month06").then((module) => module.month06Quotes),
  7: () => import("./quotes/month07").then((module) => module.month07Quotes),
  8: () => import("./quotes/month08").then((module) => module.month08Quotes),
  9: () => import("./quotes/month09").then((module) => module.month09Quotes),
  10: () => import("./quotes/month10").then((module) => module.month10Quotes),
  11: () => import("./quotes/month11").then((module) => module.month11Quotes),
  12: () => import("./quotes/month12").then((module) => module.month12Quotes),
};

const monthQuotePromises = new Map<number, Promise<DailyQuote[]>>();
const monthQuoteMapPromises = new Map<number, Promise<Map<number, DailyQuote>>>();

function normalizeMonth(month: number) {
  const normalizedMonth = Math.trunc(month);
  return normalizedMonth >= 1 && normalizedMonth <= 12 ? normalizedMonth : null;
}

function normalizeDay(month: number, day: number) {
  const normalizedDay = month === 2 && Math.trunc(day) === 29 ? 28 : Math.trunc(day);
  const daysInMonth = DAYS_IN_MONTH[month - 1];

  return normalizedDay >= 1 && normalizedDay <= daysInMonth ? normalizedDay : null;
}

export function getDayOfYear(date: Date) {
  const start = Date.UTC(date.getFullYear(), 0, 0);
  const current = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.floor((current - start) / 86_400_000);
}

export function getCalendarDateParts(date: Date): CalendarDateParts {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    dayOfYear: getDayOfYear(date),
  };
}

export async function getQuotesForMonth(month: number): Promise<DailyQuote[]> {
  const normalizedMonth = normalizeMonth(month);
  if (normalizedMonth === null) return [];

  const cached = monthQuotePromises.get(normalizedMonth);
  if (cached) return cached;

  const promise = quoteLoaders[normalizedMonth]();
  monthQuotePromises.set(normalizedMonth, promise);
  return promise;
}

async function getQuoteMapForMonth(month: number) {
  const normalizedMonth = normalizeMonth(month);
  if (normalizedMonth === null) return new Map<number, DailyQuote>();

  const cached = monthQuoteMapPromises.get(normalizedMonth);
  if (cached) return cached;

  const promise = getQuotesForMonth(normalizedMonth).then(
    (quotes) => new Map(quotes.map((quote) => [quote.day, quote])),
  );
  monthQuoteMapPromises.set(normalizedMonth, promise);
  return promise;
}

export async function getDailyQuote(month: number, day: number): Promise<DailyQuote | undefined> {
  const normalizedMonth = normalizeMonth(month);
  if (normalizedMonth === null) return undefined;

  const normalizedDay = normalizeDay(normalizedMonth, day);
  if (normalizedDay === null) return undefined;

  const quotesByDay = await getQuoteMapForMonth(normalizedMonth);
  return quotesByDay.get(normalizedDay);
}

export function getDailyQuoteFromList(
  quotes: DailyQuote[],
  month: number,
  day: number,
): DailyQuote | undefined {
  const normalizedMonth = normalizeMonth(month);
  if (normalizedMonth === null) return undefined;

  const normalizedDay = normalizeDay(normalizedMonth, day);
  if (normalizedDay === null) return undefined;

  return quotes.find((quote) => quote.month === normalizedMonth && quote.day === normalizedDay);
}

export function getQuotesByDay(quotes: DailyQuote[]) {
  return new Map(quotes.map((quote) => [quote.day, quote]));
}

export function getFavoriteQuoteFromList(
  quotes: DailyQuote[],
  month: number,
  day: number,
): DailyQuote | undefined {
  return getDailyQuoteFromList(quotes, month, day);
}

export async function getDailyQuoteForDate(date: Date): Promise<DailyQuote | undefined> {
  return getDailyQuote(date.getMonth() + 1, date.getDate());
}

export async function getAdjacentDailyQuotes(date = new Date(), count = 3): Promise<DailyQuote[]> {
  const quotePromises = Array.from({ length: Math.max(0, Math.trunc(count)) }, (_, index) => {
    const nextDate = new Date(date);
    nextDate.setDate(date.getDate() + index);
    return getDailyQuoteForDate(nextDate);
  });

  const quotes = await Promise.all(quotePromises);
  return quotes.filter((quote): quote is DailyQuote => Boolean(quote));
}
