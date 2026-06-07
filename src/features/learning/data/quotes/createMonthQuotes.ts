import type { DailyQuote } from "../dailyQuotes";

export type LessonBlock = {
  context: string;
  points: string[];
  author?: string;
};

export function createMonthQuotes(month: number, blocks: LessonBlock[]): DailyQuote[] {
  let nextDay = 1;

  return blocks.flatMap((block) =>
    block.points.map((quote) => ({
      month,
      day: nextDay++,
      quote,
      author: block.author ?? "Giáo trình CNXHKH",
      context: block.context,
    })),
  );
}
