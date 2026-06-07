import { createFileRoute } from "@tanstack/react-router";
import { chapters } from "@/features/learning/data/chapters";

export const Route = createFileRoute("/mindmap/")({
  loader: () => ({ chapters }),
  head: () => ({
    meta: [
      { title: "Sơ đồ tư duy | 365 Ngày CNXHKH" },
      {
        name: "description",
        content:
          "Xem sơ đồ tư duy trực quan cho từng chủ đề Chủ nghĩa Xã hội Khoa học.",
      },
    ],
  }),
});
