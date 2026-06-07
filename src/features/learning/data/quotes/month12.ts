import { createMonthQuotes, type LessonBlock } from "./createMonthQuotes";

const lessonBlocks: LessonBlock[] = [
  {
    context: "Chương 7 - Khái niệm, vị trí và chức năng gia đình",
    points: [
      "Gia đình là hình thức cộng đồng xã hội đặc biệt dựa trên hôn nhân, huyết thống và nuôi dưỡng.",
      "Gia đình là tế bào của xã hội vì gắn đời sống cá nhân với tái sản xuất con người.",
      "Gia đình có chức năng tái sản xuất con người và duy trì nòi giống.",
      "Gia đình tổ chức đời sống kinh tế và tiêu dùng của các thành viên.",
      "Gia đình giáo dục nhân cách, truyền thụ văn hóa và hình thành lối sống.",
      "Gia đình thỏa mãn nhu cầu tâm lý, tình cảm và chăm sóc giữa các thành viên.",
      "Vị trí gia đình thay đổi theo điều kiện kinh tế, văn hóa và pháp luật của xã hội.",
      "Xây dựng gia đình tiến bộ góp phần xây dựng con người và xã hội mới.",
    ],
  },
  {
    context: "Chương 7 - Cơ sở xây dựng gia đình trong thời kỳ quá độ",
    points: [
      "Cơ sở kinh tế của gia đình mới là sự phát triển lực lượng sản xuất và quan hệ sản xuất tiến bộ.",
      "Xóa bỏ chế độ tư hữu áp bức là điều kiện để quan hệ gia đình bình đẳng hơn.",
      "Cơ sở chính trị - xã hội là nhà nước và pháp luật bảo vệ hôn nhân tiến bộ.",
      "Cơ sở văn hóa là hệ giá trị mới đề cao bình đẳng, trách nhiệm và nhân văn.",
      "Hôn nhân tiến bộ dựa trên tự nguyện, một vợ một chồng và bình đẳng vợ chồng.",
      "Bình đẳng giới là tiêu chí quan trọng của gia đình trong thời kỳ quá độ.",
      "Xây dựng gia đình mới cần kết hợp truyền thống tốt đẹp với giá trị hiện đại.",
      "Gia đình không thể phát triển lành mạnh nếu tách khỏi chính sách xã hội và môi trường văn hóa.",
    ],
  },
  {
    context: "Chương 7 - Biến đổi của gia đình Việt Nam",
    points: [
      "Gia đình Việt Nam đang biến đổi về quy mô, kết cấu và quan hệ giữa các thế hệ.",
      "Chức năng kinh tế của gia đình thay đổi khi thị trường lao động và đô thị hóa phát triển.",
      "Chức năng giáo dục của gia đình chịu tác động mạnh của nhà trường, truyền thông và môi trường số.",
      "Quan hệ hôn nhân, giới và thế hệ trở nên bình đẳng hơn nhưng cũng phức tạp hơn.",
      "Gia đình hạt nhân tăng lên, trong khi liên kết họ hàng truyền thống có nhiều thay đổi.",
      "Di cư lao động tạo cơ hội kinh tế nhưng cũng đặt ra thách thức chăm sóc và gắn kết gia đình.",
      "Bạo lực gia đình, bất bình đẳng giới và áp lực kinh tế là những vấn đề cần giải quyết.",
      "Biến đổi gia đình cần được nhìn nhận khách quan để có chính sách phù hợp.",
    ],
  },
  {
    context: "Chương 7 - Xây dựng gia đình Việt Nam",
    points: [
      "Xây dựng gia đình Việt Nam cần hướng tới no ấm, tiến bộ, hạnh phúc và văn minh.",
      "Chính sách dân số, giáo dục, y tế và an sinh tác động trực tiếp đến chất lượng gia đình.",
      "Giáo dục bình đẳng giới bắt đầu từ cách phân công trách nhiệm trong đời sống gia đình.",
      "Bảo vệ trẻ em và người cao tuổi là thước đo nhân văn của gia đình và xã hội.",
      "Phòng chống bạo lực gia đình cần kết hợp pháp luật, giáo dục và hỗ trợ cộng đồng.",
      "Giữ gìn truyền thống tốt đẹp phải đi cùng loại bỏ hủ tục và định kiến lạc hậu.",
      "Gia đình trong thời kỳ quá độ là nơi mỗi người học thực hành trách nhiệm, yêu thương và bình đẳng.",
    ],
  },
];

export const month12Quotes = createMonthQuotes(12, lessonBlocks);
