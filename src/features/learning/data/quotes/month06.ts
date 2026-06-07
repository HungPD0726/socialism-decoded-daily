import { createMonthQuotes, type LessonBlock } from "./createMonthQuotes";

const lessonBlocks: LessonBlock[] = [
  {
    context: "Chương 3 - Lý luận thời kỳ quá độ",
    points: [
      "Thời kỳ quá độ là giai đoạn cải biến từ xã hội cũ sang xã hội xã hội chủ nghĩa.",
      "Quá độ lên CNXH là tất yếu vì CNXH không thể hình thành đầy đủ ngay sau khi giành chính quyền.",
      "Trong thời kỳ quá độ còn tồn tại nhiều thành phần kinh tế, giai cấp và hình thức sở hữu.",
      "Tính đan xen giữa cái cũ và cái mới làm thời kỳ quá độ phức tạp và lâu dài.",
      "Nội dung quá độ bao gồm cải tạo kinh tế, chính trị, văn hóa, xã hội và con người.",
      "Xây dựng cơ sở vật chất kỹ thuật là nhiệm vụ trung tâm của thời kỳ quá độ.",
      "Đấu tranh với tàn dư cũ cần đi cùng xây dựng nhân tố mới.",
      "Quá độ lên CNXH đòi hỏi vừa kiên định mục tiêu vừa tôn trọng quy luật khách quan.",
    ],
  },
  {
    context: "Chương 3 - Quá độ bỏ qua chế độ TBCN",
    points: [
      "Bỏ qua chế độ TBCN không có nghĩa bỏ qua mọi thành tựu của văn minh tư bản.",
      "Bỏ qua TBCN là bỏ qua địa vị thống trị của quan hệ sản xuất và kiến trúc thượng tầng tư bản chủ nghĩa.",
      "Các thành tựu khoa học, công nghệ và quản trị hiện đại cần được tiếp thu có chọn lọc.",
      "Con đường quá độ phụ thuộc vào điều kiện lịch sử của mỗi dân tộc.",
      "Những nước xuất phát thấp phải đặc biệt coi trọng công nghiệp hóa, hiện đại hóa.",
      "Quá độ bỏ qua TBCN càng cần vai trò lãnh đạo, quản lý và tổ chức xã hội hiệu quả.",
      "Không thể nóng vội trong quá độ, vì quan hệ mới cần nền tảng vật chất tương ứng.",
    ],
  },
  {
    context: "Chương 3 - Quá độ lên CNXH ở Việt Nam",
    points: [
      "Việt Nam quá độ lên CNXH từ một nước nông nghiệp lạc hậu và bị chiến tranh tàn phá.",
      "Độc lập dân tộc gắn liền với CNXH là lựa chọn có cơ sở lịch sử của cách mạng Việt Nam.",
      "Đổi mới là bước phát triển nhận thức về con đường xây dựng CNXH ở Việt Nam.",
      "Kinh tế thị trường định hướng XHCN là hình thức tổ chức kinh tế của thời kỳ quá độ ở Việt Nam.",
      "Mục tiêu phát triển ở Việt Nam gắn tăng trưởng kinh tế với tiến bộ và công bằng xã hội.",
      "Nhà nước pháp quyền XHCN quản lý xã hội bằng pháp luật và bảo đảm quyền làm chủ của nhân dân.",
      "Đại đoàn kết toàn dân tộc là động lực quan trọng của quá trình quá độ ở Việt Nam.",
      "Hội nhập quốc tế giúp Việt Nam tranh thủ nguồn lực để xây dựng CNXH.",
    ],
  },
  {
    context: "Chương 3 - Nhiệm vụ và phương hướng",
    points: [
      "Công nghiệp hóa, hiện đại hóa tạo nền tảng vật chất cho CNXH ở Việt Nam.",
      "Phát triển giáo dục, khoa học và công nghệ nâng cao chất lượng nguồn nhân lực.",
      "Xây dựng văn hóa và con người Việt Nam là nhiệm vụ chiến lược của thời kỳ quá độ.",
      "Bảo đảm quốc phòng, an ninh giữ môi trường ổn định cho phát triển.",
      "Xây dựng Đảng và hệ thống chính trị trong sạch, vững mạnh là điều kiện then chốt.",
      "Giải quyết hài hòa lợi ích cá nhân, tập thể và xã hội tạo động lực phát triển.",
      "Quá độ ở Việt Nam là quá trình đổi mới liên tục trên nền tảng mục tiêu XHCN.",
    ],
  },
];

export const month06Quotes = createMonthQuotes(6, lessonBlocks);
