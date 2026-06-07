import { Buffer } from "node:buffer";
import type { IncomingHttpHeaders, IncomingMessage, ServerResponse } from "node:http";
import { Readable } from "node:stream";

import { handleChatRequest } from "../src/lib/api/chat.server";

type ApiRequest = IncomingMessage & {
  body?: unknown;
  headers: IncomingHttpHeaders;
};

function getHeaderValue(headers: IncomingHttpHeaders, name: string) {
  const value = headers[name.toLowerCase()];
  return Array.isArray(value) ? value[0] : value;
}

function createFetchHeaders(headers: IncomingHttpHeaders) {
  const fetchHeaders = new Headers();

  for (const [name, value] of Object.entries(headers)) {
    if (value === undefined) continue;
    if (Array.isArray(value)) {
      for (const item of value) fetchHeaders.append(name, item);
    } else {
      fetchHeaders.set(name, value);
    }
  }

  return fetchHeaders;
}

function createRequestBody(req: ApiRequest) {
  if (req.method === "GET" || req.method === "HEAD") return undefined;

  if (req.body !== undefined) {
    if (typeof req.body === "string" || Buffer.isBuffer(req.body)) return req.body;
    return JSON.stringify(req.body);
  }

  return Readable.toWeb(req) as ReadableStream;
}

function createRequestUrl(req: ApiRequest) {
  const proto = getHeaderValue(req.headers, "x-forwarded-proto") ?? "https";
  const host = getHeaderValue(req.headers, "host") ?? "localhost";
  return new URL(req.url ?? "/api/chat", `${proto}://${host}`).toString();
}

async function sendFetchResponse(response: Response, res: ServerResponse) {
  res.statusCode = response.status;
  response.headers.forEach((value, name) => res.setHeader(name, value));

  if (response.body) {
    const body = Buffer.from(await response.arrayBuffer());
    res.end(body);
    return;
  }

  res.end();
}

export default async function handler(req: ApiRequest, res: ServerResponse) {
  const body = createRequestBody(req);
  const request = new Request(createRequestUrl(req), {
    method: req.method,
    headers: createFetchHeaders(req.headers),
    body,
    duplex: body ? "half" : undefined,
  } as RequestInit & { duplex?: "half" });

  const response = await handleChatRequest(request);
  await sendFetchResponse(response, res);
}
