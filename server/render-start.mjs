import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, resolve, sep } from "node:path";
import { Readable } from "node:stream";

const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || "0.0.0.0";
const clientDir = resolve("dist/client");
const serverEntry = await import("../dist/server/server.js");
const app = serverEntry.default ?? serverEntry.server ?? serverEntry;

const contentTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".gif", "image/gif"],
  [".html", "text/html; charset=utf-8"],
  [".ico", "image/x-icon"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".map", "application/json; charset=utf-8"],
  [".pdf", "application/pdf"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".webp", "image/webp"],
  [".woff", "font/woff"],
  [".woff2", "font/woff2"],
]);

function getRequestUrl(req) {
  const proto = req.headers["x-forwarded-proto"] ?? "http";
  const hostHeader = req.headers.host ?? `localhost:${port}`;
  return new URL(req.url ?? "/", `${proto}://${hostHeader}`).toString();
}

function createFetchHeaders(headers) {
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

function createFetchRequest(req) {
  const hasBody = req.method !== "GET" && req.method !== "HEAD";
  return new Request(getRequestUrl(req), {
    method: req.method,
    headers: createFetchHeaders(req.headers),
    body: hasBody ? Readable.toWeb(req) : undefined,
    duplex: hasBody ? "half" : undefined,
  });
}

function safeStaticPath(pathname) {
  const decodedPath = decodeURIComponent(pathname);
  const relativePath = decodedPath.replace(/^\/+/, "");
  const filePath = resolve(clientDir, relativePath);

  if (filePath !== clientDir && !filePath.startsWith(`${clientDir}${sep}`)) {
    return null;
  }

  return filePath;
}

async function serveStatic(req, res, pathname) {
  if (req.method !== "GET" && req.method !== "HEAD") return false;
  if (!pathname.startsWith("/assets/") && !pathname.includes(".")) return false;

  const filePath = safeStaticPath(pathname);
  if (!filePath) return false;

  try {
    const fileStat = await stat(filePath);
    if (!fileStat.isFile()) return false;

    res.statusCode = 200;
    res.setHeader(
      "content-type",
      contentTypes.get(extname(filePath)) ?? "application/octet-stream",
    );
    res.setHeader("content-length", String(fileStat.size));
    res.setHeader(
      "cache-control",
      pathname.startsWith("/assets/")
        ? "public, max-age=31536000, immutable"
        : "public, max-age=0, must-revalidate",
    );

    if (req.method === "HEAD") {
      res.end();
      return true;
    }

    createReadStream(filePath).pipe(res);
    return true;
  } catch {
    return false;
  }
}

async function sendFetchResponse(response, res) {
  res.statusCode = response.status;
  response.headers.forEach((value, name) => res.setHeader(name, value));

  if (response.body) {
    const body = Buffer.from(await response.arrayBuffer());
    res.end(body);
    return;
  }

  res.end();
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(getRequestUrl(req));
    if (await serveStatic(req, res, url.pathname)) return;

    const response = await app.fetch(createFetchRequest(req), process.env, {});
    await sendFetchResponse(response, res);
  } catch (error) {
    console.error(error);
    if (!res.headersSent) {
      res.statusCode = 500;
      res.setHeader("content-type", "text/plain; charset=utf-8");
    }
    res.end("Internal Server Error");
  }
});

server.listen(port, host, () => {
  console.log(`Render server listening on http://${host}:${port}`);
});
