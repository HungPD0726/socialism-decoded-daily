import { createMonthQuotes, type LessonBlock } from "./createMonthQuotes";

const lessonBlocks: LessonBlock[] = [
  {
    context: "Chương 5 - Cơ cấu xã hội - giai cấp",
    points: [
      "Cơ cấu xã hội - giai cấp là hệ thống các giai cấp, tầng lớp và quan hệ giữa chúng.",
      "Trong thời kỳ quá độ, cơ cấu xã hội - giai cấp biến đổi cùng cơ cấu kinh tế.",
      "Sự tồn tại nhiều thành phần kinh tế tạo nên sự đa dạng về giai cấp và tầng lớp.",
      "Cơ cấu xã hội - giai cấp không đứng yên mà vận động theo công nghiệp hóa và hiện đại hóa.",
      "Những tầng lớp mới xuất hiện khi lực lượng sản xuất và thị trường phát triển.",
      "Phân tích cơ cấu xã hội cần chú ý lợi ích, vị trí và vai trò của từng nhóm xã hội.",
      "Biến đổi cơ cấu xã hội có thể tạo động lực phát triển nhưng cũng làm nảy sinh mâu thuẫn mới.",
      "Quản lý xã hội trong thời kỳ quá độ cần nhận diện đúng các nhóm lợi ích chính đáng.",
    ],
  },
  {
    context: "Chương 5 - Liên minh giai cấp, tầng lớp",
    points: [
      "Liên minh giai cấp, tầng lớp là nguyên tắc chiến lược của cách mạng XHCN.",
      "Liên minh công nhân - nông dân - trí thức là nền tảng chính trị - xã hội quan trọng.",
      "Liên minh dựa trên lợi ích chung về độc lập dân tộc, phát triển và công bằng xã hội.",
      "Nội dung kinh tế của liên minh là hợp tác trong sản xuất, phân phối và phát triển đời sống.",
      "Nội dung chính trị của liên minh là củng cố quyền lực nhân dân và hệ thống chính trị.",
      "Nội dung văn hóa - xã hội của liên minh là nâng cao dân trí, đời sống và đoàn kết.",
      "Liên minh phải được xây dựng bằng chính sách cụ thể, không chỉ bằng khẩu hiệu.",
      "Chất lượng liên minh phụ thuộc vào khả năng hài hòa lợi ích giữa các tầng lớp.",
    ],
  },
  {
    context: "Chương 5 - Cơ cấu xã hội ở Việt Nam",
    points: [
      "Ở Việt Nam, cơ cấu xã hội - giai cấp biến đổi mạnh trong công nghiệp hóa và kinh tế thị trường định hướng XHCN.",
      "Giai cấp công nhân Việt Nam cần tăng về chất lượng để giữ vai trò tiên phong.",
      "Nông dân vẫn là lực lượng đông đảo và có vai trò lớn trong phát triển nông nghiệp, nông thôn.",
      "Đội ngũ trí thức là nguồn lực đặc biệt trong kinh tế tri thức và đổi mới sáng tạo.",
      "Doanh nhân, người lao động dịch vụ và các tầng lớp mới cần được nhìn nhận trong chiến lược phát triển.",
      "Đại đoàn kết toàn dân tộc là hình thức mở rộng của liên minh trong điều kiện Việt Nam.",
      "Chính sách an sinh giúp giảm phân hóa xã hội và củng cố đồng thuận.",
      "Phát triển vùng miền hài hòa góp phần ổn định cơ cấu xã hội - giai cấp.",
    ],
  },
  {
    context: "Chương 5 - Phương hướng xây dựng liên minh",
    points: [
      "Xây dựng liên minh cần bắt đầu từ lợi ích thiết thực của công nhân, nông dân và trí thức.",
      "Nâng cao đời sống nông thôn giúp củng cố nền tảng xã hội của thời kỳ quá độ.",
      "Phát triển nguồn nhân lực chất lượng cao làm tăng vai trò của trí thức và công nhân hiện đại.",
      "Chính sách xã hội phải chú ý nhóm yếu thế để không ai bị bỏ lại phía sau.",
      "Đối thoại, giám sát và phản biện xã hội giúp xử lý mâu thuẫn lợi ích bằng phương thức dân chủ.",
      "Cơ cấu xã hội - giai cấp là bản đồ lợi ích cần đọc đúng để xây dựng CNXH hiệu quả.",
    ],
  },
];

export const month09Quotes = createMonthQuotes(9, lessonBlocks);
