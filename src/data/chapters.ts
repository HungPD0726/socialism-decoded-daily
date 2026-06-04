export type Chapter = {
  n: number;
  title: string;
  sub: string;
  isPublished: boolean;
};

export const chapters: Chapter[] = [
  {
    n: 1,
    title: "Sự ra đời",
    sub: "Bối cảnh lịch sử, vai trò của Mác và Ăng-ghen",
    isPublished: true,
  },
  {
    n: 2,
    title: "Tuyên ngôn",
    sub: "Cuốn sách đã thay đổi thế giới",
    isPublished: true,
  },
  {
    n: 3,
    title: "Sứ mệnh Công nhân",
    sub: "Truyền thống & Hiện đại 4.0",
    isPublished: true,
  },
  {
    n: 4,
    title: "Sứ mệnh Công nhân II",
    sub: "Giai cấp tiên tiến trong thời đại số",
    isPublished: true,
  },
  {
    n: 5,
    title: "Quá độ lên CNXH",
    sub: "Lý luận nền tảng",
    isPublished: true,
  },
  {
    n: 6,
    title: "Mô hình Việt Nam",
    sub: "Con đường đặc thù của một dân tộc",
    isPublished: true,
  },
  {
    n: 7,
    title: "Dân chủ XHCN",
    sub: "Nhà nước pháp quyền của nhân dân",
    isPublished: true,
  },
  {
    n: 8,
    title: "Cơ cấu xã hội",
    sub: "Giai cấp trong thời kỳ quá độ",
    isPublished: true,
  },
  {
    n: 9,
    title: "Vấn đề Dân tộc",
    sub: "Đoàn kết trong đa dạng",
    isPublished: true,
  },
  {
    n: 10,
    title: "Tôn giáo",
    sub: "Tự do tín ngưỡng & đời sống tinh thần",
    isPublished: true,
  },
  {
    n: 11,
    title: "Gia đình",
    sub: "Bình đẳng giới trong xã hội hiện đại",
    isPublished: true,
  },
  {
    n: 12,
    title: "Nhìn về tương lai",
    sub: "Dự báo kinh điển & thực tế hôm nay",
    isPublished: true,
  },
];

export function getChapter(chapterNumber: number) {
  return chapters.find((chapter) => chapter.n === chapterNumber);
}
