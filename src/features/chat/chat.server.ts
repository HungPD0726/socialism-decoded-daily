import process from "node:process";

import { chapters } from "../learning/data/chapters";
import type { DailyQuote } from "../learning/data/dailyQuotes";
import { month01Quotes } from "../learning/data/quotes/month01";
import { month02Quotes } from "../learning/data/quotes/month02";
import { month03Quotes } from "../learning/data/quotes/month03";
import { month04Quotes } from "../learning/data/quotes/month04";
import { month05Quotes } from "../learning/data/quotes/month05";
import { month06Quotes } from "../learning/data/quotes/month06";
import { month07Quotes } from "../learning/data/quotes/month07";
import { month08Quotes } from "../learning/data/quotes/month08";
import { month09Quotes } from "../learning/data/quotes/month09";
import { month10Quotes } from "../learning/data/quotes/month10";
import { month11Quotes } from "../learning/data/quotes/month11";
import { month12Quotes } from "../learning/data/quotes/month12";

type ChatRole = "user" | "assistant";

type ChatMessage = {
  role: ChatRole;
  content: string;
};

type RouteContext = {
  path?: string;
  month?: number;
  day?: number;
};

type ChatRequestBody = {
  messages?: unknown;
  routeContext?: unknown;
};

type GroqChatResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
  error?: {
    message?: string;
  };
};

const GROQ_CHAT_COMPLETIONS_URL = "https://api.groq.com/openai/v1/chat/completions";
const DEFAULT_GROQ_MODEL = "llama-3.3-70b-versatile";
const MAX_HISTORY_MESSAGES = 12;
const MAX_MESSAGE_CHARS = 1_200;
const MAX_TOTAL_CHARS = 6_000;
const MAX_COMPLETION_TOKENS = 700;

const allQuotes: DailyQuote[] = [
  ...month01Quotes,
  ...month02Quotes,
  ...month03Quotes,
  ...month04Quotes,
  ...month05Quotes,
  ...month06Quotes,
  ...month07Quotes,
  ...month08Quotes,
  ...month09Quotes,
  ...month10Quotes,
  ...month11Quotes,
  ...month12Quotes,
].sort((a, b) => a.month - b.month || a.day - b.day);

const stopWords = new Set([
  "ban",
  "bang",
  "bai",
  "cac",
  "can",
  "cau",
  "cho",
  "chu",
  "cua",
  "cung",
  "duoc",
  "giai",
  "hay",
  "hoi",
  "hom",
  "la",
  "lam",
  "minh",
  "mot",
  "nay",
  "ngay",
  "nhu",
  "nhung",
  "noi",
  "the",
  "thi",
  "toi",
  "trong",
  "tu",
  "va",
  "ve",
  "voi",
]);

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/đ/g, "d");
}

function tokenize(value: string) {
  return normalizeText(value)
    .split(/[^a-z0-9]+/g)
    .filter((token) => token.length > 2 && !stopWords.has(token));
}

function parseAllowedOrigins() {
  return (process.env.ALLOWED_ORIGIN ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function isLocalhostOrigin(origin: string) {
  return /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/i.test(origin);
}

function getCorsOrigin(origin: string | null) {
  const allowedOrigins = parseAllowedOrigins();

  if (!origin) return allowedOrigins[0] ?? "*";
  if (allowedOrigins.includes(origin)) return origin;
  if (process.env.NODE_ENV !== "production" && isLocalhostOrigin(origin)) return origin;

  return null;
}

function createCorsHeaders(corsOrigin: string) {
  return {
    "access-control-allow-origin": corsOrigin,
    "access-control-allow-methods": "POST, OPTIONS",
    "access-control-allow-headers": "Content-Type",
    "access-control-max-age": "86400",
    vary: "Origin",
  };
}

function jsonResponse(status: number, body: unknown, corsOrigin?: string | null) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...(corsOrigin ? createCorsHeaders(corsOrigin) : {}),
      "content-type": "application/json; charset=utf-8",
    },
  });
}

function noContentResponse(corsOrigin: string) {
  return new Response(null, {
    status: 204,
    headers: createCorsHeaders(corsOrigin),
  });
}

function validateRouteContext(value: unknown): RouteContext {
  if (!value || typeof value !== "object") return {};
  const context = value as Record<string, unknown>;
  const path = typeof context.path === "string" ? context.path.slice(0, 160) : undefined;
  const month = Number.isInteger(context.month) ? Number(context.month) : undefined;
  const day = Number.isInteger(context.day) ? Number(context.day) : undefined;

  return {
    path,
    month: month && month >= 1 && month <= 12 ? month : undefined,
    day: day && day >= 1 && day <= 31 ? day : undefined,
  };
}

function validateMessages(value: unknown): ChatMessage[] {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error("Tin nhắn không hợp lệ.");
  }

  const messages = value.slice(-MAX_HISTORY_MESSAGES).map((message) => {
    if (!message || typeof message !== "object") {
      throw new Error("Tin nhắn không hợp lệ.");
    }

    const record = message as Record<string, unknown>;
    if (record.role !== "user" && record.role !== "assistant") {
      throw new Error("Vai trò tin nhắn không hợp lệ.");
    }

    if (typeof record.content !== "string") {
      throw new Error("Nội dung tin nhắn không hợp lệ.");
    }

    const role = record.role as ChatRole;
    const content = record.content.trim();
    if (!content) throw new Error("Nội dung tin nhắn không được để trống.");
    if (content.length > MAX_MESSAGE_CHARS) {
      throw new Error(`Mỗi tin nhắn chỉ được tối đa ${MAX_MESSAGE_CHARS} ký tự.`);
    }

    return { role, content };
  });

  const totalChars = messages.reduce((total, message) => total + message.content.length, 0);
  if (totalChars > MAX_TOTAL_CHARS) {
    throw new Error("Cuộc trò chuyện quá dài. Hãy xóa bớt lịch sử rồi thử lại.");
  }

  if (messages[messages.length - 1]?.role !== "user") {
    throw new Error("Tin nhắn cuối cùng phải là câu hỏi của người dùng.");
  }

  return messages;
}

function getVietnamDateParts(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Ho_Chi_Minh",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).formatToParts(date);

  const getPart = (type: string) => Number(parts.find((part) => part.type === type)?.value);
  return {
    year: getPart("year"),
    month: getPart("month"),
    day: getPart("day"),
  };
}

function parseMonthDay(text: string) {
  const normalized = normalizeText(text);
  const dateMatch = normalized.match(/\b(\d{1,2})\s*[/-]\s*(\d{1,2})\b/);
  if (dateMatch) {
    const first = Number(dateMatch[1]);
    const second = Number(dateMatch[2]);
    if (first >= 1 && first <= 31 && second >= 1 && second <= 12) {
      return { day: first, month: second };
    }
  }

  const chapterMatch = normalized.match(/\b(?:chuong|thang)\s*(\d{1,2})\b/);
  if (chapterMatch) {
    const month = Number(chapterMatch[1]);
    if (month >= 1 && month <= 12) return { month };
  }

  if (normalized.includes("hom nay")) {
    const today = getVietnamDateParts();
    return { month: today.month, day: today.day };
  }

  return {};
}

function quoteToSearchText(quote: DailyQuote) {
  return normalizeText(`${quote.quote} ${quote.author} ${quote.context}`);
}

function scoreQuote(quote: DailyQuote, tokens: string[], focus: RouteContext) {
  let score = 0;
  const searchable = quoteToSearchText(quote);

  if (focus.month && quote.month === focus.month) score += 6;
  if (focus.day && quote.day === focus.day) score += 8;

  for (const token of tokens) {
    if (searchable.includes(token)) score += 1;
  }

  return score;
}

function getRelevantQuotes(question: string, routeContext: RouteContext) {
  const parsedFocus = parseMonthDay(question);
  const focus = {
    ...routeContext,
    ...parsedFocus,
  };

  if ("month" in parsedFocus && !("day" in parsedFocus)) {
    focus.day = undefined;
  }

  const tokens = tokenize(question);

  const rankedQuotes = allQuotes
    .map((quote) => ({
      quote,
      score: scoreQuote(quote, tokens, focus),
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.quote.month - b.quote.month || a.quote.day - b.quote.day)
    .slice(0, 5)
    .map((entry) => entry.quote);

  if (rankedQuotes.length > 0) return rankedQuotes;

  const today = getVietnamDateParts();
  return allQuotes
    .filter((quote) => quote.month === today.month)
    .slice(Math.max(0, today.day - 2), today.day + 2);
}

function buildProjectContext(messages: ChatMessage[], routeContext: RouteContext) {
  const latestUserMessage = [...messages].reverse().find((message) => message.role === "user");
  const question = latestUserMessage?.content ?? "";
  const relevantQuotes = getRelevantQuotes(question, routeContext);
  const today = getVietnamDateParts();

  const chapterLines = chapters
    .map((chapter) => `Chủ đề ${chapter.n}: ${chapter.title} - ${chapter.sub}`)
    .join("\n");

  const quoteLines = relevantQuotes
    .map(
      (quote) =>
        `${String(quote.day).padStart(2, "0")}/${String(quote.month).padStart(2, "0")}: "${quote.quote}" - ${quote.author}, ${quote.context}`,
    )
    .join("\n");

  return [
    `Ngày hiện tại tại Việt Nam: ${today.day}/${today.month}/${today.year}.`,
    routeContext.path ? `Người dùng đang ở đường dẫn: ${routeContext.path}.` : "",
    "Các chủ đề trong dự án:",
    chapterLines,
    "Trích dẫn liên quan từ dữ liệu dự án:",
    quoteLines || "Không tìm thấy trích dẫn khớp trực tiếp.",
  ]
    .filter(Boolean)
    .join("\n");
}

function buildGroqMessages(messages: ChatMessage[], routeContext: RouteContext) {
  return [
    {
      role: "system",
      content:
        "Bạn là gia sư Chủ nghĩa Xã hội Khoa học cho dự án học tập 365 ngày. Trả lời bằng tiếng Việt, rõ ràng, ngắn gọn, dễ hiểu. Ưu tiên giải thích khái niệm, liên hệ với chủ đề hoặc trích dẫn đang có trong dữ liệu dự án. Không bịa nguồn; nếu dữ liệu dự án không đủ, nói rõ và phân biệt phần suy luận khái quát của bạn.",
    },
    {
      role: "system",
      content: buildProjectContext(messages, routeContext),
    },
    ...messages,
  ];
}

async function callGroq(messages: ChatMessage[], routeContext: RouteContext) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("Thiếu GROQ_API_KEY trên server.");
  }

  const response = await fetch(GROQ_CHAT_COMPLETIONS_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.GROQ_MODEL || DEFAULT_GROQ_MODEL,
      messages: buildGroqMessages(messages, routeContext),
      temperature: 0.4,
      max_completion_tokens: MAX_COMPLETION_TOKENS,
    }),
  });

  const data = (await response.json().catch(() => ({}))) as GroqChatResponse;

  if (!response.ok) {
    const message = data.error?.message || "Groq API không trả về phản hồi hợp lệ.";
    throw new Error(message);
  }

  const content = data.choices?.[0]?.message?.content?.trim();
  if (!content) {
    throw new Error("Groq không trả về nội dung trả lời.");
  }

  return content;
}

export async function handleChatRequest(request: Request): Promise<Response> {
  const corsOrigin = getCorsOrigin(request.headers.get("origin"));

  if (!corsOrigin) {
    return jsonResponse(403, { error: "Origin không được phép gọi chatbot." });
  }

  if (request.method === "OPTIONS") {
    return noContentResponse(corsOrigin);
  }

  if (request.method !== "POST") {
    return jsonResponse(405, { error: "Chỉ hỗ trợ phương thức POST." }, corsOrigin);
  }

  try {
    const body = (await request.json()) as ChatRequestBody;
    const messages = validateMessages(body.messages);
    const routeContext = validateRouteContext(body.routeContext);
    const content = await callGroq(messages, routeContext);

    return jsonResponse(200, { message: { role: "assistant", content } }, corsOrigin);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Không thể tạo phản hồi chatbot.";
    const statusCode = message.includes("GROQ_API_KEY") || message.includes("Groq") ? 502 : 400;
    return jsonResponse(statusCode, { error: message }, corsOrigin);
  }
}
