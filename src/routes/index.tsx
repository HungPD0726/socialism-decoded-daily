import { createFileRoute } from "@tanstack/react-router";
import {
  getAdjacentDailyQuotes,
  getCalendarDateParts,
  getDailyQuoteForDate,
  getQuotesForMonth,
  TOTAL_DAILY_QUOTES,
} from "@/features/learning/data/dailyQuotes";

export const Route = createFileRoute("/")({
  loader: async () => {
    const date = new Date();
    const today = getCalendarDateParts(date);
    const [todaysQuote, dailyLessons, monthQuotes] = await Promise.all([
      getDailyQuoteForDate(date),
      getAdjacentDailyQuotes(date, 3),
      getQuotesForMonth(today.month),
    ]);

    return {
      today,
      todaysQuote,
      dailyLessons,
      monthQuotes,
      remainingLessons: Math.max(0, TOTAL_DAILY_QUOTES - today.dayOfYear),
    };
  },
  head: () => ({
    meta: [
      { title: "365 Ngày cùng Chủ nghĩa Xã hội Khoa học" },
      {
        name: "description",
        content:
          "Hành trình 365 ngày giải mã Chủ nghĩa Xã hội Khoa học theo 12 chủ đề bám giáo trình.",
      },
      { property: "og:title", content: "365 Ngày cùng Chủ nghĩa Xã hội Khoa học" },
      {
        property: "og:description",
        content:
          "Mỗi ngày một bài học, mỗi tháng một chủ đề. Hành trình một năm cùng tư tưởng đã thay đổi thế giới.",
      },
    ],
  }),
});
