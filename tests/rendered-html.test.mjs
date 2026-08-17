import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { access, readFile } from "node:fs/promises";
import test, { after } from "node:test";

const port = 3210;
let server;

const delay = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

async function ensureServer() {
  if (server) {
    return;
  }

  server = spawn(
    process.execPath,
    ["node_modules/next/dist/bin/next", "start", "-p", String(port)],
    { cwd: new URL("..", import.meta.url), stdio: "pipe" },
  );

  let startupError = "";
  server.stderr.on("data", (chunk) => {
    startupError += chunk.toString();
  });

  for (let attempt = 0; attempt < 50; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/`);
      if (response.ok) {
        return;
      }
    } catch {
      // The production server is still starting.
    }

    if (server.exitCode !== null) {
      throw new Error(`Next.js production server exited: ${startupError}`);
    }

    await delay(100);
  }

  throw new Error(`Timed out waiting for Next.js production server: ${startupError}`);
}

async function render(pathname = "/") {
  await ensureServer();

  return fetch(`http://127.0.0.1:${port}${pathname}`, {
    headers: {
      accept: "text/html",
      "x-forwarded-host": "codeaux.example",
      "x-forwarded-proto": "https",
    },
  });
}

after(() => {
  server?.kill();
});

test("server-renders the finished CodeAux homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>CodeAux — Revenue-Focused Website Design &amp; Development<\/title>/i);
  assert.match(html, /We build/i);
  assert.doesNotMatch(html, /Demo content · Replace before public launch/i);
  assert.match(html, /Free website audit/i);
  assert.match(html, /Website projects from ₹50,000/i);
  assert.match(html, /rel="canonical" href="https:\/\/codeaux\.example\/?"/i);
  assert.doesNotMatch(html, /Building your site|Your site is taking shape|react-loading-skeleton/i);
});

test("server-renders project case studies on their dedicated page", async () => {
  const response = await render("/projects");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Case studies built to show the thinking/i);
  assert.match(html, /Demo content · Replace before public launch/i);
  assert.match(html, /Project slot 05/i);
  assert.match(html, /rel="canonical" href="https:\/\/codeaux\.example\/projects"/i);
});

test("removes the disposable starter and retains production metadata assets", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.doesNotMatch(page, /_sites-preview|SkeletonPreview/);
  assert.match(layout, /generateMetadata/);
  assert.match(layout, /\/og\.png/);

  await assert.rejects(access(new URL("../app/_sites-preview", import.meta.url)));
  await access(new URL("../public/og.png", import.meta.url));
  await access(new URL("../app/manifest.ts", import.meta.url));
  await access(new URL("../app/robots.ts", import.meta.url));
  await access(new URL("../app/sitemap.ts", import.meta.url));
});
