import { createMonthQuotes, type LessonBlock } from "./createMonthQuotes";

const lessonBlocks: LessonBlock[] = [
  {
    context: "Chương 1 - Khái niệm và vị trí CNXHKH",
    points: [
      "CNXHKH nghiên cứu con đường giải phóng giai cấp công nhân và nhân dân lao động trong tiến trình lịch sử.",
      "Theo nghĩa rộng, CNXHKH gắn với toàn bộ chủ nghĩa Mác - Lênin về sự chuyển biến lên xã hội mới.",
      "Theo nghĩa hẹp, CNXHKH là bộ phận lý luận chính trị - xã hội của chủ nghĩa Mác - Lênin.",
      "Học CNXHKH cần đặt tư tưởng trong vận động lịch sử cụ thể, không tách khỏi đời sống hiện thực.",
      "Môn học hướng người học nhận thức quy luật chuyển biến từ chủ nghĩa tư bản lên chủ nghĩa xã hội.",
      "Tính khoa học của CNXHKH nằm ở phân tích điều kiện hiện thực, không chỉ ở khát vọng công bằng.",
    ],
  },
  {
    context: "Chương 1 - Điều kiện kinh tế - xã hội",
    points: [
      "Cách mạng công nghiệp làm lực lượng sản xuất phát triển và tạo nền vật chất cho những biến đổi xã hội mới.",
      "Sự lớn mạnh của sản xuất tư bản chủ nghĩa làm các mâu thuẫn giai cấp bộc lộ ngày càng rõ.",
      "Giai cấp công nhân xuất hiện như một lực lượng xã hội độc lập trong các cuộc đấu tranh hiện đại.",
      "Phong trào công nhân cần lý luận khoa học để chuyển từ đấu tranh tự phát sang hành động tự giác.",
      "Mâu thuẫn giữa sản xuất xã hội hóa và chiếm hữu tư nhân tư bản chủ nghĩa là cơ sở hiện thực quan trọng.",
      "CNXHKH ra đời khi yêu cầu cải tạo xã hội đã trở thành vấn đề thực tiễn của thời đại.",
      "Điều kiện kinh tế - xã hội thế kỷ XIX tạo mảnh đất trực tiếp cho một học thuyết cách mạng mới.",
    ],
  },
  {
    context: "Chương 1 - Tiền đề khoa học tự nhiên",
    points: [
      "Thành tựu khoa học tự nhiên củng cố cách nhìn thế giới trong mối liên hệ và sự phát triển.",
      "Định luật bảo toàn và chuyển hóa năng lượng gợi mở tư duy về sự vận động phổ biến của vật chất.",
      "Học thuyết tế bào cho thấy sự thống nhất vật chất trong thế giới sống.",
      "Thuyết tiến hóa làm lung lay cách giải thích siêu hình về tự nhiên và xã hội.",
      "Những phát minh khoa học giúp chủ nghĩa duy vật biện chứng có cơ sở tri thức vững chắc hơn.",
      "CNXHKH kế thừa tinh thần khoa học khi giải thích biến đổi xã hội bằng những điều kiện khách quan.",
    ],
  },
  {
    context: "Chương 1 - Tiền đề tư tưởng lý luận",
    points: [
      "Triết học cổ điển Đức cung cấp hạt nhân phép biện chứng để Mác và Ăngghen cải tạo.",
      "Kinh tế chính trị học cổ điển Anh giúp phân tích lao động, giá trị và quan hệ tư bản.",
      "CNXH không tưởng phê phán nêu khát vọng nhân đạo nhưng chưa chỉ ra con đường hiện thực.",
      "Mác và Ăngghen kế thừa giá trị hợp lý của các tiền đề, đồng thời vượt qua hạn chế của chúng.",
      "Bước chuyển từ không tưởng đến khoa học bắt đầu từ việc phát hiện quy luật của xã hội tư bản.",
      "Tiền đề lý luận chỉ trở thành học thuyết mới khi được gắn với phong trào công nhân.",
    ],
  },
  {
    context: "Chương 1 - Vai trò của C. Mác và Ph. Ăngghen",
    points: [
      "C. Mác và Ph. Ăngghen đem lại thế giới quan duy vật và lập trường cộng sản cho phong trào công nhân.",
      "Chủ nghĩa duy vật lịch sử giúp giải thích xã hội từ sản xuất vật chất và các quan hệ xã hội.",
      "Học thuyết giá trị thặng dư làm sáng rõ cơ chế bóc lột trong chủ nghĩa tư bản.",
      "Phát hiện sứ mệnh lịch sử của giai cấp công nhân là đóng góp trung tâm của CNXHKH.",
      "Tuyên ngôn của Đảng Cộng sản kết tinh lý luận khoa học với cương lĩnh hành động cách mạng.",
      "CNXHKH ra đời từ sự gặp gỡ giữa trí tuệ khoa học và thực tiễn đấu tranh của giai cấp công nhân.",
    ],
  },
];

export const month01Quotes = createMonthQuotes(1, lessonBlocks);
