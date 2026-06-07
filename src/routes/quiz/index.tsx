import { createFileRoute } from "@tanstack/react-router";
import { chapters } from "@/features/learning/data/chapters";

export const Route = createFileRoute("/quiz/")({
  loader: () => ({ chapters }),
  head: () => ({
    meta: [
      { title: "Quiz Ôn Tập | 365 Ngày CNXHKH" },
      {
        name: "description",
        content:
          "Kiểm tra kiến thức Chủ nghĩa Xã hội Khoa học với bộ câu hỏi trắc nghiệm theo từng chủ đề.",
      },
    ],
  }),
});
