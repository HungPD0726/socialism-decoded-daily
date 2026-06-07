import { createMonthQuotes, type LessonBlock } from "./createMonthQuotes";

const lessonBlocks: LessonBlock[] = [
  {
    context: "Chương 6 - Khái niệm dân tộc",
    points: [
      "Dân tộc có thể được hiểu theo nghĩa cộng đồng tộc người hoặc quốc gia - dân tộc.",
      "Dân tộc hình thành trong lịch sử với các yếu tố cộng đồng về lãnh thổ, kinh tế, ngôn ngữ và văn hóa.",
      "Vấn đề dân tộc là tổng thể quan hệ lợi ích, quyền bình đẳng và phát triển giữa các dân tộc.",
      "Trong xã hội có giai cấp, vấn đề dân tộc gắn chặt với vấn đề giai cấp.",
      "Chủ nghĩa Mác - Lênin nhìn dân tộc trong tiến trình lịch sử cụ thể, không tuyệt đối hóa huyết thống.",
      "Bản sắc dân tộc là nguồn lực văn hóa khi được phát huy trong đoàn kết và phát triển.",
      "Giải quyết vấn đề dân tộc cần tôn trọng cả thống nhất quốc gia và đa dạng văn hóa.",
    ],
  },
  {
    context: "Chương 6 - Cương lĩnh dân tộc của chủ nghĩa Mác - Lênin",
    points: [
      "Các dân tộc hoàn toàn bình đẳng là nguyên tắc cơ bản của chủ nghĩa Mác - Lênin.",
      "Bình đẳng dân tộc đòi hỏi xóa bỏ áp bức, kỳ thị và đặc quyền dân tộc.",
      "Các dân tộc có quyền tự quyết, trước hết là quyền lựa chọn con đường phát triển của mình.",
      "Quyền tự quyết cần được hiểu trong quan hệ với lợi ích của nhân dân lao động và đoàn kết quốc tế.",
      "Liên hiệp công nhân tất cả các dân tộc là cơ sở để chống chia rẽ dân tộc.",
      "Đoàn kết dân tộc không phủ nhận khác biệt mà tổ chức khác biệt thành sức mạnh chung.",
      "Chủ nghĩa quốc tế của giai cấp công nhân chống cả chủ nghĩa dân tộc hẹp hòi lẫn áp bức dân tộc.",
      "Cương lĩnh dân tộc của chủ nghĩa Mác - Lênin kết hợp bình đẳng, tự quyết và đoàn kết.",
    ],
  },
  {
    context: "Chương 6 - Vấn đề dân tộc ở Việt Nam",
    points: [
      "Việt Nam là quốc gia thống nhất của nhiều dân tộc cùng sinh sống.",
      "Các dân tộc Việt Nam có truyền thống đoàn kết trong dựng nước và giữ nước.",
      "Chính sách dân tộc ở Việt Nam đặt mục tiêu bình đẳng, đoàn kết, tôn trọng và giúp nhau phát triển.",
      "Phát triển vùng dân tộc thiểu số là điều kiện để bình đẳng dân tộc trở nên thực chất.",
      "Giữ gìn bản sắc văn hóa dân tộc cần đi cùng nâng cao đời sống vật chất và tinh thần.",
      "Chống kỳ thị, chia rẽ dân tộc là yêu cầu của đại đoàn kết toàn dân.",
      "Đào tạo cán bộ người dân tộc thiểu số góp phần nâng cao năng lực tự phát triển của cộng đồng.",
      "Chính sách dân tộc phải gắn phát triển kinh tế với quốc phòng, an ninh và môi trường.",
    ],
  },
  {
    context: "Chương 6 - Phương hướng giải quyết vấn đề dân tộc",
    points: [
      "Tôn trọng tiếng nói, chữ viết, phong tục tốt đẹp giúp củng cố niềm tin giữa các dân tộc.",
      "Đầu tư giáo dục ở vùng dân tộc là đầu tư cho bình đẳng cơ hội.",
      "Hạ tầng giao thông, y tế và thông tin giúp thu hẹp khoảng cách phát triển.",
      "Phòng chống lợi dụng vấn đề dân tộc cần dựa trên pháp luật và nâng cao đời sống nhân dân.",
      "Đoàn kết dân tộc phải được thể hiện bằng chính sách cụ thể và sự tham gia của cộng đồng.",
      "Phát triển bền vững vùng dân tộc cần hài hòa kinh tế, văn hóa và sinh thái.",
      "Mỗi công dân có trách nhiệm tôn trọng sự khác biệt văn hóa trong cộng đồng quốc gia.",
      "Giải quyết tốt vấn đề dân tộc củng cố nền tảng xã hội cho con đường XHCN ở Việt Nam.",
    ],
  },
];

export const month10Quotes = createMonthQuotes(10, lessonBlocks);
