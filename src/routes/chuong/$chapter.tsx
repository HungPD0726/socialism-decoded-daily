import { createFileRoute, notFound } from "@tanstack/react-router";
import { getChapter, getChapterNavigation } from "@/features/learning/data/chapters";
import { getQuotesForMonth } from "@/features/learning/data/dailyQuotes";

export const Route = createFileRoute("/chuong/$chapter")({
  loader: async ({ params }) => {
    const chapterNumber = Number(params.chapter);
    const chapter = getChapter(chapterNumber);

    if (!chapter || !chapter.isPublished) {
      throw notFound();
    }

    return {
      chapter,
      navigation: getChapterNavigation(chapterNumber),
      quotes: await getQuotesForMonth(chapterNumber),
    };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `Chủ đề ${loaderData.chapter.n}: ${loaderData.chapter.title} | 365 Ngày`
          : "365 Ngày cùng Chủ nghĩa Xã hội Khoa học",
      },
      {
        name: "description",
        content:
          loaderData?.chapter.sub ?? "Hành trình 365 ngày giải mã Chủ nghĩa Xã hội Khoa học.",
      },
    ],
  }),
});
