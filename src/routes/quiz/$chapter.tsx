import { createFileRoute, notFound } from "@tanstack/react-router";
import { getChapter } from "@/features/learning/data/chapters";
import { getQuotesForMonth } from "@/features/learning/data/dailyQuotes";

export const Route = createFileRoute("/quiz/$chapter")({
  loader: async ({ params }) => {
    const chapterNumber = Number(params.chapter);
    const chapter = getChapter(chapterNumber);

    if (!chapter || !chapter.isPublished) {
      throw notFound();
    }

    const quotes = await getQuotesForMonth(chapterNumber);
    return { chapter, quotes };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `Quiz: ${loaderData.chapter.title} | 365 Ngày CNXHKH`
          : "Quiz Ôn Tập | 365 Ngày CNXHKH",
      },
      {
        name: "description",
        content: loaderData?.chapter.sub ?? "Ôn tập trắc nghiệm Chủ nghĩa Xã hội Khoa học.",
      },
    ],
  }),
});
