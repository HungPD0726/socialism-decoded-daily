export type Chapter = {
  n: number;
  title: string;
  sub: string;
  isPublished: boolean;
};

export const chapters: Chapter[] = [
  {
    n: 1,
    title: "Nhập môn CNXHKH I",
    sub: "Sự ra đời, điều kiện kinh tế - xã hội, tiền đề lý luận",
    isPublished: true,
  },
  {
    n: 2,
    title: "Nhập môn CNXHKH II",
    sub: "Các giai đoạn phát triển, đối tượng, phương pháp, ý nghĩa học tập",
    isPublished: true,
  },
  {
    n: 3,
    title: "Giai cấp công nhân I",
    sub: "Khái niệm, đặc điểm, sứ mệnh lịch sử",
    isPublished: true,
  },
  {
    n: 4,
    title: "Giai cấp công nhân II",
    sub: "Giai cấp công nhân hiện nay và ở Việt Nam",
    isPublished: true,
  },
  {
    n: 5,
    title: "Chủ nghĩa xã hội",
    sub: "Khái niệm, đặc trưng, điều kiện xây dựng CNXH",
    isPublished: true,
  },
  {
    n: 6,
    title: "Thời kỳ quá độ",
    sub: "Lý luận quá độ lên CNXH và quá độ ở Việt Nam",
    isPublished: true,
  },
  {
    n: 7,
    title: "Dân chủ XHCN",
    sub: "Bản chất, đặc trưng, xây dựng nền dân chủ XHCN",
    isPublished: true,
  },
  {
    n: 8,
    title: "Nhà nước XHCN",
    sub: "Nhà nước XHCN và nhà nước pháp quyền XHCN Việt Nam",
    isPublished: true,
  },
  {
    n: 9,
    title: "Cơ cấu xã hội - giai cấp",
    sub: "Cơ cấu xã hội, liên minh giai cấp/tầng lớp",
    isPublished: true,
  },
  {
    n: 10,
    title: "Vấn đề dân tộc",
    sub: "Dân tộc trong thời kỳ quá độ lên CNXH",
    isPublished: true,
  },
  {
    n: 11,
    title: "Vấn đề tôn giáo",
    sub: "Tôn giáo trong thời kỳ quá độ lên CNXH",
    isPublished: true,
  },
  {
    n: 12,
    title: "Vấn đề gia đình",
    sub: "Gia đình trong thời kỳ quá độ lên CNXH",
    isPublished: true,
  },
];

export function getChapter(chapterNumber: number) {
  return chapters.find((chapter) => chapter.n === chapterNumber);
}

export const publishedChapters = chapters
  .filter((chapter) => chapter.isPublished)
  .sort((a, b) => a.n - b.n);

const chapterNavigation = new Map(
  publishedChapters.map((chapter, index) => [
    chapter.n,
    {
      previousChapter: publishedChapters[index - 1]?.n ?? null,
      nextChapter: publishedChapters[index + 1]?.n ?? null,
    },
  ]),
);

export function getChapterNavigation(chapterNumber: number) {
  return chapterNavigation.get(chapterNumber) ?? { previousChapter: null, nextChapter: null };
}
