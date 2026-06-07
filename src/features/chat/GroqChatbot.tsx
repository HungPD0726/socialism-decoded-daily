import { useEffect, useMemo, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { Loader2, MessageCircle, Send, Sparkles, Trash2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type ChatRole = "user" | "assistant";

type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
};

type ChatApiResponse = {
  message?: {
    role?: ChatRole;
    content?: string;
  };
  error?: string;
};

const STORAGE_KEY = "groq-chatbot-history";
const MAX_HISTORY_MESSAGES = 12;
const MAX_INPUT_CHARS = 1_200;
const CHAT_API_URL = import.meta.env.VITE_CHAT_API_URL?.trim() || "/api/chat";

function createMessage(role: ChatRole, content: string): ChatMessage {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    role,
    content,
  };
}

function readStoredMessages(): ChatMessage[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter(
        (message): message is ChatMessage =>
          message &&
          typeof message === "object" &&
          (message.role === "user" || message.role === "assistant") &&
          typeof message.content === "string" &&
          typeof message.id === "string",
      )
      .slice(-MAX_HISTORY_MESSAGES);
  } catch {
    return [];
  }
}

function getRouteContext() {
  const path = window.location.pathname;
  const chapterMatch = path.match(/\/chuong\/(\d{1,2})/);
  const chapter = chapterMatch ? Number(chapterMatch[1]) : undefined;
  const today = new Date();

  if (chapter && chapter >= 1 && chapter <= 12) {
    return {
      path,
      month: chapter,
    };
  }

  return {
    path,
    month: today.getMonth() + 1,
    day: today.getDate(),
  };
}

export function GroqChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const messageListRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const hasMessages = messages.length > 0;
  const remainingChars = MAX_INPUT_CHARS - input.length;

  const apiMessages = useMemo(
    () =>
      messages.slice(-MAX_HISTORY_MESSAGES).map((message) => ({
        role: message.role,
        content: message.content,
      })),
    [messages],
  );

  useEffect(() => {
    setMessages(readStoredMessages());
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-MAX_HISTORY_MESSAGES)));
  }, [isHydrated, messages]);

  useEffect(() => {
    if (!isOpen) return;

    const scrollFrame = window.requestAnimationFrame(() => {
      messageListRef.current?.scrollTo({
        top: messageListRef.current.scrollHeight,
        behavior: "smooth",
      });
      textareaRef.current?.focus();
    });

    return () => window.cancelAnimationFrame(scrollFrame);
  }, [isOpen, messages, isLoading]);

  const clearChat = () => {
    setMessages([]);
    setError(null);
    setInput("");
    sessionStorage.removeItem(STORAGE_KEY);
  };

  const sendMessage = async (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    const content = input.trim();
    if (!content || isLoading) return;

    const userMessage = createMessage("user", content);
    const nextMessages = [...messages, userMessage].slice(-MAX_HISTORY_MESSAGES);

    setMessages(nextMessages);
    setInput("");
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(CHAT_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            ...apiMessages,
            {
              role: userMessage.role,
              content: userMessage.content,
            },
          ].slice(-MAX_HISTORY_MESSAGES),
          routeContext: getRouteContext(),
        }),
      });

      const data = (await response.json().catch(() => ({}))) as ChatApiResponse;
      if (!response.ok) {
        throw new Error(data.error || "Chatbot chưa thể trả lời lúc này.");
      }

      const assistantContent = data.message?.content?.trim();
      if (!assistantContent) {
        throw new Error("Chatbot không trả về nội dung.");
      }

      setMessages((currentMessages) =>
        [...currentMessages, createMessage("assistant", assistantContent)].slice(
          -MAX_HISTORY_MESSAGES,
        ),
      );
    } catch (sendError) {
      setError(
        sendError instanceof Error
          ? sendError.message
          : "Không thể kết nối tới chatbot. Hãy thử lại sau.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== "Enter" || event.shiftKey) return;
    event.preventDefault();
    void sendMessage();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      {isOpen && (
        <section
          className="mb-3 flex h-[min(680px,calc(100vh-7rem))] w-[calc(100vw-2rem)] max-w-md flex-col overflow-hidden rounded-md border-2 border-primary/30 bg-background shadow-2xl"
          aria-label="Chatbot gia sư CNXHKH"
        >
          <div className="banner-stripes h-1.5 shrink-0" />
          <header className="flex shrink-0 items-center justify-between border-b border-border px-4 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Sparkles className="h-4 w-4" aria-hidden />
              </span>
              <div className="min-w-0">
                <h2 className="truncate text-sm font-semibold">Gia sư CNXHKH</h2>
                <p className="truncate text-xs text-muted-foreground">Groq Llama 3.3 70B</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={clearChat}
                disabled={!hasMessages || isLoading}
                title="Xóa hội thoại"
              >
                <Trash2 className="h-4 w-4" aria-hidden />
                <span className="sr-only">Xóa hội thoại</span>
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                title="Đóng chatbot"
              >
                <X className="h-4 w-4" aria-hidden />
                <span className="sr-only">Đóng chatbot</span>
              </Button>
            </div>
          </header>

          <div ref={messageListRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {!hasMessages && (
              <div className="rounded-md border border-border bg-secondary/45 p-4 text-sm leading-relaxed text-muted-foreground">
                Hỏi về bài học hôm nay, một chủ đề, hoặc một trích dẫn trong dự án.
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={["flex", message.role === "user" ? "justify-end" : "justify-start"].join(
                  " ",
                )}
              >
                <div
                  className={[
                    "max-w-[85%] whitespace-pre-wrap rounded-md px-3 py-2 text-sm leading-relaxed",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-card text-card-foreground",
                  ].join(" ")}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                  Đang suy nghĩ
                </div>
              </div>
            )}
          </div>

          {error && (
            <div className="mx-4 mb-3 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </div>
          )}

          <form onSubmit={sendMessage} className="shrink-0 border-t border-border p-4">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(event) => setInput(event.target.value.slice(0, MAX_INPUT_CHARS))}
              onKeyDown={handleKeyDown}
              placeholder="Nhập câu hỏi..."
              rows={3}
              disabled={isLoading}
              className="max-h-32 min-h-20 resize-none"
            />
            <div className="mt-3 flex items-center justify-between gap-3">
              <span
                className={[
                  "text-xs",
                  remainingChars < 120 ? "text-destructive" : "text-muted-foreground",
                ].join(" ")}
              >
                {remainingChars}
              </span>
              <Button type="submit" disabled={!input.trim() || isLoading}>
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                ) : (
                  <Send className="h-4 w-4" aria-hidden />
                )}
                Gửi
              </Button>
            </div>
          </form>
        </section>
      )}

      <Button
        type="button"
        size="icon"
        onClick={() => setIsOpen((current) => !current)}
        className="h-12 w-12 rounded-full shadow-xl"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Đóng chatbot" : "Mở chatbot"}
      >
        {isOpen ? (
          <X className="h-5 w-5" aria-hidden />
        ) : (
          <MessageCircle className="h-5 w-5" aria-hidden />
        )}
      </Button>
    </div>
  );
}
