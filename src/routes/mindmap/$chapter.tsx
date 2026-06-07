import { createFileRoute, notFound } from "@tanstack/react-router";
import { getChapter, getChapterNavigation } from "@/features/learning/data/chapters";
import { getQuotesForMonth } from "@/features/learning/data/dailyQuotes";

export const Route = createFileRoute("/mindmap/$chapter")({
  loader: async ({ params }) => {
    const chapterNumber = Number(params.chapter);
    const chapter = getChapter(chapterNumber);

    if (!chapter || !chapter.isPublished) {
      throw notFound();
    }

    const quotes = await getQuotesForMonth(chapterNumber);
    return { chapter, navigation: getChapterNavigation(chapterNumber), quotes };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `Sơ đồ: ${loaderData.chapter.title} | 365 Ngày CNXHKH`
          : "Sơ đồ tư duy | 365 Ngày CNXHKH",
      },
      {
        name: "description",
        content:
          loaderData?.chapter.sub ?? "Sơ đồ tư duy trực quan Chủ nghĩa Xã hội Khoa học.",
      },
    ],
  }),
});
