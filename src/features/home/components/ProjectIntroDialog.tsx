import { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ProjectIntroDialogProps = {
  members: string[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const QR_IMAGE_LOCAL_SRC = "/calendar-web-qr.png";
const QR_IMAGE_DEPLOYED_SRC = `${import.meta.env.BASE_URL}calendar-web-qr.png`;

function getQrImageSrc() {
  if (typeof window === "undefined") return QR_IMAGE_LOCAL_SRC;
  return ["localhost", "127.0.0.1", "::1"].includes(window.location.hostname)
    ? QR_IMAGE_LOCAL_SRC
    : QR_IMAGE_DEPLOYED_SRC;
}

function QrImage() {
  const [src, setSrc] = useState(QR_IMAGE_LOCAL_SRC);

  useEffect(() => {
    setSrc(getQrImageSrc());
  }, []);

  return (
    <img
      src={src}
      alt="QR dẫn đến website 365 Ngày cùng Chủ nghĩa Xã hội Khoa học"
      className="h-full w-full object-contain"
      onError={() => {
        setSrc((currentSrc) =>
          currentSrc.endsWith(QR_IMAGE_LOCAL_SRC) ? QR_IMAGE_DEPLOYED_SRC : QR_IMAGE_LOCAL_SRC,
        );
      }}
    />
  );
}

export function ProjectIntroDialog({ members, open, onOpenChange }: ProjectIntroDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto border-2 border-primary/30 p-0">
        <div className="banner-stripes h-1.5" />
        <div className="space-y-6 px-6 pb-6 pt-8 sm:px-8">
          <DialogHeader className="text-left">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Group 4
            </div>
            <DialogTitle className="font-display text-3xl leading-tight md:text-4xl">
              Giới thiệu dự án 365 Ngày
            </DialogTitle>
            <DialogDescription className="text-base leading-relaxed">
              365 Ngày là dự án đọc và suy ngẫm về Chủ nghĩa Xã hội Khoa học, giúp người học tiếp
              cận từng chủ đề bằng những nội dung ngắn gọn, đều đặn và gần với đời sống.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="border-l-2 border-primary pl-5">
              <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                Thành viên
              </div>
              <ul className="mt-3 grid gap-2 text-sm text-foreground">
                {members.map((member) => (
                  <li key={member} className="hover:text-primary transition-colors">
                    {member}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-center rounded-xl border border-dashed border-primary/20 bg-muted/30 p-6">
              <div className="relative group overflow-hidden rounded-lg bg-white p-2.5 shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg w-full max-w-[220px] aspect-square flex items-center justify-center">
                <QrImage />
              </div>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <button
                type="button"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                Đóng
              </button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
