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

          <div className="border-l-2 border-primary pl-5">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Thành viên
            </div>
            <ul className="mt-3 grid gap-2 text-sm text-foreground sm:grid-cols-2">
              {members.map((member) => (
                <li key={member}>{member}</li>
              ))}
            </ul>
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
